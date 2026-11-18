import { chunkDocuments, estimatePages, CHUNK_PARAMS } from '/lib/chunker.js';
import { serializeStore, loadStore, finishStore } from '/lib/storeformat.js';
import { fileToText, urlToText } from '/lib/extract.js';
import { idbGet, idbSet, idbDel } from '/lib/idb.js';
import { makeLlm } from '/lib/llm.js';
import { runAll } from '/lib/pipeline.js';
import { QUERIES, DEFAULT_CANARIES, fill } from '/lib/queries.js';
import { fullReport, storyMarkdown } from '/lib/report.js';
import { EMBED_MODEL } from '/lib/embedder.js';

const $ = s => document.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ls = { get: k => { try { return localStorage.getItem(k) || ''; } catch { return ''; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };

const FRANKLIN_FILES = [
  ['01-autobiography-franklin.txt', 'The Autobiography of Benjamin Franklin'],
  ['02-true-benjamin-franklin-fisher-1899.txt', 'Sydney George Fisher, The True Benjamin Franklin (1899)'],
  ['03-boyhood-to-manhood-thayer.txt', 'William M. Thayer, From Boyhood to Manhood (1889)'],
  ['04-benjamin-franklin-abbott-1876.txt', 'John S. C. Abbott, Benjamin Franklin (1876)'],
  ['05-life-of-franklin-goodrich.txt', 'Samuel G. Goodrich, The Life of Benjamin Franklin'],
  ['06-benjamin-franklin-more-1900.txt', 'Paul Elmer More, Benjamin Franklin (1900)'],
];

let store = null, pending = [], run = null;

// ---------- embedding worker ----------
let worker = null, workerReady = null, reqId = 0;
const waiting = new Map();
function getWorker() {
  if (!workerReady) {
    worker = new Worker('/embed-worker.js', { type: 'module' });
    workerReady = new Promise((ok, bad) => {
      worker.onmessage = ({ data }) => {
        if (data.type === 'ready') ok(data);
        else if (data.type === 'vecs') { waiting.get(data.id)?.ok(data.flat); waiting.delete(data.id); }
        else if (data.type === 'error') { if (waiting.has(data.id)) { waiting.get(data.id).bad(new Error(data.error)); waiting.delete(data.id); } else bad(new Error(data.error)); }
      };
      worker.onerror = e => bad(new Error(e.message || 'Embedding worker failed'));
    });
    worker.postMessage({ type: 'init' });
  }
  return workerReady;
}
async function embedFlat(texts) {
  await getWorker();
  const id = ++reqId;
  return new Promise((ok, bad) => { waiting.set(id, { ok, bad }); worker.postMessage({ type: 'embed', id, texts }); });
}
async function embedVecs(texts) {
  const flat = await embedFlat(texts);
  return texts.map((_, i) => flat.subarray(i * 384, (i + 1) * 384));
}

// ---------- corpus ----------
function renderBookList() {
  $('#bookList').innerHTML = FRANKLIN_FILES.map(([f, t]) => `<li><a href="/corpus/franklin/${f}" target="_blank">${esc(t)}</a></li>`).join('');
}
function renderDocs() {
  const tb = $('#docsTable tbody');
  $('#docsTable').hidden = !pending.length;
  tb.innerHTML = pending.map((d, i) => `<tr><td>D${i + 1}</td><td>${esc(d.name)}</td><td>${d.pages}</td><td>${d.text.length.toLocaleString()}</td><td><button class="btn link" data-rm="${i}">remove</button></td></tr>`).join('') +
    `<tr><td></td><td><b>Total</b></td><td><b>${pending.reduce((a, d) => a + d.pages, 0).toLocaleString()}</b></td><td>${pending.reduce((a, d) => a + d.text.length, 0).toLocaleString()}</td><td></td></tr>`;
  tb.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { pending.splice(+b.dataset.rm, 1); renderDocs(); });
  $('#build').disabled = !pending.length;
}
function addDoc(d) {
  if (!d.text || d.text.trim().length < 50) { alert(`${d.name}: no readable text found (scanned PDFs need OCR first).`); return; }
  pending.push({ name: d.name, text: d.text, pages: d.pdfPages || estimatePages(d.text) });
}
async function addFiles(files) {
  const prog = $('#buildProgress');
  for (const f of files) {
    prog.textContent = `Reading ${f.name}…`;
    try { addDoc(await fileToText(f)); } catch (e) { alert(`Could not read ${f.name}: ${e.message}`); }
  }
  prog.textContent = '';
  renderDocs();
}

function renderStoreStatus() {
  const el = $('#storeStatus');
  if (!store) { el.className = 'store-status'; el.innerHTML = 'No store loaded yet. Add pages and build one, or load the prebuilt Franklin store.'; }
  else {
    const pages = store.docs.reduce((a, d) => a + (d.pages || 0), 0);
    el.className = 'store-status ready';
    el.innerHTML = `Store ready: <b>${esc(store.person)}</b> · ${store.docs.length} documents · ~${pages.toLocaleString()} pages · <b>${store.chunks.length.toLocaleString()} chunks</b> embedded with ${esc(store.embedModel || EMBED_MODEL)} · built ${new Date(store.created).toLocaleString()}`;
    if (!$('#person').value) $('#person').value = store.person;
  }
  $('#exportStore').disabled = $('#clearStore').disabled = !store;
  $('#runBtn').disabled = !store;
  setDefaultCanaries();
}
function setDefaultCanaries() {
  const person = (store?.person || $('#person').value || '').trim();
  const ta = $('#canaries');
  if (ta.dataset.touched) return;
  const d = DEFAULT_CANARIES[person.toLowerCase()];
  ta.value = d ? d.join('\n') : '';
  ta.placeholder = d ? '' : `e.g. a true fact about ${person || 'this person'} that your pages never mention`;
}
function renderQuestions() {
  const p = (store?.person || $('#person').value || '').trim() || '{person}';
  $('#qlist').innerHTML = QUERIES.map(q => `<li>${esc(fill(q.ask, p))}</li>`).join('');
}

async function buildStore() {
  const person = $('#person').value.trim();
  if (!person) { alert('Type the person\'s name first.'); $('#person').focus(); return; }
  const btn = $('#build'), prog = $('#buildProgress');
  btn.disabled = true;
  try {
    const docs = pending.map((d, i) => ({ docNo: i + 1, name: d.name, text: d.text, chars: d.text.length, pages: d.pages }));
    prog.textContent = 'Chunking…';
    const chunks = chunkDocuments(docs);
    if (!chunks.length) throw new Error('No text chunks were produced.');
    prog.textContent = 'Loading the embedding model (23 MB, first time only)…';
    const info = await getWorker();
    const vectors = new Float32Array(chunks.length * 384), B = 16, t0 = performance.now();
    for (let i = 0; i < chunks.length; i += B) {
      const flat = await embedFlat(chunks.slice(i, i + B).map(c => c.text));
      vectors.set(flat, i * 384);
      const done = Math.min(chunks.length, i + B), el = (performance.now() - t0) / 1000, eta = el / done * (chunks.length - done);
      prog.innerHTML = `<span class="bar"><i style="width:${(100 * done / chunks.length).toFixed(1)}%"></i></span>Embedding ${done.toLocaleString()}/${chunks.length.toLocaleString()} chunks · ${info.threads} thread${info.threads > 1 ? 's' : ''} · ~${Math.ceil(eta)}s left`;
    }
    store = finishStore({ person, created: new Date().toISOString(), chunkParams: CHUNK_PARAMS, embedModel: EMBED_MODEL, docs: docs.map(({ text, ...d }) => d), chunks, vectors });
    prog.textContent = 'Saving the store in this browser…';
    await idbSet('store', serializeStore(store));
    prog.textContent = `Done in ${((performance.now() - t0) / 1000).toFixed(0)}s.`;
    renderStoreStatus(); renderQuestions();
  } catch (e) { prog.textContent = ''; alert('Build failed: ' + e.message); }
  btn.disabled = !pending.length;
}

async function setStoreFromJson(json, save = true) {
  store = loadStore(json);
  if (save) await idbSet('store', typeof json === 'string' ? json : JSON.stringify(json));
  $('#person').value = store.person;
  renderStoreStatus(); renderQuestions();
}

// ---------- run ----------
function stepList() {
  const canaries = $('#canaries').value.split('\n').map(s => s.trim()).filter(Boolean);
  const person = store.person;
  const steps = [...QUERIES.map(q => ({ key: `query-${q.n}`, label: `Q${q.n} ${q.topic}` })),
    ...canaries.map((c, i) => ({ key: `canary-${i + 1}`, label: `Canary ${i + 1}` })),
    { key: 'story', label: 'Write the story' }, { key: 'audit', label: 'Audit the story' }];
  $('#runSteps').innerHTML = steps.map(s => `<li id="st-${s.key}"><span class="st wait">○</span>${esc(s.label)}</li>`).join('');
  return canaries.map(c => c.replaceAll(person, '{person}'));
}
function setStep(key, cls, sym) { const li = document.getElementById('st-' + key); if (li) li.querySelector('.st').className = 'st ' + cls, li.querySelector('.st').textContent = sym; }

async function doRun() {
  if (!store) return;
  ls.set('pace', $('#pace').value); ls.set('userKey', $('#userKey').value); ls.set('accessCode', $('#accessCode').value);
  const canaries = stepList();
  const prog = $('#runProgress');
  $('#runBtn').disabled = true;
  const llm = makeLlm({ userKey: $('#userKey').value.trim(), accessCode: $('#accessCode').value.trim(), minIntervalMs: (+$('#pace').value || 0) * 1000, onStatus: s => prog.textContent = s });
  try {
    prog.textContent = 'Loading the embedding model…';
    await getWorker();
    run = await runAll({
      store, person: store.person, embed: embedVecs, llm, canaries,
      onEvent: ev => {
        if (ev.type === 'query-start') { setStep(`${ev.rec.kind}-${ev.rec.n}`, 'busy', '◐'); prog.textContent = `Asking: ${ev.rec.question}`; }
        if (ev.type === 'query-done') setStep(`${ev.rec.kind}-${ev.rec.n}`, ev.rec.status === 'answered' ? 'ok' : ev.rec.status === 'error' ? 'err' : 'nis', ev.rec.status === 'answered' ? '●' : ev.rec.status === 'error' ? '✕' : '–');
        if (ev.type === 'story-start') { setStep('story', 'busy', '◐'); prog.textContent = 'Writing the story…'; }
        if (ev.type === 'story-done') setStep('story', ev.story.error ? 'err' : 'ok', ev.story.error ? '✕' : '●');
        if (ev.type === 'audit-start') { setStep('audit', 'busy', '◐'); prog.textContent = 'Auditing the story against its snippets…'; }
        if (ev.type === 'audit-done') setStep('audit', ev.audit.error ? 'err' : 'ok', ev.audit.error ? '✕' : '●');
      },
    });
    await idbSet('lastRun', JSON.stringify(run));
    prog.textContent = `Finished. ${run.review.queries_answered}/20 answered from the sources.`;
    renderRun();
    location.hash = '#story';
  } catch (e) { prog.textContent = 'Run failed: ' + e.message; }
  $('#runBtn').disabled = false;
}

// ---------- rendering a run ----------
function chunkText(id) {
  if (run?.chunks?.[id]) return run.chunks[id];
  if (store?.byId?.has(id)) { const c = store.chunks[store.byId.get(id)]; return { text: c.text, docName: c.docName, page: c.page }; }
  return null;
}
function chips(ids, validIds) {
  if (!ids?.length) return ' <span class="cite bad">[no ID]</span>';
  return ' ' + ids.map(id => `<button class="cite${validIds && !validIds.includes(id) ? ' bad' : ''}" data-id="${esc(id)}">${esc(id)}</button>`).join('');
}
function sentenceHtml(v) {
  const why = v.flags?.length ? ` title="${esc(v.flags.map(f => f.type + ': ' + f.detail).join('\n'))}"` : '';
  return `<span class="sent ${v.level || ''}"${why}>${esc(v.text)}</span>${chips(v.chunk_ids, v.valid_ids)}`;
}
function openDrawer(id, sentence) {
  const c = chunkText(id);
  $('#drawerId').textContent = id;
  $('#drawerMeta').textContent = c ? `${c.docName || ''}${c.page ? ' · page ' + c.page : ''}` : '';
  let html = c ? esc(c.text) : '<em>This chunk ID does not exist in the store.</em>';
  if (c && sentence) {
    const words = [...new Set((sentence.match(/[A-Za-z][a-z']{4,}|\d{3,4}/g) || []).map(w => w.toLowerCase()))];
    for (const w of words) html = html.replace(new RegExp(`\\b(${w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\w*)`, 'gi'), '<mark>$1</mark>');
  }
  $('#drawerText').innerHTML = `<p>${html}</p>`;
  $('#drawer').classList.add('open'); $('#drawer').setAttribute('aria-hidden', 'false');
}
document.addEventListener('click', e => {
  const b = e.target.closest('.cite[data-id]');
  if (b) { const s = b.previousElementSibling?.closest?.('.sent') || [...b.parentElement.querySelectorAll('.sent')].pop(); openDrawer(b.dataset.id, s?.textContent); }
});

function renderRun() {
  if (!run) return;
  const s = run.story || {};
  const paras = (s.paragraphs || []).map(p => `<p>${p.sentences.map(sentenceHtml).join(' ')}</p>`).join('');
  $('#storyOut').innerHTML = `<h3>${esc(s.title || run.person)}</h3>${paras || `<p class="empty">${esc(s.error || s.note || 'No story was produced.')}</p>`}` +
    (s.skipped_topics?.length ? `<p class="skipped">Not in the sources, so left out: ${esc(s.skipped_topics.join(' · '))}</p>` : '');

  const r = run.review || {};
  const audit = run.audit?.verdicts || [];
  const ac = k => audit.filter(v => v.verdict === k).length;
  $('#reviewOut').innerHTML = `
    <div class="cards">
      <div class="card"><div class="big">${r.queries_answered}/20</div><div class="sub">questions answered from the sources</div></div>
      <div class="card"><div class="big">${r.story_sentences_traced}/${r.story_sentences}</div><div class="sub">story sentences trace to a chunk ID</div></div>
      <div class="card"><div class="big">${r.flag}</div><div class="sub">sentences flagged by the code checks (of ${r.sentences_total})</div></div>
      <div class="card"><div class="big">${audit.length ? `${ac('supported')}/${audit.length}` : '—'}</div><div class="sub">story sentences the audit pass found supported</div></div>
      <div class="card"><div class="big">${(r.canaries || []).filter(c => c.pass).length}/${(r.canaries || []).length}</div><div class="sub">canaries answered “not in the sources”</div></div>
    </div>
    <h4>Not in the sources</h4><p>${r.queries_not_in_sources?.length ? esc(r.queries_not_in_sources.map(q => { const x = run.queries.find(y => 'Q' + y.n === q); return `${q} ${x?.topic || ''}`; }).join(' · ')) : 'Every question found an answer in the sources.'}</p>
    <h4>Canary test</h4><ul>${(r.canaries || []).map(c => `<li><span class="${c.pass ? 'pass' : 'fail'}">${c.pass ? 'PASS' : 'FAIL'}</span> — ${esc(c.question)} → <b>${c.result === 'not_in_sources' ? 'not in the sources' : esc(c.result)}</b> <span class="hint">(${esc(c.note || '')})</span></li>`).join('') || '<li>No canary questions were run.</li>'}</ul>
    <h4>Flagged or warned sentences</h4>
    ${r.flagged?.length ? `<ul class="flaglist">${r.flagged.map(f => `<li><b>${esc(f.where)}</b> (${f.level}) ${esc(f.text)}<div class="why">${f.flags.map(esc).join('<br>')}</div></li>`).join('')}</ul>` : '<p>None — every sentence passed the code checks.</p>'}
    ${audit.some(v => v.verdict !== 'supported') ? `<h4>Audit: not fully supported</h4><ul class="flaglist">${audit.filter(v => v.verdict !== 'supported').map(v => `<li>(${v.verdict}) ${esc(v.text)}<div class="why">${esc(v.problem || '')}</div></li>`).join('')}</ul>` : ''}
    <p class="hint">Checks: every sentence must cite an ID that exists and was retrieved for that step; every number and capitalized name in it must appear in the cited chunk; low word overlap is a warning. The audit is a second LLM call that judges each story sentence against only its cited snippets.</p>`;

  $('#logsOut').innerHTML = [...run.queries, ...run.canaries].map(q => `
    <details class="qlog"><summary><span class="tag ${q.status}">${q.status === 'not_in_sources' ? 'not in sources' : q.status}</span><span>${q.kind === 'canary' ? 'Canary ' + q.n : 'Q' + q.n}. ${esc(q.question)}</span></summary>
    <div class="body">
      ${q.reason ? `<p><i>${esc(q.reason)}</i></p>` : ''}${q.error ? `<p class="fail">${esc(q.error)}</p>` : ''}
      ${q.verified?.length ? `<h4>Answer</h4><ul>${q.verified.map(v => `<li>${sentenceHtml(v)}${v.flags.length ? `<div class="hint">${v.flags.map(f => esc(f.type + ': ' + f.detail)).join('<br>')}</div>` : ''}</li>`).join('')}</ul>` : ''}
      <h4>Retrieved chunks</h4>
      <p class="hint">Search phrasings: ${q.search_phrasings.map(p => '“' + esc(p) + '”').join(' · ')}<br>Gate: best cosine ${q.gate.maxDense} (min ${q.gate.minDense}), best BM25 ${q.gate.maxBm25} (min ${q.gate.minBm25}) → ${q.gate.passed ? 'passed' : 'blocked'}</p>
      <table><tr><th>#</th><th>chunk</th><th>cosine</th><th>BM25</th><th>start of text</th></tr>
      ${q.retrieved.map(r => `<tr><td>${r.rank}</td><td class="id"><button class="cite" data-id="${esc(r.id)}">${esc(r.id)}</button></td><td>${r.dense}</td><td>${r.bm25}</td><td>${esc((chunkText(r.id)?.text || '').slice(0, 110))}…</td></tr>`).join('')}</table>
      ${q.prompt ? `<h4>Prompt sent${q.model ? ' to ' + esc(q.model) : ''}</h4><pre>SYSTEM:\n${esc(q.prompt.system)}\n\nUSER:\n${esc(q.prompt.user)}</pre><h4>Raw response</h4><pre>${esc(q.raw_response)}</pre>` : '<p class="hint">No prompt was sent for this query.</p>'}
    </div></details>`).join('') +
    (run.story?.prompt ? `<details class="qlog"><summary><span class="tag answered">story</span><span>Story prompt and response</span></summary><div class="body"><pre>SYSTEM:\n${esc(run.story.prompt.system)}\n\nUSER:\n${esc(run.story.prompt.user)}</pre><h4>Raw response</h4><pre>${esc(run.story.raw_response)}</pre></div></details>` : '') +
    (run.audit?.prompt ? `<details class="qlog"><summary><span class="tag answered">audit</span><span>Audit prompt and response</span></summary><div class="body"><pre>SYSTEM:\n${esc(run.audit.prompt.system)}\n\nUSER:\n${esc(run.audit.prompt.user)}</pre><h4>Raw response</h4><pre>${esc(run.audit.raw_response)}</pre></div></details>` : '');
  $('#dlJson').disabled = $('#dlMd').disabled = $('#dlStory').disabled = false;
}

function download(name, text, type = 'application/json') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
const slug = () => (run?.person || 'person').toLowerCase().replace(/[^a-z0-9]+/g, '-');
function storeForReport() { return { chunks: Object.entries(run.chunks || {}).map(([id, c]) => ({ id, ...c })), get byId() { return new Map(this.chunks.map((c, i) => [c.id, i])); } }; }

// ---------- wire up ----------
renderBookList();
$('#person').addEventListener('input', () => { renderQuestions(); setDefaultCanaries(); });
$('#canaries').addEventListener('input', e => e.target.dataset.touched = '1');
$('#files').addEventListener('change', e => addFiles([...e.target.files]));
const drop = $('#drop');
['dragenter', 'dragover'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add('over'); }));
['dragleave', 'drop'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.remove('over'); }));
drop.addEventListener('drop', e => addFiles([...e.dataTransfer.files]));
$('#addUrls').onclick = async () => {
  const urls = $('#urls').value.split('\n').map(s => s.trim()).filter(Boolean);
  for (const u of urls) { $('#buildProgress').textContent = `Fetching ${u}…`; try { addDoc(await urlToText(u)); } catch (e) { alert(e.message); } }
  $('#buildProgress').textContent = ''; $('#urls').value = ''; renderDocs();
};
$('#useFranklin').onclick = async () => {
  $('#person').value = 'Benjamin Franklin'; renderQuestions(); setDefaultCanaries();
  for (const [f] of FRANKLIN_FILES) {
    if (pending.some(d => d.name === f)) continue;
    $('#buildProgress').textContent = `Loading ${f}…`;
    const text = await (await fetch('/corpus/franklin/' + f)).text();
    addDoc({ name: f, text });
  }
  $('#buildProgress').textContent = 'Ready: press “Chunk, embed & store”.'; renderDocs();
};
$('#loadPrebuilt').onclick = async () => {
  $('#buildProgress').textContent = 'Loading the prebuilt Franklin store…';
  try { await setStoreFromJson(await (await fetch('/demo/franklin.store.json')).text()); $('#buildProgress').textContent = 'Prebuilt store loaded (built with the same chunker and model by scripts/build-store.mjs).'; }
  catch (e) { $('#buildProgress').textContent = 'Could not load: ' + e.message; }
};
$('#build').onclick = buildStore;
$('#exportStore').onclick = () => download(`${(store.person || 'store').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.store.json`, serializeStore(store));
$('#importStore').addEventListener('change', async e => { const f = e.target.files[0]; if (f) try { await setStoreFromJson(await f.text()); } catch (er) { alert(er.message); } });
$('#clearStore').onclick = async () => { await idbDel('store'); store = null; renderStoreStatus(); };
$('#runBtn').onclick = doRun;
$('#dlJson').onclick = () => download(`${slug()}-run-log.json`, JSON.stringify(run, null, 1));
$('#dlMd').onclick = () => download(`${slug()}-report.md`, fullReport(run, storeForReport()), 'text/markdown');
$('#dlStory').onclick = () => download(`${slug()}-story.md`, storyMarkdown(run), 'text/markdown');
$('#openRun').addEventListener('change', async e => { const f = e.target.files[0]; if (f) { try { run = JSON.parse(await f.text()); renderRun(); location.hash = '#story'; } catch (er) { alert('Not a run log: ' + er.message); } } });
$('#loadSample').onclick = async () => {
  try { const r = await fetch('/runs/franklin-run.json'); if (!r.ok) throw new Error('No sample run has been published yet.'); run = await r.json(); renderRun(); }
  catch (e) { alert(e.message); }
};
$('#drawerClose').onclick = () => { $('#drawer').classList.remove('open'); $('#drawer').setAttribute('aria-hidden', 'true'); };
document.addEventListener('keydown', e => { if (e.key === 'Escape') $('#drawerClose').click(); });
$('#pace').value = ls.get('pace') || '4'; $('#userKey').value = ls.get('userKey'); $('#accessCode').value = ls.get('accessCode');

(async () => {
  const saved = await idbGet('store');
  if (saved) { try { await setStoreFromJson(saved, false); } catch {} }
  renderStoreStatus(); renderQuestions();
  const last = await idbGet('lastRun');
  if (last) { try { run = JSON.parse(last); renderRun(); } catch {} }
})();
