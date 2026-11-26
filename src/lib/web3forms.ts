/*
 * Client-side Web3Forms submit.
 * Free Web3Forms plans reject server-side calls with HTTP 403.
 * The access key is safe to expose in the browser (Web3Forms design).
 * Docs: https://docs.web3forms.com/getting-started/troubleshooting
 */
export type Web3FormsPayload = Record<string, string | boolean | undefined>;

// Prefer Vercel/env when present; fallback keeps production working if env was not applied.
const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim() ||
  "a6d9a867-4dc8-4bc8-aa37-a7882d29cba4";

export async function sendWeb3Form(payload: Web3FormsPayload): Promise<void> {
  if (!WEB3FORMS_ACCESS_KEY) {
    throw new Error("Web3Forms access key is not configured");
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: WEB3FORMS_ACCESS_KEY,
      ...payload,
    }),
  });

  const data = (await response.json().catch(() => null)) as {
    success?: boolean;
    message?: string;
  } | null;

  if (!response.ok || !data?.success) {
    throw new Error(data?.message || `Web3Forms returned ${response.status}`);
  }
}
