import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";
import { getAboutVisionMission } from "./data";

export default async function DriversSection() {
  const visionMissionData = await getAboutVisionMission();
  const { drivers } = visionMissionData;

  return (
    <section className="relative w-full overflow-hidden bg-white py-12 sm:py-16 md:py-20 lg:py-24">
      {/* Decorative Pattern - Top Right */}
      <DecorativePattern
        variant="trianglesRight"
        // opacity={0.35}
        className="top-0 right-0 "
      />

      <Container>
        <div className="relative z-10">
          {/* Header */}
          {/* Eyebrow - max 16px */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {drivers.eyebrow}
          </p>
          {/* Subtitle - max 24px */}
          <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            {drivers.subtitle}
          </p>

          {/* Primary Row - 2 cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
            {drivers.primary.map((card, i) => (
              <div
                key={i}
                className="rounded-md border border-[var(--border)] bg-white px-5 py-6 transition-all duration-300 hover:border-[var(--brand-primary)] hover:shadow-lg sm:px-6 sm:py-7 md:px-7 md:py-8"
              >
                {/* Card Title - max 24px */}
                <h3 className="text-lg font-semibold text-[var(--foreground)] sm:text-xl md:text-[22px] lg:text-2xl">
                  {card.title}
                </h3>
                {/* Card Description - max 20px */}
                <p className="mt-3 text-sm font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-[15px] md:text-base lg:text-[18px] xl:text-xl">
                  {card.description}
                </p>
              </div>
            ))}
          </div>

          {/* Secondary Row - 3 cards */}
          <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
            {drivers.secondary.map((card, i) => (
              <div
                key={i}
                className="rounded-md border border-[var(--border)] bg-white px-5 py-6 transition-all duration-300 hover:border-[var(--brand-primary)] hover:shadow-lg sm:px-6 sm:py-7 md:px-7 md:py-8"
              >
                {/* Card Title - max 24px */}
                <h3 className="text-lg font-semibold text-[var(--foreground)] sm:text-xl md:text-[22px] lg:text-2xl">
                  {card.title}
                </h3>
                {/* Card Description - max 20px */}
                <p className="mt-3 text-sm font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-[15px] md:text-base lg:text-[18px] xl:text-xl">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
