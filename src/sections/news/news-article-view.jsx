import Container from "@/components/layout/container";
import Image from "next/image";
import Link from "next/link";

import { formatNewsDate, toParagraphs } from "@/lib/news/data";

/**
 * One piece of news.
 *
 * No page banner here, on purpose. A banner puts a large unrelated stock
 * photograph above a headline and pushes the writing below the fold; an
 * article's own picture should be the first picture a reader meets. The
 * header is told about this route in src/components/layout/header.jsx, so it
 * starts white instead of expecting something dark to sit behind it.
 *
 * Everything sits in one 880px column rather than the full 1320 container.
 * Set across the whole width, body text runs to about 160 characters a line,
 * which nobody reads twice, and the picture becomes 742px tall and pushes the
 * writing off the screen.
 *
 * The caps are in pixels and on the elements that use them. A `ch` cap on a
 * wrapper is measured in the wrapper's font size, not the headline's, which
 * is how the first attempt at this ended up setting a headline two words to
 * the line.
 */
export default function NewsArticleView({ item }) {
  const date = formatNewsDate(item);
  const paragraphs = toParagraphs(item?.body);

  return (
    <article
      data-preview-anchor="article"
      className="pb-14 pt-8 md:pb-20 md:pt-12"
    >
      <Container>
        <div className="max-w-[880px]">
          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted-foreground)] transition-colors duration-300 hover:text-[var(--brand-primary)]"
          >
            <span
              aria-hidden
              className="h-px w-5 bg-current transition-all duration-300 ease-out group-hover:w-7"
            />
            All news
          </Link>

          <header className="mt-7">
            {date && (
              <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-[13px]">
                {date}
              </p>
            )}

            <h1 className="mt-3 text-[30px] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--foreground)] sm:text-[38px] md:text-[48px] lg:text-[56px]">
              {item?.title}
            </h1>
          </header>

          {item?.excerpt && (
            <p className="mt-6 max-w-[62ch] text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg md:text-xl">
              {item.excerpt}
            </p>
          )}

          {item?.image && (
            <div className="relative mt-9 aspect-video w-full overflow-hidden rounded-[4px] bg-[var(--foreground)]/5 md:mt-12">
              <Image
                src={item.image}
                alt={item.title || ""}
                fill
                priority
                sizes="(min-width: 920px) 880px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          {paragraphs.length > 0 && (
            <div className="mt-9 max-w-[68ch] md:mt-12">
              {paragraphs.map((text, i) => (
                <p
                  key={i}
                  className="mt-5 text-base leading-[1.75] text-[var(--foreground)] first:mt-0 sm:text-[17px] md:text-lg"
                >
                  {text}
                </p>
              ))}
            </div>
          )}
        </div>
      </Container>
    </article>
  );
}
