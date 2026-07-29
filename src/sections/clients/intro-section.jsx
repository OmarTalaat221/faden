import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";
import { CLIENTS_PAGE_META } from "@/lib/clients/data";

export default function IntroSection() {
  const { eyebrow, title, description } = CLIENTS_PAGE_META.intro;

  return (
    <section className="relative overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24">
      {/* Decorative Pattern - Top Left */}
      <DecorativePattern
        variant="triangles"
        // opacity={0.35}
        className="left-0 top-0 h-auto "
      />

      <Container className="relative z-10">
        <div className="max-w-4xl text-left">
          {/* Eyebrow - max 16px */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {eyebrow}
          </p>

          {/* Title (Gray) - max 24px */}
          <h2 className="mt-2 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            {title}
          </h2>

          {/* Description (Black) - max 20px */}
          <p className="mt-5 text-sm leading-relaxed text-[var(--foreground)] sm:text-base md:text-[17px] lg:text-lg xl:text-[20px] xl:leading-[1.7]">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
