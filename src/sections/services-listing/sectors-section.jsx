import Container from "@/components/layout/container";
import Image from "next/image";

/**
 * The sectors we build in. The titles used to appear only on hover, which
 * hid the whole point of the block on a phone, where there is no hover at
 * all; they now sit on a scrim and the hover is reserved for emphasis.
 */
export default function SectorsSection({ sectors }) {
  if (!sectors || !sectors.items?.length) return null;

  return (
    <section className="relative overflow-hidden bg-[var(--muted)] py-10 sm:py-10 md:py-14 lg:py-16">
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
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-[var(--foreground)]"
            >
              <Image
                src={sector.image}
                alt={sector.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
              />

              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/90"
              />

              <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <h3 className="text-[13px] font-semibold leading-tight text-white sm:text-sm md:text-base lg:text-[17px]">
                  {sector.title}
                </h3>
                <span
                  aria-hidden
                  className="mt-2 block h-px w-full origin-left scale-x-0 bg-[var(--brand-primary)] transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
