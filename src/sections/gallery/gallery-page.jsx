"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import IntroSection from "./intro-section";
import GalleryGridSection from "./gallery-grid-section";
import GalleryViewerSection from "@/sections/gallery-detail/gallery-viewer-section";

function GalleryContent() {
  const searchParams = useSearchParams();
  const hasImageParam = searchParams.has("image");

  // If ?image=N in URL → show viewer, else show grid
  if (hasImageParam) {
    return <GalleryViewerSection />;
  }

  return (
    <>
      <IntroSection />
      <GalleryGridSection />
    </>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={null}>
      <GalleryContent />
    </Suspense>
  );
}