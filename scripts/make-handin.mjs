// Turns a downloaded run log into the hand-in files under public/runs/:
//   node scripts/make-handin.mjs path/to/run-log.json
// Writes franklin-run.json (shown on the site as "sample run"), franklin-story.md and franklin-report.md.
import fs from 'node:fs';
import { fullReport, storyMarkdown, reviewMarkdown } from '../public/lib/report.js';

const src = process.argv[2];
if (!src) { console.error('usage: node scripts/make-handin.mjs run-log.json'); process.exit(1); }
const run = JSON.parse(fs.readFileSync(src, 'utf8'));
const chunks = Object.entries(run.chunks || {}).map(([id, c]) => ({ id, ...c }));
const store = { chunks, byId: new Map(chunks.map((c, i) => [c.id, i])) };
const slug = run.person.toLowerCase().split(/\s+/).pop().replace(/[^a-z0-9]/g, '');
const out = new URL('../public/runs/', import.meta.url);
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(new URL(`${slug}-run.json`, out), JSON.stringify(run, null, 1));
fs.writeFileSync(new URL(`${slug}-story.md`, out), storyMarkdown(run));
fs.writeFileSync(new URL(`${slug}-report.md`, out), fullReport(run, store));
console.log(reviewMarkdown(run));
const models = [...new Set([...run.queries, ...run.canaries, run.story, run.audit].filter(Boolean).map(x => x.model).filter(Boolean))];
console.log('models used:', models.join(', '));
console.log(`wrote public/runs/${slug}-run.json, ${slug}-story.md, ${slug}-report.md`);
