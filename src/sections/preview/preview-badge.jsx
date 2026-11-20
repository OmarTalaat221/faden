/**
 * Says what this is, on the page itself.
 *
 * Anyone can frame a preview route and feed it whatever copy they like, so a
 * screenshot of one must never be mistakeable for the live site. That is why
 * this is drawn by the preview rather than switched on by the dashboard.
 */
export default function PreviewBadge() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-3 top-3 z-50 rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
    >
      Preview — not live
    </div>
  );
}
