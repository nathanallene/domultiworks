/*
 * Short-lived cache so rapid remounts (React Strict Mode) reuse the same
 * ipapi lookup instead of skipping the email entirely.
 */
type CachedVisit = {
  at: number;
  payload: Record<string, string>;
};

const cache = new Map<string, CachedVisit>();
const WINDOW_MS = 30_000;

export function getCachedVisit(key: string): Record<string, string> | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.at >= WINDOW_MS) {
    cache.delete(key);
    return null;
  }
  return entry.payload;
}

export function setCachedVisit(key: string, payload: Record<string, string>) {
  const now = Date.now();
  cache.set(key, { at: now, payload });
  for (const [k, entry] of cache) {
    if (now - entry.at >= WINDOW_MS) cache.delete(k);
  }
}

export const CLIENT_VISIT_SENT_KEY = "dw_visit_sent_at";
export const VISIT_WINDOW_MS = WINDOW_MS;
