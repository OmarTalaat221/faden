import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";
import { EQUIPMENT_LIST, EQUIPMENT_PAGE_META } from "@/lib/equipment/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function HeavyEquipmentSection() {
  const { eyebrow, subtitle } = EQUIPMENT_PAGE_META.heavy;

  return (
    <section className="relative overflow-hidden pb-16 sm:pb-20 md:pb-24 lg:pb-28">
      {/* Decorative Pattern - Middle Left */}
      <DecorativePattern
        variant="trianglesOutlined"
        // opacity={0.35}
        className="left-0 top-0 h-auto w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px]"
      />

      {/* Decorative Pattern - Bottom Right */}
      <DecorativePattern
        variant="trianglesOutlined"
        // opacity={0.35}
        className="right-0 bottom-10 h-auto w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px]"
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="max-w-3xl text-left">
          {/* Eyebrow - max 16px */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {eyebrow}
          </p>

          {/* Subtitle (Gray) - max 24px */}
          <h2 className="mt-2 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            {subtitle}
          </h2>
        </div>

        {/* Grid - 19 items - smaller cards */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
          {EQUIPMENT_LIST.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col overflow-hidden rounded-md border border-[var(--border)] bg-white transition-shadow duration-300 hover:shadow-md"
            >
              {/* Image Wrapper - smaller heights */}
              <div className="relative flex h-20 items-center justify-center p-2 sm:h-24 md:h-28 lg:h-32">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={180}
                  height={130}
                  className={cn(
                    "max-h-full w-auto max-w-full object-contain transition-transform duration-300",
                    item.rotate && "rotate-360",
                  )}
                  sizes="(max-width: 640px) 45vw, (max-width: 768px) 30vw, (max-width: 1024px) 22vw, 160px"
                />
              </div>

              {/* Label - smaller padding */}
              <div className=" px-2 py-2 text-center">
                <p className="text-[11px] font-medium text-[var(--foreground)] sm:text-xs md:text-[13px]">
                  {item.name} ({item.count})
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
