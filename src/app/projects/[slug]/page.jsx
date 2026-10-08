import { notFound } from "next/navigation";
import CtaSection from "@/components/common/cta-section";
import ProjectHeroSection from "@/sections/project-detail/project-hero-section";
import OverviewSection from "@/sections/project-detail/overview-section";
import ProjectInfoSection from "@/sections/project-detail/project-info-section";
import DesignIntentSection from "@/sections/project-detail/design-intent-section";
import BulletListSection from "@/sections/project-detail/bullet-list-section";
import ProjectPhotosSection from "@/sections/project-detail/project-photos-section";
import MoreProjectsSection from "@/sections/project-detail/more-projects-section";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects/data";

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.detail.overview.paragraphs[0],
    openGraph: {
      title: project.title,
      description: project.detail.overview.paragraphs[0],
      images: project.img ? [project.img] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const { detail, relatedProjects } = project;

  return (
    <>
      <ProjectHeroSection project={project} />

      <OverviewSection overview={detail.overview} />

      <ProjectInfoSection tabs={detail.infoTabs} />

      <DesignIntentSection designIntent={detail.designIntent} />

      <BulletListSection data={detail.amenitiesFeatures} columns={2} muted />

      <BulletListSection data={detail.keyAchievements} columns={1} />

      <ProjectPhotosSection
        photos={detail.photos}
        title={project.title}
        caption={detail.photosCaption}
      />

      <MoreProjectsSection projects={relatedProjects} />

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
