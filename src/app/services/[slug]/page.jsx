import { notFound } from "next/navigation";
import PageBanner from "@/components/common/page-banner";
import CtaSection from "@/components/common/cta-section";
import SectionRenderer from "@/sections/service-detail/section-renderer";
import KeyProjectsSection from "@/sections/service-detail/key-projects-section";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services/data";

export async function generateStaticParams() {
  const slugs = await getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: service.name,
    description: service.description,
    openGraph: {
      title: service.name,
      description: service.description,
      images: service.bannerImage ? [service.bannerImage] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  const sortedSections = [...(service.sections || [])].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  const beforeProjects = sortedSections.filter((s) => (s.order || 0) < 4);
  const afterProjects = sortedSections.filter((s) => (s.order || 0) >= 4);

  return (
    <>
      <PageBanner
        title={service.name}
        subtitle={service.bannerSubtitle || service.description}
        backgroundImage={service.bannerImage || "/images/faden/our-services-banner.webp"}
      />

      {beforeProjects.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}

      {service.projects?.length > 0 && (
        <KeyProjectsSection projects={service.projects} />
      )}

      {afterProjects.map((section) => (
        <SectionRenderer key={section.id} section={section} />
      ))}

      <CtaSection
        title={service.ctaTitle || `Looking for expert ${service.name} solutions?`}
        subtitle={service.ctaSubtitle || service.description}
        backgroundImage={service.ctaBackgroundImage || "/images/faden/start-project-section.webp"}
        primaryButton={{ label: "Contact Us", href: "/contact" }}
        secondaryButton={null}
      />
    </>
  );
}