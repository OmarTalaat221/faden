"use client";

import PageBannerView from "@/components/common/page-banner-view";
import MessagesSection from "@/sections/about-leadership/messages-section";
import SubsidiariesSection from "@/sections/about-leadership/subsidiaries-section";
import PreviewBadge from "@/sections/preview/preview-badge";
import useDraft from "@/sections/preview/use-draft";

export default function LeadershipPreviewClient({ initial }) {
  const data = useDraft(initial);
  if (!data) return null;

  return (
    <main className="min-h-screen bg-white">
      <PreviewBadge />
      <PageBannerView {...data.banner} />
      <MessagesSection messages={data.messages} />
      <SubsidiariesSection subsidiaries={data.subsidiaries} />
    </main>
  );
}
