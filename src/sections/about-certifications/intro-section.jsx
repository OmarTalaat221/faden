import Container from "@/components/layout/container";
import { certificationsData } from "./data";

export default function IntroSection() {
  const { intro } = certificationsData;

  return (
    <section className="relative w-full bg-white py-10 sm:py-12 md:py-14 lg:py-16">
      <Container>
        <div className="relative z-10">
          {/* Eyebrow - max 16px */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {intro.eyebrow}
          </p>
          {/* Subtitle - max 24px */}
          <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            {intro.subtitle}
          </p>

          {/* Body - max 20px */}
          <p className="mt-9 text-sm font-normal leading-relaxed text-[var(--foreground)] sm:text-[15px] md:text-base lg:text-[18px] xl:text-lg">
            {intro.body}
          </p>
        </div>
      </Container>
    </section>
  );
}
