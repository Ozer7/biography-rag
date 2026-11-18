// Browser client for /api/generate with pacing and retries (the Gemini free tier is rate-limited).
export function makeLlm({ userKey = '', accessCode = '', minIntervalMs = 4000, onStatus } = {}) {
  let last = 0;
  return async function llm({ label, system, prompt, schema }) {
    for (let attempt = 1; attempt <= 6; attempt++) {
      const wait = last + minIntervalMs - Date.now();
      if (wait > 0) { onStatus?.(`${label}: pacing ${Math.ceil(wait / 1000)}s`); await new Promise(r => setTimeout(r, wait)); }
      last = Date.now();
      const headers = { 'content-type': 'application/json' };
      if (userKey) headers['x-user-key'] = userKey;
      if (accessCode) headers['x-access-code'] = accessCode;
      let r, j;
      try {
        r = await fetch('/api/generate', { method: 'POST', headers, body: JSON.stringify({ system, prompt, schema }) });
        j = await r.json().catch(() => ({}));
      } catch (e) { j = { error: e.message }; r = { status: 0 }; }
      if (r.status === 200) return j;
      const retryable = r.status === 429 || r.status === 0 || r.status >= 500;
      if (!retryable || attempt === 6) throw new Error(j.error || `HTTP ${r.status}`);
      const delay = (j.retryAfterSec ? j.retryAfterSec + 1 : Math.min(60, 5 * 2 ** (attempt - 1))) * 1000;
      onStatus?.(`${label}: ${r.status === 429 ? 'rate limited' : 'server error'}, retrying in ${Math.round(delay / 1000)}s (try ${attempt + 1}/6)`);
      await new Promise(res => setTimeout(res, delay));
    }
  };
}
