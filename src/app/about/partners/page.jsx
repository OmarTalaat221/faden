import PageBanner from "@/components/common/page-banner";
import { getAboutPartners } from "@/sections/about-partners/data";
import AchievementsSection from "@/sections/about-partners/achievements-section";
import CertificationsSection from "@/sections/about-partners/certifications-section";
import PartnerIntroSection from "@/sections/about-partners/partner-intro-section";
import PartnerProjectsSection from "@/sections/about-partners/projects-section";

export const metadata = {
  title: "Our Partners",
  description:
    "Building success together with our strategic partners. Discover FADEN's partnership with Global Energy for Investment & Industry and our joint achievements, projects, and certifications.",
  alternates: {
    canonical: "/about/partners",
  },
  openGraph: {
    title: "Our Partners | FADEN Contracting",
    description:
      "Building success together with our trusted partners. Strategic partnerships driving excellence in construction across Saudi Arabia and Egypt.",
    url: "/about/partners",
    type: "website",
  },
};

export default async function PartnersPage() {
  const partnersData = await getAboutPartners();

  return (
    <main className="min-h-screen bg-white">
      <PageBanner {...partnersData.banner} />
      <PartnerIntroSection />
      <AchievementsSection />
      <PartnerProjectsSection partnersData={partnersData} />
      <CertificationsSection />
    </main>
  );
}
