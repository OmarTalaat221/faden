import Footer from "@/components/layout/footer";
import HeroSection from "./hero-section";
import StatsOverlap from "./stats-overlap";
import AboutSection from "./about-section";
import ServicesSection from "./services-section";
import ProjectsSection from "./projects-section";
import CtaSection from "./cta-section";
import ClientsSection from "./clients-section";
import EquipmentSection from "./equipment-section";
import GallerySection from "./gallery-section";

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
      <Footer />
    </>
  );
}
