import { notFound } from "next/navigation";

import CtaSection from "@/components/common/cta-section";
import { requirePageVisible } from "@/lib/settings/data";
import { getNewsItem } from "@/lib/news/data";
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
  const item = await getNewsItem(slug);
  if (!item) notFound();

  return (
    <>
      <NewsArticleView item={item} />
      <CtaSection
        secondaryButton={null}
        primaryButton={{ label: "Contact Us", href: "/contact" }}
      />
    </>
  );
}
