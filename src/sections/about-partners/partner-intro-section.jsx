import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";
import Image from "next/image";
import { getAboutPartners } from "./data";

export default async function PartnerIntroSection() {
  const partnersData = await getAboutPartners();
  const { intro } = partnersData;

  return (
    <section className="relative w-full overflow-hidden bg-white pt-12 pb-8 sm:pt-16 sm:pb-10 md:pt-20 md:pb-12 lg:pt-24 lg:pb-14">
      {/* Decorative Pattern - Top Left */}
      <DecorativePattern
        variant="triangles"
        // opacity={0.35}
        className="top-0 left-0 "
      />

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

          {/* Logo */}
          <div className="mt-8">
            <div className="relative h-[40px] w-[140px] sm:h-[48px] sm:w-[170px] md:h-[54px] md:w-[190px]">
              <Image
                src={intro.logo}
                alt={intro.logoAlt}
                fill
                sizes="190px"
                className="object-contain object-left"
                loading="lazy"
              />
            </div>
          </div>

          {/* Title - max 28px */}
          <h2 className="mt-5 text-lg font-semibold text-[var(--foreground)] sm:text-xl md:text-2xl lg:text-[26px] xl:text-[28px]">
            {intro.title}
          </h2>

          {/* Badge - max 14px */}
          <p className="mt-2 text-xs font-normal text-[var(--muted-foreground)] sm:text-[13px] lg:text-sm">
            {intro.badge}
          </p>

          {/* Description - max 20px */}
          <p className="mt-4 text-sm font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-[15px] md:text-base lg:text-[18px] xl:text-xl">
            {intro.description}
          </p>

          {/* Bullets - max 18px */}
          <ul className="mt-5 list-disc space-y-2 pl-5 text-sm font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-[15px] md:text-base lg:text-[17px] xl:text-lg">
            {intro.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
