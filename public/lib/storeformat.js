// Serialize / load a vector store as JSON (vectors int8-quantized per row, base64).
import { EMBED_DIM, EMBED_MODEL } from './embedder.js';
import { CHUNK_PARAMS } from './chunker.js';
import { BM25 } from './bm25.js';

function toB64(u8) {
  let s = ''; const CH = 0x8000;
  for (let i = 0; i < u8.length; i += CH) s += String.fromCharCode.apply(null, u8.subarray(i, i + CH));
  return btoa(s);
}
function fromB64(b64) {
  const s = atob(b64), u8 = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u8[i] = s.charCodeAt(i);
  return u8;
}

export function serializeStore(store) {
  const N = store.chunks.length, D = EMBED_DIM;
  const q = new Int8Array(N * D), scales = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    let m = 0; for (let d = 0; d < D; d++) m = Math.max(m, Math.abs(store.vectors[i * D + d]));
    const sc = m / 127 || 1; scales[i] = sc;
    for (let d = 0; d < D; d++) q[i * D + d] = Math.round(store.vectors[i * D + d] / sc);
  }
  return JSON.stringify({
    format: 'biorag-store-v1', person: store.person, created: store.created,
    embedModel: EMBED_MODEL, dim: D, chunkParams: store.chunkParams || CHUNK_PARAMS,
    docs: store.docs, chunks: store.chunks.map(c => ({ id: c.id, doc: c.doc, page: c.page ?? null, text: c.text })),
    vectors: { dtype: 'int8-rowscaled', data: toB64(new Uint8Array(q.buffer)), scales: toB64(new Uint8Array(scales.buffer)) },
  });
}

export function loadStore(json) {
  const o = typeof json === 'string' ? JSON.parse(json) : json;
  if (o.format !== 'biorag-store-v1') throw new Error('Not a biography-rag store file');
  const N = o.chunks.length, D = o.dim;
  const q = new Int8Array(fromB64(o.vectors.data).buffer), sc = new Float32Array(fromB64(o.vectors.scales).buffer);
  const vectors = new Float32Array(N * D);
  for (let i = 0; i < N; i++) {
    let norm = 0;
    for (let d = 0; d < D; d++) { const v = q[i * D + d] * sc[i]; vectors[i * D + d] = v; norm += v * v; }
    norm = Math.sqrt(norm) || 1;
    for (let d = 0; d < D; d++) vectors[i * D + d] /= norm;
  }
  const docNames = new Map(o.docs.map(d => [d.docNo, d.name]));
  const chunks = o.chunks.map(c => ({ ...c, docName: docNames.get(c.doc) }));
  return finishStore({ person: o.person, created: o.created, docs: o.docs, chunks, vectors, chunkParams: o.chunkParams, embedModel: o.embedModel });
}

// Table-of-contents, index and footnote-list chunks mention many topics at once and crowd
// out real passages, so retrieval gives them a lower weight.
export function isNavChunk(text) {
  const letters = text.replace(/[^A-Za-z]/g, '').length || 1;
  const upper = text.replace(/[^A-Z]/g, '').length / letters;
  const dashes = (text.match(/--|—/g) || []).length;
  const digits = text.replace(/[^0-9]/g, '').length / text.length;
  const sentences = (text.match(/[a-z][.!?]["”']?\s/g) || []).length;
  const questions = (text.match(/\?/g) || []).length;
  return upper > 0.2 || digits > 0.06 || questions >= 4 || (dashes >= 6 && sentences < 4) || /^\s*(FOOTNOTES|INDEX|CONTENTS)\b/.test(text);
}

export function finishStore(store) {
  const N = store.chunks.length, D = EMBED_DIM;
  store.byId = new Map(store.chunks.map((c, i) => [c.id, i]));
  store.bm25 = new BM25(store.chunks.map(c => c.text));
  store.nav = Uint8Array.from(store.chunks, c => isNavChunk(c.text) ? 1 : 0);
  // Mean-centering: in a corpus about one person every chunk shares a big "biography of X"
  // direction. Subtracting the corpus mean makes the cosine compare what is specific to each chunk.
  const mean = new Float32Array(D);
  for (let i = 0; i < N; i++) for (let d = 0; d < D; d++) mean[d] += store.vectors[i * D + d] / N;
  const cvec = new Float32Array(N * D);
  for (let i = 0; i < N; i++) {
    let n = 0;
    for (let d = 0; d < D; d++) { const v = store.vectors[i * D + d] - mean[d]; cvec[i * D + d] = v; n += v * v; }
    n = Math.sqrt(n) || 1;
    for (let d = 0; d < D; d++) cvec[i * D + d] /= n;
  }
  store.mean = mean; store.cvec = cvec;
  return store;
}
