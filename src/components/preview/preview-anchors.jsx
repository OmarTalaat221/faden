"use client";

import { useEffect } from "react";

import { ANCHOR_ATTRIBUTE, PREVIEW_FOCUS } from "@/lib/preview/bridge";

/**
 * Lets the dashboard point at a part of this page.
 *
 * Someone editing their own site is looking at a form of boxes on one side
 * and a page of words on the other, with nothing saying which box writes
 * which words. Clicking into a field posts the name of a block here, and the
 * page scrolls to it and rings it for a moment.
 *
 * Mounted on every page. On the public site nothing ever posts to it, so it
 * adds one idle listener and does nothing else; that is cheaper than a second
 * copy of the layout to avoid it.
 */
export default function PreviewAnchors() {
  useEffect(() => {
    let timer;

    function show(anchor) {
      if (!anchor) return;
      const target = document.querySelector(
        `[${ANCHOR_ATTRIBUTE}="${anchor}"]`,
      );
      if (!target) return;

      target.scrollIntoView({ behavior: "smooth", block: "center" });

      // Clear whatever was lit rather than relying on its own timer: moving
      // quickly between fields cancels that timer and leaves a block lit.
      for (const lit of document.querySelectorAll(".preview-anchor-lit")) {
        lit.classList.remove("preview-anchor-lit");
      }

      target.classList.add("preview-anchor-lit");
      window.clearTimeout(timer);
      timer = window.setTimeout(
        () => target.classList.remove("preview-anchor-lit"),
        1600,
      );
    }

    function onMessage(event) {
      if (event.data?.type !== PREVIEW_FOCUS) return;
      // A frame later: the block may have only just been drawn.
      requestAnimationFrame(() => show(event.data.anchor));
    }

    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
      window.clearTimeout(timer);
    };
  }, []);

  return null;
}
