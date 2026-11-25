"use client";

import { useEffect } from "react";
import { sendWeb3Form } from "@/lib/web3forms";
import { CLIENT_VISIT_SENT_KEY, VISIT_WINDOW_MS } from "@/lib/visit-dedupe";

/*
 * 1) Ask /api/visit for IP details (server holds the ipapi key).
 * 2) Email via Web3Forms from the browser (required on the free plan).
 * 3) sessionStorage blocks repeat emails within 30 seconds for this browser.
 */
export function VisitorTracker() {
  useEffect(() => {
    let active = true;

    async function reportVisit() {
      const lastSent = Number(sessionStorage.getItem(CLIENT_VISIT_SENT_KEY) || "0");
      if (Date.now() - lastSent < VISIT_WINDOW_MS) {
        return;
      }

      const response = await fetch("/api/visit", {
        method: "POST",
        credentials: "same-origin",
        headers: { Accept: "application/json" },
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        skipped?: boolean;
        payload?: Record<string, string>;
      } | null;

      if (!active) return;
      if (!response.ok || !data?.ok || data.skipped || !data.payload) {
        console.warn("[visit] lookup skipped or failed", data);
        return;
      }

      // Claim the 30s window before awaiting email so Strict Mode remounts don't double-send.
      sessionStorage.setItem(CLIENT_VISIT_SENT_KEY, String(Date.now()));

      await sendWeb3Form(data.payload);
      console.info("[visit] visitor email submitted to Web3Forms");
    }

    reportVisit().catch((error) => {
      console.error("[visit] failed to send visitor email", error);
      sessionStorage.removeItem(CLIENT_VISIT_SENT_KEY);
    });

    return () => {
      active = false;
    };
  }, []);

  return null;
}
