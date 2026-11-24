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

  return <NewsPage items={items} meta={meta} />;
}
