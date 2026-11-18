// Vercel serverless function: forwards one prompt to Gemini and returns its JSON text.
// The API key lives in the GEMINI_API_KEY environment variable (never in the repo).
// A visitor may instead send their own key in the "x-user-key" header.

// Tried in order. A model that is missing, has no free quota, or is overloaded (503) is skipped.
const PREFERRED = (process.env.GEMINI_MODEL || 'gemini-flash-lite-latest,gemini-3.5-flash-lite,gemini-flash-latest,gemini-3.8-flash')
  .split(',').map(s => s.trim()).filter(Boolean);
let workingModel = null; // remembered per warm instance

async function callGemini(model, key, body, timeoutMs) {
  // A hung request must not use up the function's 60 s limit, so each call gets its own timeout.
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify(body),
      signal: ctl.signal,
    });
    const data = await r.json().catch(() => ({}));
    return { status: r.status, data };
  } catch (e) {
    return { status: 503, data: { error: { message: e.name === 'AbortError' ? `timed out after ${timeoutMs / 1000}s` : e.message } } };
  } finally { clearTimeout(timer); }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const key = (req.headers['x-user-key'] || '').trim() || process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: 'No Gemini API key. Set GEMINI_API_KEY in Vercel, or paste your own key in the app.' });
  if (process.env.ACCESS_CODE && req.headers['x-access-code'] !== process.env.ACCESS_CODE && !req.headers['x-user-key'])
    return res.status(401).json({ error: 'Access code required.' });

  const { system, prompt, schema, temperature = 0.2, maxTokens = 4096 } = req.body || {};
  if (!prompt || typeof prompt !== 'string') return res.status(400).json({ error: 'Missing prompt' });
  if (prompt.length > 400000) return res.status(413).json({ error: 'Prompt too long' });

  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature, maxOutputTokens: Math.min(16384, +maxTokens || 4096), responseMimeType: 'application/json', ...(schema ? { responseSchema: schema } : {}) },
  };
  if (system) body.systemInstruction = { parts: [{ text: system }] };

  const models = workingModel ? [workingModel, ...PREFERRED.filter(m => m !== workingModel)] : PREFERRED;
  let last = null;
  const t0 = Date.now();
  for (const model of models) {
    const left = 52000 - (Date.now() - t0); // stay inside the function's 60 s limit
    if (left < 8000) break;
    let { status, data } = await callGemini(model, key, body, Math.min(30000, left));
    if (status === 400 && body.generationConfig.responseSchema && /schema|response_schema|responseSchema/i.test(data.error?.message || '')) {
      // Older/other models may reject the schema: retry once with plain JSON mode.
      delete body.generationConfig.responseSchema;
      ({ status, data } = await callGemini(model, key, body, Math.min(30000, 52000 - (Date.now() - t0))));
    }
    if (status === 200) {
      workingModel = model;
      const cand = data.candidates?.[0];
      const text = (cand?.content?.parts || []).map(p => p.text || '').join('');
      return res.status(200).json({ text, model, finishReason: cand?.finishReason, usage: data.usageMetadata || null });
    }
    const msg = data.error?.message || `HTTP ${status}`;
    last = { status, msg, model };
    // Try the next model if this one is missing, has no free quota at all, or is overloaded.
    const noModel = status === 404 || /not found|not supported|no longer available/i.test(msg);
    const zeroQuota = status === 429 && /limit:\s*0\b/.test(msg);
    const overloaded = status === 503 || status === 500;
    if (!(noModel || zeroQuota || overloaded)) break;
  }
  const retry = /retry in ([\d.]+)s/i.exec(last.msg);
  if (!last) return res.status(503).json({ error: 'Timed out trying models', retryAfterSec: 10 });
  return res.status(last.status === 429 ? 429 : last.status === 503 ? 503 : 502).json({ error: last.msg, model: last.model, retryAfterSec: retry ? Math.ceil(+retry[1]) : null });
}
