// Sentence embeddings with all-MiniLM-L6-v2 (int8 ONNX), mean pooling + L2 norm.
// `ort` is onnxruntime-web, passed in so the same code runs in a browser worker
// and in Node (scripts/build-store.mjs).
import { WordPieceTokenizer } from './tokenizer.js';

export const EMBED_MODEL = 'all-MiniLM-L6-v2 (int8 ONNX, 384-d, mean pooling)';
export const EMBED_DIM = 384;
export const MAX_TOKENS = 256;

export class Embedder {
  static async create(ort, modelBytes, vocabText) {
    const e = new Embedder();
    e.ort = ort;
    e.tok = new WordPieceTokenizer(vocabText);
    e.session = await ort.InferenceSession.create(modelBytes, { executionProviders: ['wasm'] });
    e.inputNames = e.session.inputNames;
    return e;
  }

  // texts: string[] -> Float32Array[] (unit length)
  async embedBatch(texts) {
    const encs = texts.map(t => this.tok.encode(t, MAX_TOKENS));
    const B = encs.length, L = Math.max(...encs.map(x => x.length));
    const ids = new BigInt64Array(B * L), mask = new BigInt64Array(B * L), types = new BigInt64Array(B * L);
    encs.forEach((enc, b) => enc.forEach((id, i) => { ids[b * L + i] = BigInt(id); mask[b * L + i] = 1n; }));
    const feeds = {};
    const T = this.ort.Tensor;
    if (this.inputNames.includes('input_ids')) feeds.input_ids = new T('int64', ids, [B, L]);
    if (this.inputNames.includes('attention_mask')) feeds.attention_mask = new T('int64', mask, [B, L]);
    if (this.inputNames.includes('token_type_ids')) feeds.token_type_ids = new T('int64', types, [B, L]);
    const out = await this.session.run(feeds);
    const h = out[this.session.outputNames[0]].data; // [B, L, D]
    const D = EMBED_DIM, res = [];
    for (let b = 0; b < B; b++) {
      const v = new Float32Array(D), n = encs[b].length;
      for (let i = 0; i < n; i++) { const o = (b * L + i) * D; for (let d = 0; d < D; d++) v[d] += h[o + d]; }
      let norm = 0;
      for (let d = 0; d < D; d++) { v[d] /= n; norm += v[d] * v[d]; }
      norm = Math.sqrt(norm) || 1;
      for (let d = 0; d < D; d++) v[d] /= norm;
      res.push(v);
    }
    return res;
  }
}
