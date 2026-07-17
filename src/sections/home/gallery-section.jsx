import DecorativePattern from "@/components/common/decorative-pattern";
import RevealImage from "@/components/common/reveal-image";
import Container from "@/components/layout/container";
import ButtonLink from "@/components/ui/button-link";
import Image from "next/image";

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="gallery-heading"
    >
      {/* Decorative pattern - top left */}
      <DecorativePattern
        variant="trianglesOutlined"
        className="left-0 top-0 -z-0 w-[180px] sm:w-[240px] lg:w-[300px] xl:w-[360px]"
      />

      {/* Decorative pattern - bottom right */}
      <DecorativePattern
        variant="triangles"
        className="bottom-0 right-0 -z-0 w-[180px] sm:w-[240px] lg:w-[320px] xl:w-[380px]"
      />

      <Container>
        {/* Header */}
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-[16px]">
              Our Gallery
            </p>
            <h2
              id="gallery-heading"
              className="mt-3 text-lg font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-xl md:text-[22px] lg:text-2xl xl:text-[26px]"
            >
              Explore a visual journey through our completed projects and design
              concepts.
            </h2>
          </div>

          <div className="shrink-0">
            <ButtonLink
              href="#gallery"
              variant="outline"
              className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
            >
              View Details
            </ButtonLink>
          </div>
        </div>

        {/* ============ MOBILE LAYOUT (< md) ============ */}
        <div className="relative z-10 mt-10 flex flex-col gap-4 sm:mt-12 md:hidden">
          <RevealImage
            delay={0}
            className="group h-[161px] w-full overflow-hidden rounded-[6px] xs:h-[190px] sm:h-[240px]"
          >
            <Image
              src="/images/faden/gallery-1.webp"
              alt="Luxury FADEN project entrance"
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </RevealImage>
          <RevealImage
            delay={150}
            className="group h-[161px] w-full overflow-hidden rounded-[6px] xs:h-[190px] sm:h-[240px]"
          >
            <Image
              src="/images/faden/gallery-2.webp"
              alt="Modern FADEN villa"
              fill
              loading="lazy"
              sizes="100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </RevealImage>
          <div className="grid xs:grid-cols-2 gap-4">
            <RevealImage
              delay={300}
              className="group h-[161px] overflow-hidden rounded-[6px] xs:h-[180px] sm:h-[220px]"
            >
              <Image
                src="/images/faden/gallery-3.webp"
                alt="FADEN landscaped courtyard"
                fill
                loading="lazy"
                sizes="50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </RevealImage>
            <RevealImage
              delay={450}
              className="group h-[161px] overflow-hidden rounded-[6px] xs:h-[180px] sm:h-[220px]"
            >
              <Image
                src="/images/faden/gallery-4.webp"
                alt="FADEN completed palace"
                fill
                loading="lazy"
                sizes="50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </RevealImage>
          </div>
        </div>

        {/* ============ TABLET/DESKTOP LAYOUT (md+) ============ */}
        <div className="relative z-10 mt-10 hidden gap-5 sm:mt-12 md:grid md:grid-cols-2 lg:mt-14 lg:gap-6">
          {/* الصورة الكبيرة - شمال */}
          <RevealImage
            delay={0}
            className="group overflow-hidden rounded-[6px] md:h-[520px] lg:h-[600px] xl:h-[640px]"
          >
            <Image
              src="/images/faden/gallery-1.webp"
              alt="Luxury FADEN project entrance"
              fill
              loading="lazy"
              sizes="50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </RevealImage>

          {/* العمود اليمين */}
          <div className="flex flex-col gap-5 lg:gap-6">
            <RevealImage
              delay={150}
              className="group overflow-hidden rounded-[6px] md:h-[250px] lg:h-[290px] xl:h-[310px]"
            >
              <Image
                src="/images/faden/gallery-2.webp"
                alt="Modern FADEN villa"
                fill
                loading="lazy"
                sizes="50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </RevealImage>

            <div className="grid flex-1 grid-cols-2 gap-5 lg:gap-6">
              <RevealImage
                delay={300}
                className="group overflow-hidden rounded-[6px]"
              >
                <Image
                  src="/images/faden/gallery-3.webp"
                  alt="FADEN landscaped courtyard"
                  fill
                  loading="lazy"
                  sizes="25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </RevealImage>
              <RevealImage
                delay={450}
                className="group overflow-hidden rounded-[6px]"
              >
                <Image
                  src="/images/faden/gallery-4.webp"
                  alt="FADEN completed palace"
                  fill
                  loading="lazy"
                  sizes="25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </RevealImage>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
