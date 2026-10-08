"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import IntroSection from "./intro-section";
import GalleryGridSection from "./gallery-grid-section";
import GalleryViewerSection from "@/sections/gallery-detail/gallery-viewer-section";

function GalleryContent({ galleryList, galleryMeta }) {
  const searchParams = useSearchParams();
  const hasImageParam = searchParams.has("image");

  // If ?image=N in URL → show viewer, else show grid
  if (hasImageParam) {
    return <GalleryViewerSection galleryList={galleryList} />;
  }

  return (
    <>
      <IntroSection galleryMeta={galleryMeta} />
      <GalleryGridSection galleryList={galleryList} galleryMeta={galleryMeta} />
    </>
  );
}

export default function GalleryPage({ galleryList, galleryMeta }) {
  return (
    <Suspense fallback={null}>
      <GalleryContent galleryList={galleryList} galleryMeta={galleryMeta} />
    </Suspense>
  );
}