"use client";

import PageBannerView from "@/components/common/page-banner-view";
import NewsArticleView from "@/sections/news/news-article-view";
import NewsListSection from "@/sections/news/news-list-section";
import PreviewBadge from "@/sections/preview/preview-badge";
import useDraft from "@/sections/preview/use-draft";

/**
 * The news page as the dashboard is editing it.
 *
 * Two things can be on screen, and which one is decided by what the dashboard
 * last posted. While someone is in the table it draws the list; the moment
 * they open a piece to write it, `article` arrives and the preview becomes
 * that piece. News is the one place where the record is mostly a body of
 * text, and a list of headlines would show none of it.
 */
export default function NewsListPreviewClient({ items, meta }) {
  const draft = useDraft(null);

  const list = draft?.items ?? items ?? [];
  const pageMeta = draft?.meta ?? meta ?? {};
  const article = draft?.article;

  return (
    <main className="min-h-screen">
      <PreviewBadge />

      {article ? (
        <NewsArticleView item={article} />
      ) : (
        <>
          <PageBannerView
            title={pageMeta.banner?.title || "News"}
            subtitle={pageMeta.banner?.subtitle}
            // The real page resolves this on the server from Site Settings.
            // The preview cannot, so it falls back to the same file that
            // ships with the site rather than handing next/image nothing.
            backgroundImage={
              pageMeta.banner?.image || "/images/faden/image-05.jpg"
            }
          />
          <NewsListSection items={list} />
        </>
      )}
    </main>
  );
}
