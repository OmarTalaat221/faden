import PageBanner from "@/components/common/page-banner";
import CtaSection from "@/components/common/cta-section";
import ProjectsGridSection from "./projects-grid-section";
import { PROJECTS_PAGE_META } from "@/lib/projects/data";

export default function ProjectsPage() {
  return (
    <>
      <PageBanner
        title={PROJECTS_PAGE_META.title}
        subtitle={PROJECTS_PAGE_META.subtitle}
        backgroundImage={PROJECTS_PAGE_META.bannerImage}
      />
      <ProjectsGridSection />
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