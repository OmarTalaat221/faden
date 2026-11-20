import {
  getProjectCategories,
  getProjects,
  getProjectsPageMeta,
} from "@/lib/projects/data";
import ProjectsListPreviewClient from "@/sections/preview/projects-list-preview-client";

export const metadata = { title: "Preview", robots: { index: false, follow: false } };

export default async function ProjectsListPreviewPage() {
  const [items, categories, meta] = await Promise.all([
    getProjects(),
    getProjectCategories(),
    getProjectsPageMeta(),
  ]);
  return (
    <ProjectsListPreviewClient items={items} categories={categories} meta={meta} />
  );
}
