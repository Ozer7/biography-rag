// Small BM25 keyword index to complement the embeddings (helps with names, dates, rare words).
export const STOP = new Set(('a about above after again against all am an and any are as at be because been before being below between both but by ' +
  'can could did do does doing down during each few for from further had has have having he her here hers herself him himself his how i if in into ' +
  'is it its itself just me more most my myself no nor not now of off on once only or other our ours ourselves out over own same she should so some ' +
  'such than that the their theirs them themselves then there these they this those through to too under until up upon very was we were what when ' +
  'where which while who whom why will with would you your yours yourself yourselves also one two may might must shall said thus yet' ).split(' '));

export function stem(w) {
  if (w.length <= 4) return w;
  return w.replace(/'s$/, '').replace(/(ies)$/, 'y').replace(/(sses)$/, 'ss').replace(/([^s])s$/, '$1')
    .replace(/(ing|edly|ed|ly)$/, '').replace(/(.)\1$/, '$1');
}

export function terms(text) {
  return (text.toLowerCase().normalize('NFD').replace(/\p{Mn}/gu, '').match(/[a-z0-9]+/g) || [])
    .filter(w => !STOP.has(w) && w.length > 1).map(stem);
}

export class BM25 {
  constructor(texts, k1 = 1.4, b = 0.75) {
    this.k1 = k1; this.b = b; this.N = texts.length;
    this.len = new Float32Array(this.N);
    this.post = new Map();
    texts.forEach((t, i) => {
      const tf = new Map();
      const ts = terms(t);
      this.len[i] = ts.length;
      for (const w of ts) tf.set(w, (tf.get(w) || 0) + 1);
      for (const [w, f] of tf) { if (!this.post.has(w)) this.post.set(w, []); this.post.get(w).push([i, f]); }
    });
    this.avg = this.len.reduce((a, x) => a + x, 0) / Math.max(1, this.N);
  }
  search(query, topK = 40) {
    const scores = new Float32Array(this.N);
    for (const w of new Set(terms(query))) {
      const p = this.post.get(w);
      if (!p) continue;
      const idf = Math.log(1 + (this.N - p.length + 0.5) / (p.length + 0.5));
      for (const [i, f] of p) scores[i] += idf * (f * (this.k1 + 1)) / (f + this.k1 * (1 - this.b + this.b * this.len[i] / this.avg));
    }
    return topIndices(scores, topK).filter(i => scores[i] > 0).map(i => ({ i, score: scores[i] }));
  }
}

export function topIndices(scores, k) {
  const idx = [];
  for (let i = 0; i < scores.length; i++) {
    if (idx.length < k) { idx.push(i); if (idx.length === k) idx.sort((a, b) => scores[b] - scores[a]); continue; }
    if (scores[i] > scores[idx[k - 1]]) {
      let j = k - 1; while (j > 0 && scores[idx[j - 1]] < scores[i]) { idx[j] = idx[j - 1]; j--; }
      idx[j] = i;
    }
  }
  return idx.length < k ? idx.sort((a, b) => scores[b] - scores[a]) : idx;
}
