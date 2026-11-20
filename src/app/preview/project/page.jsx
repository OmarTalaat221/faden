import ProjectPreviewClient from "@/sections/preview/project-preview-client";

// The page the dashboard shows beside its editor. It renders nothing of its
// own: the dashboard posts the project it is editing, unsaved changes and
// all, and this draws it with the site's real sections, so what the client
// sees while typing is the page a visitor will get.
//
// Kept out of search results and out of the sitemap: it is a tool, not a page
// anyone should land on.
export const metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default function ProjectPreviewPage() {
  return <ProjectPreviewClient />;
}
