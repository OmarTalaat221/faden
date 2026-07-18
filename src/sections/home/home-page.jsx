import AboutSection from "./about-section";
import ClientsSection from "./clients-section";
import CtaSection from "./cta-section";
import EquipmentSection from "./equipment-section";
import GallerySection from "./gallery-section";
import HeroSection from "./hero-section";
import ProjectsSection from "./projects-section";
import ServicesSection from "./services-section";
import StatsOverlap from "./stats-overlap";

export default function HomePage() {
  return (
    <>
      <main>
        <HeroSection />
        <StatsOverlap />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <CtaSection />
        <ClientsSection />
        <EquipmentSection />
        <GallerySection />
      </main>
    </>
  );
}
