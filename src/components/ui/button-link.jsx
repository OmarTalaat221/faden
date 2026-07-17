import { cn } from "@/lib/utils";
import Link from "next/link";

const variants = {
  primary:
    "border-brand-primary bg-brand-primary text-white hover:border-brand-primary-hover hover:bg-brand-primary-hover",
  outline:
    "border-brand-primary bg-transparent text-brand-primary hover:bg-brand-primary hover:text-white",
  ghost:
    "border-[#C9C7C6] !border-[1.5px] bg-transparent text-white hover:border-brand-primary hover:bg-brand-primary hover:text-white",
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center rounded-[4px] border px-6 py-3 text-sm font-semibold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-primary",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
