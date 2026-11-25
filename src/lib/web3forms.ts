/*
 * Client-side Web3Forms submit.
 * Free Web3Forms plans reject server-side calls with HTTP 403.
 * Docs: https://docs.web3forms.com/getting-started/troubleshooting
 */
export type Web3FormsPayload = Record<string, string | boolean | undefined>;

export async function sendWeb3Form(payload: Web3FormsPayload): Promise<void> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    throw new Error("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not configured");
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
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
