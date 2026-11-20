"use client";

import PageBannerView from "@/components/common/page-banner-view";
import OverviewIntro from "@/sections/about-overview/overview-intro";
import OverviewStats from "@/sections/about-overview/overview-stats";
import WhyChooseSection from "@/sections/about-overview/why-choose-section";
import PreviewBadge from "@/sections/preview/preview-badge";
import useDraft from "@/sections/preview/use-draft";

export default function AboutOverviewPreviewClient({ initial, whyChoose }) {
  const data = useDraft(initial);
  if (!data) return null;

  return (
    <main className="min-h-screen">
      <PreviewBadge />
      <PageBannerView {...data.banner} />
      <OverviewIntro intro={data.intro} />
      <OverviewStats stats={data.stats} />
      <WhyChooseSection whyChoose={whyChoose} />
    </main>
  );
}
