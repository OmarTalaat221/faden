"use client";

import PageBannerView from "@/components/common/page-banner-view";
import AchievementsSection from "@/sections/partners/achievements-section";
import PartnerIntroSection from "@/sections/partners/partner-intro-section";
import PartnerProjectsSection from "@/sections/partners/projects-section";
import PreviewBadge from "@/sections/preview/preview-badge";
import useDraft from "@/sections/preview/use-draft";

/**
 * The Partners page, drawn with the site's own sections from whatever the
 * dashboard last sent. Certifications are left out: they are not edited here
 * and are not part of this record.
 */
export default function PartnersPreviewClient({ initial }) {
  const data = useDraft(initial);
  if (!data) return null;

  return (
    <main className="min-h-screen">
      <PreviewBadge />
      <PageBannerView {...data.banner} />
      <PartnerIntroSection intro={data.intro} />
      <AchievementsSection achievements={data.achievements} />
      <PartnerProjectsSection partnersData={data} />
    </main>
  );
}
