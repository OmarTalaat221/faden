"use client";

import { AUDIENCES } from "@/lib/projects/audience";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "motion/react";

/**
 * The split at the top of the portfolio: everything, the work companies and
 * public bodies commission, or the work private owners do. It stands where
 * the country split used to, because who asked for a project tells a
 * visitor more than which border it sits behind.
 *
 * Drawn as a rail of tabs rather than filled chips: a chip row reads as a
 * filter applied on top of a page, and this is the page. The count beside
 * each label is what the old "showing N of M" row used to say, so the header
 * carries one row of furniture instead of two.
 */
export default function ProjectsAudienceToggle({
  value,
  onChange,
  counts = {},
}) {
  const reduceMotion = useReducedMotion();
  const options = [{ key: null, label: "All Projects" }, ...AUDIENCES];

  return (
    // Bleeds to the screen edge on small widths so the rail can be swiped
    // without the container's padding clipping the last tab.
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max items-end gap-6 border-b border-border sm:gap-9">
        {options.map((option) => {
          const active = value === option.key;
          const count = counts[option.key ?? "all"];

          return (
            <button
              key={option.label}
              type="button"
              onClick={() => onChange(option.key)}
              aria-pressed={active}
              className={cn(
                "relative flex items-baseline gap-2 pb-3 pt-1",
                "text-[14px] font-medium tracking-[-0.01em] transition-colors sm:text-[15px]",
                active
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <span>{option.label}</span>

              {typeof count === "number" && (
                <span
                  className={cn(
                    "text-[11px] font-semibold tabular-nums transition-colors",
                    active ? "text-brand-primary" : "text-muted-foreground/60",
                  )}
                >
                  {count}
                </span>
              )}

              {active && (
                // Sits on the rail itself, so switching tabs slides one mark
                // along a line that never moves.
                <motion.span
                  layoutId="projects-audience-rail"
                  className="absolute inset-x-0 -bottom-px h-[2px] rounded-full bg-brand-primary"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 38 }
                  }
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
