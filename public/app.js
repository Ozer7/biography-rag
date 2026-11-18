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

// ---------- embedding workers ----------
// The main worker uses the GPU if it can, otherwise the CPU. When it got the GPU, a second
// CPU worker is started for big builds, and the two split the batches between them.
let reqId = 0;
class EmbedWorker {
  constructor(preferGPU, helper = false) {
    this.w = new Worker('/embed-worker.js', { type: 'module' });
    this.waiting = new Map();
    this.ready = new Promise((ok, bad) => {
      this.w.onmessage = ({ data }) => {
        if (data.type === 'ready') { this.info = data; ok(data); }
        else if (data.type === 'vecs') { this.waiting.get(data.id)?.ok(data.flat); this.waiting.delete(data.id); }
        else if (data.type === 'error') { if (this.waiting.has(data.id)) { this.waiting.get(data.id).bad(new Error(data.error)); this.waiting.delete(data.id); } else bad(new Error(data.error)); }
      };
      this.w.onerror = e => bad(new Error(e.message || 'Embedding worker failed'));
    });
    this.w.postMessage({ type: 'init', preferGPU, helper });
  }
  async embed(texts) {
    await this.ready;
    const id = ++reqId;
    return new Promise((ok, bad) => { this.waiting.set(id, { ok, bad }); this.w.postMessage({ type: 'embed', id, texts }); });
  }
}
let mainWorker = null, helperWorker = null;
function getWorker() {
  if (!mainWorker) mainWorker = new EmbedWorker(!/[?&]cpu\b/.test(location.search));
  return mainWorker.ready;
}
async function getPool() {
  await getWorker();
  if (mainWorker.info.backend.startsWith('GPU') && !helperWorker && !/[?&]single\b/.test(location.search)) {
    helperWorker = new EmbedWorker(false, true);
    try { await helperWorker.ready; } catch { helperWorker = null; }
  }
  return helperWorker ? [mainWorker, helperWorker] : [mainWorker];
}
async function embedFlat(texts) {
  await getWorker();
  return mainWorker.embed(texts);
}
async function embedVecs(texts) {
  const flat = await embedFlat(texts);
  return texts.map((_, i) => flat.subarray(i * 384, (i + 1) * 384));
}

// ---------- small helpers ----------
const plural = (n, one, many = one + 's') => `${n.toLocaleString()} ${n === 1 ? one : many}`;
const fmtDate = iso => { try { return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }); } catch { return iso; } };
function setProgress(el, done, total, text) {
  el.innerHTML = `<span class="bar-track" aria-hidden="true"><i style="width:${(100 * done / Math.max(1, total)).toFixed(1)}%"></i></span><span>${esc(text)}</span>`;
}
function notify(el, text) { el.textContent = text; }

// ---------- progress rail ----------
function updateRail(state = {}) {
  const set = (n, st, label) => { $(`#rail-${n}`).dataset.state = st; $(`#rail-${n}-s`).textContent = label; };
  if (store) set(1, 'done', `${store.person}, ${plural(store.chunks.length, 'chunk')}`);
  else set(1, 'active', pending.length ? `${plural(pending.length, 'document')} ready to build` : 'Add pages');
  if (state.running) set(2, 'busy', 'Asking…');
  else if (run && !run.sample && store && run.person === store.person) set(2, 'done', `${run.review?.queries_answered ?? '?'} of 20 answered`);
  else set(2, store ? 'active' : 'todo', store ? 'Ready to ask' : 'Waiting for pages');
  if (run?.story?.paragraphs?.length) set(3, run.sample ? 'active' : 'done', run.sample ? 'Showing the example run' : (() => { const t = run.review?.story_sentences ?? 0, k = run.review?.story_sentences_traced ?? 0; return t && k === t ? `${plural(t, 'sentence')}, all with sources` : `${k} of ${plural(t, 'sentence')} with sources`; })());
  else set(3, 'todo', 'Not written yet');
}

// ---------- corpus ----------
function renderBookList() {
  $('#bookList').innerHTML = FRANKLIN_FILES.map(([f, t]) => `<li><a href="/corpus/franklin/${f}" target="_blank" rel="noopener">${esc(t)}</a></li>`).join('');
}
function renderDocs() {
  const tb = $('#docsTable tbody');
  $('#docsTable').hidden = !pending.length;
  const pages = pending.reduce((a, d) => a + d.pages, 0), chars = pending.reduce((a, d) => a + d.text.length, 0);
  tb.innerHTML = pending.map((d, i) => `<tr><td>D${i + 1}</td><td>${esc(d.name)}</td><td class="num">${d.pages.toLocaleString()}</td><td class="num">${d.text.length.toLocaleString()}</td><td><button class="linkbtn" type="button" data-rm="${i}" aria-label="Remove ${esc(d.name)}">Remove</button></td></tr>`).join('') +
    `<tr class="total"><td></td><td>Total</td><td class="num">${pages.toLocaleString()}</td><td class="num">${chars.toLocaleString()}</td><td></td></tr>`;
  tb.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { pending.splice(+b.dataset.rm, 1); renderDocs(); });
  $('#build').disabled = !pending.length;
  updateRail();
}
function addDoc(d) {
  if (!d.text || d.text.trim().length < 50) { notify($('#buildProgress'), `${d.name} has no readable text. Scanned PDFs need text recognition (OCR) first.`); return; }
  pending.push({ name: d.name, text: d.text, pages: d.pdfPages || estimatePages(d.text) });
}
async function addFiles(files) {
  const prog = $('#buildProgress');
  for (const f of files) {
    notify(prog, `Reading ${f.name}…`);
    try { addDoc(await fileToText(f)); } catch (e) { notify(prog, `Couldn’t read ${f.name}: ${e.message}`); return renderDocs(); }
  }
  notify(prog, pending.length ? 'Ready to build.' : '');
  renderDocs();
}

function renderStoreStatus() {
  const el = $('#storeStatus');
  if (!store) {
    el.innerHTML = 'No pages yet.';
    $('#pagesBody').open = true;
  } else {
    const pages = store.docs.reduce((a, d) => a + (d.pages || 0), 0);
    el.innerHTML = `<b>${esc(store.person)}</b>: ${plural(store.docs.length, 'document')}, about ${pages.toLocaleString()} pages, ${plural(store.chunks.length, 'chunk')}. <span class="ok">Ready.</span>`;
    el.title = `Built ${fmtDate(store.created)} with ${store.embedModel || EMBED_MODEL}`;
    if (!$('#person').value) $('#person').value = store.person;
  }
  $('#exportStore').disabled = $('#clearStore').disabled = !store;
  $('#runBtn').disabled = !store;
  $('#runNote').textContent = store ? `Twenty questions about ${store.person}, plus canary questions that should come back “not in the sources.”` : 'Build a store first.';
  setDefaultCanaries();
  updateRail();
}
function collapsePages() { if (store) $('#pagesBody').open = false; }
function setDefaultCanaries() {
  const person = (store?.person || $('#person').value || '').trim();
  const ta = $('#canaries');
  if (ta.dataset.touched) return;
  const d = DEFAULT_CANARIES[person.toLowerCase()];
  ta.value = d ? d.map(c => fill(c, person)).join('\n') : '';
  ta.placeholder = d ? '' : `For example, a true fact about ${person || 'this person'} that your pages never mention`;
}
function renderQuestions() {
  const p = (store?.person || $('#person').value || '').trim() || 'this person';
  $('#qlist').innerHTML = QUERIES.map(q => `<li>${esc(fill(q.ask, p))}</li>`).join('');
}

async function buildStore() {
  const person = $('#person').value.trim();
  const btn = $('#build'), prog = $('#buildProgress');
  if (!person) { notify(prog, 'Type whose life this is first.'); $('#person').focus(); return; }
  btn.disabled = true;
  try {
    const docs = pending.map((d, i) => ({ docNo: i + 1, name: d.name, text: d.text, chars: d.text.length, pages: d.pages }));
    notify(prog, 'Splitting into chunks…');
    const chunks = chunkDocuments(docs);
    if (!chunks.length) throw new Error('No text chunks were produced.');
    notify(prog, 'Loading the embedding model (first time only)…');
    const pool = await getPool();
    const backend = pool.map(w => w.info.backend).join(' and ');
    const vectors = new Float32Array(chunks.length * 384), t0 = performance.now();
    // Embed in order of length so each batch has similar-length texts (less padding = faster).
    const order = chunks.map((c, i) => i).sort((a, b) => chunks[a].text.length - chunks[b].text.length);
    let next = 0, done = 0;
    const show = () => {
      const el = (performance.now() - t0) / 1000, eta = Math.ceil(el / Math.max(1, done) * (chunks.length - done));
      setProgress(prog, done, chunks.length, `Embedding ${done.toLocaleString()} of ${chunks.length.toLocaleString()} chunks on the ${backend}, about ${eta < 60 ? eta + ' s' : Math.ceil(eta / 60) + ' min'} left`);
    };
    // Each worker pulls the next batch until none are left.
    await Promise.all(pool.map(async w => {
      const B = w.info.batch || 16;
      while (next < order.length) {
        const idx = order.slice(next, next + B); next += B;
        const flat = await w.embed(idx.map(j => chunks[j].text));
        idx.forEach((j, k) => vectors.set(flat.subarray(k * 384, (k + 1) * 384), j * 384));
        done += idx.length; show();
      }
    }));
    store = finishStore({ person, created: new Date().toISOString(), chunkParams: CHUNK_PARAMS, embedModel: EMBED_MODEL, docs: docs.map(({ text, ...d }) => d), chunks, vectors });
    notify(prog, 'Saving the store in this browser…');
    await idbSet('store', serializeStore(store));
    notify(prog, `Built: ${plural(chunks.length, 'chunk')} in ${((performance.now() - t0) / 1000).toFixed(0)} s on the ${backend}.`);
    pending = []; renderDocs();
    renderStoreStatus(); renderQuestions(); collapsePages();
    $('#step-run').scrollIntoView({ block: 'start' });
  } catch (e) { notify(prog, 'The build stopped: ' + e.message); }
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
  const steps = [...QUERIES.map(q => ({ key: `query-${q.n}`, label: `${q.n}. ${q.topic}` })),
    ...canaries.map((c, i) => ({ key: `canary-${i + 1}`, label: `Canary ${i + 1}` })),
    { key: 'story', label: 'Writing the story' }, { key: 'audit', label: 'Checking the story' }];
  $('#runSteps').innerHTML = steps.map(s => `<div class="cell" id="st-${s.key}" data-s="wait"><span class="dot" aria-hidden="true"></span><span>${esc(s.label)}</span></div>`).join('');
  return { canaries: canaries.map(c => c.replaceAll(person, '{person}')), total: steps.length };
}
function setStep(key, st) { const c = document.getElementById('st-' + key); if (c) c.dataset.s = st; }

async function doRun() {
  if (!store) return;
  ls.set('pace', $('#pace').value); ls.set('userKey', $('#userKey').value); ls.set('accessCode', $('#accessCode').value);
  const { canaries, total } = stepList();
  const prog = $('#runProgress');
  let done = 0;
  const tick = text => setProgress(prog, done, total, text);
  $('#runBtn').disabled = true;
  updateRail({ running: true });
  const llm = makeLlm({ userKey: $('#userKey').value.trim(), accessCode: $('#accessCode').value.trim(), minIntervalMs: (+$('#pace').value || 0) * 1000,
    onStatus: s => tick(s.replace(/^(query|canary) (\d+): pacing.*/, 'Waiting for the rate limit…').replace(/^(query|canary) (\d+): /, '')) });
  try {
    tick('Loading the embedding model…');
    await getWorker();
    run = await runAll({
      store, person: store.person, embed: embedVecs, llm, canaries,
      onEvent: ev => {
        if (ev.type === 'query-start') { setStep(`${ev.rec.kind}-${ev.rec.n}`, 'busy'); tick(ev.rec.question); }
        if (ev.type === 'query-done') { done++; setStep(`${ev.rec.kind}-${ev.rec.n}`, ev.rec.status === 'answered' ? 'ok' : ev.rec.status === 'error' ? 'err' : 'nis'); tick(ev.rec.question); }
        if (ev.type === 'story-start') { setStep('story', 'busy'); tick('Writing the story from the checked answers…'); }
        if (ev.type === 'story-done') { done++; setStep('story', ev.story.error ? 'err' : 'ok'); }
        if (ev.type === 'audit-start') { setStep('audit', 'busy'); tick('Checking each story sentence against its sources…'); }
        if (ev.type === 'audit-done') { done++; setStep('audit', ev.audit.error ? 'err' : 'ok'); }
      },
    });
    await idbSet('lastRun', JSON.stringify(run));
    done = total;
    tick(`Done. ${run.review.queries_answered} of 20 questions answered from the sources.`);
    renderRun();
    $('#results').scrollIntoView({ block: 'start' });
  } catch (e) { notify(prog, 'The run stopped: ' + e.message); }
  $('#runBtn').disabled = false;
  updateRail();
}

// ---------- rendering a run ----------
let storySents = [], selected = -1, logFilter = 'all';

function chunkText(id) {
  if (run?.chunks?.[id]) return run.chunks[id];
  if (store?.byId?.has(id)) { const c = store.chunks[store.byId.get(id)]; return { text: c.text, docName: c.docName, page: c.page }; }
  return null;
}
const DOC_TITLES = Object.fromEntries(FRANKLIN_FILES);
const docTitle = name => DOC_TITLES[name] || name || '';
const COMMON = new Set('that this with from were they their them when which also into have been whom while after before there these those about would could where other being first through during under still such like made make many much more most only over some than then very what your long know took gave came went said told time year years'.split(' '));
function highlight(text, sentence) {
  let html = esc(text);
  const name = new Set((run?.person || '').toLowerCase().split(/\s+/));
  const words = [...new Set((sentence.match(/[A-Za-z][A-Za-z']{3,}|\d{3,4}/g) || []).map(w => w.toLowerCase().replace(/'s$/, '')))]
    .filter(w => !COMMON.has(w) && !name.has(w));
  if (!words.length) return html;
  const re = new RegExp(`\\b(${words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\w*`, 'gi');
  return html.replace(re, '<mark>$&</mark>');
}
function sourceCard(id, sentence, valid = true) {
  const c = chunkText(id);
  if (!c) return `<div class="src missing"><div class="src-head"><b>${esc(id)}</b></div><div class="src-body">This chunk ID doesn’t exist in the store.</div></div>`;
  return `<div class="src"><div class="src-head"><b>${esc(id)}</b><span>${esc(docTitle(c.docName))}${c.page ? `, page ${c.page}` : ''}</span></div>
    <div class="src-body">${sentence ? highlight(c.text, sentence) : esc(c.text)}</div>${valid ? '' : '<div class="src-body" style="color:var(--margin);font-family:var(--sans);font-size:.8rem;padding-top:0">This chunk was not retrieved for this step.</div>'}</div>`;
}
function humanFlag(f) {
  const d = f.detail || '';
  return ({ no_citation: 'It has no chunk ID.', invented_id: d.replace(/^cites/, 'It cites') + '.', not_retrieved: d.replace(/^cites/, 'It cites') + '.',
    outside_detail: `Not in the cited chunks: ${d.replace(/^not found in cited chunks: /, '')}.`,
    low_overlap: `Worded differently from its source (${d.replace(/^only /, '').replace(' of content words appear in cited chunks', ' of the words match')}).` })[f.type] || d;
}
function verdictHtml(v) {
  const rows = [];
  if (!v.flags?.length) rows.push(['ok', '✓', 'Cites retrieved chunks, and every name and number is in them.']);
  for (const f of v.flags || []) {
    const msg = humanFlag(f);
    rows.push([f.type === 'low_overlap' ? 'warn' : 'flag', f.type === 'low_overlap' ? '~' : '!', msg]);
  }
  if (v.audit) rows.push([v.audit.verdict === 'supported' ? 'ok' : 'flag', v.audit.verdict === 'supported' ? '✓' : '!', v.audit.verdict === 'supported' ? 'The second-pass audit found it supported.' : `Audit: ${v.audit.verdict}. ${v.audit.problem || ''}`]);
  return `<div class="verdict">${rows.map(([c, m, t]) => `<div class="v ${c}"><span class="mk" aria-hidden="true">${m}</span><span>${esc(t)}</span></div>`).join('')}</div>`;
}
function selectSentence(k, { scroll = false } = {}) {
  const els = document.querySelectorAll('#storyOut .sent');
  els.forEach(e => e.setAttribute('aria-pressed', 'false'));
  selected = k;
  const v = storySents[k];
  if (!v) return;
  els[k]?.setAttribute('aria-pressed', 'true');
  if (scroll) els[k]?.scrollIntoView({ block: 'center' });
  $('#marginIn').innerHTML = `<button class="m-close" type="button" aria-label="Close sources">×</button>
    <div class="m-sent">${esc(v.text)}</div>${verdictHtml(v)}
    ${(v.chunk_ids || []).map(id => sourceCard(id, v.text, (v.valid_ids || []).includes(id))).join('') || '<p class="hint">No sources were cited.</p>'}`;
  $('#margin').classList.add('open');
  $('#marginIn').querySelector('.m-close').onclick = () => { $('#margin').classList.remove('open'); els[k]?.setAttribute('aria-pressed', 'false'); };
  $('#margin').scrollTop = 0;
}

function renderStory() {
  const s = run.story || {};
  storySents = [];
  const paras = (s.paragraphs || []).map(p => `<p>${p.sentences.map(v => {
    const k = storySents.push(v) - 1;
    const label = v.level === 'flag' ? ' (flagged)' : v.level === 'warn' ? ' (warning)' : '';
    return `<span class="sent ${v.level || ''}" role="button" tabindex="0" aria-pressed="false" data-k="${k}" aria-label="${esc(v.text)}${label}. Show sources.">${esc(v.text)}</span><span class="ids${v.chunk_ids?.length ? '' : ' none'}" aria-hidden="true">${v.chunk_ids?.length ? esc(v.chunk_ids.join(' ')) : 'no source'}</span>`;
  }).join(' ')}</p>`).join('');
  const showIds = ls.get('showIds') !== '0';
  $('#storyOut').className = 'story' + (showIds ? '' : ' hide-ids');
  $('#storyOut').innerHTML = paras ? `<h3>${esc(s.title || run.person)}</h3>
    <div class="story-tools"><label><input type="checkbox" id="idToggle" ${showIds ? 'checked' : ''}> Show chunk IDs</label><span>${plural(storySents.length, 'sentence')}, ${storySents.filter(v => v.level === 'flag').length} flagged</span></div>
    ${paras}${s.skipped_topics?.length ? `<p class="skipped">Left out because the sources don’t cover it: ${esc(s.skipped_topics.map(t => t.replace(/^Q\d+ /, '')).join(', '))}.</p>` : ''}`
    : `<p class="empty">${esc(s.error || s.note || 'No story was produced.')}</p>`;
  $('#idToggle')?.addEventListener('change', e => { ls.set('showIds', e.target.checked ? '1' : '0'); $('#storyOut').classList.toggle('hide-ids', !e.target.checked); });
  $('#marginIn').innerHTML = '<p class="margin-hint">Select any sentence to see the passages it came from.</p>';
  $('#margin').classList.remove('open');
  selected = -1;
}

function renderReview() {
  const r = run.review || {};
  const audit = run.audit?.verdicts || [];
  const supported = audit.filter(v => v.verdict === 'supported').length;
  const canaries = r.canaries || [];
  const cpass = canaries.filter(c => c.pass).length;
  const issues = (r.flagged || []);
  $('#reviewCount').textContent = issues.filter(f => f.level === 'flag').length || '';
  const nis = (r.queries_not_in_sources || []).map(q => run.queries.find(y => 'Q' + y.n === q)).filter(Boolean);
  const storyIdx = text => storySents.findIndex(v => v.text === text);
  $('#reviewOut').innerHTML = `<div class="rv">
    <ul class="score">
      <li class="${r.queries_answered >= 15 ? 'good' : ''}"><div class="v">${r.queries_answered}<small>/20</small></div><div class="d">questions answered from the sources</div></li>
      <li class="${r.story_sentences_traced === r.story_sentences ? 'good' : 'bad'}"><div class="v">${r.story_sentences_traced}<small>/${r.story_sentences}</small></div><div class="d">story sentences that cite a real, retrieved chunk</div></li>
      <li class="${r.flag ? 'bad' : 'good'}"><div class="v">${r.flag}<small>/${r.sentences_total}</small></div><div class="d">sentences flagged by the code checks</div></li>
      <li class="${audit.length && supported === audit.length ? 'good' : ''}"><div class="v">${audit.length ? `${supported}<small>/${audit.length}</small>` : '–'}</div><div class="d">story sentences the audit found supported</div></li>
      <li class="${canaries.length && cpass === canaries.length ? 'good' : canaries.length ? 'bad' : ''}"><div class="v">${canaries.length ? `${cpass}<small>/${canaries.length}</small>` : '–'}</div><div class="d">canaries answered “not in the sources”</div></li>
    </ul>

    <h3>Things to look at</h3>
    ${issues.length ? `<ul class="rv-list">${issues.map(f => {
      const k = f.where === 'story' ? storyIdx(f.text) : -1;
      const q = f.where.match(/^Q(\d+)$/)?.[1];
      return `<li><span class="k ${f.level}">${f.level === 'flag' ? 'Flagged' : 'Warning'}</span><span class="t">${esc(f.text)}</span>
        <span class="why">${esc(f.where === 'story' ? 'In the story. ' : `In the answer to ${f.where}. `)}${f.flags.map(x => { const m = x.match(/^(\w+): (.*)$/); return esc(m ? humanFlag({ type: m[1], detail: m[2] }) : x); }).join(' ')}</span>
        ${k >= 0 ? `<button class="linkbtn go" type="button" data-goto="${k}">Show it in the story</button>` : q ? `<button class="linkbtn go" type="button" data-log="query-${q}">Open the log for ${f.where}</button>` : ''}</li>`;
    }).join('')}</ul>` : '<p>Nothing. Every sentence passed the code checks.</p>'}

    <h3>Not in the sources</h3>
    ${nis.length ? `<ul class="rv-list">${nis.map(q => `<li><span class="k muted">Q${q.n}</span><span class="t">${esc(q.question)}</span><span class="why">${esc(q.reason || '')}</span><button class="linkbtn go" type="button" data-log="query-${q.n}">See what was retrieved</button></li>`).join('')}</ul>` : '<p>Every question was answered from the sources.</p>'}

    <h3>Canary test</h3>
    ${canaries.length ? `<ul class="rv-list">${canaries.map((c, i) => `<li><span class="k ${c.pass ? 'pass' : 'fail'}">${c.pass ? 'Passed' : 'Failed'}</span><span class="t">${esc(c.question)}</span><span class="why">${c.pass ? '“Not in the sources.” ' : ''}${esc(c.note ? c.note[0].toUpperCase() + c.note.slice(1) + '.' : '')}</span><button class="linkbtn go" type="button" data-log="canary-${i + 1}">Open the log</button></li>`).join('')}</ul>` : '<p>No canary questions were run.</p>'}

    <p class="rv-note">How sentences are checked: each must cite a chunk ID that exists and was retrieved for that step, and every number and capitalized name in it must appear in the cited chunk. Different wording is only a warning. The audit is a second LLM call that sees each story sentence with only its cited chunks.</p>
  </div>`;
}

function logRows() {
  const all = [...run.queries, ...run.canaries];
  return all.filter(q => logFilter === 'all' ? true : logFilter === 'answered' ? q.status === 'answered' && q.kind !== 'canary'
    : logFilter === 'nis' ? q.status === 'not_in_sources' : logFilter === 'flag' ? (q.verified || []).some(v => v.level !== 'ok') : q.kind === 'canary');
}
function renderLogs() {
  const rows = logRows();
  const sentLi = v => `<li>${esc(v.text)} <span class="ids">${esc((v.chunk_ids || []).join(' ')) || 'no source'}</span>${v.flags?.length ? `<span class="why">${v.flags.map(f => esc(humanFlag(f))).join(' ')}</span>` : ''}</li>`;
  $('#logsOut').innerHTML = (rows.map(q => {
    const flagged = (q.verified || []).some(v => v.level === 'flag');
    const first = q.verified?.[0]?.text || (q.status === 'not_in_sources' ? 'Not in the sources.' : q.error || '');
    return `<details class="qlog" id="log-${q.kind}-${q.n}"><summary>
      <span class="qn">${q.kind === 'canary' ? 'Canary ' + q.n : 'Q' + q.n}</span><span class="qq">${esc(q.question)}</span>
      <span class="st ${flagged ? 'flagged' : q.status}">${flagged ? 'Flagged' : q.status === 'answered' ? 'Answered' : q.status === 'error' ? 'Error' : 'Not in sources'}</span>
      <span class="qa">${esc(first)}</span></summary>
    <div class="body">
      ${q.reason ? `<p class="meta">${esc(q.reason)}</p>` : ''}${q.error ? `<p style="color:var(--margin)">${esc(q.error)}</p>` : ''}
      ${q.verified?.length ? `<h4>Answer</h4><ul class="ans">${q.verified.map(sentLi).join('')}</ul>` : ''}
      ${q.missing ? `<p class="meta">Missing from the sources, per the model: ${esc(q.missing)}</p>` : ''}
      <h4>Retrieved chunks</h4>
      <p class="meta">Searched for: ${q.search_phrasings.map(p => '“' + esc(p) + '”').join(', ')}. Best match ${q.gate.maxDense} (needs ${q.gate.minDense}) or keyword score ${q.gate.maxBm25} (needs ${q.gate.minBm25}), so the gate ${q.gate.passed ? 'let it through' : 'stopped it before the LLM'}.</p>
      <div class="scroll"><table><thead><tr><th>#</th><th>Chunk</th><th class="num">Meaning</th><th class="num">Keywords</th><th>Starts with</th></tr></thead><tbody>
      ${q.retrieved.map(r => `<tr><td>${r.rank}</td><td class="id"><button type="button" data-chunk="${esc(r.id)}">${esc(r.id)}</button></td><td class="num">${r.dense}</td><td class="num">${r.bm25}</td><td>${esc((chunkText(r.id)?.text || '').slice(0, 90))}…</td></tr>`).join('')}
      </tbody></table></div>
      ${q.prompt ? `<h4>Prompt sent${q.model ? ` to ${esc(q.model)}` : ''}</h4><pre>SYSTEM:\n${esc(q.prompt.system)}\n\nUSER:\n${esc(q.prompt.user)}</pre><h4>Raw response</h4><pre>${esc(q.raw_response)}</pre>` : '<p class="meta">No prompt was sent for this query.</p>'}
    </div></details>`;
  }).join('') || '<p class="empty">Nothing matches this filter.</p>') +
    (logFilter === 'all' && run.story?.prompt ? `<details class="qlog"><summary><span class="qn">Story</span><span class="qq">The prompt that wrote the story</span><span class="st answered">${esc(run.story.model || '')}</span></summary><div class="body"><pre>SYSTEM:\n${esc(run.story.prompt.system)}\n\nUSER:\n${esc(run.story.prompt.user)}</pre><h4>Raw response</h4><pre>${esc(run.story.raw_response)}</pre></div></details>` : '') +
    (logFilter === 'all' && run.audit?.prompt ? `<details class="qlog"><summary><span class="qn">Audit</span><span class="qq">The prompt that checked the story</span><span class="st answered">${esc(run.audit.model || '')}</span></summary><div class="body"><pre>SYSTEM:\n${esc(run.audit.prompt.system)}\n\nUSER:\n${esc(run.audit.prompt.user)}</pre><h4>Raw response</h4><pre>${esc(run.audit.raw_response)}</pre></div></details>` : '');
}

function renderRun() {
  if (!run) return;
  const models = [...new Set([...run.queries, ...run.canaries].map(q => q.model).filter(Boolean))];
  $('#resMeta').innerHTML = `${run.sample ? '<span class="tag">Example run</span>' : ''}${esc(run.person)}, run ${esc(fmtDate(run.created))}${models.length ? ` with ${esc(models.join(' and '))}` : ''}.`;
  renderStory(); renderReview(); renderLogs();
  $('#dlJson').disabled = $('#dlMd').disabled = $('#dlStory').disabled = false;
  updateRail();
}

// ---------- tabs ----------
const TABS = ['story', 'review', 'logs'];
function showTab(name, focus = false) {
  for (const t of TABS) {
    const on = t === name;
    $(`#tab-${t}`).setAttribute('aria-selected', on); $(`#tab-${t}`).tabIndex = on ? 0 : -1;
    $(`#panel-${t}`).hidden = !on;
  }
  if (focus) $(`#tab-${name}`).focus();
  if (name !== 'story') $('#margin').classList.remove('open');
}
TABS.forEach(t => $(`#tab-${t}`).addEventListener('click', () => showTab(t)));
$('.tabs').addEventListener('keydown', e => {
  const i = TABS.findIndex(t => $(`#tab-${t}`).getAttribute('aria-selected') === 'true');
  if (e.key === 'ArrowRight') showTab(TABS[(i + 1) % 3], true);
  if (e.key === 'ArrowLeft') showTab(TABS[(i + 2) % 3], true);
});

// ---------- delegated clicks ----------
const dialog = Object.assign(document.createElement('dialog'), { className: 'chunk' });
document.body.append(dialog);
function openChunk(id) {
  dialog.innerHTML = `${sourceCard(id)}<form method="dialog"><button class="btn ghost" type="submit">Close</button></form>`;
  dialog.showModal();
}
document.addEventListener('click', e => {
  const sent = e.target.closest('#storyOut .sent');
  if (sent) return selectSentence(+sent.dataset.k);
  const go = e.target.closest('[data-goto]');
  if (go) { showTab('story'); return selectSentence(+go.dataset.goto, { scroll: true }); }
  const lg = e.target.closest('[data-log]');
  if (lg) {
    logFilter = 'all'; document.querySelectorAll('#logFilters button').forEach(b => b.setAttribute('aria-pressed', b.dataset.f === 'all'));
    renderLogs(); showTab('logs');
    const d = document.getElementById('log-' + lg.dataset.log); if (d) { d.open = true; d.scrollIntoView({ block: 'start' }); }
    return;
  }
  const ch = e.target.closest('[data-chunk]');
  if (ch) return openChunk(ch.dataset.chunk);
  if (e.target.closest('[data-sample]')) return loadSample();
  if (!e.target.closest('.dl')) document.querySelectorAll('.dl details[open]').forEach(d => d.open = false);
});
document.addEventListener('keydown', e => {
  const sent = e.target.closest?.('#storyOut .sent');
  if (sent && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); selectSentence(+sent.dataset.k); }
  if (e.key === 'Escape') { $('#margin').classList.remove('open'); document.querySelectorAll('.dl details[open]').forEach(d => d.open = false); }
});
$('#logFilters').addEventListener('click', e => {
  const b = e.target.closest('button[data-f]'); if (!b) return;
  logFilter = b.dataset.f;
  document.querySelectorAll('#logFilters button').forEach(x => x.setAttribute('aria-pressed', x === b));
  renderLogs();
});

function download(name, text, type = 'application/json') {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
const slug = () => (run?.person || 'person').toLowerCase().replace(/[^a-z0-9]+/g, '-');
function storeForReport() { const chunks = Object.entries(run.chunks || {}).map(([id, c]) => ({ id, ...c })); return { chunks, byId: new Map(chunks.map((c, i) => [c.id, i])) }; }
async function loadSample(scroll = true) {
  try {
    const r = await fetch('/runs/franklin-run.json');
    if (!r.ok) throw new Error();
    run = await r.json(); run.sample = true; renderRun(); showTab('story');
    if (scroll) $('#results').scrollIntoView({ block: 'start' });
  } catch { notify($('#runProgress'), 'The example run couldn’t be loaded.'); }
}

// ---------- wire up ----------
renderBookList();
$('#person').addEventListener('input', () => { renderQuestions(); setDefaultCanaries(); });
$('#canaries').addEventListener('input', e => e.target.dataset.touched = '1');
$('#files').addEventListener('change', e => { addFiles([...e.target.files]); e.target.value = ''; });
document.querySelectorAll('label[for][tabindex]').forEach(l => l.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); l.click(); } }));
const drop = $('#drop');
['dragenter', 'dragover'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add('over'); }));
['dragleave', 'drop'].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.remove('over'); }));
drop.addEventListener('drop', e => addFiles([...e.dataTransfer.files]));
$('#addUrls').onclick = async () => {
  const urls = $('#urls').value.split('\n').map(s => s.trim()).filter(Boolean);
  const prog = $('#buildProgress');
  for (const u of urls) { notify(prog, `Fetching ${u}…`); try { addDoc(await urlToText(u)); } catch (e) { notify(prog, `Couldn’t fetch ${u}: ${e.message}`); renderDocs(); return; } }
  notify(prog, pending.length ? 'Ready to build.' : ''); $('#urls').value = ''; renderDocs();
};
$('#useFranklin').onclick = async () => {
  $('#person').value = 'Benjamin Franklin'; renderQuestions(); setDefaultCanaries();
  const prog = $('#buildProgress');
  for (const [f, t] of FRANKLIN_FILES) {
    if (pending.some(d => d.name === f)) continue;
    notify(prog, `Loading ${t}…`);
    addDoc({ name: f, text: await (await fetch('/corpus/franklin/' + f)).text() });
  }
  notify(prog, 'Six books added. Build the store to embed them (about 3 minutes).'); renderDocs();
  $('#build').focus();
};
$('#loadPrebuilt').onclick = async () => {
  const prog = $('#buildProgress');
  notify(prog, 'Loading the embedded Franklin books…');
  try { await setStoreFromJson(await (await fetch('/demo/franklin.store.json')).text()); notify(prog, 'Loaded.'); collapsePages(); $('#step-run').scrollIntoView({ block: 'start' }); }
  catch (e) { notify(prog, 'Couldn’t load them: ' + e.message); }
};
$('#build').onclick = buildStore;
$('#exportStore').onclick = () => download(`${(store.person || 'store').toLowerCase().replace(/[^a-z0-9]+/g, '-')}.store.json`, serializeStore(store));
$('#importStore').addEventListener('change', async e => { const f = e.target.files[0]; if (f) try { await setStoreFromJson(await f.text()); collapsePages(); } catch (er) { notify($('#buildProgress'), er.message); } });
$('#clearStore').onclick = async () => { await idbDel('store'); store = null; renderStoreStatus(); notify($('#buildProgress'), 'Store removed from this browser.'); };
$('#runBtn').onclick = doRun;
$('#loadSample').onclick = () => loadSample();
$('#dlJson').onclick = () => download(`${slug()}-run-log.json`, JSON.stringify(run, null, 1));
$('#dlMd').onclick = () => download(`${slug()}-report.md`, fullReport(run, storeForReport()), 'text/markdown');
$('#dlStory').onclick = () => download(`${slug()}-story.md`, storyMarkdown(run), 'text/markdown');
$('#openRun').addEventListener('change', async e => { const f = e.target.files[0]; if (f) { try { run = JSON.parse(await f.text()); renderRun(); showTab('story'); } catch (er) { notify($('#runProgress'), 'That file isn’t a run log.'); } } });
$('#pace').value = ls.get('pace') || '4'; $('#userKey').value = ls.get('userKey'); $('#accessCode').value = ls.get('accessCode');

(async () => {
  const saved = await idbGet('store');
  if (saved) { try { await setStoreFromJson(saved, false); collapsePages(); } catch {} }
  renderStoreStatus(); renderQuestions();
  const last = await idbGet('lastRun');
  if (last) { try { run = JSON.parse(last); renderRun(); } catch {} }
  else await loadSample(false);
})();
