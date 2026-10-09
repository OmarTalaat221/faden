/**
 * Gallery items — Manual Masonry pattern is decided in the component
 * based on column index + row index (not per item).
 *
 * Optional per-item override: `position` for objectPosition (e.g. "center top").
 *
 * Real images available: gallery-page-1.webp -> gallery-page-12.webp
 * The rest recycle 1-12 until more images are added.
 */

import { apiGet } from "@/lib/api";

export async function getGalleryList() {
  return apiGet("/gallery");
}

export async function getGalleryPageMeta() {
  return apiGet("/gallery/meta");
}
