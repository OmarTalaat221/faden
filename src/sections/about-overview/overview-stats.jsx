import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";
import { getAboutOverview } from "./data";

export default async function OverviewStats() {
  const overviewData = await getAboutOverview();
  const { stats } = overviewData;

  return (
    <section className="relative w-full overflow-hidden bg-white pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      {/* Decorative Pattern - Bottom Right (FADEN Outline) */}
      <DecorativePattern
        variant="fadenOutline"
        className="bottom-0 right-0 h-auto w-[220px] sm:w-[300px] md:w-[380px] lg:w-[440px]"
      />

      <Container>
        <div className="relative z-10 mx-auto">
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div
                  key={i}
                  className="group flex flex-col items-center rounded-md border border-[var(--border)] bg-white px-4 py-6 text-center transition-all duration-300 hover:border-[var(--brand-primary)] hover:shadow-lg sm:px-5 sm:py-7 md:px-6 md:py-8"
                >
                  {/* Icon container - scales with icon */}
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full sm:mb-4 sm:h-14 sm:w-14 lg:h-[60px] lg:w-[60px]">
                    {/* Icon - max 28px */}
                    <Icon
                      className="h-5 w-5 text-[var(--brand-primary)] sm:h-6 sm:w-6 lg:h-7 lg:w-7"
                      strokeWidth={2}
                    />
                  </div>

                  {/* Value - max 24px */}
                  <p className="text-base font-bold text-[var(--foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
                    {stat.value}
                  </p>

                  {/* Description - max 18px */}
                  <p className="mt-1.5 text-xs font-normal leading-snug text-[var(--muted-foreground)] sm:mt-2 sm:text-[13px] md:text-sm lg:text-base xl:text-[18px]">
                    {stat.description}
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
