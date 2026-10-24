"use client";

import { useState } from "react";

export function CopyLinkButton({ path, label = "Copy exhibit link" }: { path: string; label?: string }) {
  const [status, setStatus] = useState("");

  async function copy() {
    const url = new URL(path, window.location.origin).toString();
    try {
      await navigator.clipboard.writeText(url);
      setStatus("Link copied to clipboard.");
    } catch {
      // Clipboard can be unavailable (insecure context, denied permission).
      window.prompt("Copy this exhibit link:", url);
      setStatus("");
    }
    window.setTimeout(() => setStatus(""), 4000);
  }

  return (
    <span>
      <button type="button" className="btn" onClick={copy}>
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6.5 9.5l3-3M7 4.5l1.2-1.2a2.6 2.6 0 013.6 3.6L10.5 8.2M9 11.5l-1.2 1.2a2.6 2.6 0 01-3.6-3.6L5.5 7.8" />
        </svg>
        {label}
      </button>
      <span className="copy-status" role="status" aria-live="polite">{status}</span>
    </span>
  );
}
