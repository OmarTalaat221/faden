import { ArrowDownToLine } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * A file a visitor takes away with them. Marked `download` so it saves rather
 * than opening in a tab, and carries its own icon so it is not mistaken for
 * an ordinary link to another page.
 */
export default function DownloadButton({ href, children, className }) {
  if (!href) return null;

  return (
    <a
      href={href}
      download
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md border border-[var(--brand-primary)]",
        "px-5 py-2.5 text-[14px] font-semibold text-[var(--brand-primary)]",
        "transition-colors hover:bg-[var(--brand-primary)] hover:text-white sm:text-[15px]",
        className,
      )}
    >
      <ArrowDownToLine className="h-[18px] w-[18px] shrink-0 transition-transform group-hover:translate-y-[2px]" />
      <span>{children}</span>
    </a>
  );
}
