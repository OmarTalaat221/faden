import RevealImage from "@/components/common/reveal-image";
import Container from "@/components/layout/container";
import Image from "next/image";
import { getAboutOverview } from "./data";

// A paragraph is either rich text (parts, some highlighted) as authored in
// the original static copy, or a plain string as the dashboard stores it.
function toParts(paragraph) {
  if (typeof paragraph === "string") return [{ text: paragraph }];
  return paragraph?.parts ?? [];
}

export default async function OverviewIntro() {
  const overviewData = await getAboutOverview();
  const { intro } = overviewData;

  // Without a photo the copy runs the full width rather than leaving a gap.
  const hasImage = Boolean(intro.image);

  return (
    <section className="relative w-full overflow-hidden py-8 sm:py-10 md:py-14 lg:py-16">
      <Container>
        <div className="relative z-10 mx-auto">
          {/* Eyebrow - max 16px */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {intro.eyebrow}
          </p>

          {/* Lead - max 24px */}
          <p className="mt-3 text-base font-normal leading-relaxed text-[#6C6C6D] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            {intro.lead}
          </p>

          {/* The photo sits beside the paragraphs; the quote below spans the
              full width, so it is deliberately outside this grid. */}
          <div
            className={
              hasImage
                ? "mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-14"
                : "mt-8"
            }
          >
            {/* Paragraphs - max 20px */}
            <div className="min-w-0 space-y-4 text-sm leading-[1.75] text-black sm:text-[15px] md:text-[15px] lg:text-base xl:text-[17px]">
              {intro.paragraphs.map((p, i) => (
                <p key={i}>
                  {toParts(p).map((part, j) =>
                    part.highlight ? (
                      <span
                        key={j}
                        className="font-medium text-[var(--brand-primary)]"
                      >
                        {part.text}
                      </span>
                    ) : (
                      <span key={j}>{part.text}</span>
                    ),
                  )}
                </p>
              ))}
            </div>

            {hasImage && (
              <RevealImage className="mx-auto aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-[4px] shadow-[0_18px_50px_rgba(0,0,0,0.08)] lg:sticky lg:top-28 lg:mx-0 lg:aspect-[4/4.6] lg:max-w-none">
                <Image
                  src={intro.image}
                  alt={intro.imageAlt}
                  fill
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 1023px) 92vw, 38vw"
                  className="object-cover"
                />
              </RevealImage>
            )}
          </div>

          {/* Quote Box - max 24px. Full width, under the grid. */}
          <div className="mt-10 rounded-md border-l-4 border-[var(--brand-primary)] bg-[var(--background)] px-5 py-5 sm:px-7 sm:py-6 md:px-8 md:py-7">
            <p className="text-base font-normal italic leading-relaxed text-[var(--foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
              &ldquo;{intro.quote}&rdquo;
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
