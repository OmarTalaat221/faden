import Container from "@/components/layout/container";
import Image from "next/image";
import Link from "next/link";

import { formatNewsDate, toArticleHtml } from "@/lib/news/data";

/**
 * One piece of news.
 *
 * Set as an article rather than as a page of the site: a centred masthead, a
 * rule, the photograph, then one column of writing. The first version put a
 * left-aligned column on a 1320 container and left half the screen empty,
 * which is what made it read as an unfinished page rather than a story.
 *
 * Three measures, and each is doing a job. The masthead is 900 so a headline
 * at 54px breaks after two lines rather than nine. The photograph is
 * 1100, wider than either text block, so it is clearly the subject and not an
 * illustration beside the words. The body is 700, which is about 72
 * characters at this size — past roughly 80 a reader starts losing the line
 * they were on.
 *
 * No page banner, on purpose. A banner puts a large unrelated stock
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
        <div className="mx-auto max-w-[900px] text-center">
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
            <p className="mt-8 text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-[13px]">
              {date}
            </p>
          )}

          <h1 className="mt-3 text-[30px] font-semibold leading-[1.12] tracking-[-0.02em] text-[var(--foreground)] sm:text-[38px] md:text-[46px] lg:text-[54px]">
            {item?.title}
          </h1>

          {item?.excerpt && (
            <p className="mx-auto mt-5 max-w-[62ch] text-base leading-relaxed text-[var(--muted-foreground)] sm:text-lg md:text-xl">
              {item.excerpt}
            </p>
          )}

          {/* The brand's own mark of a break, the same red rule that sits
              under the logo. It is what separates the masthead from the
              story without needing a box around either. */}
          <span
            aria-hidden
            className="mx-auto mt-8 block h-[3px] w-14 bg-[var(--brand-primary)] md:mt-10"
          />
        </div>

        {item?.image && (
          <div className="relative mx-auto mt-10 aspect-video w-full max-w-[1100px] overflow-hidden rounded-[4px] bg-[var(--foreground)]/5 md:mt-12">
            <Image
              src={item.image}
              alt={item.title || ""}
              fill
              priority
              sizes="(min-width: 1140px) 1100px, 100vw"
              className="object-cover"
            />
          </div>
        )}

        {html && (
          <div
            className="news-body mx-auto mt-10 max-w-[700px] text-base text-[var(--foreground)] sm:text-[17px] md:mt-14 md:text-lg"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </Container>
    </article>
  );
}
