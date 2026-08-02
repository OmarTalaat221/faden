import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function FadenLogo({
  light = false,
  width = 140,
  height = 64,
  className,
  priority = false,
}) {
  const src = light
    ? "/images/faden/logo-light.png"
    : "/images/faden/logo.webp";

  return (
    <Link
      href="/"
      aria-label="FADEN Contracting Company - Home"
      className={cn("inline-flex items-center", className)}
    >
      <Image
        src={src}
        alt="FADEN Contracting Company"
        width={width}
        height={height}
        priority={priority}
        className="h-auto w-full"
      />
    </Link>
  );
}
