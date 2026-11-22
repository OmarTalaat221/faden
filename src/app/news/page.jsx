import { notFound } from "next/navigation";

import { requirePageVisible } from "@/lib/settings/data";
import { getNewsList, getNewsPageMeta } from "@/lib/news/data";
import NewsPage from "@/sections/news/news-page";

export const metadata = {
  title: "News",
  description:
    "Announcements, awards and project milestones from FADEN Contracting Company.",
  alternates: { canonical: "/news" },
};

export default async function Page() {
  await requirePageVisible("news");

  const [items, meta] = await Promise.all([getNewsList(), getNewsPageMeta()]);

  // Null, not empty: the API has no news store yet. Until it does the page
  // does not exist, which is better than an empty page the client cannot
  // fill. An empty array is a different thing and renders an empty state.
  if (items === null) notFound();

  return <NewsPage items={items} meta={meta} />;
}
