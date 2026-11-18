// Rough retrieval check for the Franklin corpus: share of retrieved chunks that contain
// a keyword a relevant passage would very likely contain. Dev tool for tuning only.
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
const KW = {1:/born|birth|1706/i,2:/josiah|abiah|folger|tallow|candle|ecton|emigrat/i,3:/boy|child|young|youth/i,4:/brother|sister|james|jane|john franklin/i,
5:/school|grammar|latin|arithmetic|educat|taught/i,6:/tallow|candle|cutler|apprentic|printing.house|brother james/i,7:/voyage|boat|sloop|new york|ran away|run away|amboy|journey/i,
8:/danger|storm|drown|peril|wreck|alarm|narrow|escape/i,9:/laugh|joke|jest|humou?r|witty|wit\b|amus/i,10:/mistake|erratum|errata|error|regret|folly|blunder/i,
11:/death|died|grief|sorrow|loss|small.?pox|affliction|gout|stone/i,12:/deborah|wife|married|marriage|miss read/i,13:/william|sarah|francis|son|daughter|children/i,
14:/collins|ralph|junto|friend|mentor|denham|keimer|strahan|whitefield/i,15:/enem|rival|oppon|penn|adams|lee\b|quarrel|hostil|abuse/i,16:/famous|fame|renown|electric|lightning|celebrat|known/i,
17:/invent|stove|lightning|rod|electric|discover|experiment|kite/i,18:/london|paris|philadelphia|boston|england|france|voyage|lived/i,19:/habit|hobby|swim|fond|custom|routine|virtue|chess/i,
20:/died|death|funeral|grave|epitaph|buried|1790|memory|remember/i};
const cache = new Map();
for (const q of QUERIES) cache.set(q.n, await emb.embedBatch([fill(q.ask, store.person), ...q.search.map(s => fill(s, store.person))]));
for (const alpha of [0, 0.25, 0.5, 0.75, 1]) for (const nav of [1, 0.5]) {
  setHubness(store, [...cache.values()].flat());
  const p = { ...RETRIEVAL_PARAMS, hubAlpha: alpha, navPenalty: nav };
  let tot = 0; const per = []; const freq = new Map();
  for (const q of QUERIES) {
    const ph = [fill(q.ask, store.person), ...q.search.map(s => fill(s, store.person))];
    const { results } = retrieve(store, cache.get(q.n), ph, p);
    const hit = results.filter(r => KW[q.n].test(store.chunks[r.i].text)).length / results.length;
    results.forEach(r => freq.set(r.id, (freq.get(r.id) || 0) + 1));
    tot += hit; per.push(Math.round(hit * 8));
  }
  const hubs = [...freq.values()].filter(n => n >= 3).length;
  console.log(`alpha=${alpha} nav=${nav}  precision=${(tot / 20).toFixed(3)}  chunks in 3+ queries=${hubs}  per-query hits/8: ${per.join(' ')}`);
}
