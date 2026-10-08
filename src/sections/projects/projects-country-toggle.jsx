"use client";

import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: null, label: "All Projects" },
  { value: "Saudi Arabia", label: "KSA Projects" },
  { value: "Egypt", label: "Egypt Projects" },
];

export default function ProjectsCountryToggle({ value, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-4">
      {OPTIONS.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.label}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "rounded-md px-5 py-2.5 text-[13px] sm:text-[14px] font-semibold transition-colors",
              active
                ? "bg-brand-primary text-white"
                : "bg-white border border-border text-foreground hover:border-brand-primary/50",
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
