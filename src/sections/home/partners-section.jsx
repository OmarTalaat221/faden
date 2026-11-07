import DecorativePattern from "@/components/common/decorative-pattern";
import RevealImage from "@/components/common/reveal-image";
import Container from "@/components/layout/container";
import ButtonLink from "@/components/ui/button-link";
import Image from "next/image";

/**
 * The strategic partner, summarised. Same record the /partners page reads, so
 * editing the partner in the dashboard updates both. The photo is optional —
 * without one the copy runs the full width instead of leaving a gap.
 */
export default function PartnersSection({ partner }) {
  if (!partner) return null;

  const hasImage = Boolean(partner.image);

  return (
    <section
      id="partners"
      className="relative overflow-hidden bg-[#F9FAFB] py-16 sm:py-20 lg:py-24"
      aria-labelledby="partners-heading"
    >
      <DecorativePattern variant="triangles" className="top-0 right-0" />

      <Container>
        {/* Header: eyebrow + subtitle + link out, like the other home bands */}
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-[16px]">
              Partners
            </p>
            <h2
              id="partners-heading"
              className="mt-3 text-lg font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-xl md:text-[22px] lg:text-2xl xl:text-[24px]"
            >
              {partner.subtitle}
            </h2>
          </div>

          <div className="shrink-0">
            <ButtonLink
              href="/partners"
              variant="outline"
              className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
            >
              View Details
            </ButtonLink>
          </div>
        </div>

        <div
          className={
            hasImage
              ? "relative z-10 mt-10 grid items-center gap-8 sm:mt-12 md:grid-cols-[1.1fr_0.9fr] lg:gap-16"
              : "relative z-10 mt-10 sm:mt-12"
          }
        >
          <div className="min-w-0">
            <div className="relative h-[40px] w-[140px] sm:h-[48px] sm:w-[170px] md:h-[54px] md:w-[190px]">
              <Image
                src={partner.logo}
                alt={partner.logoAlt}
                fill
                sizes="190px"
                className="object-contain object-left"
                loading="lazy"
              />
            </div>

            <h3 className="mt-5 text-lg font-semibold text-[var(--foreground)] sm:text-xl md:text-2xl lg:text-[26px]">
              {partner.title}
            </h3>

            <p className="mt-2 text-xs font-normal text-[var(--muted-foreground)] sm:text-[13px] lg:text-sm">
              {partner.badge}
            </p>

            <p className="mt-4 text-sm font-normal leading-[1.7] text-[var(--muted-foreground)] sm:text-[15px] md:text-base lg:text-[17px]">
              {partner.description}
            </p>
          </div>

          {hasImage && (
            <RevealImage className="mx-auto aspect-[4/3] w-full max-w-[520px] overflow-hidden rounded-[4px] shadow-[0_18px_50px_rgba(0,0,0,0.08)] md:mx-0 md:aspect-[4/3.4] md:max-w-[460px] md:justify-self-end">
              <Image
                src={partner.image}
                alt={partner.imageAlt || partner.title}
                fill
                loading="lazy"
                decoding="async"
                sizes="(max-width: 767px) 92vw, (max-width: 1023px) 45vw, 460px"
                className="object-cover"
              />
            </RevealImage>
          )}
        </div>
      </Container>
    </section>
  );
}
