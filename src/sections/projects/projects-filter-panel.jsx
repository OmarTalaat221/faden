"use client";

import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  PROJECTS_CATEGORIES,
  PROJECTS_PARTNERSHIP_TYPES,
} from "@/lib/projects/data";

const EMPTY_FILTERS = {
  categories: [],
  partnershipTypes: [],
  withoutImages: false,
};

export default function ProjectsFilterPanel({
  isOpen,
  onClose,
  appliedFilters,
  onApply,
}) {
  // Local state (draft) - only commits on Apply
  const [draft, setDraft] = useState(appliedFilters || EMPTY_FILTERS);
  const [categoriesOpen, setCategoriesOpen] = useState(true);
  const [partnershipOpen, setPartnershipOpen] = useState(true);

  // Sync draft when panel opens
  useEffect(() => {
    if (isOpen) {
      setDraft(appliedFilters || EMPTY_FILTERS);
    }
  }, [isOpen, appliedFilters]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isOpen]);

  // ESC to close
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const isAllCategories = draft.categories.length === 0;

  const toggleCategory = (slug) => {
    setDraft((prev) => {
      const has = prev.categories.includes(slug);
      return {
        ...prev,
        categories: has
          ? prev.categories.filter((c) => c !== slug)
          : [...prev.categories, slug],
      };
    });
  };

  const selectAllCategories = () => {
    setDraft((prev) => ({ ...prev, categories: [] }));
  };

  const togglePartnership = (type) => {
    setDraft((prev) => {
      const has = prev.partnershipTypes.includes(type);
      return {
        ...prev,
        partnershipTypes: has
          ? prev.partnershipTypes.filter((t) => t !== type)
          : [...prev.partnershipTypes, type],
      };
    });
  };

  const toggleWithoutImages = () => {
    setDraft((prev) => ({ ...prev, withoutImages: !prev.withoutImages }));
  };

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  const handleReset = () => {
    setDraft(EMPTY_FILTERS);
    onApply(EMPTY_FILTERS);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Filter projects"
        className={cn(
          "fixed top-0 right-0 z-[61] h-full w-full max-w-[380px] sm:max-w-[420px]",
          "bg-white shadow-2xl flex flex-col",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Close button (mobile-friendly) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors z-10"
          aria-label="Close filters"
        >
          <X className="h-5 w-5 text-foreground" />
        </button>

        {/* Content (scrollable) */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6 sm:py-8">
          {/* Categories */}
          <div className="border-b border-border pb-5">
            <button
              type="button"
              onClick={() => setCategoriesOpen((v) => !v)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="text-[15px] sm:text-[16px] font-semibold text-foreground">
                Categories
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-foreground transition-transform",
                  categoriesOpen && "rotate-180",
                )}
              />
            </button>

            {categoriesOpen && (
              <div className="mt-4 space-y-3">
                {/* All (radio-style using checkbox) */}
                <label className="flex items-center gap-3 cursor-pointer group">
                  <span
                    className={cn(
                      "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm border transition-colors",
                      isAllCategories
                        ? "bg-brand-primary border-brand-primary"
                        : "bg-white border-border group-hover:border-foreground/40",
                    )}
                  >
                    {isAllCategories && (
                      <svg
                        className="h-3 w-3 text-white"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    checked={isAllCategories}
                    onChange={selectAllCategories}
                    className="sr-only"
                  />
                  <span className="text-[13px] sm:text-[14px] text-foreground">
                    All
                  </span>
                </label>

                {/* Individual categories */}
                {PROJECTS_CATEGORIES.map((cat) => {
                  const checked = draft.categories.includes(cat.slug);
                  return (
                    <label
                      key={cat.id}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <span
                        className={cn(
                          "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm border transition-colors",
                          checked
                            ? "bg-brand-primary border-brand-primary"
                            : "bg-white border-border group-hover:border-foreground/40",
                        )}
                      >
                        {checked && (
                          <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCategory(cat.slug)}
                        className="sr-only"
                      />
                      <span className="text-[13px] sm:text-[14px] text-foreground">
                        {cat.name}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Partnership Type */}
          <div className="border-b border-border py-5">
            <button
              type="button"
              onClick={() => setPartnershipOpen((v) => !v)}
              className="w-full flex items-center justify-between text-left"
            >
              <span className="text-[15px] sm:text-[16px] font-semibold text-foreground">
                Partnership Type
              </span>
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-foreground transition-transform",
                  partnershipOpen && "rotate-180",
                )}
              />
            </button>

            {partnershipOpen && (
              <div className="mt-4 space-y-3">
                {PROJECTS_PARTNERSHIP_TYPES.map((type) => {
                  const checked = draft.partnershipTypes.includes(type);
                  return (
                    <label
                      key={type}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <span
                        className={cn(
                          "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm border transition-colors",
                          checked
                            ? "bg-brand-primary border-brand-primary"
                            : "bg-white border-border group-hover:border-foreground/40",
                        )}
                      >
                        {checked && (
                          <svg
                            className="h-3 w-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            viewBox="0 0 24 24"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => togglePartnership(type)}
                        className="sr-only"
                      />
                      <span className="text-[13px] sm:text-[14px] text-foreground">
                        {type}
                      </span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Projects without images */}
          <div className="py-5">
            <label className="flex items-center gap-3 cursor-pointer group">
              <span
                className={cn(
                  "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm border transition-colors",
                  draft.withoutImages
                    ? "bg-brand-primary border-brand-primary"
                    : "bg-white border-border group-hover:border-foreground/40",
                )}
              >
                {draft.withoutImages && (
                  <svg
                    className="h-3 w-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </span>
              <input
                type="checkbox"
                checked={draft.withoutImages}
                onChange={toggleWithoutImages}
                className="sr-only"
              />
              <span className="text-[13px] sm:text-[14px] text-foreground font-medium">
                Projects without images
              </span>
            </label>
          </div>

          {/* Apply + Reset */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleApply}
              className={cn(
                "flex-1 rounded-md bg-brand-primary hover:bg-brand-primary-hover",
                "px-5 py-2.5 text-[14px] text-white font-medium transition-colors",
              )}
            >
              Apply
            </button>
            <button
              type="button"
              onClick={handleReset}
              className={cn(
                "flex-1 rounded-md border border-border bg-white hover:bg-muted",
                "px-5 py-2.5 text-[14px] text-foreground font-medium transition-colors",
              )}
            >
              Reset
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}