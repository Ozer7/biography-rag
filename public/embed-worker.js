// Web worker: runs the embedding model off the main thread.
// Uses the GPU (WebGPU, fp16 model) when the browser supports it, otherwise the CPU
// (WebAssembly, int8 model, all cores). Both give the same embeddings (cosine > 0.999).
// Add ?cpu to the page URL to force the CPU path.
import { Embedder } from '/lib/embedder.js';

let emb = null, backend = null, threads = 1;

async function fetchBytes(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('Could not download ' + url);
  return new Uint8Array(await r.arrayBuffer());
}

async function tryWebGPU(vocab) {
  if (!self.navigator?.gpu) return null;
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter || !adapter.features.has('shader-f16')) return null;
  const ort = await import('/vendor/ort/ort.webgpu.min.mjs');
  ort.env.wasm.wasmPaths = '/vendor/ort/';
  ort.env.wasm.numThreads = 1;
  const e = await Embedder.create(ort, await fetchBytes('/models/minilm/model_fp16.onnx'), vocab, ['webgpu']);
  // Sanity check: a known sentence must give the published reference values.
  const [v] = await e.embedBatch(['This is an example sentence']);
  if (!(Math.abs(v[0] - 0.0677) < 0.003 && Math.abs(v[3] - 0.0793) < 0.003)) throw new Error('WebGPU output check failed');
  return e;
}

async function useCPU(vocab, helper) {
  const ort = await import('/vendor/ort/ort.wasm.min.mjs');
  ort.env.wasm.wasmPaths = '/vendor/ort/';
  // A helper worker running beside the GPU worker leaves one core free for it.
  threads = self.crossOriginIsolated ? Math.max(1, Math.min(8, (navigator.hardwareConcurrency || 2) - (helper ? 1 : 0))) : 1;
  ort.env.wasm.numThreads = threads;
  return Embedder.create(ort, await fetchBytes('/models/minilm/model_int8.onnx'), vocab, ['wasm']);
}

self.onmessage = async ({ data }) => {
  try {
    if (data.type === 'init') {
      const vocab = await (await fetch('/models/minilm/vocab.txt')).text();
      if (data.preferGPU !== false) {
        try { emb = await tryWebGPU(vocab); if (emb) backend = 'GPU (WebGPU)'; }
        catch (e) { emb = null; console.warn('WebGPU unavailable, using CPU:', e.message); }
      }
      if (!emb) { emb = await useCPU(vocab, data.helper); backend = `CPU (${threads} thread${threads > 1 ? 's' : ''})`; }
      self.postMessage({ type: 'ready', backend, batch: backend.startsWith('GPU') ? 64 : 16 });
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
