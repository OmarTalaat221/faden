"use client";

import { cn } from "@/lib/utils";
import { PROJECTS_CATEGORIES } from "@/lib/projects/data";

export default function ProjectsMobileChips({ filters, onChange }) {
  const isAll = filters.categories.length === 0;

  const handleAll = () => {
    onChange({ ...filters, categories: [] });
  };

  const handleCategory = (slug) => {
    const has = filters.categories.includes(slug);
    onChange({
      ...filters,
      categories: has
        ? filters.categories.filter((c) => c !== slug)
        : [...filters.categories, slug],
    });
  };

  return (
    <div className="md:hidden -mx-4 xs:-mx-5 sm:-mx-6">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide px-4 xs:px-5 sm:px-6 py-1">
        {/* All */}
        <button
          type="button"
          onClick={handleAll}
          className={cn(
            "shrink-0 rounded-md px-4 py-2 text-[13px] font-medium transition-colors",
            isAll
              ? "bg-brand-primary text-white"
              : "bg-white border border-border text-foreground hover:border-foreground/40",
          )}
        >
          All
        </button>

        {/* Categories */}
        {PROJECTS_CATEGORIES.map((cat) => {
          const active = filters.categories.includes(cat.slug);
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleCategory(cat.slug)}
              className={cn(
                "shrink-0 rounded-md px-4 py-2 text-[13px] font-medium transition-colors whitespace-nowrap",
                active
                  ? "bg-brand-primary text-white"
                  : "bg-white border border-border text-foreground hover:border-foreground/40",
              )}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}