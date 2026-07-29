"use client";

import { SORT_OPTIONS } from "@/lib/projects/data";
import { cn } from "@/lib/utils";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function ProjectsControls({
  sortValue,
  onSortChange,
  onFilterClick,
  activeFiltersCount = 0,
  hideFilterButton = false,
}) {
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (sortRef.current && !sortRef.current.contains(e.target)) {
        setSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentSort =
    SORT_OPTIONS.find((opt) => opt.value === sortValue) || SORT_OPTIONS[0];

  return (
    <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
      {/* Sort */}
      <div className="flex items-center gap-2" ref={sortRef}>
        <span className="hidden sm:inline text-[13px] sm:text-[14px] text-muted-foreground whitespace-nowrap">
          Sort by :
        </span>
        <div className="relative">
          <button
            type="button"
            onClick={() => setSortOpen((v) => !v)}
            className={cn(
              "flex items-center gap-2 rounded-md border border-border bg-white",
              "px-3 sm:px-4 py-2 text-[13px] sm:text-[14px] text-foreground",
              "hover:border-foreground/40 transition-colors",
              "min-w-[140px] sm:min-w-[180px] justify-between",
            )}
          >
            <span className="truncate">{currentSort.label}</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 shrink-0 transition-transform",
                sortOpen && "rotate-180",
              )}
            />
          </button>

          {sortOpen && (
            <div
              className={cn(
                "absolute right-0 top-full mt-2 z-20 w-full min-w-[180px]",
                "rounded-md border border-border bg-white shadow-lg overflow-hidden",
              )}
            >
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onSortChange(opt.value);
                    setSortOpen(false);
                  }}
                  className={cn(
                    "w-full text-left px-4 py-2.5 text-[13px] sm:text-[14px]",
                    "hover:bg-muted transition-colors",
                    sortValue === opt.value
                      ? "bg-brand-accent text-brand-primary font-medium"
                      : "text-foreground",
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Filter Button */}
      {!hideFilterButton && (
        <button
          type="button"
          onClick={onFilterClick}
          className={cn(
            "relative flex items-center gap-2 rounded-md",
            "bg-transparent border border-brand-primary  hover:bg-brand-primary-hover hover:text-white",
            "px-4 sm:px-5 py-2 text-[13px] sm:text-[14px] text-brand-primary font-medium",
            "transition-colors",
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          <span>Filter</span>
          {activeFiltersCount > 0 && (
            <span className="ml-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white text-brand-primary text-[11px] font-bold px-1.5">
              {activeFiltersCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
