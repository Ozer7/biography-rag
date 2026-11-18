// Builds the prebuilt Franklin store (public/demo/franklin.store.json) with exactly the same
// chunker, tokenizer and model the browser uses.  Usage: node scripts/build-store.mjs
import fs from 'node:fs';
import * as ort from 'onnxruntime-web';
import { Embedder } from '../public/lib/embedder.js';
import { chunkDocuments, estimatePages, CHUNK_PARAMS } from '../public/lib/chunker.js';
import { serializeStore } from '../public/lib/storeformat.js';

const root = new URL('../', import.meta.url);
ort.env.wasm.numThreads = 1;
const dir = new URL('public/corpus/franklin/', root);
const files = fs.readdirSync(dir).filter(f => f.endsWith('.txt')).sort();
const docs = files.map((f, i) => {
  const text = fs.readFileSync(new URL(f, dir), 'utf8');
  return { docNo: i + 1, name: f, text, chars: text.length, pages: estimatePages(text) };
});
const chunks = chunkDocuments(docs);
console.log(`${docs.length} docs, ~${docs.reduce((a, d) => a + d.pages, 0)} pages, ${chunks.length} chunks`);

const emb = await Embedder.create(ort,
  fs.readFileSync(new URL('public/models/minilm/model_int8.onnx', root)),
  fs.readFileSync(new URL('public/models/minilm/vocab.txt', root), 'utf8'));
const vectors = new Float32Array(chunks.length * 384);
const t0 = Date.now(), B = 16;
for (let i = 0; i < chunks.length; i += B) {
  const vs = await emb.embedBatch(chunks.slice(i, i + B).map(c => c.text));
  vs.forEach((v, j) => vectors.set(v, (i + j) * 384));
  if ((i / B) % 25 === 0) console.log(`${i}/${chunks.length}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
console.log(`embedded in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
const store = {
  person: 'Benjamin Franklin', created: new Date().toISOString(), chunkParams: CHUNK_PARAMS,
  docs: docs.map(({ text, ...d }) => d), chunks, vectors,
};
fs.mkdirSync(new URL('public/demo/', root), { recursive: true });
fs.writeFileSync(new URL('public/demo/franklin.store.json', root), serializeStore(store));
console.log('wrote public/demo/franklin.store.json', (fs.statSync(new URL('public/demo/franklin.store.json', root)).size / 1e6).toFixed(1), 'MB');
