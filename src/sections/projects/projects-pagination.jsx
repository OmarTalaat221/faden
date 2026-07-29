"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function getPagesToShow(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [1];
  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");
  pages.push(total);

  return pages;
}

export default function ProjectsPagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pagesToShow = getPagesToShow(page, totalPages);

  const goTo = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  };

  return (
    <nav
      aria-label="Projects pagination"
      className="mt-10 flex items-center justify-center gap-1.5 sm:mt-12 sm:gap-2"
    >
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
        className={cn(
          "grid size-9 place-items-center rounded-md text-muted-foreground transition-colors sm:size-10",
          page === 1
            ? "cursor-not-allowed opacity-40"
            : "hover:bg-muted hover:text-brand-primary",
        )}
      >
        <ChevronLeft size={18} />
      </button>

      {pagesToShow.map((p, idx) =>
        p === "..." ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 text-sm text-muted-foreground"
            aria-hidden="true"
          >
            ...
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => goTo(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
            className={cn(
              "grid size-9 place-items-center rounded-md text-sm font-semibold transition-colors sm:size-10",
              p === page
                ? "text-brand-primary"
                : "text-foreground hover:bg-muted hover:text-brand-primary",
            )}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => goTo(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
        className={cn(
          "grid size-9 place-items-center rounded-md text-muted-foreground transition-colors sm:size-10",
          page === totalPages
            ? "cursor-not-allowed opacity-40"
            : "hover:bg-muted hover:text-brand-primary",
        )}
      >
        <ChevronRight size={18} />
      </button>
    </nav>
  );
}