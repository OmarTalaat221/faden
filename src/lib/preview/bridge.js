// How the dashboard talks to a preview page.
//
// The dashboard posts the record it is editing into the preview iframe on
// every keystroke; the preview answers once it is ready, so the dashboard
// knows when to start.
//
// Any origin may post. That is deliberate: the dashboard moves between a
// developer's machine, a preview deployment and its own domain, and an
// allowlist that has to be kept in step with all three fails closed at the
// worst moment - on the day it is deployed - with no way for anyone but a
// developer to fix it. Accepting a message is safe because it does nothing
// but change what is drawn on that one person's screen: it is never saved,
// never sent anywhere, and holds nothing the sender did not already have.
//
// The one thing a stranger could do is frame this page, feed it invented
// copy and photograph the result as if it were the real site. The badge the
// preview draws over itself is what answers that, and it is why the badge is
// not optional and not removable from the dashboard's side.

export const PREVIEW_MESSAGE = "faden:preview:draft";
export const PREVIEW_READY = "faden:preview:ready";

// Sent when a field in the dashboard is clicked into, so the preview can go
// to the part of the page that field writes. The client is looking at a form
// of boxes and a page of words, and nothing in either says which is which.
export const PREVIEW_FOCUS = "faden:preview:focus";

// The attribute the preview marks a block with, so a field can name it.
export const ANCHOR_ATTRIBUTE = "data-preview-anchor";
