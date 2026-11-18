// Vercel serverless function: forwards one prompt to Gemini and returns its JSON text.
// The API key lives in the GEMINI_API_KEY environment variable (never in the repo).
// A visitor may instead send their own key in the "x-user-key" header.

const PREFERRED = (process.env.GEMINI_MODEL || 'gemini-2.5-flash,gemini-flash-latest,gemini-2.5-flash-lite,gemini-2.0-flash')
  .split(',').map(s => s.trim()).filter(Boolean);
let workingModel = null; // remembered per warm instance

async function callGemini(model, key, body) {
  const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-goog-api-key': key },
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => ({}));
  return { status: r.status, data };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });
  const key = (req.headers['x-user-key'] || '').trim() || process.env.GEMINI_API_KEY;
  if (!key) return res.status(500).json({ error: 'No Gemini API key. Set GEMINI_API_KEY in Vercel, or paste your own key in the app.' });
  if (process.env.ACCESS_CODE && req.headers['x-access-code'] !== process.env.ACCESS_CODE && !req.headers['x-user-key'])
    return res.status(401).json({ error: 'Access code required.' });

  const { system, prompt, schema, temperature = 0.2 } = req.body || {};
  if (!prompt || typeof prompt !== 'string') return res.status(400).json({ error: 'Missing prompt' });
  if (prompt.length > 400000) return res.status(413).json({ error: 'Prompt too long' });

  const body = {
    contents: [{ role: 'user', parts: [{ text: prompt }] }],
    generationConfig: { temperature, responseMimeType: 'application/json', ...(schema ? { responseSchema: schema } : {}) },
  };
  if (system) body.systemInstruction = { parts: [{ text: system }] };

  const models = workingModel ? [workingModel, ...PREFERRED.filter(m => m !== workingModel)] : PREFERRED;
  let last = null;
  for (const model of models) {
    let { status, data } = await callGemini(model, key, body);
    if (status === 400 && body.generationConfig.responseSchema && /schema|response_schema|responseSchema/i.test(data.error?.message || '')) {
      // Older/other models may reject the schema: retry once with plain JSON mode.
      delete body.generationConfig.responseSchema;
      ({ status, data } = await callGemini(model, key, body));
    }
    if (status === 200) {
      workingModel = model;
      const cand = data.candidates?.[0];
      const text = (cand?.content?.parts || []).map(p => p.text || '').join('');
      return res.status(200).json({ text, model, finishReason: cand?.finishReason, usage: data.usageMetadata || null });
    }
    const msg = data.error?.message || `HTTP ${status}`;
    last = { status, msg, model };
    // Try the next model only if this one is missing or has no free quota at all.
    const noModel = status === 404 || /not found|not supported/i.test(msg);
    const zeroQuota = status === 429 && /limit:\s*0\b/.test(msg);
    if (!(noModel || zeroQuota)) break;
  }
  const retry = /retry in ([\d.]+)s/i.exec(last.msg);
  return res.status(last.status === 429 ? 429 : 502).json({ error: last.msg, model: last.model, retryAfterSec: retry ? Math.ceil(+retry[1]) : null });
}
