// Text cleanup and chunking. Each chunk gets a stable ID: D<doc>-C<nnnn>.

export const CHUNK_PARAMS = { targetChars: 1000, maxChars: 1400, overlapChars: 200 };

// Remove Project Gutenberg boilerplate if present (harmless for other texts).
export function stripBoilerplate(text) {
  let t = text.replace(/\r\n?/g, '\n');
  const starts = [...t.matchAll(/\*\*\*\s*START OF (THE|THIS) PROJECT GUTENBERG[\s\S]{0,200}?\*\*\*/gi)];
  if (starts.length) { const m = starts[starts.length - 1]; t = t.slice(m.index + m[0].length); }
  const end = t.search(/\*\*\*\s*END OF (THE|THIS) PROJECT GUTENBERG/i);
  if (end >= 0) t = t.slice(0, end);
  const lic = t.search(/\n\s*End of (the )?Project Gutenberg/i);
  if (lic >= 0) t = t.slice(0, lic);
  return t;
}

// Join hard-wrapped lines into paragraphs. Keeps page markers (\f) as their own paragraphs.
export function toParagraphs(text) {
  const out = [];
  const parts = text.split(/\f(\d*)\n?/); // PDF pages arrive as "\f<page>\n..."
  parts.forEach((part, i) => {
    if (i % 2 === 1) { out.push('\f' + part); return; }
    for (const block of part.split(/\n\s*\n/)) {
      const p = block.replace(/-\n(?=[a-z])/g, '').replace(/\s*\n\s*/g, ' ').replace(/[ \t]+/g, ' ').trim();
      if (p) out.push(p);
    }
  });
  return out;
}

export function splitSentences(p) {
  const parts = p.match(/[^.!?]+(?:[.!?]+["'”’)\]]*|$)\s*/g) || [p];
  // merge tiny fragments like "Mr." / "Dr." splits
  const res = [];
  for (const s of parts) {
    if (res.length && (res[res.length - 1].length < 25 || /\b(Mr|Mrs|Dr|St|Gov|Col|Gen|Capt|Rev|Hon|Messrs|vol|ch|p|i\.e|e\.g)\.\s*$/i.test(res[res.length - 1])))
      res[res.length - 1] += s;
    else res.push(s);
  }
  return res;
}

// docs: [{docNo, name, text}] -> chunks: [{id, doc, docName, idx, text, page}]
export function chunkDocuments(docs, params = CHUNK_PARAMS) {
  const chunks = [];
  for (const d of docs) {
    const paras = toParagraphs(stripBoilerplate(d.text));
    // Flatten to sentence units, remembering the page they started on.
    const units = [];
    let page = null;
    for (const p of paras) {
      if (p.startsWith('\f')) { page = parseInt(p.slice(1), 10) || (page || 0) + 1; continue; }
      const sents = p.length > params.maxChars ? splitSentences(p) : [p];
      sents.forEach((s, i) => {
        // hard split a runaway "sentence"
        for (let k = 0; k < s.length; k += params.maxChars) units.push({ text: s.slice(k, k + params.maxChars).trim(), page, paraStart: i === 0 && k === 0 });
      });
    }
    let cur = [], len = 0, idx = 0;
    const flush = () => {
      if (!cur.length) return;
      const text = cur.map(u => u.text).join(' ');
      // skip near-empty chunks (page numbers, stray headings)
      if (text.replace(/[^A-Za-z]/g, '').length >= 40) {
        chunks.push({ id: `D${d.docNo}-C${String(idx).padStart(4, '0')}`, doc: d.docNo, docName: d.name, idx, text, page: cur[0].page });
        idx++;
      }
      // overlap: carry trailing units up to overlapChars
      const keep = [];
      let kl = 0;
      for (let i = cur.length - 1; i > 0 && kl + cur[i].text.length <= params.overlapChars; i--) { keep.unshift(cur[i]); kl += cur[i].text.length; }
      cur = keep; len = kl;
    };
    for (const u of units) {
      if (len + u.text.length > params.targetChars && len > 0) flush();
      cur.push(u); len += u.text.length + 1;
    }
    flush();
  }
  return chunks;
}

export function estimatePages(text) { return Math.round(text.split(/\s+/).filter(Boolean).length / 300); }
