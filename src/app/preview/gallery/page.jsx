import { getGalleryList, getGalleryPageMeta } from "@/lib/gallery/data";
import ListPreviewClient from "@/sections/preview/list-preview-client";

export const metadata = { title: "Preview", robots: { index: false, follow: false } };

export default async function GalleryPreviewPage() {
  const [items, meta] = await Promise.all([getGalleryList(), getGalleryPageMeta()]);
  return <ListPreviewClient kind="gallery" items={items} meta={meta} />;
}
