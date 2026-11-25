import { NextRequest, NextResponse } from "next/server";
import { COMPANY } from "@/lib/constants";
import { getServerEnv } from "@/lib/env";
import { getCachedVisit, setCachedVisit } from "@/lib/visit-dedupe";

export const runtime = "nodejs";

type IpApiResponse = {
  ip?: string;
  company?: { name?: string; type?: string };
  asn?: { asn?: string; org?: string; route?: string };
  location?: {
    city?: string;
    state?: string;
    country?: string;
    country_code?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
  };
  is_vpn?: boolean;
  is_proxy?: boolean;
  is_tor?: boolean;
  is_datacenter?: boolean;
  is_abuser?: boolean;
  is_mobile?: boolean;
  is_crawler?: boolean;
};

function normalizeIp(ip: string): string {
  const trimmed = ip.trim();
  if (trimmed.toLowerCase().startsWith("::ffff:")) {
    return trimmed.slice(7);
  }
  return trimmed;
}

function isLocalOrPrivateIp(ip: string): boolean {
  if (!ip || ip === "unknown") return true;
  const lower = ip.toLowerCase();
  if (lower === "::1" || lower === "127.0.0.1" || lower === "localhost") return true;
  if (lower.startsWith("10.") || lower.startsWith("192.168.") || lower.startsWith("169.254.")) {
    return true;
  }
  const match = /^172\.(\d+)\./.exec(lower);
  if (match) {
    const second = Number(match[1]);
    if (second >= 16 && second <= 31) return true;
  }
  return false;
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0];
    if (first) return normalizeIp(first);
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return normalizeIp(realIp);
  return "unknown";
}

function formatVisitorMessage(data: IpApiResponse, ip: string): string {
  const loc = data.location ?? {};
  const company = data.company ?? {};
  const asn = data.asn ?? {};

  return [
    "New website visitor",
    "",
    `IP: ${data.ip ?? ip}`,
    `City: ${loc.city ?? "Unknown"}`,
    `Region: ${loc.state ?? "Unknown"}`,
    `Country: ${loc.country ?? "Unknown"} (${loc.country_code ?? "?"})`,
    `Timezone: ${loc.timezone ?? "Unknown"}`,
    `Coordinates: ${loc.latitude ?? "?"}, ${loc.longitude ?? "?"}`,
    "",
    `Company: ${company.name ?? "Unknown"}`,
    `Company type: ${company.type ?? "Unknown"}`,
    `ASN: ${asn.asn ?? "Unknown"} (${asn.org ?? "Unknown"})`,
    `Route: ${asn.route ?? "Unknown"}`,
    "",
    `VPN: ${data.is_vpn ? "Yes" : "No"}`,
    `Proxy: ${data.is_proxy ? "Yes" : "No"}`,
    `Tor: ${data.is_tor ? "Yes" : "No"}`,
    `Datacenter: ${data.is_datacenter ? "Yes" : "No"}`,
    `Mobile: ${data.is_mobile ? "Yes" : "No"}`,
    `Crawler: ${data.is_crawler ? "Yes" : "No"}`,
    `Abuser: ${data.is_abuser ? "Yes" : "No"}`,
    "",
    `Time (UTC): ${new Date().toISOString()}`,
  ].join("\n");
}

/*
 * Looks up the visitor with ipapi.is and returns a Web3Forms-ready payload.
 * Email is sent from the browser. Duplicate emails are filtered client-side
 * (sessionStorage, 30s) so React Strict Mode remounts still get a payload.
 */
export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const cacheKey = isLocalOrPrivateIp(ip) ? "local" : ip;

  const cached = getCachedVisit(cacheKey);
  if (cached) {
    return NextResponse.json({ ok: true, skipped: false, payload: cached });
  }

  const apiKey = getServerEnv("IPAPI_API_KEY");
  if (!apiKey) {
    console.error("Visit tracking is missing IPAPI_API_KEY");
    return NextResponse.json(
      {
        ok: false,
        error: "not_configured",
        missing: ["IPAPI_API_KEY"],
        hint: "Set IPAPI_API_KEY in Vercel → Settings → Environment Variables for Production, then Redeploy.",
      },
      { status: 500 },
    );
  }

  try {
    const lookupUrl = new URL("https://api.ipapi.is/");
    if (!isLocalOrPrivateIp(ip)) {
      lookupUrl.searchParams.set("q", ip);
    }
    lookupUrl.searchParams.set("key", apiKey);

    const lookupRes = await fetch(lookupUrl.toString(), {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!lookupRes.ok) {
      const errorBody = await lookupRes.text().catch(() => "");
      throw new Error(
        `ipapi.is returned ${lookupRes.status}${errorBody ? `: ${errorBody}` : ""}`,
      );
    }

    const data = (await lookupRes.json()) as IpApiResponse;
    const location = data.location ?? {};
    const place =
      [location.city, location.country].filter(Boolean).join(", ") || "Unknown";

    const payload = {
      subject: `New website visitor — ${place}`,
      from_name: COMPANY.name,
      name: "Website visitor",
      email: COMPANY.email,
      replyto: COMPANY.email,
      message: formatVisitorMessage(data, ip),
      "Visitor IP": data.ip ?? ip,
      City: location.city ?? "Unknown",
      Country: location.country ?? "Unknown",
      Company: data.company?.name ?? "Unknown",
    };

    setCachedVisit(cacheKey, payload);

    return NextResponse.json({
      ok: true,
      skipped: false,
      payload,
    });
  } catch (error) {
    console.error("Visit tracking failed:", error);
    return NextResponse.json({ ok: false, error: "failed" }, { status: 500 });
  }
}

/* Safe diagnostics: shows which env vars exist, never their values. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    env: {
      IPAPI_API_KEY: Boolean(getServerEnv("IPAPI_API_KEY")),
      NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: Boolean(
        getServerEnv("NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY"),
      ),
    },
  });
}

