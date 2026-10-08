import PageBanner from "@/components/common/page-banner";
import CtaSection from "@/components/common/cta-section";
import ProjectsGridSection from "./projects-grid-section";
import {
  getProjects,
  getProjectCategories,
  getProjectsPageMeta,
} from "@/lib/projects/data";

export default async function ProjectsPage() {
  const [projects, categories, PROJECTS_PAGE_META] = await Promise.all([
    getProjects(),
    getProjectCategories(),
    getProjectsPageMeta(),
  ]);

  return (
    <>
      <PageBanner
        title={PROJECTS_PAGE_META.title}
        subtitle={PROJECTS_PAGE_META.subtitle}
        backgroundImage={PROJECTS_PAGE_META.bannerImage}
      />
      <ProjectsGridSection projects={projects} categories={categories} />
      <CtaSection
        title="Ready to start your project?"
        subtitle="Contact us today for a personalized consultation, and let's bring your construction vision to life."
        backgroundImage="/images/faden/start-project-section.webp"
        primaryButton={{ label: "Contact Us", href: "/contact" }}
        secondaryButton={null}
      />
    </>
  );
}