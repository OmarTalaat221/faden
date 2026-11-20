"use client";

import { useEffect, useState } from "react";

import { PREVIEW_MESSAGE, PREVIEW_READY } from "@/lib/preview/bridge";

/**
 * The record this preview is drawing: what the page was saved as, replaced by
 * whatever the dashboard last posted.
 *
 * Starting from the saved record rather than from nothing means the preview
 * is a real page the moment it loads, instead of a blank panel waiting for
 * someone to type.
 */
export default function useDraft(initial) {
  const [draft, setDraft] = useState(initial);

  useEffect(() => {
    function onMessage(event) {
      if (event.data?.type !== PREVIEW_MESSAGE) return;
      if (event.data.project) setDraft(event.data.project);
    }

    window.addEventListener("message", onMessage);
    // The editor may have posted a draft before this page was listening.
    window.parent?.postMessage({ type: PREVIEW_READY }, "*");

    return () => window.removeEventListener("message", onMessage);
  }, []);

  return draft;
}
