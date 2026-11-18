# Biography RAG — the life, from the sources

MCON 368 homework. Upload any collection of pages about one person; the app chunks, embeds and stores them, runs 20 fixed questions against the store, and has an LLM write a story **only from the retrieved snippets**. Every sentence carries the chunk ID it came from, and anything the sources don't cover comes back as **"not in the sources."**

**Live site:** https://rag.bluebid.online

## What it does

| Step | How |
|---|---|
| Upload | `.txt`, `.md`, `.html`, `.pdf` (pdf.js), `.docx` (mammoth), or web addresses (fetched by `api/fetch-url.js`). Everything is read in the browser. |
| Chunk | Paragraph/sentence-aware chunks of ~1,000 characters with ~200 characters of overlap. IDs look like `D2-C0153` (document 2, chunk 153). Project Gutenberg boilerplate is stripped. |
| Embed | `all-MiniLM-L6-v2` running **in the browser** with onnxruntime-web in a Web Worker: on the GPU (WebGPU, fp16) when available, otherwise the CPU (WebAssembly, int8, all cores). Both match the published reference embeddings. No API cost per page. Add `?cpu` to the URL to force the CPU. |
| Store | Chunks + vectors are saved in the browser's IndexedDB and can be downloaded/reopened as a `.store.json` file. |
| Retrieve | For each question plus 1–2 extra search phrasings: embeddings (mean-centered cosine, with a hubness correction) + BM25 keywords → reciprocal-rank fusion → MMR → top 8 chunks. |
| Gate | If the best chunk is below a similarity threshold, the answer is "not in the sources" and the LLM is never called. |
| Answer | Gemini receives only the 8 snippets and must return JSON: sentences, each with chunk IDs, or `not_in_sources`. |
| Check | Code checks every sentence: it must cite an ID, the ID must exist and must have been retrieved for that question, and every number and capitalized name in the sentence must appear in the cited chunk. Failing sentences are dropped before the story. |
| Story | Gemini weaves the checked sentences into a story (citing IDs, skipping "not in the sources" topics). The story is checked the same way, then a second **audit** call judges each story sentence against only its cited snippets. |
| Logs | Every query, its search phrasings, retrieved chunk IDs with scores, the gate decision, the exact prompt, the raw response, and the checks. Download as JSON or Markdown. |

## The test corpus — Benjamin Franklin (~1,450 pages)

Six public-domain books from Project Gutenberg, in `public/corpus/franklin/`:

1. *The Autobiography of Benjamin Franklin* (Harvard Classics ed.)
2. Sydney George Fisher, *The True Benjamin Franklin* (1899)
3. William M. Thayer, *From Boyhood to Manhood: Life of Benjamin Franklin* (1889)
4. John S. C. Abbott, *Benjamin Franklin* (1876)
5. Samuel G. Goodrich, *The Life of Benjamin Franklin*
6. Paul Elmer More, *Benjamin Franklin* (1900)

437,000 words ≈ 1,458 pages at 300 words/page → 3,249 chunks.

**Canary questions** (true, but not in this corpus — checked with grep):
- Did Franklin invent bifocal spectacles? (the books mention his spectacles, never the invention)
- Which U.S. banknote carries Franklin's portrait today? (the $100 bill; the books predate it)
- Did Franklin serve on the 1784 commission that investigated Mesmer? (Mesmer is never named)

## Run it yourself

1. Open the site → **Add the 6 books to the list** → **Chunk, embed & store** (a few minutes in the browser), or **Load prebuilt store** for the same store built by `scripts/build-store.mjs`.
2. **Run all 20 queries + canaries + story** (about 3 minutes on the Gemini free tier, which is rate-limited).
3. Read the story (click any chunk ID to see the snippet), the review, and the logs. Download them.

For another person: type their name, drop in their pages, build, and write your own canary questions.

## Deploy (Vercel)

1. Import this repo in Vercel (framework: Other; no build step; `vercel.json` sets everything).
2. Project → Settings → Environment Variables → `GEMINI_API_KEY` = your key from [Google AI Studio](https://aistudio.google.com). Redeploy.
3. Optional: `GEMINI_MODEL` (comma-separated preference list) and `ACCESS_CODE`.
4. Domains → add `rag.bluebid.online`, then add the CNAME record Vercel shows at your DNS provider.

**No keys are in this repo.** The key lives only in Vercel's environment variables; `.env` is git-ignored. Visitors can also paste their own key in Settings.

## Develop and test

```bash
npm install            # dev tools only (onnxruntime-web, pdfjs-dist, mammoth)
npm run vendor         # copy browser libraries into public/vendor
MOCK_LLM=1 node scripts/dev-server.mjs          # UI with a fake LLM, no key needed
GEMINI_API_KEY=... node scripts/dev-server.mjs  # real Gemini
node scripts/test-pipeline.mjs          # full pipeline with an honest fake LLM
node scripts/test-pipeline.mjs --cheat  # fake LLM that slips in outside facts → the checker must flag them
node scripts/check-tokenizer.mjs        # tokenizer vs. Hugging Face reference (see script)
node scripts/eval-retrieval.mjs         # rough retrieval precision, used to tune the settings
npm run build-store                     # rebuild public/demo/franklin.store.json
```

## Layout

```
api/generate.js        Gemini proxy (key from env), JSON-schema output, model fallback
api/fetch-url.js       fetch a web page or PDF for the corpus
public/index.html      the app            public/app.js   UI logic
public/embed-worker.js embedding in a Web Worker
public/lib/            chunker, tokenizer, embedder, bm25, retrieve, queries, prompts, verify, pipeline, report
public/models/minilm/  all-MiniLM-L6-v2 ONNX (int8 for CPU, fp16 for GPU) + vocab (Apache-2.0)
public/corpus/         the Franklin test corpus      public/demo/  prebuilt store
public/runs/           published run logs (story, logs, review)
scripts/               build, test and evaluation tools
```
