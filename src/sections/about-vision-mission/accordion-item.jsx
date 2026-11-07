"use client";

import ContentIcon from "@/components/common/content-icon";
import { iconForTitle } from "@/lib/content-icons";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function AccordionItem({
  title,
  content,
  icon,
  isOpen,
  onToggle,
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border bg-[var(--background)] transition-all duration-300",
        isOpen
          ? "border-[var(--brand-primary)]/40 shadow-[0_12px_32px_rgba(0,0,0,0.07)]"
          : "border-[var(--border)] hover:border-[var(--brand-primary)]/40",
      )}
    >
      {/* A red rail marks the open item down its whole height, so the open one
          is readable at a glance without tinting the row. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-[3px] origin-top bg-[var(--brand-primary)] transition-transform duration-300",
          isOpen ? "scale-y-100" : "scale-y-0",
        )}
      />

      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left sm:gap-4 sm:px-5 sm:py-4 md:px-6"
      >
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors duration-300 sm:h-10 sm:w-10",
            isOpen
              ? "bg-[var(--brand-primary)] text-white"
              : "bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]",
          )}
        >
          <ContentIcon
            name={iconForTitle(title, icon)}
            className="h-[18px] w-[18px] sm:h-5 sm:w-5"
            strokeWidth={1.75}
          />
        </span>

        {/* Title - max 20px */}
        <span className="min-w-0 flex-1 text-sm font-medium text-[var(--foreground)] sm:text-base md:text-[17px] lg:text-lg xl:text-xl">
          {title}
        </span>

        {/* A plus that turns into a minus: it says "opens" on a closed row more
            plainly than a chevron does. */}
        <Plus
          className={cn(
            "h-4 w-4 shrink-0 transition-all duration-300 sm:h-5 sm:w-5",
            isOpen
              ? "rotate-45 text-[var(--brand-primary)]"
              : "text-[var(--muted-foreground)]",
          )}
          strokeWidth={2}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          {/* Indented to the title, not to the icon, so the copy lines up with
              the heading above it. */}
          <div className="px-4 pb-4 pl-[60px] sm:px-5 sm:pb-5 sm:pl-[68px] md:px-6 md:pl-[76px]">
            {/* Content - max 16px */}
            <p className="text-xs font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-[13px] md:text-sm lg:text-[15px] xl:text-base">
              {content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
