"use client";

import Container from "@/components/layout/container";
import { useEffect, useMemo, useState } from "react";
import ProjectCard from "./project-card";
import ProjectsControls from "./projects-controls";
import ProjectsFilterPanel from "./projects-filter-panel";
import ProjectsMobileChips from "./projects-mobile-chips";
import ProjectsPagination from "./projects-pagination";
import ProjectsAudienceToggle from "./projects-audience-toggle";
import { AUDIENCES, projectsFor } from "@/lib/projects/audience";
import { copyForAudience } from "@/lib/projects/audience-copy";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const EMPTY_FILTERS = {
  categories: [],
  partnershipTypes: [],
  withoutImages: false,
};

const ITEMS_PER_PAGE = 18;

export default function ProjectsGridSection({ projects: PROJECTS_ITEMS = [], categories = [] }) {
  const [sortValue, setSortValue] = useState("default");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  // null means everyone: the portfolio opens on the whole record.
  const [audience, setAudience] = useState(null);
  const reduceMotion = useReducedMotion();
  const audienceCopy = copyForAudience(audience);

  // Reset to page 1 when filters/sort change
  useEffect(() => {
    setPage(1);
  }, [filters, sortValue, audience]);

  // Count of active filters (for badge on Filter button)
  const activeFiltersCount =
    filters.categories.length +
    filters.partnershipTypes.length +
    (filters.withoutImages ? 1 : 0);

  const filteredProjects = useMemo(() => {
    let items = projectsFor([...PROJECTS_ITEMS], audience);

    if (filters.categories.length > 0) {
      items = items.filter((p) => filters.categories.includes(p.service.slug));
    }

    if (filters.partnershipTypes.length > 0) {
      items = items.filter((p) =>
        filters.partnershipTypes.includes(p.partnershipType),
      );
    }

    if (filters.withoutImages) {
      items = items.filter((p) => !p.img);
    }

    switch (sortValue) {
      case "name-asc":
        return items.sort((a, b) => a.title.localeCompare(b.title));
      case "name-desc":
        return items.sort((a, b) => b.title.localeCompare(a.title));
      case "newest":
        return items.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );
      case "oldest":
        return items.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        );
      case "default":
      default:
        return items.sort((a, b) => a.order - b.order);
    }
  }, [sortValue, filters, audience, PROJECTS_ITEMS]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / ITEMS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedProjects = filteredProjects.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE,
  );

  // What each tab is worth before any filter narrows it. These are the
  // numbers the rail prints, so the header does not need a results row of
  // its own until a filter is actually on.
  const audienceCounts = useMemo(
    () => ({
      all: PROJECTS_ITEMS.length,
      ...Object.fromEntries(
        AUDIENCES.map((a) => [
          a.key,
          projectsFor(PROJECTS_ITEMS, a.key).length,
        ]),
      ),
    }),
    [PROJECTS_ITEMS],
  );

  const audienceTotal = audienceCounts[audience ?? "all"] ?? PROJECTS_ITEMS.length;
  const shownCount = filteredProjects.length;
  // Only worth saying once a filter has cut into the tab's own count.
  const narrowed = shownCount !== audienceTotal;

  const handlePageChange = (newPage) => {
    setPage(newPage);
    // Scroll to top of section smoothly
    if (typeof window !== "undefined") {
      const section = document.getElementById("projects-grid-top");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section data-preview-anchor="grid" className="relative py-7 sm:py-10 md:py-10 lg:py-14 overflow-hidden">
      <Container className="relative z-10">
        <div id="projects-grid-top" className="scroll-mt-24" />

        {/* Who the work was for: the rail the portfolio opens on, the line
            that answers for whoever picked it, and the controls beside it.
            Copy on the left, controls on the right of the same row, so the
            header is two bands instead of four and the right half of the
            page is not left empty. */}
        <div className="mb-7 sm:mb-9">
          <ProjectsAudienceToggle
            value={audience}
            onChange={setAudience}
            counts={audienceCounts}
          />

          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-12">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={audience ?? "all"}
                initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="md:max-w-[36rem]"
              >
                <h2 className="text-[20px] font-semibold leading-[1.15] tracking-[-0.02em] text-foreground sm:text-[23px] md:text-[26px]">
                  {audienceCopy.title}
                </h2>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground sm:text-[14px] md:text-[15px]">
                  {audienceCopy.body}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Aligned to the top of the copy rather than its last line, so
                a longer or shorter paragraph never shifts the buttons. */}
            <div className="hidden shrink-0 md:flex md:flex-col md:items-end md:gap-2.5">
              <ProjectsControls
                sortValue={sortValue}
                onSortChange={setSortValue}
                onFilterClick={() => setFilterOpen(true)}
                activeFiltersCount={activeFiltersCount}
              />
              {narrowed && (
                <p className="text-[12px] text-muted-foreground">
                  Showing{" "}
                  <span className="font-semibold text-foreground">
                    {shownCount}
                  </span>{" "}
                  of {audienceTotal}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: chips + sort */}
        <div className="md:hidden space-y-3">
          <ProjectsMobileChips filters={filters} onChange={setFilters} categories={categories} />
          <div className="flex items-center justify-between gap-3">
            <p className="text-[13px] text-muted-foreground">
              {narrowed ? (
                <>
                  <span className="font-semibold text-foreground">
                    {shownCount}
                  </span>{" "}
                  of {audienceTotal} results
                </>
              ) : (
                <>
                  <span className="font-semibold text-foreground">
                    {audienceTotal}
                  </span>{" "}
                  results
                </>
              )}
            </p>
            <ProjectsControls
              sortValue={sortValue}
              onSortChange={setSortValue}
              onFilterClick={() => setFilterOpen(true)}
              activeFiltersCount={activeFiltersCount}
              hideFilterButton
            />
          </div>
        </div>

        {/* Grid */}
        {displayedProjects.length > 0 ? (
          <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-x-5 sm:gap-x-6 md:gap-x-8 gap-y-8 sm:gap-y-10 md:gap-y-12">
            {displayedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="mt-16 text-center py-10">
            <p className="text-[16px] text-muted-foreground">
              No projects match your current filters.
            </p>
            <button
              type="button"
              onClick={() => setFilters(EMPTY_FILTERS)}
              className="mt-4 text-[14px] text-brand-primary hover:underline font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination */}
        <ProjectsPagination
          page={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </Container>

      {/* Filter Panel */}
      <ProjectsFilterPanel
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
        appliedFilters={filters}
        onApply={setFilters}
        categories={categories}
      />
    </section>
  );
}
