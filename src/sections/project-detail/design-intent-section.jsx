import DecorativePattern from "@/components/common/decorative-pattern";
import RevealImage from "@/components/common/reveal-image";
import Container from "@/components/layout/container";
import Image from "next/image";

export default function DesignIntentSection({ designIntent }) {
  if (!designIntent) return null;
  const { label, caption, paragraphs = [], image } = designIntent;

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 md:py-14">
      <DecorativePattern
        variant="trianglesRight"
        className="pointer-events-none right-0 top-0 w-[260px] sm:w-[340px] lg:w-[420px] xl:w-[468px]"
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.4fr_1fr] md:items-start md:gap-10">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px]">
              {label}
            </p>
            {caption && (
              <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl">
                {caption}
              </p>
            )}

            <div className="mt-6 space-y-4">
              {paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-sm leading-7 text-[var(--foreground)] sm:text-base md:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {image && (
            <div className="relative mx-auto w-full max-w-sm">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-4 -right-4 h-full w-full rounded-md border-2 border-[var(--brand-primary)]"
              />
              <RevealImage className="relative aspect-[4/5] w-full overflow-hidden rounded-md">
                <Image
                  src={image}
                  alt={label || "Design intent"}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </RevealImage>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
