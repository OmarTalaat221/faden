import AboutSection from "./about-section";
import ClientsSection from "./clients-section";
import CtaSection from "./cta-section";
import EquipmentSection from "./equipment-section";
import GallerySection from "./gallery-section";
import HeroSection from "./hero-section";
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
  });

  return (
    <>
      <main>
        <HeroSection />
        <StatsOverlap />
        <AboutSection />
        <ServicesSection services={home.services} />
        <ProjectsSection projects={home.projects} />
        <CtaSection />
        <ClientsSection clients={home.clients} />
        <EquipmentSection equipment={home.equipment} />
        <GallerySection gallery={home.gallery} />
      </main>
    </>
  );
}
