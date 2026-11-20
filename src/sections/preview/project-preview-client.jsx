"use client";

import { useEffect, useState } from "react";

import BulletListSection from "@/sections/project-detail/bullet-list-section";
import DesignIntentSection from "@/sections/project-detail/design-intent-section";
import OverviewSection from "@/sections/project-detail/overview-section";
import ProjectHeroSection from "@/sections/project-detail/project-hero-section";
import ProjectInfoSection from "@/sections/project-detail/project-info-section";
import ProjectPhotosSection from "@/sections/project-detail/project-photos-section";
import PreviewBadge from "@/sections/preview/preview-badge";
import { PREVIEW_MESSAGE, PREVIEW_READY } from "@/lib/preview/bridge";

/**
 * A project page drawn from whatever the dashboard last sent, rather than
 * from the database. It is the same set of sections the real page uses, so
 * there is nothing here that can drift away from what a visitor sees.
 *
 * Two sections are left out on purpose: the related projects at the foot,
 * which belong to other records and are not being edited, and the contact
 * band under them, which is the same on every page.
 */
export default function ProjectPreviewClient() {
  const [project, setProject] = useState(null);

  useEffect(() => {
    function onMessage(event) {
      if (event.data?.type !== PREVIEW_MESSAGE) return;
      setProject(event.data.project ?? null);
    }

    window.addEventListener("message", onMessage);
    // The editor may have mounted first and sent a draft before this page was
    // listening, so say when the listener is up and let it send again.
    window.parent?.postMessage({ type: PREVIEW_READY }, "*");

    return () => window.removeEventListener("message", onMessage);
  }, []);

  if (!project) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-6 text-center">
        <p className="text-sm text-[var(--muted-foreground)]">
          Waiting for the editor. Start typing and the page appears here.
        </p>
      </main>
    );
  }

  const detail = project.detail ?? {};

  return (
    <main>
      <PreviewBadge />

      <div data-preview-anchor="hero">
        <ProjectHeroSection project={project} />
      </div>
      <div data-preview-anchor="overview">
        <OverviewSection overview={detail.overview} />
      </div>
      <div data-preview-anchor="infoTabs">
        <ProjectInfoSection tabs={detail.infoTabs} />
      </div>
      <div data-preview-anchor="designIntent">
        <DesignIntentSection designIntent={detail.designIntent} />
      </div>
      <div data-preview-anchor="amenities">
        <BulletListSection data={detail.amenitiesFeatures} columns={2} muted />
      </div>
      <div data-preview-anchor="achievements">
        <BulletListSection data={detail.keyAchievements} columns={1} />
      </div>
      <div data-preview-anchor="photos">
        <ProjectPhotosSection
          photos={detail.photos}
          title={project.title}
          caption={detail.photosCaption}
        />
      </div>
    </main>
  );
}
