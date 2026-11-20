"use client";

import { AUDIENCES } from "@/lib/projects/audience";
import { cn } from "@/lib/utils";

/**
 * The split at the top of the portfolio: everything, the work companies and
 * public bodies commission, or the work private owners do. It stands where
 * the KSA / Egypt split used to, because who asked for a project tells a
 * visitor more than which border it sits behind.
 */
export default function ProjectsAudienceToggle({ value, onChange }) {
  const options = [{ key: null, label: "All Projects" }, ...AUDIENCES];

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      {options.map((option) => {
        const active = value === option.key;
        return (
          <button
            key={option.label}
            type="button"
            onClick={() => onChange(option.key)}
            className={cn(
              "rounded-md px-5 py-2.5 text-[13px] font-semibold transition-colors sm:text-[14px]",
              active
                ? "bg-brand-primary text-white"
                : "border border-border bg-white text-foreground hover:border-brand-primary/50",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
