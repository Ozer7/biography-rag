// Rebuilds a full run log from a slim export (prompts and chunk texts removed, SHA-256 kept)
// using the same corpus and code, and checks every prompt's fingerprint.
//   node scripts/rebuild-log.mjs slim.json out.json
import fs from 'node:fs';
import crypto from 'node:crypto';
import { loadStore } from '../public/lib/storeformat.js';
import { ANSWER_SYSTEM, answerPrompt, STORY_SYSTEM, storyPrompt, AUDIT_SYSTEM, auditPrompt } from '../public/lib/prompts.js';

const [src, dst] = process.argv.slice(2);
const sha = s => crypto.createHash('sha256').update(s, 'utf8').digest('hex');
const run = JSON.parse(fs.readFileSync(src, 'utf8'));
const store = loadStore(fs.readFileSync(new URL('../public/demo/franklin.store.json', import.meta.url), 'utf8'));
const chunk = id => store.chunks[store.byId.get(id)];
let ok = 0, bad = 0;
const check = (label, text, p) => { if (sha(text) === p.user_sha256) ok++; else { bad++; console.log('MISMATCH', label, text.length, p.user_len); } };

for (const q of [...run.queries, ...run.canaries]) {
  if (!q.prompt) continue;
  const user = answerPrompt(run.person, q.question, q.retrieved_ids.map(chunk));
  check(`${q.kind} ${q.n}`, user, q.prompt);
  q.prompt = { system: ANSWER_SYSTEM, user };
}
const answered = run.queries.filter(q => q.status === 'answered'), skipped = run.queries.filter(q => q.status !== 'answered');
if (run.story?.prompt) {
  const user = storyPrompt(run.person, answered, skipped, run.story.allowed_ids.map(chunk));
  check('story', user, run.story.prompt);
  run.story.prompt = { system: STORY_SYSTEM, user };
}
if (run.audit?.prompt) {
  const sents = run.story.verified.filter(v => v.valid_ids.length);
  const user = auditPrompt(sents.map((v, k) => ({ k: k + 1, text: v.text, snippets: v.valid_ids.map(chunk) })));
  check('audit', user, run.audit.prompt);
  run.audit.prompt = { system: AUDIT_SYSTEM, user };
}
const ids = new Set([...run.queries, ...run.canaries].flatMap(q => q.retrieved_ids));
const chunks = {};
for (const id of [...ids].sort()) { const c = chunk(id); chunks[id] = { doc: c.doc, docName: c.docName, page: c.page ?? null, text: c.text }; }
console.log('chunks fingerprint', sha(JSON.stringify(chunks)) === run.chunks_sha256 ? 'matches' : 'DIFFERS');
delete run.chunks_sha256; run.chunks = chunks;
fs.writeFileSync(dst, JSON.stringify(run, null, 1));
console.log(`prompts verified: ${ok} match, ${bad} differ`);
