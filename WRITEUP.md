# Biography RAG — what I did

**Live site:** https://rag.bluebid.online · **Repo:** https://github.com/Ozer7/biography-rag (no keys in it)
**Story, logs, review:** [public/runs/](public/runs/) — also viewable on the site ("view the sample Franklin run").

## The build

- **Upload anything.** TXT, Markdown, HTML, PDF (pdf.js), Word (mammoth) or web addresses. Everything is read in the browser; Project Gutenberg boilerplate is stripped.
- **Chunk.** Paragraph- and sentence-aware chunks of ~1,000 characters with ~200 characters of overlap. Every chunk gets a stable ID like `D2-C0153` (document 2, chunk 153).
- **Embed and store, in the browser.** all-MiniLM-L6-v2 runs locally with onnxruntime-web, so 1,500 pages cost nothing and the professor's unseen corpus works the same way. I checked the model's output against the published reference values and checked my JavaScript tokenizer against Hugging Face's on 1,046 passages (0 mismatches). The store lives in IndexedDB and can be downloaded and reopened.
- **Fast.** On my laptop the Franklin corpus (3,249 chunks) first took 538 s. I made it use all CPU cores, sort chunks by length so batches waste less padding, and run the GPU (WebGPU, fp16 model) and the CPU at the same time: **194 s**.
- **Retrieve.** Each question plus 2 extra phrasings → embeddings + BM25 keywords → reciprocal-rank fusion → MMR → top 8 chunks. Two fixes came from measuring: in a corpus about one person every chunk looks alike, so I subtract the corpus-average vector before comparing, and I subtract each chunk's average similarity to all 20 questions ("hubness") so summary paragraphs stop crowding out real answers. A rough keyword check rose from 76% to 84% relevant chunks.
- **Snippets are the only source.** The LLM (Gemini Flash-Lite, free tier) gets only the 8 snippets and must return JSON: sentences with chunk IDs, or `not_in_sources`. If retrieval finds nothing similar enough, the LLM isn't called at all.
- **Code checks every sentence.** It must cite an ID that exists and was retrieved for that question, and every number and capitalized name in it must appear in the cited chunk. Failing sentences are dropped before the story. The story is checked the same way, then a second LLM call audits each story sentence against only its snippets.
- **Logs.** Every query: its search phrasings, the 8 chunk IDs with scores, the gate decision, the exact prompt, the raw response, and the checks. JSON and Markdown.

## Testing before it was live

- A fake LLM that cheats on purpose (invented dates and street names, a made-up chunk ID, an uncited sentence, the bifocals claim): the checker caught all of them and kept them out of the story.
- Canaries, chosen by grepping the corpus for true facts it never mentions: Franklin invented bifocals (the books mention his spectacles, never the invention — a good trap), his face is on the $100 bill, and he sat on the 1784 commission that investigated Mesmer.

## The live run and what my review of the logs found

Run on the live site, Nov 18 2026, on a store built in my browser from the 6 books (3,249 chunks, 194 s). 25 LLM calls, all by Gemini Flash-Lite (`gemini-flash-lite-latest`, one call by `gemini-3.5-flash-lite`).

| | Result |
|---|---|
| Questions answered from the sources | **19 / 20** — Q11 "hardest thing" came back *not in the sources* |
| Story sentences with a valid chunk ID | **17 / 17** |
| Sentences checked by code (answers + story) | 75 → 71 ok, 2 warnings, 2 flagged |
| Second-pass LLM audit of the story | 17 supported, 0 partial, 0 unsupported |
| Canary test | **3 / 3** answered *not in the sources* (bifocals, $100 bill, Mesmer commission) |

**What my review of the logs found** (I read every story sentence next to the chunks it cites):

1. **No training-data leaks found.** Every fact in the story is in the corpus. Each canary got real snippets back (spectacles, paper money), and the model still said *not in the sources* instead of using what it knows.
2. **2 citation slips, caught by the checker.** "His father, **Josiah** Franklin…" cites D6-C0004 and D5-C0010, which never say "Josiah"; the name is in D3-C0057, cited in the very next sentence. "…married **Deborah** Read" cites D6-C0065 and D6-C0067, which say "Mrs. Franklin"; Q12's answer had it right, citing D4-C0194, but the story rewrote the sentence and dropped that ID. The facts are true and in the corpus; the chunk IDs are wrong. That's exactly the kind of error the per-sentence check is there to catch.
3. **2 warnings, both fine on inspection.** Q18 ("London, the west of England, and Wales") and the kite sentence are worded differently from their chunks but say the same thing.
4. **1 retrieval miss.** Q11 got 8 snippets that weren't really about hardship (his father's death notice, his own last illness), so *not in the sources* was the honest answer. But the Autobiography does say "In 1736 I lost one of my sons… by the small-pox" — that chunk just wasn't retrieved. A vague question like "the hardest thing" is the weak spot of this retrieval.
5. **The sources disagree on his birthday** (Jan 6 old style vs. Jan 17), and the story reports both, citing each.

The published log was exported from the browser in compact form (prompts replaced by SHA-256 fingerprints) and rebuilt with `scripts/rebuild-log.mjs` from the same corpus and code; all 25 prompts and the chunk texts matched their fingerprints exactly.

## Problems I hit

- `gemini-2.5-flash` is no longer available to new API keys, and the newer Flash models were overloaded during my run. The server now tries a list of models, skips overloaded ones, gives each request its own timeout and caps output length (one prompt made a model generate until the 60-second function limit). Each log entry records which model answered.
- Vercel's function limit and Gemini's free-tier rate limits mean a run takes ~4 minutes; the app paces calls and retries automatically.
