import DecorativePattern from "@/components/common/decorative-pattern";
import RevealImage from "@/components/common/reveal-image";
import Container from "@/components/layout/container";
import Image from "next/image";

export default function OverviewSection({ section }) {
  const { title, subtitle, content, img } = section;
  const paragraphs = content?.paragraphs || [];

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-20 lg:py-24">
      <DecorativePattern
        variant="trianglesOutlined"
        // opacity={0.35}
        className="pointer-events-none absolute left-0 top-0 "
      />
      {/* <DecorativePattern
        variant="trianglesOutlined"
        // opacity={0.35}
        className="pointer-events-none absolute bottom-0 right-0 "
      /> */}

      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start md:gap-12 lg:gap-16">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
              {title}
            </p>
            {subtitle && (
              <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
                {subtitle}
              </p>
            )}

            <div className="mt-6 space-y-4">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm leading-7 text-[var(--foreground)] sm:text-base md:text-[17px] lg:text-lg xl:text-xl"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {img && (
            <div className="relative">
              <RevealImage>
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                  <Image
                    src={img}
                    alt={title || "Service overview"}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </RevealImage>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
