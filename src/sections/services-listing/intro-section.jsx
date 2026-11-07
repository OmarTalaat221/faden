import Container from "@/components/layout/container";

/**
 * The opening statement. It is the first thing a client reads on this page,
 * so it is set as a headline with the supporting paragraph beside it rather
 * than as another stacked block, and it closes on the credentials that make
 * the claim believable.
 */
export default function IntroSection({ intro }) {
  if (!intro) return null;

  const highlights = intro.highlights ?? [];

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-10 md:py-14 lg:py-16">
      <Container>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
              {intro.eyebrow}
            </p>
            {intro.subtitle && (
              <h2 className="mt-4 text-xl font-semibold leading-[1.25] text-[var(--foreground)] sm:text-2xl md:text-[28px] lg:text-[32px] xl:text-[36px]">
                {intro.subtitle}
              </h2>
            )}
            {/* A short rule under the headline, the same mark the cards use
                on hover, so the page reads as one hand. */}
            <span
              aria-hidden
              className="mt-5 block h-[3px] w-14 bg-[var(--brand-primary)]"
            />
          </div>

          {intro.paragraph && (
            <p className="self-end text-sm leading-[1.85] text-[var(--muted-foreground)] sm:text-[15px] md:text-base lg:text-[17px]">
              {intro.paragraph}
            </p>
          )}
        </div>

        {highlights.length > 0 && (
          <ul className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--border)] md:mt-10 md:grid-cols-4">
            {highlights.map((item, i) => (
              <li
                key={i}
                className="bg-[var(--background)] px-4 py-4 text-[12px] font-semibold uppercase tracking-[0.12em] text-[var(--foreground)] sm:px-5 sm:py-5 sm:text-[13px]"
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  );
}
