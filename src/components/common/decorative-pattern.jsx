import Image from "next/image";

const PATTERNS = {
  triangles: {
    src: "/images/faden/pattern-for-faden.webp",
    naturalWidth: 280,
    naturalHeight: 420,
  },
  trianglesOutlined: {
    src: "/images/faden/pattern-for-faden-2.webp",
    naturalWidth: 280,
    naturalHeight: 420,
  },
  fadenOutline: {
    src: "/images/faden/faden-pattern.webp",
    naturalWidth: 385,
    naturalHeight: 145,
  },
};

export default function DecorativePattern({
  variant = "triangles",
  className = "",
  opacity = 1,
}) {
  const pattern = PATTERNS[variant];
  if (!pattern) return null;

  return (
    <Image
      src={pattern.src}
      alt=""
      aria-hidden="true"
      width={pattern.naturalWidth}
      height={pattern.naturalHeight}
      loading="lazy"
      decoding="async"
      sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 400px"
      style={{ opacity }}
      className={`pointer-events-none absolute select-none ${className}`}
    />
  );
}
