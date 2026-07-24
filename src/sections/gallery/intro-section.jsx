import Container from "@/components/layout/container";
import { GALLERY_PAGE_META } from "@/lib/gallery/data";

export default function IntroSection() {
  const { eyebrow, subtitle } = GALLERY_PAGE_META.intro;

  return (
    <section className="py-10 sm:py-12 md:py-14">
      <Container>
        <div className="max-w-4xl text-left">
          {/* Eyebrow - max 16px */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {eyebrow}
          </p>

          {/* Subtitle (Gray) - max 24px */}
          <h1 className="mt-2 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            {subtitle}
          </h1>
        </div>
      </Container>
    </section>
  );
}