import PageBanner from "@/components/common/page-banner";
import { visionMissionData } from "@/sections/about-vision-mission/data";
import DifferentSection from "@/sections/about-vision-mission/different-section";
import DriversSection from "@/sections/about-vision-mission/drivers-section";

export const metadata = {
  title: "Our Vision & Mission",
  description:
    "Guided by a clear vision and a strong mission to build with integrity, innovation, and excellence. Discover the core values that define FADEN Contracting.",
  alternates: {
    canonical: "/about/vision-mission",
  },
  openGraph: {
    title: "Our Vision & Mission | FADEN Contracting",
    description:
      "The core values and aspirations that define FADEN. Learn what drives us and makes us different.",
    url: "/about/vision-mission",
    type: "website",
  },
};

export default function VisionMissionPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageBanner {...visionMissionData.banner} />
      <DriversSection />
      <DifferentSection />
    </main>
  );
}
