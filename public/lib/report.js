// Turns a run (the JSON log) into human-readable Markdown: story, review, and per-query logs.

const cite = ids => ids && ids.length ? ` [${ids.join(', ')}]` : ' [NO CITATION]';
const mark = v => v.level === 'flag' ? ' ⚠️FLAG' : v.level === 'warn' ? ' (warn)' : '';

export function storyMarkdown(run) {
  const s = run.story || {};
  let md = `# ${s.title || run.person}\n\n`;
  for (const p of s.paragraphs || []) md += p.sentences.map(v => v.text + cite(v.chunk_ids) + mark(v)).join(' ') + '\n\n';
  if (s.skipped_topics?.length) md += `_Not in the sources, so left out of the story: ${s.skipped_topics.join('; ')}._\n`;
  return md;
}

export function reviewMarkdown(run) {
  const r = run.review || {};
  let md = `## Log review (automatic)\n\n`;
  md += `- Queries answered from the sources: **${r.queries_answered}/20**\n`;
  md += `- "Not in the sources": ${r.queries_not_in_sources?.length ? r.queries_not_in_sources.join(', ') : 'none'}`;
  md += r.skipped_by_gate?.length ? ` (skipped by the retrieval gate without calling the LLM: ${r.skipped_by_gate.join(', ')})\n` : '\n';
  md += `- Sentences checked (answers + story): ${r.sentences_total} → ${r.ok} ok, ${r.warn} warnings, ${r.flag} flagged\n`;
  md += `- Story sentences with a valid chunk ID: **${r.story_sentences_traced}/${r.story_sentences}**\n`;
  md += `- Answer sentences dropped before the story because they failed checks: ${r.dropped_before_story?.length || 0}\n`;
  if (run.audit?.verdicts?.length) {
    const c = k => run.audit.verdicts.filter(v => v.verdict === k).length;
    md += `- LLM audit of the story (second pass, snippets only): ${c('supported')} supported, ${c('partial')} partial, ${c('unsupported')} unsupported\n`;
  }
  md += `\n### Canary test\n\n`;
  for (const c of r.canaries || []) md += `- ${c.pass ? '✅ PASS' : '❌ FAIL'} — ${c.question} → **${c.result === 'not_in_sources' ? 'not in the sources' : c.result}** (${c.note})\n`;
  if (r.flagged?.length) {
    md += `\n### Flagged sentences\n\n`;
    for (const f of r.flagged) md += `- **${f.where}** (${f.level}): ${f.text}\n  - ${f.flags.join('\n  - ')}\n`;
  }
  if (run.audit?.verdicts?.some(v => v.verdict !== 'supported')) {
    md += `\n### Audit: sentences not fully supported\n\n`;
    for (const v of run.audit.verdicts.filter(v => v.verdict !== 'supported')) md += `- (${v.verdict}) ${v.text}\n  - ${v.problem || ''}\n`;
  }
  return md;
}

function queryBlock(q, store) {
  let md = `### ${q.kind === 'canary' ? 'Canary ' + q.n : 'Q' + q.n}. ${q.question}\n\n`;
  md += `**Status:** ${q.status === 'not_in_sources' ? 'not in the sources' : q.status}${q.reason ? ' — ' + q.reason : ''}${q.error ? ' — ' + q.error : ''}\n\n`;
  md += `**Search phrasings:** ${q.search_phrasings.map(p => `“${p}”`).join(' · ')}\n\n`;
  md += `**Retrieval gate:** best cosine ${q.gate.maxDense} (min ${q.gate.minDense}), best BM25 ${q.gate.maxBm25} (min ${q.gate.minBm25}) → ${q.gate.passed ? 'passed' : 'blocked'}\n\n`;
  md += `**Retrieved chunk IDs:**\n\n| rank | chunk | cosine | centered | BM25 | preview |\n|---|---|---|---|---|---|\n`;
  for (const r of q.retrieved) {
    const t = store?.chunks?.[store.byId?.get(r.id)]?.text || '';
    md += `| ${r.rank} | ${r.id}${r.nav ? ' (nav)' : ''} | ${r.dense} | ${r.centered ?? ''} | ${r.bm25} | ${t.slice(0, 90).replace(/\s+/g, ' ').replace(/\|/g, '/')}… |\n`;
  }
  if (q.verified?.length) {
    md += `\n**Answer (each sentence checked):**\n\n`;
    for (const v of q.verified) md += `- ${v.text}${cite(v.chunk_ids)}${mark(v)}${v.flags.length ? '\n  - ' + v.flags.map(f => `${f.type}: ${f.detail}`).join('\n  - ') : ''}\n`;
  }
  if (q.missing) md += `\n_Missing from the sources (per the model): ${q.missing}_\n`;
  if (q.prompt) md += `\n<details><summary>Prompt sent (${q.model || ''})</summary>\n\n\`\`\`text\nSYSTEM:\n${q.prompt.system}\n\nUSER:\n${q.prompt.user}\n\`\`\`\n\n**Raw response:**\n\n\`\`\`json\n${q.raw_response}\n\`\`\`\n</details>\n`;
  return md + '\n';
}

export function fullReport(run, store) {
  let md = `# Biography RAG run — ${run.person}\n\n`;
  md += `Run ${run.run_id} · ${run.created} · app v${run.app_version}\n\n`;
  md += `Corpus: ${run.corpus.docs.length} documents, ~${run.corpus.docs.reduce((a, d) => a + (d.pages || 0), 0)} pages, ${run.corpus.chunk_count} chunks · embeddings: ${run.corpus.embed_model}\n\n`;
  md += run.corpus.docs.map(d => `- D${d.docNo}: ${d.name} (~${d.pages} pages)`).join('\n') + '\n\n';
  md += `---\n\n${storyMarkdown(run)}\n---\n\n${reviewMarkdown(run)}\n---\n\n## Query logs\n\n`;
  for (const q of run.queries) md += queryBlock(q, store);
  md += `## Canary logs\n\n`;
  for (const q of run.canaries) md += queryBlock(q, store);
  if (run.story?.prompt) md += `## Story prompt\n\n<details><summary>Prompt sent (${run.story.model || ''})</summary>\n\n\`\`\`text\nSYSTEM:\n${run.story.prompt.system}\n\nUSER:\n${run.story.prompt.user}\n\`\`\`\n\n**Raw response:**\n\n\`\`\`json\n${run.story.raw_response}\n\`\`\`\n</details>\n\n`;
  if (run.audit?.prompt) md += `## Audit prompt\n\n<details><summary>Prompt sent</summary>\n\n\`\`\`text\nSYSTEM:\n${run.audit.prompt.system}\n\nUSER:\n${run.audit.prompt.user}\n\`\`\`\n\n**Raw response:**\n\n\`\`\`json\n${run.audit.raw_response}\n\`\`\`\n</details>\n`;
  return md;
}
