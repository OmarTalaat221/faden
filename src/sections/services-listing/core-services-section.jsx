import Image from "next/image";
import Link from "next/link";
import Container from "@/components/layout/container";

export default function CoreServicesSection({ heading, services = [] }) {
  if (!services.length) return null;

  return (
    <section className="relative overflow-hidden bg-white pb-14 sm:pb-16 md:pb-20 lg:pb-24">
      <Container>
        <div className="max-w-4xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {heading?.eyebrow || "Our Core Services"}
          </p>
          {heading?.subtitle && (
            <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
              {heading.subtitle}
            </p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-10 lg:grid-cols-3 lg:gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/services/${service.slug}`}
              className="group block"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={service.img || "/images/faden/our-services-1.webp"}
                  alt={service.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[var(--foreground)] transition-colors group-hover:text-[var(--brand-primary)] sm:text-lg md:text-xl lg:text-[22px]">
                {service.name}
              </h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}