// Local server that behaves like the Vercel deployment: static files from public/, the same
// headers as vercel.json, and the /api functions.  Usage:
//   GEMINI_API_KEY=... node scripts/dev-server.mjs        (real Gemini)
//   MOCK_LLM=1 node scripts/dev-server.mjs                (fake LLM for testing the UI)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = path.join(root, 'public');
const PORT = +process.env.PORT || 3000;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.wasm': 'application/wasm', '.onnx': 'application/octet-stream', '.txt': 'text/plain; charset=utf-8', '.md': 'text/markdown; charset=utf-8', '.svg': 'image/svg+xml' };

function mockGenerate(body) {
  const { prompt = '' } = body;
  const ids = [...prompt.matchAll(/^\[(D\d+-C\d+)\]/gm)].map(m => m[1]);
  if (prompt.includes('Verified notes:')) {
    const notes = [...prompt.matchAll(/^- (.+) \[([^\]]+)\]$/gm)];
    const per = Math.ceil(notes.length / 4) || 1, paragraphs = [];
    for (let i = 0; i < notes.length; i += per) paragraphs.push({ sentences: notes.slice(i, i + per).map(m => ({ text: m[1], chunk_ids: m[2].split(', ') })) });
    return { title: 'A Life from the Sources (mock)', paragraphs };
  }
  if (prompt.includes('Cited snippets:')) return { verdicts: [...prompt.matchAll(/^#(\d+):/gm)].map(m => ({ k: +m[1], verdict: 'supported' })) };
  if (/bifocal|banknote|Mesmer/.test(prompt)) return { status: 'not_in_sources', sentences: [] };
  const first = (prompt.split(/^\[D\d+-C\d+\].*$/m)[1] || '').trim();
  const sent = (first.match(/[^.!?]{30,}[.!?]/) || [first.slice(0, 200)])[0].trim();
  return { status: 'answered', sentences: [{ text: sent, chunk_ids: [ids[0]] }] };
}

async function api(name, req, res, body) {
  if (process.env.MOCK_LLM && name === 'generate') {
    await new Promise(r => setTimeout(r, 150));
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify({ text: JSON.stringify(mockGenerate(body)), model: 'mock' }));
  }
  const mod = await import(path.join(root, 'api', name + '.js'));
  const url = new URL(req.url, 'http://x');
  const shim = {
    statusCode: 200,
    status(c) { this.statusCode = c; return this; },
    json(o) { res.writeHead(this.statusCode, { 'content-type': 'application/json' }); res.end(JSON.stringify(o)); },
  };
  await mod.default({ method: req.method, headers: req.headers, body, query: Object.fromEntries(url.searchParams) }, shim);
}

http.createServer(async (req, res) => {
  const url = new URL(req.url, 'http://x');
  if (url.pathname.startsWith('/api/')) {
    let raw = '';
    for await (const c of req) raw += c;
    let body = {};
    try { body = raw ? JSON.parse(raw) : {}; } catch {}
    return api(url.pathname.slice(5).replace(/\W/g, ''), req, res, body).catch(e => { res.writeHead(500); res.end(String(e)); });
  }
  let p = path.join(pub, decodeURIComponent(url.pathname));
  if (!p.startsWith(pub)) { res.writeHead(403); return res.end(); }
  if (fs.existsSync(p) && fs.statSync(p).isDirectory()) p = path.join(p, 'index.html');
  if (!fs.existsSync(p)) { res.writeHead(404); return res.end('not found'); }
  res.writeHead(200, { 'content-type': TYPES[path.extname(p)] || 'application/octet-stream',
    'cross-origin-opener-policy': 'same-origin', 'cross-origin-embedder-policy': 'require-corp' });
  fs.createReadStream(p).pipe(res);
}).listen(PORT, () => console.log(`http://localhost:${PORT}${process.env.MOCK_LLM ? '  (mock LLM)' : ''}`));
