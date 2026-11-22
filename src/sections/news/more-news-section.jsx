import Container from "@/components/layout/container";
import Image from "next/image";
import Link from "next/link";

import { formatNewsDate } from "@/lib/news/data";

/**
 * Three other stories, at the foot of one.
 *
 * Less about filling the page than about where a reader is when they finish:
 * without this the article ends and the contact band asks them to start a
 * project, which is a long way from "I was reading something". This gives
 * them somewhere to go that is still reading.
 *
 * It renders nothing when there is nothing else to show, which is the case
 * on a site with one story on it.
 */
export default function MoreNewsSection({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="border-t border-[var(--foreground)]/12 py-12 md:py-16">
      <Container>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm">
            More news
          </h2>

          <Link
            href="/news"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--brand-primary)]"
          >
            All news
            <span
              aria-hidden
              className="h-px w-5 bg-current transition-all duration-300 ease-out group-hover:w-8"
            />
          </Link>
        </div>

        <ul className="mt-7 grid gap-7 sm:grid-cols-2 md:mt-9 lg:grid-cols-3 lg:gap-9">
          {items.map((item) => {
            const date = formatNewsDate(item);

            return (
              <li key={item.id ?? item.slug}>
                <Link href={`/news/${item.slug}`} className="group block">
                  <div className="relative aspect-video w-full overflow-hidden rounded-[4px] bg-[var(--foreground)]/5">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.title || ""}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    )}
                  </div>

                  {date && (
                    <p className="mt-4 text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)]">
                      {date}
                    </p>
                  )}

                  <h3 className="mt-2 text-base font-semibold leading-snug tracking-[-0.01em] text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--brand-primary)] sm:text-lg">
                    {item.title}
                  </h3>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
