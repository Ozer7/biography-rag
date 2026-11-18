// Web worker: runs the embedding model off the main thread.
import * as ort from '/vendor/ort/ort.wasm.min.mjs';
import { Embedder } from '/lib/embedder.js';

ort.env.wasm.wasmPaths = '/vendor/ort/';
ort.env.wasm.numThreads = self.crossOriginIsolated ? Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 2) - 1)) : 1;

let emb = null;
self.onmessage = async ({ data }) => {
  try {
    if (data.type === 'init') {
      const [m, v] = await Promise.all([fetch('/models/minilm/model_int8.onnx'), fetch('/models/minilm/vocab.txt')]);
      if (!m.ok || !v.ok) throw new Error('Could not download the embedding model');
      emb = await Embedder.create(ort, new Uint8Array(await m.arrayBuffer()), await v.text());
      self.postMessage({ type: 'ready', threads: ort.env.wasm.numThreads });
    } else if (data.type === 'embed') {
      const vecs = await emb.embedBatch(data.texts);
      const flat = new Float32Array(vecs.length * 384);
      vecs.forEach((v, i) => flat.set(v, i * 384));
      self.postMessage({ type: 'vecs', id: data.id, flat }, [flat.buffer]);
    }
  } catch (e) {
    self.postMessage({ type: 'error', id: data.id, error: String(e.message || e) });
  }
};
