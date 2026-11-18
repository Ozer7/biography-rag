// Automatic log review: checks every sentence against the chunks it cites.
import { terms } from './bm25.js';

const CAP_SKIP = new Set(['I', 'The', 'A', 'An', 'He', 'She', 'His', 'Her', 'They', 'Their', 'It', 'In', 'On', 'At', 'As', 'But', 'And', 'When',
  'After', 'Before', 'During', 'While', 'This', 'That', 'These', 'Those', 'There', 'Then', 'One', 'Although', 'Though', 'Even', 'Later', 'Soon',
  'Once', 'For', 'With', 'From', 'By', 'To', 'Of', 'Not', 'Both', 'Some', 'Many', 'Most', 'His', 'Mr', 'Mrs', 'Dr', 'Sir', 'Lord', 'Lady',
  'Yet', 'So', 'Still', 'Also', 'According', 'Because', 'Despite', 'If', 'Among', 'Over', 'Under', 'Throughout', 'Eventually', 'Finally']);

export function normId(id) { return String(id).replace(/[\[\]\s]/g, '').toUpperCase(); }

// Details that are easy to check mechanically: numbers and capitalized names.
export function checkableDetails(sentence, person) {
  const personTok = new Set(person.split(/\s+/).map(w => w.toLowerCase()));
  const out = new Set();
  for (const m of sentence.matchAll(/\b\d[\d,]*\b/g)) out.add(m[0].replace(/,/g, ''));
  const words = sentence.replace(/[“”"()\[\]]/g, ' ').split(/\s+/);
  words.forEach((raw, i) => {
    const w = raw.replace(/[^A-Za-zÀ-ÿ'’-]/g, '').replace(/['’]s$/, '');
    if (!w || !/^[A-Z]/.test(w) || w.length < 3) return;
    if (i === 0 || /[.!?:;]$/.test(words[i - 1] || '')) return; // sentence/clause start
    if (CAP_SKIP.has(w) || personTok.has(w.toLowerCase())) return;
    out.add(w);
  });
  return [...out];
}

export function verifySentence(s, allowed, store, person) {
  const ids = (s.chunk_ids || []).map(normId);
  const flags = [];
  const invented = ids.filter(id => !store.byId.has(id));
  const notAllowed = ids.filter(id => store.byId.has(id) && !allowed.has(id));
  const valid = ids.filter(id => store.byId.has(id) && allowed.has(id));
  if (!ids.length) flags.push({ type: 'no_citation', detail: 'sentence has no chunk ID' });
  if (invented.length) flags.push({ type: 'invented_id', detail: `cites IDs that do not exist: ${invented.join(', ')}` });
  if (notAllowed.length) flags.push({ type: 'not_retrieved', detail: `cites chunks that were not retrieved for this step: ${notAllowed.join(', ')}` });

  const cited = valid.map(id => store.chunks[store.byId.get(id)].text).join('\n');
  const citedLower = cited.toLowerCase().normalize('NFD').replace(/\p{Mn}/gu, '');
  const missing = valid.length ? checkableDetails(s.text, person).filter(d => !citedLower.includes(d.toLowerCase().normalize('NFD').replace(/\p{Mn}/gu, ''))) : [];
  if (missing.length) flags.push({ type: 'outside_detail', detail: `not found in cited chunks: ${missing.join(', ')}` });

  const st = terms(s.text), ct = new Set(terms(cited));
  const overlap = st.length ? st.filter(t => ct.has(t)).length / st.length : 1;
  if (valid.length && overlap < 0.5) flags.push({ type: 'low_overlap', detail: `only ${Math.round(overlap * 100)}% of content words appear in cited chunks` });

  const hard = flags.some(f => ['no_citation', 'invented_id', 'not_retrieved', 'outside_detail'].includes(f.type));
  return { text: s.text, chunk_ids: ids, valid_ids: valid, overlap: +overlap.toFixed(2), flags, level: hard ? 'flag' : flags.length ? 'warn' : 'ok' };
}

export function summarizeRun(run) {
  const all = [];
  run.queries.forEach(q => (q.verified || []).forEach(v => all.push({ where: `Q${q.n}`, ...v })));
  (run.canaries || []).forEach(q => (q.verified || []).forEach(v => all.push({ where: `Canary ${q.n}`, ...v })));
  (run.story?.verified || []).forEach(v => all.push({ where: 'story', ...v }));
  const count = lv => all.filter(v => v.level === lv).length;
  const storyV = run.story?.verified || [];
  return {
    queries_answered: run.queries.filter(q => q.status === 'answered').length,
    queries_not_in_sources: run.queries.filter(q => q.status === 'not_in_sources').map(q => `Q${q.n}`),
    skipped_by_gate: run.queries.filter(q => q.gate && !q.gate.passed).map(q => `Q${q.n}`),
    sentences_total: all.length, ok: count('ok'), warn: count('warn'), flag: count('flag'),
    story_sentences: storyV.length,
    story_sentences_traced: storyV.filter(v => v.valid_ids.length > 0).length,
    story_flagged: storyV.filter(v => v.level === 'flag').map(v => v.text),
    dropped_before_story: run.queries.flatMap(q => (q.dropped || []).map(d => `Q${q.n}: ${d.text}`)),
    canaries: (run.canaries || []).map(c => ({
      question: c.question, result: c.status, pass: c.status === 'not_in_sources',
      note: c.status !== 'not_in_sources' ? 'answered: check the log' : c.verified?.length ? 'the LLM wrote an answer, but every sentence failed the checks and was dropped' : c.gate && !c.gate.passed ? 'blocked by the retrieval gate' : 'the LLM said not in the sources',
    })),
    flagged: all.filter(v => v.level !== 'ok').map(v => ({ where: v.where, level: v.level, text: v.text, flags: v.flags.map(f => `${f.type}: ${f.detail}`) })),
  };
}
