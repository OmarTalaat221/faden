"use client";

import DecorativePattern from "@/components/common/decorative-pattern";
import RevealImage from "@/components/common/reveal-image";
import Container from "@/components/layout/container";
import { GALLERY_LIST, GALLERY_PAGE_META } from "@/lib/gallery/data";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

function createMasonryColumns(items, columnsCount) {
  const columns = Array.from({ length: columnsCount }, () => []);

  items.forEach((item, index) => {
    const columnIndex = index % columnsCount;
    const rowIndex = Math.floor(index / columnsCount);

    let isTall;

    if (columnsCount === 3) {
      isTall = columnIndex === 1 ? rowIndex % 2 !== 0 : rowIndex % 2 === 0;
    } else {
      isTall = columnIndex === 0 ? rowIndex % 2 === 0 : rowIndex % 2 !== 0;
    }

    columns[columnIndex].push({ ...item, isTall });
  });

  return columns;
}

function GalleryColumn({ items, sizes, currentPage }) {
  return (
    <div className="flex min-w-0 flex-col gap-3 sm:gap-4">
      {items.map((item) => {
        // Build viewer URL: /gallery?image=ID&page=N (preserve current page)
        const params = new URLSearchParams();
        params.set("image", String(item.id));
        if (currentPage > 1) params.set("page", String(currentPage));

        return (
          <Link
            key={item.id}
            href={`/gallery?${params.toString()}`}
            scroll={false}
            className={`group relative block w-full overflow-hidden rounded-[5px] ${
              item.isTall ? "aspect-[2/3]" : "aspect-[4/3]"
            }`}
            aria-label={`View ${item.alt}`}
          >
            <RevealImage
              delay={150}
              className={cn(
                "group relative block w-full overflow-hidden rounded-[5px]",
                item.isTall ? "aspect-[2/3]" : "aspect-[4/3]",
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ objectPosition: item.position || "center" }}
                sizes={sizes}
              />
            </RevealImage>
          </Link>
        );
      })}
    </div>
  );
}

function buildPages(current, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const set = new Set([1, total, current, current - 1, current + 1]);
  const arr = [...set]
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b);

  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i]);
    if (i < arr.length - 1 && arr[i + 1] - arr[i] > 1) {
      result.push("...");
    }
  }
  return result;
}

export default function GalleryGridSection() {
  const { itemsPerPage } = GALLERY_PAGE_META;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const totalPages = Math.ceil(GALLERY_LIST.length / itemsPerPage);

  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const page = Math.min(Math.max(1, isNaN(rawPage) ? 1 : rawPage), totalPages);

  const currentItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return GALLERY_LIST.slice(start, start + itemsPerPage);
  }, [page, itemsPerPage]);

  const mobileColumns = useMemo(
    () => createMasonryColumns(currentItems, 2),
    [currentItems],
  );
  const desktopColumns = useMemo(
    () => createMasonryColumns(currentItems, 3),
    [currentItems],
  );

  const pagesToShow = buildPages(page, totalPages);

  const buildHref = (p) => {
    if (p === 1) return pathname;
    return `${pathname}?page=${p}`;
  };

  const goTo = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    router.push(buildHref(p), { scroll: false });
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden pb-16 sm:pb-20 md:pb-24">
      <DecorativePattern
        variant="trianglesOutlined"
        className="right-0 top-4 "
      />

      <DecorativePattern
        variant="trianglesOutlined"
        className="bottom-16 left-0 "
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 items-start gap-3 sm:gap-4 md:hidden">
          {mobileColumns.map((column, index) => (
            <GalleryColumn
              key={`mobile-column-${index}`}
              items={column}
              currentPage={page}
              sizes="(max-width: 767px) 50vw"
            />
          ))}
        </div>

        <div className="hidden grid-cols-3 items-start gap-3 md:grid lg:gap-4">
          {desktopColumns.map((column, index) => (
            <GalleryColumn
              key={`desktop-column-${index}`}
              items={column}
              currentPage={page}
              sizes="(max-width: 1279px) 33vw, 400px"
            />
          ))}
        </div>

        {totalPages > 1 && (
          <nav
            aria-label="Gallery pagination"
            className="mt-10 flex items-center justify-center gap-1.5 sm:mt-12 sm:gap-2"
          >
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
              className={cn(
                "grid size-9 place-items-center rounded-md text-[var(--muted-foreground)] transition-colors sm:size-10",
                page === 1
                  ? "cursor-not-allowed opacity-40"
                  : "hover:bg-[var(--muted)] hover:text-[var(--brand-primary)]",
              )}
            >
              <ChevronLeft size={18} />
            </button>

            {pagesToShow.map((p, idx) =>
              p === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-sm text-[var(--muted-foreground)]"
                  aria-hidden="true"
                >
                  ...
                </span>
              ) : (
                <Link
                  key={p}
                  href={buildHref(p)}
                  scroll={false}
                  aria-label={`Page ${p}`}
                  aria-current={p === page ? "page" : undefined}
                  className={cn(
                    "grid size-9 place-items-center rounded-md text-sm font-semibold transition-colors sm:size-10",
                    p === page
                      ? "text-[var(--brand-primary)]"
                      : "text-[var(--foreground)] hover:bg-[var(--muted)] hover:text-[var(--brand-primary)]",
                  )}
                >
                  {p}
                </Link>
              ),
            )}

            <button
              type="button"
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages}
              aria-label="Next page"
              className={cn(
                "grid size-9 place-items-center rounded-md text-[var(--muted-foreground)] transition-colors sm:size-10",
                page === totalPages
                  ? "cursor-not-allowed opacity-40"
                  : "hover:bg-[var(--muted)] hover:text-[var(--brand-primary)]",
              )}
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </Container>
    </section>
  );
}
