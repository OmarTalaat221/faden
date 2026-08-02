import { cn } from "@/lib/utils";
import Image from "next/image";

const PATTERNS = {
  triangles: {
    src: "/images/faden/pattern-for-faden.png",
    naturalWidth: 280,
    naturalHeight: 420,
  },
  trianglesRight: {
    src: "/images/faden/pattern-for-faden-right.png",
    naturalWidth: 280,
    naturalHeight: 420,
  },
  trianglesOutlined: {
    src: "/images/faden/pattern-for-faden-2.png",
    naturalWidth: 280,
    naturalHeight: 420,
  },
  trianglesOutlinedRight: {
    src: "/images/faden/pattern-for-faden-2-right.webp",
    naturalWidth: 280,
    naturalHeight: 420,
  },
  fadenOutline: {
    src: "/images/faden/faden-pattern.webp",
    naturalWidth: 385,
    naturalHeight: 145,
  },
};

// Default responsive sizes per variant
// Max 260px on xl, scales down responsively
const DEFAULT_SIZES = {
  triangles:
    "w-[110px] xs:w-[130px] sm:w-[160px] md:w-[190px] lg:w-[220px] xl:w-[260px] h-auto",
  trianglesRight:
    "w-[110px] xs:w-[130px] sm:w-[160px] md:w-[190px] lg:w-[220px] xl:w-[260px] h-auto",
  trianglesOutlined:
    "w-[110px] xs:w-[130px] sm:w-[160px] md:w-[190px] lg:w-[220px] xl:w-[260px] h-auto",
  trianglesOutlinedRight:
    "w-[110px] xs:w-[130px] sm:w-[160px] md:w-[190px] lg:w-[220px] xl:w-[260px] h-auto",
  fadenOutline:
    "w-[140px] xs:w-[170px] sm:w-[200px] md:w-[220px] lg:w-[240px] xl:w-[260px] h-auto",
};

export default function DecorativePattern({
  variant = "triangles",
  className = "",
  opacity = 1,
}) {
  const pattern = PATTERNS[variant];
  if (!pattern) return null;

  // If user passes explicit width (w-*, w-[...]) in className,
  // it overrides the default via tailwind-merge in cn().
  const defaultSize = DEFAULT_SIZES[variant] || "";

  return (
    <Image
      src={pattern.src}
      alt=""
      aria-hidden="true"
      width={pattern.naturalWidth}
      height={pattern.naturalHeight}
      loading="lazy"
      decoding="async"
      sizes="(max-width: 640px) 160px, (max-width: 1024px) 220px, 260px"
      style={{ opacity }}
      className={cn(
        "pointer-events-none absolute select-none",
        defaultSize,
        className,
      )}
    />
  );
}
