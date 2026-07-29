import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";

export default function IntroSection({ intro }) {
  if (!intro) return null;

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-20 lg:py-24">
      <DecorativePattern
        variant="trianglesOutlined"
        // opacity={0.35}
        className="pointer-events-none absolute left-0 top-0 "
      />

      <Container>
        <div className="max-w-4xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {intro.eyebrow}
          </p>
          {intro.subtitle && (
            <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
              {intro.subtitle}
            </p>
          )}
          {intro.paragraph && (
            <p className="mt-5 text-sm leading-7 text-[var(--foreground)] sm:text-base md:text-[17px] lg:text-lg xl:text-xl">
              {intro.paragraph}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
