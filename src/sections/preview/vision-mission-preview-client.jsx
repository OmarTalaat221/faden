"use client";

import PageBannerView from "@/components/common/page-banner-view";
import DifferentSection from "@/sections/about-vision-mission/different-section";
import DriversSection from "@/sections/about-vision-mission/drivers-section";
import PreviewBadge from "@/sections/preview/preview-badge";
import useDraft from "@/sections/preview/use-draft";

export default function VisionMissionPreviewClient({ initial }) {
  const data = useDraft(initial);
  if (!data) return null;

  return (
    <main className="min-h-screen bg-white">
      <PreviewBadge />
      <PageBannerView {...data.banner} />
      <DriversSection drivers={data.drivers} />
      <DifferentSection visionMissionData={data} />
    </main>
  );
}
