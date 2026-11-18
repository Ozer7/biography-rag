// Browser-only: turn uploaded files or URLs into plain text.
// PDF pages are marked "\f<page>\n" so chunks can record page numbers.

let pdfjs = null;
async function getPdfjs() {
  if (!pdfjs) {
    pdfjs = await import('/vendor/pdfjs/pdf.min.mjs');
    pdfjs.GlobalWorkerOptions.workerSrc = '/vendor/pdfjs/pdf.worker.min.mjs';
  }
  return pdfjs;
}

export async function pdfToText(arrayBuffer) {
  const lib = await getPdfjs();
  const pdf = await lib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
  let out = '';
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const tc = await page.getTextContent();
    let line = '', lastY = null, text = '';
    for (const it of tc.items) {
      const y = it.transform ? it.transform[5] : null;
      if (lastY !== null && y !== null && Math.abs(y - lastY) > 14) text += '\n'; // bigger gap = new paragraph
      line = it.str; text += line + (it.hasEOL ? '\n' : (line.endsWith(' ') ? '' : ' '));
      lastY = y;
    }
    out += `\f${p}\n` + text + '\n';
  }
  return { text: out, pages: pdf.numPages };
}

function htmlToText(html) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  doc.querySelectorAll('script,style,noscript,nav,footer,header,svg,form').forEach(n => n.remove());
  doc.querySelectorAll('p,div,h1,h2,h3,h4,h5,h6,li,tr,blockquote,section,article,br').forEach(n => n.append('\n\n'));
  return (doc.body?.textContent || '').replace(/[ \t]+/g, ' ').replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

async function docxToText(arrayBuffer) {
  if (!window.mammoth) await new Promise((ok, bad) => {
    const s = document.createElement('script'); s.src = '/vendor/mammoth/mammoth.browser.min.js'; s.onload = ok; s.onerror = bad; document.head.append(s);
  });
  const r = await window.mammoth.extractRawText({ arrayBuffer });
  return r.value;
}

export async function fileToText(file) {
  const name = file.name, ext = name.toLowerCase().split('.').pop();
  if (ext === 'pdf') { const r = await pdfToText(await file.arrayBuffer()); return { name, text: r.text, pdfPages: r.pages }; }
  if (ext === 'docx') return { name, text: await docxToText(await file.arrayBuffer()) };
  const raw = await file.text();
  if (ext === 'html' || ext === 'htm' || /^\s*<(!doctype|html)/i.test(raw)) return { name, text: htmlToText(raw) };
  return { name, text: raw };
}

export async function urlToText(url) {
  const r = await fetch('/api/fetch-url?url=' + encodeURIComponent(url));
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || `Could not fetch ${url}`);
  if (j.kind === 'pdf') {
    const bin = atob(j.base64), u8 = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
    const p = await pdfToText(u8.buffer);
    return { name: url, text: p.text, pdfPages: p.pages };
  }
  return { name: j.title ? `${j.title} (${url})` : url, text: j.text };
}
