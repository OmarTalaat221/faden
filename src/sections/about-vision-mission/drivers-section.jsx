import ContentIcon from "@/components/common/content-icon";
import Container from "@/components/layout/container";
import { iconForTitle } from "@/lib/content-icons";
import { getAboutVisionMission } from "./data";

/**
 * One card. The two in the top row are the headline pair, so they carry a
 * larger icon and heading; the three below are read as a set.
 */
function DriverCard({ card, featured }) {
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--background)] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-primary)]/40 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] sm:p-6 md:p-7"
    >
      {/* The accent bar grows across the top on hover, so the whole card reads
          as one target rather than the border alone changing colour. */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-[var(--brand-primary)] transition-transform duration-300 group-hover:scale-x-100"
      />

      <span
        className={
          featured
            ? "flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] transition-colors duration-300 group-hover:bg-[var(--brand-primary)] group-hover:text-white sm:h-14 sm:w-14"
            : "flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] transition-colors duration-300 group-hover:bg-[var(--brand-primary)] group-hover:text-white sm:h-12 sm:w-12"
        }
      >
        <ContentIcon
          name={iconForTitle(card.title, card.icon)}
          className={featured ? "h-6 w-6 sm:h-7 sm:w-7" : "h-5 w-5 sm:h-6 sm:w-6"}
          strokeWidth={1.75}
        />
      </span>

      <h3
        className={
          featured
            ? "mt-4 text-lg font-semibold text-[var(--foreground)] sm:text-xl md:text-[22px]"
            : "mt-4 text-base font-semibold text-[var(--foreground)] sm:text-lg md:text-xl"
        }
      >
        {card.title}
      </h3>
      <p className="mt-2 text-sm font-normal leading-[1.75] text-[var(--muted-foreground)] sm:text-[15px] lg:text-base">
        {card.description}
      </p>
    </article>
  );
}

export default async function DriversSection() {
  const visionMissionData = await getAboutVisionMission();
  const { drivers } = visionMissionData;

  return (
    <section className="relative w-full overflow-hidden bg-white py-8 sm:py-10 md:py-14 lg:py-16">
      <Container>
        <div className="relative z-10">
          {/* Eyebrow - max 16px */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {drivers.eyebrow}
          </p>
          {/* Subtitle - max 24px */}
          <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            {drivers.subtitle}
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 md:gap-6">
            {drivers.primary.map((card, i) => (
              <DriverCard key={i} card={card} featured />
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3 md:gap-6">
            {drivers.secondary.map((card, i) => (
              <DriverCard key={i} card={card} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
