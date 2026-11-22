import { getNewsList, getNewsPageMeta } from "@/lib/news/data";
import NewsListPreviewClient from "@/sections/preview/news-list-preview-client";

export const metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default async function NewsPreviewPage() {
  const [items, meta] = await Promise.all([getNewsList(), getNewsPageMeta()]);
  // Null here means the API has no news store yet. The preview still draws,
  // so the dashboard shows what is being typed rather than an error.
  return <NewsListPreviewClient items={items ?? []} meta={meta} />;
}
