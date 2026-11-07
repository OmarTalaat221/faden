import AboutSection from "./about-section";
import ClientsSection from "./clients-section";
import CtaSection from "./cta-section";
import EquipmentSection from "./equipment-section";
import GallerySection from "./gallery-section";
import HeroSection from "./hero-section";
import PartnersSection from "./partners-section";
import ProjectsSection from "./projects-section";
import ServicesSection from "./services-section";
import StatsOverlap from "./stats-overlap";
import { getHomeContent } from "@/lib/home/data";

export default async function HomePage() {
  const home = await getHomeContent();

  console.log("[home] content from API:", {
    gallery: home.gallery.map((g) => g.src),
    projects: home.projects.map((p) => p.title),
    services: home.services.map((s) => s.title),
    clients: home.clients.map((c) => c.name),
    equipment: home.equipment.map((e) => e.name),
    partner: home.partner?.title,
    hiddenSections: Object.keys(home.sections).filter((k) => !home.sections[k]),
  });

  // Sections switched off in the dashboard are not rendered at all.
  const on = home.sections;

  return (
    <>
      <main>
        <HeroSection />
        {on.stats && <StatsOverlap />}
        {on.about && <AboutSection />}
        {on.services && <ServicesSection services={home.services} />}
        {on.projects && <ProjectsSection projects={home.projects} />}
        {on.cta && <CtaSection />}
        {on.partners && <PartnersSection partner={home.partner} />}
        {on.clients && <ClientsSection clients={home.clients} />}
        {on.equipment && <EquipmentSection equipment={home.equipment} />}
        {on.gallery && <GallerySection gallery={home.gallery} />}
      </main>
    </>
  );
}
