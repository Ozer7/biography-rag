// Hybrid retrieval: embeddings (mean-centered cosine) + BM25, fused with reciprocal-rank fusion,
// then MMR so the snippets aren't near-duplicates of each other.
import { EMBED_DIM } from './embedder.js';
import { topIndices } from './bm25.js';

export const RETRIEVAL_PARAMS = {
  k: 8,              // snippets sent to the LLM per query
  perList: 40,       // candidates from each ranked list
  pool: 30,          // fused candidates considered by MMR
  rrfK: 60,
  mmrLambda: 0.75,
  navPenalty: 0.7,   // weight for table-of-contents / footnote-list chunks
  hubAlpha: 0.5,     // hubness correction strength (see setHubness)
  // Relevance gate on the raw cosine: if the best snippet is below BOTH thresholds,
  // we answer "not in the sources" without calling the LLM at all.
  minDense: 0.30,
  minBm25: 6.0,
};

function center(store, q) {
  const D = EMBED_DIM, c = new Float32Array(D);
  let n = 0;
  for (let d = 0; d < D; d++) { c[d] = q[d] - store.mean[d]; n += c[d] * c[d]; }
  n = Math.sqrt(n) || 1;
  for (let d = 0; d < D; d++) c[d] /= n;
  return c;
}

function scoresFor(vecs, N, q) {
  const D = EMBED_DIM, s = new Float32Array(N);
  for (let i = 0; i < N; i++) { let a = 0; const o = i * D; for (let d = 0; d < D; d++) a += vecs[o + d] * q[d]; s[i] = a; }
  return s;
}

// qVecs: Float32Array[] (one per phrasing), qTexts: string[] (same order)
export function retrieve(store, qVecs, qTexts, p = RETRIEVAL_PARAMS) {
  const N = store.chunks.length;
  const rrf = new Float64Array(N), raw = new Float32Array(N).fill(-1), cen = new Float32Array(N).fill(-1), bm = new Float32Array(N);
  qVecs.forEach(q => {
    const r = scoresFor(store.vectors, N, q), c = scoresFor(store.cvec, N, center(store, q));
    if (store.hub) for (let i = 0; i < N; i++) c[i] -= p.hubAlpha * store.hub[i];
    for (let i = 0; i < N; i++) { if (r[i] > raw[i]) raw[i] = r[i]; if (c[i] > cen[i]) cen[i] = c[i]; }
    topIndices(c, p.perList).forEach((i, rank) => { rrf[i] += 1 / (p.rrfK + rank + 1); });
  });
  qTexts.forEach(t => {
    store.bm25.search(t, p.perList).forEach(({ i, score }, rank) => {
      rrf[i] += 1 / (p.rrfK + rank + 1);
      if (score > bm[i]) bm[i] = score;
    });
  });
  for (let i = 0; i < N; i++) if (store.nav[i]) rrf[i] *= p.navPenalty;
  const pool = topIndices(rrf, p.pool).filter(i => rrf[i] > 0);
  const chosen = [];
  const maxR = pool.length ? rrf[pool[0]] : 1;
  while (chosen.length < p.k && chosen.length < pool.length) {
    let best = -1, bestScore = -Infinity;
    for (const i of pool) {
      if (chosen.includes(i)) continue;
      let sim = 0;
      for (const j of chosen) sim = Math.max(sim, pairSim(store.cvec, i, j));
      const s = p.mmrLambda * (rrf[i] / maxR) - (1 - p.mmrLambda) * sim;
      if (s > bestScore) { bestScore = s; best = i; }
    }
    chosen.push(best);
  }
  const results = chosen.map((i, r) => ({
    id: store.chunks[i].id, i, rank: r + 1, rrf: +rrf[i].toFixed(5),
    dense: +raw[i].toFixed(4), centered: +cen[i].toFixed(4), bm25: +bm[i].toFixed(3), nav: !!store.nav[i],
  }));
  const maxDense = Math.max(-1, ...results.map(r => r.dense));
  const maxBm25 = Math.max(0, ...results.map(r => r.bm25));
  const passed = results.length > 0 && (maxDense >= p.minDense || maxBm25 >= p.minBm25);
  return { results, gate: { maxDense: +maxDense.toFixed(4), maxBm25: +maxBm25.toFixed(3), minDense: p.minDense, minBm25: p.minBm25, passed } };
}

function pairSim(v, i, j) {
  let s = 0; const a = i * EMBED_DIM, b = j * EMBED_DIM;
  for (let d = 0; d < EMBED_DIM; d++) s += v[a + d] * v[b + d];
  return s;
}

// Hubness correction: some chunks are a little similar to every question (a summary paragraph,
// a chapter heading) and crowd out the passage that actually answers. We embed all the run's
// question phrasings up front and subtract each chunk's average similarity to them.
export function setHubness(store, allQueryVecs) {
  const N = store.chunks.length, hub = new Float32Array(N);
  for (const q of allQueryVecs) {
    const c = scoresFor(store.cvec, N, center(store, q));
    for (let i = 0; i < N; i++) hub[i] += c[i] / allQueryVecs.length;
  }
  store.hub = hub;
  let top = topIndices(hub, 5).map(i => ({ id: store.chunks[i].id, hub: +hub[i].toFixed(3) }));
  return { probes: allQueryVecs.length, top_hubs: top };
}
