import Image from "next/image";
import Container from "@/components/layout/container";
import { getAboutLeadership } from "./data";

export default async function SubsidiariesSection() {
  const leadershipData = await getAboutLeadership();
  const { subsidiaries } = leadershipData;

  return (
    <section className="relative w-full bg-white pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      <Container>
        <div className="relative z-10">
          {/* Eyebrow - max 16px */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {subsidiaries.eyebrow}
          </p>

          {/* Subtitle - max 24px */}
          <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            {subsidiaries.subtitle}
          </p>

          {/* Logos - Always 3 columns (responsive sizes) */}
          <div className="mt-8 grid grid-cols-3 place-items-center gap-3 sm:mt-10 sm:gap-6 md:gap-8 lg:gap-12">
            {subsidiaries.logos.map((logo, i) => (
              <div
                key={i}
                className="relative flex items-center justify-center h-[68px] w-[104px] md:h-[152px] md:w-[232px] lg:h-[164px] lg:w-[250px]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  sizes="(max-width: 768px) 104px, (max-width: 1024px) 232px, 250px"
                  className="object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
