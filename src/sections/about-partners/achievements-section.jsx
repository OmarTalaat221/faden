import Container from "@/components/layout/container";
import { partnersData } from "./data";

export default function AchievementsSection() {
  const { achievements } = partnersData;

  return (
    <section className="relative w-full bg-white py-10 sm:py-12 md:py-14 lg:py-16">
      <Container>
        <div className="relative z-10">
          {/* Eyebrow - max 16px */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {achievements.eyebrow}
          </p>
          {/* Subtitle - max 24px */}
          <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            {achievements.subtitle}
          </p>

          {/* Cards */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {achievements.items.map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center rounded-md border border-[var(--border)] bg-white px-5 py-6 text-center transition-all duration-300 hover:border-[var(--brand-primary)] hover:shadow-lg sm:px-6 sm:py-7 md:px-7 md:py-8"
                >
                  {/* Icon box */}
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full sm:mb-4 sm:h-14 sm:w-14 lg:h-[60px] lg:w-[60px]">
                    <Icon
                      className="h-5 w-5 text-[var(--brand-primary)] sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Title - max 20px */}
                  <h3 className="text-base font-semibold text-[var(--foreground)] sm:text-lg md:text-[19px] xl:text-xl">
                    {card.title}
                  </h3>

                  {/* Description - max 16px */}
                  <p className="mt-2 text-xs font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-[13px] md:text-sm lg:text-[15px] xl:text-base">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
