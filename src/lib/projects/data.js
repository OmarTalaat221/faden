import { apiGet } from "@/lib/api";

// Fixed option lists the filters and sort control render. These are enums
// the API validates against, not editable content, so they stay here rather
// than costing a request on every page load.
export const PROJECTS_PARTNERSHIP_TYPES = ["Faden Only", "With Global Energy"];

export const PROJECTS_STATUS_OPTIONS = ["Finished", "In Progress"];

export const PROJECTS_COUNTRIES = ["Saudi Arabia", "Egypt"];

export const SORT_OPTIONS = [
  { value: "default", label: "Default Sorting" },
  { value: "name-asc", label: "Name (A - Z)" },
  { value: "name-desc", label: "Name (Z - A)" },
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
];

export async function getProjects() {
  return apiGet("/projects");
}

export async function getProjectsPageMeta() {
  // The API nests the banner copy one level down.
  const meta = await apiGet("/projects/meta");
  return meta.banner ?? meta;
}

/** One row per service, with a live count of the projects using it. */
export async function getProjectCategories() {
  return apiGet("/projects/categories");
}

/** The project with its detail page and `relatedProjects` resolved. */
export async function getProjectBySlug(slug) {
  return apiGet(`/projects/by-slug/${slug}`);
}

export async function getAllProjectSlugs() {
  const projects = await getProjects();
  return projects.map((p) => p.slug);
}
