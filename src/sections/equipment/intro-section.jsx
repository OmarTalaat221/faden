import Container from "@/components/layout/container";
import { getEquipmentPageMeta } from "@/lib/equipment/data";

export default async function IntroSection() {
  const EQUIPMENT_PAGE_META = await getEquipmentPageMeta();
  const { eyebrow, subtitle, description } = EQUIPMENT_PAGE_META.intro;

  return (
    <section className="relative overflow-hidden py-8 sm:py-10 md:py-10 lg:py-14">
      <Container className="relative z-10">
        <div className="max-w-5xl text-left">
          {/* Eyebrow - max 16px */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {eyebrow}
          </p>

          {/* Subtitle (Gray) - max 24px */}
          <h2 className="mt-2 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            {subtitle}
          </h2>

          {/* Description (Black) - max 20px */}
          <p className="mt-6 text-sm leading-relaxed text-[var(--foreground)] sm:text-base md:text-[17px] lg:text-lg xl:text-[20px] xl:leading-[1.75]">
            {description}
          </p>
        </div>
      </Container>
    </section>
  );
}
