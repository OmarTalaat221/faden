"use client";

import { useEffect, useState } from "react";

import BulletListSection from "@/sections/project-detail/bullet-list-section";
import DesignIntentSection from "@/sections/project-detail/design-intent-section";
import OverviewSection from "@/sections/project-detail/overview-section";
import ProjectHeroSection from "@/sections/project-detail/project-hero-section";
import ProjectInfoSection from "@/sections/project-detail/project-info-section";
import ProjectPhotosSection from "@/sections/project-detail/project-photos-section";
import {
  ANCHOR_ATTRIBUTE,
  PREVIEW_FOCUS,
  PREVIEW_MESSAGE,
  PREVIEW_READY,
} from "@/lib/preview/bridge";

/**
 * A project page drawn from whatever the dashboard last sent, rather than
 * from the database. It is the same set of sections the real page uses, so
 * there is nothing here that can drift away from what a visitor sees.
 *
 * Two sections are left out on purpose: the related projects at the foot,
 * which belong to other records and are not being edited, and the contact
 * band under them, which is the same on every page.
 */
/**
 * Scrolls to the block a field writes and marks it for a moment, so the
 * answer to "where does this end up?" is the page itself pointing at it.
 */
function showAnchor(anchor) {
  if (!anchor) return;
  const target = document.querySelector(`[${ANCHOR_ATTRIBUTE}="${anchor}"]`);
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "center" });

  // Clear whatever was lit before rather than relying on its own timer: moving
  // between fields quickly cancels that timer, and the old block stayed lit.
  for (const lit of document.querySelectorAll(".preview-anchor-lit")) {
    lit.classList.remove("preview-anchor-lit");
  }

  target.classList.add("preview-anchor-lit");
  window.clearTimeout(showAnchor.timer);
  showAnchor.timer = window.setTimeout(() => {
    target.classList.remove("preview-anchor-lit");
  }, 1600);
}

export default function ProjectPreviewClient() {
  const [project, setProject] = useState(null);

  useEffect(() => {
    function onMessage(event) {
      if (event.data?.type === PREVIEW_MESSAGE) {
        setProject(event.data.project ?? null);
        return;
      }

      if (event.data?.type === PREVIEW_FOCUS) {
        // A frame later: a draft usually arrives with the focus, and the
        // block being scrolled to may not be on the page until it is drawn.
        requestAnimationFrame(() => showAnchor(event.data.anchor));
      }
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
      {/* Says what this is, on the page itself. Anyone can frame this route
          and feed it whatever they like, so a screenshot of it must never be
          mistakeable for the live site. */}
      <div
        aria-hidden
        className="pointer-events-none fixed right-3 top-3 z-50 rounded-full bg-black/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white"
      >
        Preview — not live
      </div>

      {/* One marked block per card in the editor. The names are the editor's
          own, so a field asks for the block it writes by the same word. */}
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
