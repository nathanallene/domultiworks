/*
 * Read server env at runtime. Prefer bracket access so a missing value at
 * build time is not permanently inlined as undefined in the server bundle.
 */
export function getServerEnv(name: string): string | undefined {
  const value = process.env[name];
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

/*
 * Production fallback: Vercel env for this project was not applied
 * (GET /api/visit reported IPAPI_API_KEY: false). Env still wins when set.
 */
export function getIpApiKey(): string {
  return getServerEnv("IPAPI_API_KEY") || "03792cbcdc9d7058db04";
}
