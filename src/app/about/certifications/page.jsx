import DecorativePattern from "@/components/common/decorative-pattern";
import PageBanner from "@/components/common/page-banner";
import { certificationsData } from "@/sections/about-certifications/data";
import IntroSection from "@/sections/about-certifications/intro-section";
import IsoCertificationsSection from "@/sections/about-certifications/iso-certifications-section";
import OtherCertificationsSection from "@/sections/about-certifications/other-certifications-section";

export const metadata = {
  title: "Certifications | FADEN Contracting",
  description:
    "Recognized standards reflecting FADEN Contracting's commitment to quality, safety, and sustainability — ISO 9001, ISO 14001, ISO 45001, and more.",
  keywords: [
    "FADEN certifications",
    "ISO 9001",
    "ISO 14001",
    "ISO 45001",
    "Saudi contracting certifications",
    "quality management",
    "safety certifications",
  ],
  openGraph: {
    title: "Certifications | FADEN Contracting",
    description:
      "Recognized standards reflecting FADEN Contracting's commitment to quality, safety, and sustainability.",
    type: "website",
  },
};

export default function CertificationsPage() {
  const { banner } = certificationsData;

  return (
    <main className="relative w-full overflow-hidden bg-white">
      {/* Decorative Patterns */}
      <DecorativePattern
        variant="trianglesOutlined"
        // opacity={0.3}
        className="top-[600px] left-0 h-auto w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px]"
      />
      <DecorativePattern
        variant="trianglesOutlined"
        // opacity={0.3}
        className="bottom-0 right-0 h-auto w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px]"
      />

      {/* Page Banner */}
      <PageBanner
        title={banner.title}
        subtitle={banner.subtitle}
        backgroundImage={banner.backgroundImage}
      />

      {/* Content */}
      <IntroSection />
      <IsoCertificationsSection />
      <OtherCertificationsSection />
    </main>
  );
}
