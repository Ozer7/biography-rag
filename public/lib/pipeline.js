// Runs the 20 queries, canaries, story and audit. Environment-agnostic: the caller passes
//   embed(texts) -> Float32Array[]   and   llm({label, system, prompt, schema}) -> {text, model}
import { QUERIES, fill } from './queries.js';
import { retrieve, RETRIEVAL_PARAMS, setHubness } from './retrieve.js';
import { ANSWER_SYSTEM, answerPrompt, ANSWER_SCHEMA, STORY_SYSTEM, storyPrompt, STORY_SCHEMA, AUDIT_SYSTEM, auditPrompt, AUDIT_SCHEMA } from './prompts.js';
import { verifySentence, summarizeRun, normId } from './verify.js';
import { EMBED_MODEL } from './embedder.js';

export const APP_VERSION = '1.0.0';

export function parseJson(text) {
  let t = String(text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
  try { return JSON.parse(t); } catch {
    const a = t.indexOf('{'), b = t.lastIndexOf('}');
    if (a >= 0 && b > a) return JSON.parse(t.slice(a, b + 1));
    throw new Error('Model did not return JSON');
  }
}

async function answerOne(ctx, item) {
  const { store, person, embed, llm, onEvent } = ctx;
  const question = fill(item.ask, person);
  const phrasings = [question, ...(item.search || []).map(s => fill(s, person))];
  const vecs = ctx.vecCache?.get(`${item.kind || 'query'}-${item.n}`) || await embed(phrasings);
  const { results, gate } = retrieve(store, vecs, phrasings, ctx.retrieval);
  const rec = {
    n: item.n, kind: item.kind || 'query', topic: item.topic, question, search_phrasings: phrasings,
    retrieved: results.map(({ i, ...r }) => r), retrieved_ids: results.map(r => r.id), gate,
    prompt: null, raw_response: null, model: null, status: null, sentences: [], verified: [], dropped: [], started: new Date().toISOString(),
  };
  if (!gate.passed) {
    rec.status = 'not_in_sources';
    rec.reason = 'Retrieval gate: no snippet was similar enough to the question, so the LLM was not called.';
    onEvent?.({ type: 'query-done', rec });
    return rec;
  }
  const snippets = results.map(r => store.chunks[r.i]);
  rec.prompt = { system: ANSWER_SYSTEM, user: answerPrompt(person, question, snippets) };
  onEvent?.({ type: 'query-start', rec });
  try {
    const res = await llm({ label: `${rec.kind} ${item.n}`, system: rec.prompt.system, prompt: rec.prompt.user, schema: ANSWER_SCHEMA, maxTokens: 1500 });
    rec.raw_response = res.text; rec.model = res.model;
    const parsed = parseJson(res.text);
    const allowed = new Set(rec.retrieved_ids);
    const sents = Array.isArray(parsed.sentences) ? parsed.sentences.filter(s => s && s.text) : [];
    rec.missing = parsed.missing || '';
    rec.verified = sents.map(s => verifySentence(s, allowed, store, person));
    if (parsed.status === 'not_in_sources' || !sents.length) {
      rec.status = 'not_in_sources';
      rec.reason = 'The LLM found no answer in the retrieved snippets.';
    } else {
      rec.status = 'answered';
      // Only sentences that pass the hard checks go on to the story.
      rec.sentences = rec.verified.filter(v => v.level !== 'flag').map(v => ({ text: v.text, chunk_ids: v.valid_ids }));
      rec.dropped = rec.verified.filter(v => v.level === 'flag');
      if (!rec.sentences.length) { rec.status = 'not_in_sources'; rec.reason = 'Every sentence failed verification, so nothing was kept.'; }
    }
  } catch (e) {
    rec.status = 'error'; rec.error = String(e.message || e);
  }
  rec.finished = new Date().toISOString();
  onEvent?.({ type: 'query-done', rec });
  return rec;
}

export async function runAll({ store, person, embed, llm, canaries = [], onEvent, retrieval = RETRIEVAL_PARAMS, audit = true }) {
  const ctx = { store, person, embed, llm, onEvent, retrieval };
  const run = {
    run_id: 'run-' + new Date().toISOString().replace(/[:.]/g, '-'), app_version: APP_VERSION, created: new Date().toISOString(), person,
    corpus: { docs: store.docs, chunk_count: store.chunks.length, embed_model: store.embedModel || EMBED_MODEL, chunk_params: store.chunkParams },
    retrieval_params: retrieval, queries: [], canaries: [], story: null, audit: null,
  };
  // Embed every query phrasing once, then use them as probes for the hubness correction.
  ctx.vecCache = new Map();
  for (const q of QUERIES) ctx.vecCache.set('query-' + q.n, await embed([fill(q.ask, person), ...q.search.map(s => fill(s, person))]));
  run.hubness = setHubness(store, [...ctx.vecCache.values()].flat());
  onEvent?.({ type: 'hubness', info: run.hubness });
  for (const q of QUERIES) run.queries.push(await answerOne(ctx, q));
  for (let i = 0; i < canaries.length; i++) {
    run.canaries.push(await answerOne(ctx, { n: i + 1, kind: 'canary', topic: 'Canary', ask: canaries[i], search: [] }));
  }
  run.story = await writeStory(ctx, run);
  if (audit) run.audit = await runAudit(ctx, run);
  run.review = summarizeRun(run);
  // Make the log self-contained: include the text of every chunk that was retrieved anywhere.
  const ids = new Set([...run.queries, ...run.canaries].flatMap(q => q.retrieved_ids));
  run.chunks = {};
  for (const id of [...ids].sort()) { const c = store.chunks[store.byId.get(id)]; run.chunks[id] = { doc: c.doc, docName: c.docName, page: c.page ?? null, text: c.text }; }
  run.finished = new Date().toISOString();
  onEvent?.({ type: 'run-done', run });
  return run;
}

async function writeStory(ctx, run) {
  const { store, person, llm, onEvent } = ctx;
  const answered = run.queries.filter(q => q.status === 'answered');
  const skipped = run.queries.filter(q => q.status !== 'answered');
  const ids = [...new Set(answered.flatMap(q => q.sentences.flatMap(s => s.chunk_ids)))];
  const snippets = ids.map(id => store.chunks[store.byId.get(id)]);
  const story = { prompt: { system: STORY_SYSTEM, user: storyPrompt(person, answered, skipped, snippets) }, allowed_ids: ids, skipped_topics: skipped.map(q => `Q${q.n} ${q.topic}`) };
  onEvent?.({ type: 'story-start' });
  if (!answered.length) { story.title = person; story.paragraphs = []; story.verified = []; story.note = 'Nothing was found in the sources.'; return story; }
  try {
    const res = await llm({ label: 'story', system: story.prompt.system, prompt: story.prompt.user, schema: STORY_SCHEMA, maxTokens: 8192 });
    story.raw_response = res.text; story.model = res.model;
    const parsed = parseJson(res.text);
    const allowed = new Set(ids);
    story.title = parsed.title || person;
    story.paragraphs = (parsed.paragraphs || []).map(p => ({ sentences: (p.sentences || []).filter(s => s && s.text).map(s => verifySentence(s, allowed, store, person)) }));
    story.verified = story.paragraphs.flatMap(p => p.sentences);
  } catch (e) { story.error = String(e.message || e); story.paragraphs = []; story.verified = []; }
  onEvent?.({ type: 'story-done', story });
  return story;
}

async function runAudit(ctx, run) {
  const { store, llm, onEvent } = ctx;
  const sents = (run.story?.verified || []).filter(v => v.valid_ids.length);
  if (!sents.length) return null;
  const items = sents.map((v, k) => ({ k: k + 1, text: v.text, snippets: v.valid_ids.map(id => store.chunks[store.byId.get(id)]) }));
  const audit = { prompt: { system: AUDIT_SYSTEM, user: auditPrompt(items) } };
  onEvent?.({ type: 'audit-start' });
  try {
    const res = await llm({ label: 'audit', system: audit.prompt.system, prompt: audit.prompt.user, schema: AUDIT_SCHEMA, maxTokens: 6000 });
    audit.raw_response = res.text; audit.model = res.model;
    const parsed = parseJson(res.text);
    audit.verdicts = (parsed.verdicts || []).map(v => ({ ...v, text: items[v.k - 1]?.text }));
    sents.forEach((v, k) => { const a = audit.verdicts.find(x => x.k === k + 1); if (a) v.audit = { verdict: a.verdict, problem: a.problem || '' }; });
  } catch (e) { audit.error = String(e.message || e); }
  onEvent?.({ type: 'audit-done', audit });
  return audit;
}

export { normId };
