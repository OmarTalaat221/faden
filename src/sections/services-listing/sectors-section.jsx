import Image from "next/image";
import Container from "@/components/layout/container";
import DecorativePattern from "@/components/common/decorative-pattern";

export default function SectorsSection({ sectors }) {
  if (!sectors || !sectors.items?.length) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--muted)] py-14 sm:py-16 md:py-20 lg:py-24">
      <DecorativePattern
        variant="trianglesOutlined"
        opacity={0.35}
        className="pointer-events-none absolute right-0 top-0 w-[180px] sm:w-[220px] md:w-[260px]"
      />

      <Container>
        <div className="max-w-4xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {sectors.eyebrow}
          </p>
          {sectors.subtitle && (
            <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
              {sectors.subtitle}
            </p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:mt-10 lg:grid-cols-4 lg:gap-5">
          {sectors.items.map((sector, i) => (
            <div
              key={i}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-lg"
            >
              {/* Image - visible by default */}
              <Image
                src={sector.image}
                alt={sector.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Dark overlay - appears on hover only */}
              <div
                className="pointer-events-none absolute inset-0 bg-black/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />

              {/* Title - appears on hover only */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-4">
                <h3 className="text-center text-sm font-semibold leading-tight text-white sm:text-base md:text-lg lg:text-xl">
                  {sector.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}