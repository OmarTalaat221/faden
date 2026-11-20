"use client";

import { useEffect, useState } from "react";

import CtaSectionView from "@/components/common/cta-section-view";
import PageBannerView from "@/components/common/page-banner-view";
import PreviewBadge from "@/sections/preview/preview-badge";
import KeyProjectsSection from "@/sections/service-detail/key-projects-section";
import SectionRenderer from "@/sections/service-detail/section-renderer";
import { PREVIEW_MESSAGE, PREVIEW_READY } from "@/lib/preview/bridge";

/**
 * A service page drawn from whatever the dashboard last sent, with the site's
 * own sections, so nothing here can drift from what a visitor sees.
 */
export default function ServicePreviewClient() {
  const [service, setService] = useState(null);

  useEffect(() => {
    function onMessage(event) {
      if (event.data?.type !== PREVIEW_MESSAGE) return;
      setService(event.data.project ?? null);
    }

    window.addEventListener("message", onMessage);
    // The editor may have sent a draft before this page was listening.
    window.parent?.postMessage({ type: PREVIEW_READY }, "*");

    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!service) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <p className="text-sm text-[var(--muted-foreground)]">
          Waiting for the editor. Start typing and the page appears here.
        </p>
      </main>
    );
  }

  // The real page splits the sections around the key projects by their order,
  // so the preview has to as well or a section would move when it is saved.
  const sorted = [...(service.sections || [])].sort(
    (a, b) => (a.order || 0) - (b.order || 0),
  );
  const before = sorted.filter((section) => (section.order || 0) < 4);
  const after = sorted.filter((section) => (section.order || 0) >= 4);

  return (
    <main>
      <PreviewBadge />

      <PageBannerView
        title={service.name}
        subtitle={service.bannerSubtitle || service.description}
        backgroundImage={service.bannerImage || service.fallbackBannerImage}
      />

      <div data-preview-anchor="sections">
        {before.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}

        {service.projects?.length > 0 && (
          <KeyProjectsSection projects={service.projects} />
        )}

        {after.map((section) => (
          <SectionRenderer key={section.id} section={section} />
        ))}
      </div>

      <CtaSectionView
        title={service.ctaTitle || `Looking for expert ${service.name} solutions?`}
        subtitle={service.ctaSubtitle || service.description}
        backgroundImage={service.ctaBackgroundImage || service.fallbackCtaImage}
        primaryButton={{ label: "Contact Us", href: "/contact" }}
        secondaryButton={null}
      />
    </main>
  );
}
