// BERT uncased WordPiece tokenizer (same rules as Hugging Face BertNormalizer +
// BertPreTokenizer + WordPiece), used for all-MiniLM-L6-v2. Works in the browser
// and in Node. Verified token-for-token against the `tokenizers` library
// (see scripts/check-tokenizer.mjs).

export class WordPieceTokenizer {
  constructor(vocabText) {
    this.vocab = new Map();
    vocabText.split('\n').forEach((tok, i) => { if (tok !== '' || i === 0) this.vocab.set(tok, i); });
    this.cls = this.vocab.get('[CLS]');
    this.sep = this.vocab.get('[SEP]');
    this.unk = this.vocab.get('[UNK]');
    this.cache = new Map();
  }

  static isPunct(ch) {
    const c = ch.codePointAt(0);
    if ((c >= 33 && c <= 47) || (c >= 58 && c <= 64) || (c >= 91 && c <= 96) || (c >= 123 && c <= 126)) return true;
    return /\p{P}/u.test(ch);
  }
  static isCJK(c) {
    return (c >= 0x4E00 && c <= 0x9FFF) || (c >= 0x3400 && c <= 0x4DBF) || (c >= 0x20000 && c <= 0x2A6DF) ||
      (c >= 0x2A700 && c <= 0x2B73F) || (c >= 0x2B740 && c <= 0x2B81F) || (c >= 0x2B820 && c <= 0x2CEAF) ||
      (c >= 0xF900 && c <= 0xFAFF) || (c >= 0x2F800 && c <= 0x2FA1F);
  }

  normalize(text) {
    let out = '';
    for (const ch of text) {
      const c = ch.codePointAt(0);
      if (c === 0 || c === 0xFFFD) continue;
      if (ch === '\t' || ch === '\n' || ch === '\r' || /\s/u.test(ch)) { out += ' '; continue; }
      if (/\p{Cc}|\p{Cf}/u.test(ch)) continue; // control chars
      if (WordPieceTokenizer.isCJK(c)) { out += ' ' + ch + ' '; continue; }
      out += ch;
    }
    // lowercase + strip accents
    return out.toLowerCase().normalize('NFD').replace(/\p{Mn}/gu, '');
  }

  preTokenize(text) {
    const words = [];
    for (const w of text.split(' ')) {
      if (!w) continue;
      let cur = '';
      for (const ch of w) {
        if (WordPieceTokenizer.isPunct(ch)) { if (cur) words.push(cur); words.push(ch); cur = ''; }
        else cur += ch;
      }
      if (cur) words.push(cur);
    }
    return words;
  }

  wordPiece(word) {
    const hit = this.cache.get(word);
    if (hit) return hit;
    const chars = Array.from(word);
    let res;
    if (chars.length > 100) res = [this.unk];
    else {
      res = [];
      let start = 0;
      while (start < chars.length) {
        let end = chars.length, found = null;
        while (start < end) {
          let sub = chars.slice(start, end).join('');
          if (start > 0) sub = '##' + sub;
          if (this.vocab.has(sub)) { found = this.vocab.get(sub); break; }
          end--;
        }
        if (found === null) { res = [this.unk]; break; }
        res.push(found);
        start = end;
      }
    }
    if (this.cache.size < 50000) this.cache.set(word, res);
    return res;
  }

  // Returns ids with [CLS] ... [SEP], truncated to maxLen total tokens.
  encode(text, maxLen = 256) {
    const ids = [this.cls];
    for (const w of this.preTokenize(this.normalize(text))) {
      for (const id of this.wordPiece(w)) {
        if (ids.length >= maxLen - 1) { ids.push(this.sep); return ids; }
        ids.push(id);
      }
    }
    ids.push(this.sep);
    return ids;
  }
}
