import DecorativePattern from "@/components/common/decorative-pattern";
import RevealImage from "@/components/common/reveal-image";
import Container from "@/components/layout/container";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate scroll-mt-20 overflow-hidden bg-white pt-20 pb-0 sm:pt-24 lg:pt-32"
    >
      {/* Triangles pattern — top-left */}
      {/* <DecorativePattern variant="triangles" className="left-0 -top-10 -z-10" /> */}

      {/* FADEN outline — bottom-right */}
      <DecorativePattern
        variant="fadenOutline"
        className="bottom-0 right-0 -z-10 w-[200px] xs:w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] xl:w-[385px]"
      />

      <Container
        className="
          grid items-center gap-8 pb-16
          sm:gap-10 sm:pb-20
          md:grid-cols-[1.1fr_0.9fr] md:gap-8 md:pb-24
          lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pb-28
          xl:gap-20
        "
      >
        {/* النص */}
        <div>
          <p className="mb-2 text-[13px] font-bold uppercase tracking-[0.02em] text-brand-primary sm:mb-3 sm:text-[14px] md:text-[15px] lg:text-[16px]">
            About Us
          </p>

          <h2
            id="about-heading"
            className="text-balance text-lg font-medium tracking-[-0.025em] text-muted-foreground xs:text-xl sm:text-[22px] md:text-[22px] lg:text-2xl xl:text-[26px]"
          >
            In-Depth Information About the Company and Its Work
          </h2>

          <div
            className="
              mt-6 space-y-4 text-[14px] leading-[1.7] text-[#555555]
              xs:text-[15px]
              sm:mt-7 sm:space-y-5 sm:text-[15px]
              md:mt-8 md:space-y-5 md:text-[15px]
              lg:mt-9 lg:space-y-6 lg:text-[16px]
              xl:text-[18px]
            "
          >
            <p>
              Established in 1976 and headquartered in Riyadh, FADEN Contracting
              Company has grown into one of the region&apos;s leading
              construction enterprises.
            </p>
            <p>
              With 48+ years of experience and a team of over 1,000
              professionals, we&apos;ve delivered landmark projects across Saudi
              Arabia with excellence and precision.
            </p>
            <p>
              In 2024, FADEN partnered with{" "}
              <strong className="font-semibold text-brand-primary">
                Global Energy for Investment and Industry
              </strong>{" "}
              to drive innovation and sustainability in the construction sector
              across Saudi Arabia and Egypt.
            </p>
            <p>
              Building excellence since 1976 — Innovating today, shaping
              tomorrow.
            </p>
          </div>
        </div>

        {/* الصورة */}
        <RevealImage
          className="
            mx-auto w-full overflow-hidden rounded-[4px] shadow-[0_18px_50px_rgba(0,0,0,0.08)]
            aspect-[4/3.2] max-w-[520px]
            xs:aspect-[4/3.4]
            sm:aspect-[4/3.6] sm:max-w-[560px]
            md:aspect-[4/4.35] md:mx-0 md:max-w-[420px] md:justify-self-end
            lg:max-w-[470px]
          "
        >
          <Image
            src="/images/faden/about-us-section.webp"
            alt="FADEN office workspace showing a laptop with the company brand, notebook, and design tools on a modern desk"
            fill
            loading="lazy"
            decoding="async"
            sizes="(max-width: 767px) 92vw, (max-width: 1023px) 45vw, 470px"
            className="object-cover"
          />
        </RevealImage>
      </Container>
    </section>
  );
}
