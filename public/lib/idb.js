// Tiny IndexedDB key-value wrapper (the vector store and past runs live here).
const DB = 'biography-rag', OS = 'kv';
function open() {
  return new Promise((ok, bad) => {
    const r = indexedDB.open(DB, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(OS);
    r.onsuccess = () => ok(r.result); r.onerror = () => bad(r.error);
  });
}
async function tx(mode, fn) {
  const db = await open();
  return new Promise((ok, bad) => {
    const t = db.transaction(OS, mode), req = fn(t.objectStore(OS));
    t.oncomplete = () => ok(req?.result); t.onerror = () => bad(t.error);
  });
}
export const idbGet = k => tx('readonly', s => s.get(k)).catch(() => undefined);
export const idbSet = (k, v) => tx('readwrite', s => s.put(v, k));
export const idbDel = k => tx('readwrite', s => s.delete(k));
