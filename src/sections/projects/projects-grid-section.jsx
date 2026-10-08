"use client";

import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";
import { useEffect, useMemo, useState } from "react";
import ProjectCard from "./project-card";
import ProjectsControls from "./projects-controls";
import ProjectsFilterPanel from "./projects-filter-panel";
import ProjectsMobileChips from "./projects-mobile-chips";
import ProjectsPagination from "./projects-pagination";
import ProjectsCountryToggle from "./projects-country-toggle";

const EMPTY_FILTERS = {
  categories: [],
  partnershipTypes: [],
  countries: [],
  withoutImages: false,
};

const ITEMS_PER_PAGE = 18;

export default function ProjectsGridSection({ projects: PROJECTS_ITEMS = [], categories = [] }) {
  const [sortValue, setSortValue] = useState("default");
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);
  const [page, setPage] = useState(1);

  // Reset to page 1 when filters/sort change
  useEffect(() => {
    setPage(1);
  }, [filters, sortValue]);

  // Count of active filters (for badge on Filter button)
  const activeFiltersCount =
    filters.categories.length +
    filters.partnershipTypes.length +
    filters.countries.length +
    (filters.withoutImages ? 1 : 0);

  const filteredProjects = useMemo(() => {
    let items = [...PROJECTS_ITEMS];

    if (filters.categories.length > 0) {
      items = items.filter((p) => filters.categories.includes(p.service.slug));
    }

    if (filters.partnershipTypes.length > 0) {
      items = items.filter((p) =>
        filters.partnershipTypes.includes(p.partnershipType),
      );
    }

    if (filters.countries.length > 0) {
      items = items.filter((p) => filters.countries.includes(p.country));
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
  }, [sortValue, filters]);

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

  const totalCount = PROJECTS_ITEMS.length;
  const shownCount = filteredProjects.length;

  const selectedCountry = filters.countries.length === 1 ? filters.countries[0] : null;

  const handleCountryChange = (country) => {
    setFilters((prev) => ({ ...prev, countries: country ? [country] : [] }));
  };

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
    <section className="relative py-10 sm:py-14 md:py-16 lg:py-20 overflow-hidden">
      {/* Decorative Pattern - Top Left */}
      <DecorativePattern variant="triangles" className="top-0 left-0" />

      {/* Decorative Pattern - Middle Right */}
      <DecorativePattern
        variant="trianglesOutlinedRight"
        className="top-1/2 right-0 -translate-y-1/2"
      />

      {/* Decorative Pattern - Bottom Left (above CTA) */}
      <DecorativePattern
        variant="trianglesOutlined"
        className="bottom-0 left-0"
      />

      <Container className="relative z-10">
        <div id="projects-grid-top" className="scroll-mt-24" />

        {/* Country split - the primary entry point into the grid */}
        <div className="mb-6 sm:mb-8">
          <ProjectsCountryToggle value={selectedCountry} onChange={handleCountryChange} />
        </div>

        {/* Top bar: Results counter + Controls (desktop/tablet only) */}
        <div className="hidden md:flex flex-wrap items-center justify-between gap-3 sm:gap-4">
          <p className="text-[13px] sm:text-[14px] text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">{shownCount}</span>{" "}
            of{" "}
            <span className="font-semibold text-foreground">{totalCount}</span>{" "}
            results
          </p>

          <ProjectsControls
            sortValue={sortValue}
            onSortChange={setSortValue}
            onFilterClick={() => setFilterOpen(true)}
            activeFiltersCount={activeFiltersCount}
          />
        </div>

        {/* Mobile: chips + sort */}
        <div className="md:hidden space-y-3">
          <ProjectsMobileChips filters={filters} onChange={setFilters} categories={categories} />
          <div className="flex items-center justify-between gap-3">
            <p className="text-[13px] text-muted-foreground">
              <span className="font-semibold text-foreground">
                {shownCount}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-foreground">
                {totalCount}
              </span>{" "}
              results
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
          <div className="mt-16 text-center py-16">
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
