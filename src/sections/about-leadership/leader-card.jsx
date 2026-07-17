import Image from "next/image";

/**
 * LeaderCard
 * - Mobile: photo (90x90) on top, name below, then eyebrow/subtitle/description centered
 * - Tablet/Desktop: photo left, content right (name under photo)
 */
export default function LeaderCard({ name, eyebrow, subtitle, image, description }) {
  return (
    <article className="flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:gap-6 md:text-left lg:gap-8">
      {/* Photo + Name */}
      <div className="flex flex-col items-center gap-2 md:shrink-0">
        {/* Circular photo: 90 -> 160 -> 220 */}
        <div className="relative h-[90px] w-[90px] overflow-hidden rounded-full border-2 border-[var(--brand-primary)] md:h-[160px] md:w-[160px] lg:h-[220px] lg:w-[220px]">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 90px, (max-width: 1024px) 160px, 220px"
            className="object-cover"
            loading="lazy"
          />
        </div>
        {/* Name under photo - max 22px */}
        <p className="text-sm font-medium text-[var(--foreground)] sm:text-base md:text-[17px] lg:text-lg xl:text-[22px]">
          {name}
        </p>
      </div>

      {/* Content */}
      <div className="flex-1">
        {/* Eyebrow - max 16px */}
        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
          {eyebrow}
        </p>

        {/* Subtitle - max 24px */}
        <p className="mt-2 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
          {subtitle}
        </p>

        {/* Description - max 20px */}
        <p className="mt-4 whitespace-pre-line text-sm font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-[15px] md:text-base lg:text-[18px] xl:text-xl">
          {description}
        </p>
      </div>
    </article>
  );
}
