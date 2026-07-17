import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * PageBanner - Reusable banner for inner pages
 *
 * Full-width image banner with centered title.
 * Header is provided by the root layout (do NOT add here).
 *
 * @param {string} title - Main title (centered, large white) - max 72px
 * @param {string} subtitle - Small text below title (#C9C7C6) - max 24px
 * @param {string} backgroundImage - Path to bg image
 * @param {string} className
 */
export default function PageBanner({
  title,
  subtitle,
  backgroundImage = "/images/faden/image-05.jpg",
  className,
}) {
  return (
    <section
      className={cn("relative isolate w-full overflow-hidden", className)}
      aria-label={title}
    >
      {/* Banner height (leaves room for header on top) */}
      <div className="relative h-[340px] w-full sm:h-[400px] md:h-[460px] lg:h-[500px] xl:h-[520px]">
        {/* Background Image */}
        <Image
          src={backgroundImage}
          alt=""
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
          aria-hidden="true"
        />

        {/* Dark Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(15,15,15,0.55) 0%, rgba(15,15,15,0.35) 45%, rgba(15,15,15,0.60) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Centered Title & Subtitle */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-16 text-center sm:pt-20">
          {/* Title - max 72px */}
          <h1 className="text-[32px] font-semibold leading-tight text-white sm:text-[40px] md:text-[52px] lg:text-[62px] xl:text-[72px]">
            {title}
          </h1>

          {/* Subtitle - max 24px, color #C9C7C6 */}
          {subtitle && (
            <p className="mt-3 text-sm font-normal text-[#C9C7C6] sm:mt-4 sm:text-base md:text-lg lg:text-[22px] xl:text-2xl">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
