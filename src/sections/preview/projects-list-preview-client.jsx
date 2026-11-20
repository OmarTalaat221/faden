"use client";

import PageBannerView from "@/components/common/page-banner-view";
import ProjectsGridSection from "@/sections/projects/projects-grid-section";
import PreviewBadge from "@/sections/preview/preview-badge";
import useDraft from "@/sections/preview/use-draft";

/** The projects listing, from the table being edited beside it. */
export default function ProjectsListPreviewClient({ items, categories, meta }) {
  const draft = useDraft(null);

  const pageMeta = draft?.meta ?? meta ?? {};
  const projects = draft?.items ?? items ?? [];

  return (
    <main>
      <PreviewBadge />
      <PageBannerView
        title={pageMeta.title}
        subtitle={pageMeta.subtitle}
        backgroundImage={pageMeta.bannerImage}
      />
      <ProjectsGridSection projects={projects} categories={categories} />
    </main>
  );
}
