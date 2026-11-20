"use client";

import FooterView from "@/components/layout/footer-view";
import PreviewBadge from "@/sections/preview/preview-badge";
import useDraft from "@/sections/preview/use-draft";

export default function FooterPreviewClient({ initial, visionMark }) {
  const settings = useDraft(initial);
  if (!settings) return null;

  return (
    <main data-preview-anchor="footer">
      <PreviewBadge />
      <FooterView settings={settings} visionMark={visionMark} />
    </main>
  );
}
