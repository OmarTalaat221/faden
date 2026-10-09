export const GALLERY_PAGE_META = {
  intro: {
    eyebrow: "OUR GALLERY",
    subtitle: "A visual showcase of completed projects and designs.",
  },
  itemsPerPage: 12,
};

/**
 * Gallery items — Manual Masonry pattern is decided in the component
 * based on column index + row index (not per item).
 *
 * Optional per-item override: `position` for objectPosition (e.g. "center top").
 *
 * Real images available: gallery-page-1.webp -> gallery-page-12.webp
 * The rest recycle 1-12 until more images are added.
 */
const TOTAL_IMAGES = 48; // 4 pages x 12

export const GALLERY_LIST = Array.from({ length: TOTAL_IMAGES }, (_, i) => {
  const imgIndex = (i % 12) + 1; // recycle 1-12
  return {
    id: i + 1,
    src: `/images/faden/gallery-page-${imgIndex}.webp`,
    alt: `Gallery image ${i + 1}`,
    // position: "center", // optional: override objectPosition per item
  };
});
// ========================================
// API ACCESSORS (fall back to the data above)
// ========================================

import { apiGet } from "@/lib/api";

export async function getGalleryList() {
  return apiGet("/gallery");
}

export async function getGalleryPageMeta() {
  return apiGet("/gallery/meta");
}
