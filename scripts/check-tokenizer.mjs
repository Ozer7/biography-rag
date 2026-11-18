// Prints token ids for sample paragraphs so check_tokenizer.py can compare them
// with the reference Hugging Face tokenizer.
import fs from 'node:fs';
import { WordPieceTokenizer } from '../public/lib/tokenizer.js';
const tok = new WordPieceTokenizer(fs.readFileSync(new URL('../public/models/minilm/vocab.txt', import.meta.url), 'utf8'));
const dir = new URL('../public/corpus/franklin/', import.meta.url);
const paras = [];
for (const f of fs.readdirSync(dir)) paras.push(...fs.readFileSync(new URL(f, dir), 'utf8').split(/\n\s*\n/).filter(p => p.trim()));
const extra = ['Café naïve résumé — “quotes” & ½ 中文 test', 'Hello!!! U.S.A. $100... e-mail: x@y.com', 'Ἀθῆναι Ærø ﬁne'];
const sample = [...extra, ...paras.filter((_, i) => i % 7 === 0)];
fs.writeFileSync('/tmp/tok_js.json', JSON.stringify(sample.map(t => ({ t, ids: tok.encode(t, 100000) }))));
console.log('wrote', sample.length);
