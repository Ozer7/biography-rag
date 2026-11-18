// Vercel serverless function: downloads a public web page (or PDF) so the browser can add it
// to the corpus. Browsers can't fetch most sites directly because of CORS.

const BLOCKED = /^(localhost|127\.|10\.|192\.168\.|169\.254\.|0\.|\[?::1|172\.(1[6-9]|2\d|3[01])\.)/i;

function htmlToText(html) {
  return html
    .replace(/<(script|style|noscript|nav|footer|header|svg|form)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|h[1-6]|li|tr|blockquote|section|article)>/gi, '\n\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/[ \t]+/g, ' ').replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

export default async function handler(req, res) {
  const url = (req.query.url || '').toString();
  let u;
  try { u = new URL(url); } catch { return res.status(400).json({ error: 'Bad URL' }); }
  if (!/^https?:$/.test(u.protocol) || BLOCKED.test(u.hostname)) return res.status(400).json({ error: 'URL not allowed' });
  try {
    const r = await fetch(u, { headers: { 'user-agent': 'biography-rag/1.0 (class project)' }, redirect: 'follow' });
    if (!r.ok) return res.status(502).json({ error: `Site answered ${r.status}` });
    const type = r.headers.get('content-type') || '';
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > 15e6) return res.status(413).json({ error: 'File too large (15 MB max)' });
    if (type.includes('pdf') || u.pathname.toLowerCase().endsWith('.pdf'))
      return res.status(200).json({ kind: 'pdf', base64: buf.toString('base64') });
    const text = buf.toString('utf8');
    const title = (/<title[^>]*>([\s\S]*?)<\/title>/i.exec(text) || [])[1]?.trim();
    return res.status(200).json({ kind: 'text', title: title || u.hostname + u.pathname, text: type.includes('html') || /<html/i.test(text) ? htmlToText(text) : text });
  } catch (e) {
    return res.status(502).json({ error: 'Could not download: ' + e.message });
  }
}
