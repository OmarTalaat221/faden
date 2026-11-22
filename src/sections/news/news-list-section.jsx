import Container from "@/components/layout/container";
import Image from "next/image";
import Link from "next/link";

import { formatNewsDate } from "@/lib/news/data";

/**
 * Everything FADEN has posted, newest first.
 *
 * Deliberately not cards. The services page is cards and the sectors band is
 * a picture with an index beside it; a third family of boxes would make the
 * site read as a pile of widgets. News is writing, so it is set as writing:
 * horizontal rules, a wide measure, and the newest piece given the room that
 * says "start here".
 *
 * Both picture frames are 16:9 and crop to fill. A news photograph arrives at
 * whatever size the person had to hand, so the frame has to be the thing that
 * is fixed — otherwise one tall photo sets every row in the list taller than
 * the rest.
 */
export default function NewsListSection({ items = [] }) {
  if (!items.length) {
    return (
      <section data-preview-anchor="items" className="py-14 md:py-20">
        <Container>
          <p className="max-w-[55ch] text-base text-[var(--muted-foreground)] md:text-lg">
            There is nothing here yet. Come back soon.
          </p>
        </Container>
      </section>
    );
  }

  const [lead, ...rest] = items;

  return (
    <section
      data-preview-anchor="items"
      className="pb-14 pt-10 sm:pt-10 md:pb-20 md:pt-14 lg:pt-16"
    >
      <Container>
        <LeadItem item={lead} />

        {rest.length > 0 && (
          <ul className="mt-12 border-t border-[var(--foreground)]/12 md:mt-16">
            {rest.map((item) => (
              <li key={item.id ?? item.slug}>
                <RowItem item={item} />
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}

/** The newest piece, given the width of the page. */
function LeadItem({ item }) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group grid gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] lg:items-center lg:gap-14"
    >
      <Frame
        src={item.image}
        alt={item.title}
        sizes="(min-width: 1024px) 55vw, 100vw"
        priority
      />

      <div>
        <Eyebrow item={item} />

        <h2 className="mt-3 text-2xl font-semibold leading-[1.15] tracking-[-0.015em] text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--brand-primary)] sm:text-3xl md:text-[34px] lg:text-[38px]">
          {item.title}
        </h2>

        {item.excerpt && (
          <p className="mt-4 max-w-[58ch] text-sm leading-relaxed text-[var(--muted-foreground)] sm:text-base md:text-[17px]">
            {item.excerpt}
          </p>
        )}

        <ReadMore />
      </div>
    </Link>
  );
}

/** One row of the list under the lead. */
function RowItem({ item }) {
  return (
    <Link
      href={`/news/${item.slug}`}
      className="group grid gap-4 border-b border-[var(--foreground)]/12 py-6 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-7 sm:py-7 md:grid-cols-[240px_minmax(0,1fr)] md:gap-9"
    >
      <Frame
        src={item.image}
        alt={item.title}
        sizes="(min-width: 768px) 240px, (min-width: 640px) 200px, 100vw"
      />

      <div className="sm:py-0.5">
        <Eyebrow item={item} />

        <h3 className="mt-2 text-lg font-semibold leading-snug tracking-[-0.01em] text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--brand-primary)] sm:text-xl md:text-[22px]">
          {item.title}
        </h3>

        {item.excerpt && (
          <p className="mt-2 line-clamp-2 max-w-[62ch] text-sm leading-relaxed text-[var(--muted-foreground)] md:text-[15px]">
            {item.excerpt}
          </p>
        )}
      </div>
    </Link>
  );
}

/** A 16:9 window onto a photograph of unknown shape. */
function Frame({ src, alt, sizes, priority = false }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-[4px] bg-[var(--foreground)]/5">
      {src && (
        <Image
          src={src}
          alt={alt || ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      )}
    </div>
  );
}

function Eyebrow({ item }) {
  const date = formatNewsDate(item);
  if (!date) return null;

  return (
    <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-[13px]">
      {date}
    </p>
  );
}

function ReadMore() {
  return (
    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] transition-colors duration-300 group-hover:text-[var(--brand-primary)] md:text-[15px]">
      Read the story
      <span
        aria-hidden
        className="h-px w-7 bg-current transition-all duration-300 ease-out group-hover:w-11"
      />
    </span>
  );
}
