"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AccordionItem({ title, content, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-md border border-[var(--border)] bg-white transition-colors duration-300 hover:border-[var(--brand-primary)]/50">
      {/* Trigger */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left sm:px-5 sm:py-4 md:px-6"
      >
        {/* Title - max 20px */}
        <span className="text-sm font-medium text-[var(--foreground)] sm:text-base md:text-[17px] lg:text-lg xl:text-xl">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-[var(--muted-foreground)] transition-transform duration-300 sm:h-5 sm:w-5",
            isOpen && "rotate-180 text-[var(--brand-primary)]",
          )}
          strokeWidth={2}
        />
      </button>

      {/* Content */}
      <div
        className={cn(
          "grid transition-all duration-300 ease-in-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[var(--border)] px-4 py-3 sm:px-5 sm:py-4 md:px-6">
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
