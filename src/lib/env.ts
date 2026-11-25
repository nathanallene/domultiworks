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
