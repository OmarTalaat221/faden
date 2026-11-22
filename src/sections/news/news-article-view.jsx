import Container from "@/components/layout/container";
import Image from "next/image";
import Link from "next/link";

import { formatNewsDate, toArticleHtml } from "@/lib/news/data";

/**
 * One piece of news.
 *
 * Two earlier versions were wrong in the same way: a narrow column of type
 * sitting in the middle of a 1320 container, with the rest of the page doing
 * nothing. A centred masthead made it worse, not better — the site's inner
 * pages are left-aligned, so centring the one page that is mostly words read
 * as a different website.
 *
 * So the opening is split. The type takes the left, the photograph the right,
 * and between them they use the width instead of leaving it empty. The
 * photograph is about half the container rather than the near-full-width band
 * it was, which also stops it pushing the writing a screen down.
 *
 * The body runs the full width of the container at the client's request. That
 * is a long line — about 110 characters here — so the type is set larger and
 * looser than it would be in a narrow column, which is the only thing that
 * makes a measure like this readable at all.
 *
 * No page banner, on purpose: a banner puts a large unrelated stock
 * photograph above the headline and pushes the writing below the fold. The
 * header is told about this route in src/components/layout/header.jsx so it
 * starts white instead of expecting something dark behind it.
 */
export default function NewsArticleView({ item }) {
  const date = formatNewsDate(item);
  const html = toArticleHtml(item?.body);

  return (
    <article
      data-preview-anchor="article"
      className="pb-14 pt-8 md:pb-20 md:pt-12"
    >
      <Container>
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:gap-14">
          <div>
            <Link
              href="/news"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--muted-foreground)] transition-colors duration-300 hover:text-[var(--brand-primary)]"
            >
              <span
                aria-hidden
                className="h-px w-5 bg-current transition-all duration-300 ease-out group-hover:w-8"
              />
              All news
            </Link>

            {date && (
              <p className="mt-7 text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-[13px]">
                {date}
              </p>
            )}

            <h1 className="mt-3 text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--foreground)] sm:text-[36px] md:text-[42px] lg:text-[46px]">
              {item?.title}
            </h1>

            {item?.excerpt && (
              <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg md:text-xl">
                {item.excerpt}
              </p>
            )}

            {/* The same red rule that sits under the mark in the header. It
                closes the type off against the photograph beside it without
                needing a border down the middle. */}
            <span
              aria-hidden
              className="mt-7 block h-[3px] w-14 bg-[var(--brand-primary)] md:mt-8"
            />
          </div>

          {item?.image && (
            <div className="relative aspect-video w-full overflow-hidden rounded-[4px] bg-[var(--foreground)]/5">
              <Image
                src={item.image}
                alt={item.title || ""}
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
            </div>
          )}
        </div>

        {html && (
          <div
            className="news-body mt-12 text-base leading-[1.8] text-[var(--foreground)] sm:text-[17px] md:mt-16 md:text-lg lg:text-[20px]"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </Container>
    </article>
  );
}
