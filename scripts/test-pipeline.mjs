// End-to-end test without an API key: real store, real retrieval, real verifier, fake LLM.
//   node scripts/test-pipeline.mjs            -> honest fake LLM (copies snippet sentences)
//   node scripts/test-pipeline.mjs --cheat    -> fake LLM that slips in outside facts; verifier must flag them
//   node scripts/test-pipeline.mjs --show     -> also print the top snippets per query
import fs from 'node:fs';
import * as ort from 'onnxruntime-web';
import { Embedder } from '../public/lib/embedder.js';
import { loadStore } from '../public/lib/storeformat.js';
import { runAll } from '../public/lib/pipeline.js';
import { DEFAULT_CANARIES } from '../public/lib/queries.js';
import { splitSentences } from '../public/lib/chunker.js';

const root = new URL('../', import.meta.url);
const cheat = process.argv.includes('--cheat'), show = process.argv.includes('--show');
ort.env.wasm.numThreads = 1;
const store = loadStore(fs.readFileSync(new URL('public/demo/franklin.store.json', root), 'utf8'));
const emb = await Embedder.create(ort, fs.readFileSync(new URL('public/models/minilm/model_int8.onnx', root)),
  fs.readFileSync(new URL('public/models/minilm/vocab.txt', root), 'utf8'));
const person = store.person;

const fakeLlm = async ({ label, prompt }) => {
  const ids = [...prompt.matchAll(/^\[(D\d+-C\d+)\]/gm)].map(m => m[1]);
  if (label === 'story') {
    const notes = [...prompt.matchAll(/^- (.+) \[([^\]]+)\]$/gm)].slice(0, 12);
    const sentences = notes.map(m => ({ text: m[1], chunk_ids: m[2].split(', ') }));
    if (cheat) sentences.push({ text: 'Franklin later invented bifocal spectacles in 1784.', chunk_ids: [sentences[0].chunk_ids[0]] },
      { text: 'He also appears on the hundred-dollar bill.', chunk_ids: [] });
    return { text: JSON.stringify({ title: 'Test story', paragraphs: [{ sentences }] }), model: 'fake' };
  }
  if (label === 'audit') return { text: JSON.stringify({ verdicts: [] }), model: 'fake' };
  if (label.startsWith('canary')) return { text: JSON.stringify(cheat ? { status: 'answered', sentences: [{ text: 'Yes, Franklin invented bifocals around 1784.', chunk_ids: [ids[0]] }] } : { status: 'not_in_sources', sentences: [] }), model: 'fake' };
  const first = prompt.split(/^\[D\d+-C\d+\].*$/m)[1] || '';
  const sent = splitSentences(first.trim())[0]?.trim() || first.slice(0, 200);
  const sentences = [{ text: sent, chunk_ids: [ids[0]] }];
  if (cheat && label === 'query 1') sentences.push({ text: 'He was born on January 17, 1706, on Milk Street.', chunk_ids: [ids[1]] });
  if (cheat && label === 'query 2') sentences.push({ text: 'His father Josiah was a candle maker.', chunk_ids: ['D9-C9999'] });
  return { text: JSON.stringify({ status: 'answered', sentences }), model: 'fake' };
};

const t0 = Date.now();
const run = await runAll({ store, person, embed: t => emb.embedBatch(t), llm: fakeLlm, canaries: DEFAULT_CANARIES['benjamin franklin'].map(c => c), audit: true });
console.log(`ran in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
for (const q of [...run.queries, ...run.canaries]) {
  console.log(`\n${q.kind === 'canary' ? 'CANARY' : 'Q' + q.n} ${q.question}\n  gate dense=${q.gate.maxDense} bm25=${q.gate.maxBm25} passed=${q.gate.passed}  status=${q.status}`);
  console.log('  ids:', q.retrieved.map(r => `${r.id}(${r.dense})`).join(' '));
  if (show) q.retrieved.slice(0, 4).forEach(r => console.log('   -', r.id, store.chunks[store.byId.get(r.id)].text.slice(0, 160).replace(/\s+/g, ' ')));
}
const rv = run.review;
console.log('\nREVIEW', JSON.stringify({ ...rv, flagged: rv.flagged.slice(0, 10) }, null, 1));
fs.mkdirSync(new URL('runs/', root), { recursive: true });
fs.writeFileSync(new URL(`runs/test-${cheat ? 'cheat' : 'honest'}.json`, root), JSON.stringify(run, null, 1));
