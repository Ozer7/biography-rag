// Every prompt the app sends to the LLM is built here, so the logs show exactly these strings.

export const NOT_IN_SOURCES = 'not in the sources';

export const ANSWER_SYSTEM = `You answer questions about a person using ONLY the numbered source snippets you are given.
Rules:
1. The snippets are your only knowledge. Do not use anything you know from training, even if you are sure it is true. If a fact is not stated in a snippet, you do not know it.
2. Every sentence you write must end with the IDs of the snippet(s) that support it, and every claim in the sentence must be stated in those snippets.
3. Only cite IDs from the list you were given. Never invent an ID.
4. If the snippets do not answer the question, set "status" to "not_in_sources" and leave "sentences" empty. A passing mention that does not actually answer the question counts as not answering it.
5. If the snippets answer only part of the question, answer that part and name the missing part in "missing".
6. Stay close to what the snippets say. Do not add dates, names, numbers, places or explanations that are not in them. If snippets disagree, say so and cite both.
7. Write plainly, in 2 to 6 sentences.`;

export function answerPrompt(person, question, snippets) {
  const blocks = snippets.map(s => `[${s.id}] (from ${s.docName}${s.page ? `, p. ${s.page}` : ''})\n${s.text}`).join('\n\n');
  return `Person: ${person}
Question: ${question}

Source snippets:
${blocks}

Answer the question using only these snippets. Return JSON matching the schema.`;
}

export const ANSWER_SCHEMA = {
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['answered', 'not_in_sources'] },
    sentences: {
      type: 'array',
      items: {
        type: 'object',
        properties: { text: { type: 'string' }, chunk_ids: { type: 'array', items: { type: 'string' } } },
        required: ['text', 'chunk_ids'],
      },
    },
    missing: { type: 'string' },
  },
  required: ['status', 'sentences'],
};

export const STORY_SYSTEM = `You are writing a short life story of a person from verified notes. Each note is a sentence with the snippet IDs that support it, and the snippets themselves are included.
Rules:
1. Use ONLY facts found in the notes and snippets. Add nothing from your own knowledge: no extra dates, names, places, numbers or explanations.
2. Every sentence in the story must carry the snippet IDs that support it, and those IDs must come from the notes. Do not write sentences without IDs: work transitions into sentences that state facts.
3. Topics marked "not in the sources" are left out of the story completely. Do not mention them or guess at them.
4. Tell it as one story in roughly chronological order, in 4 to 8 paragraphs, warm but factual.`;

export function storyPrompt(person, answered, skipped, snippets) {
  const notes = answered.map(a => `Q${a.n}. ${a.question}\n` + a.sentences.map(s => `- ${s.text} [${s.chunk_ids.join(', ')}]`).join('\n')).join('\n\n');
  const blocks = snippets.map(s => `[${s.id}] ${s.text}`).join('\n\n');
  return `Person: ${person}

Verified notes:
${notes}

Not in the sources (leave out): ${skipped.length ? skipped.map(s => `Q${s.n} ${s.topic}`).join('; ') : 'none'}

Snippets cited in the notes:
${blocks}

Write the story. Return JSON matching the schema.`;
}

export const STORY_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    paragraphs: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          sentences: {
            type: 'array',
            items: {
              type: 'object',
              properties: { text: { type: 'string' }, chunk_ids: { type: 'array', items: { type: 'string' } } },
              required: ['text', 'chunk_ids'],
            },
          },
        },
        required: ['sentences'],
      },
    },
  },
  required: ['title', 'paragraphs'],
};

export const AUDIT_SYSTEM = `You are a strict fact-checker. For each numbered sentence you get the source snippets it cites. Decide whether the snippets alone support it.
- "supported": every claim in the sentence is stated in the cited snippets.
- "partial": the main claim is supported but a detail (a date, name, number, place or description) is not in the snippets.
- "unsupported": the snippets do not support the sentence.
Judge only against the snippets, never against what you know. For partial or unsupported, name the unsupported part in "problem".`;

export function auditPrompt(items) {
  return items.map(it => `#${it.k}: ${it.text}\nCited snippets:\n` + it.snippets.map(s => `[${s.id}] ${s.text}`).join('\n')).join('\n\n---\n\n') +
    '\n\nReturn JSON: one verdict per sentence number.';
}

export const AUDIT_SCHEMA = {
  type: 'object',
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        properties: { k: { type: 'integer' }, verdict: { type: 'string', enum: ['supported', 'partial', 'unsupported'] }, problem: { type: 'string' } },
        required: ['k', 'verdict'],
      },
    },
  },
  required: ['verdicts'],
};
