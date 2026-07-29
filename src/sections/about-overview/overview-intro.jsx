import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";
import { overviewData } from "./data";

export default function OverviewIntro() {
  const { intro } = overviewData;

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Decorative Pattern - Top Left */}
      <DecorativePattern
        variant="trianglesOutlined"
        opacity={0.35}
        className="top-0 left-0 "
      />

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

          {/* Paragraphs - max 20px */}
          <div className="mt-8 space-y-5 text-sm leading-[1.85] text-black sm:text-[15px] md:text-base lg:text-[18px] xl:text-xl">
            {intro.paragraphs.map((p, i) => (
              <p key={i}>
                {p.parts.map((part, j) =>
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

          {/* Quote Box - max 24px */}
          <div className="mt-10 rounded-md border-l-4 border-[var(--brand-primary)] bg-[#f7f7f7] px-5 py-5 sm:px-7 sm:py-6 md:px-8 md:py-7">
            <p className="text-base font-normal italic leading-relaxed text-[var(--foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
              &ldquo;{intro.quote}&rdquo;
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
