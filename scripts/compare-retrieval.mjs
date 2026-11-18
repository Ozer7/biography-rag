// Compare retrieval variants on the Franklin store (dev tool).
import fs from 'node:fs';
import * as ort from 'onnxruntime-web';
import { Embedder } from '../public/lib/embedder.js';
import { loadStore } from '../public/lib/storeformat.js';
import { retrieve, RETRIEVAL_PARAMS, setHubness } from '../public/lib/retrieve.js';
import { QUERIES, fill } from '../public/lib/queries.js';
ort.env.wasm.numThreads = 1;
const root = new URL('../', import.meta.url);
const store = loadStore(fs.readFileSync(new URL('public/demo/franklin.store.json', root), 'utf8'));
const emb = await Embedder.create(ort, fs.readFileSync(new URL('public/models/minilm/model_int8.onnx', root)), fs.readFileSync(new URL('public/models/minilm/vocab.txt', root), 'utf8'));
const which = (process.argv[2] || '8,10,11,12,13,20').split(',').map(Number);
const freq = new Map();
const cache = new Map();
for (const q of QUERIES) cache.set(q.n, await emb.embedBatch([fill(q.ask, store.person), ...q.search.map(s => fill(s, store.person))]));
if (!process.argv.includes('--nohub')) console.log('hubness', JSON.stringify(setHubness(store, [...cache.values()].flat())));
for (const q of QUERIES) {
  const ph = [fill(q.ask, store.person), ...q.search.map(s => fill(s, store.person))];
  const { results } = retrieve(store, cache.get(q.n), ph, RETRIEVAL_PARAMS);
  results.forEach(r => freq.set(r.id, (freq.get(r.id) || 0) + 1));
  if (!which.includes(q.n)) continue;
  console.log(`\nQ${q.n} ${q.ask}`);
  results.forEach(r => console.log(`  ${r.id} d=${r.dense} b=${r.bm25} ${store.chunks[r.i].text.slice(0, 130).replace(/\s+/g, ' ')}`));
}
const hubs = [...freq].filter(([, n]) => n >= 3).sort((a, b) => b[1] - a[1]);
console.log('\nchunks retrieved for 3+ different queries:', hubs.map(([id, n]) => `${id}x${n}`).join(' '));
