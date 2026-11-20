// How the dashboard talks to a preview page.
//
// The dashboard posts the record it is editing into the preview iframe on
// every keystroke; the preview answers once it is ready, so the dashboard
// knows when to start. Nothing here reaches the network or storage: a message
// only changes what is drawn on the person's own screen.

export const PREVIEW_MESSAGE = "faden:preview:draft";
export const PREVIEW_READY = "faden:preview:ready";

// Origins allowed to drive a preview. The dashboard runs on its own host, so
// it has to be named; same-origin is always allowed for local testing.
const CONFIGURED = (process.env.NEXT_PUBLIC_PREVIEW_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const LOCAL = ["http://localhost:5173", "http://localhost:5174"];

export function isAllowedOrigin(origin) {
  if (typeof window !== "undefined" && origin === window.location.origin) {
    return true;
  }
  return CONFIGURED.includes(origin) || LOCAL.includes(origin);
}
