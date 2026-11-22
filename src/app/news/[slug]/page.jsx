import { notFound } from "next/navigation";

import CtaSection from "@/components/common/cta-section";
import { requirePageVisible } from "@/lib/settings/data";
import { getNewsItem, getNewsList } from "@/lib/news/data";
import MoreNewsSection from "@/sections/news/more-news-section";
import NewsArticleView from "@/sections/news/news-article-view";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getNewsItem(slug);
  if (!item) return { title: "News" };

  return {
    title: item.title,
    description: item.excerpt || undefined,
    alternates: { canonical: `/news/${item.slug}` },
    openGraph: {
      type: "article",
      title: item.title,
      description: item.excerpt || undefined,
      images: item.image ? [item.image] : undefined,
    },
  };
}

export default async function Page({ params }) {
  await requirePageVisible("news");

  const { slug } = await params;
  const [item, all] = await Promise.all([getNewsItem(slug), getNewsList()]);
  if (!item) notFound();

  const more = (all ?? []).filter((row) => row.slug !== item.slug).slice(0, 3);

  return (
    <>
      <NewsArticleView item={item} />
      <MoreNewsSection items={more} />
      <CtaSection
        secondaryButton={null}
        primaryButton={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
