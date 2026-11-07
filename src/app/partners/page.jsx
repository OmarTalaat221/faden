import PageBanner from "@/components/common/page-banner";
import { getPartners } from "@/sections/partners/data";
import AchievementsSection from "@/sections/partners/achievements-section";
import CertificationsSection from "@/sections/partners/certifications-section";
import PartnerIntroSection from "@/sections/partners/partner-intro-section";
import PartnerProjectsSection from "@/sections/partners/projects-section";

export const metadata = {
  title: "Partners",
  description:
    "Building success together with our strategic partners. Discover FADEN's partnership with Global Energy for Investment & Industry and our joint achievements, projects, and certifications.",
  alternates: {
    canonical: "/partners",
  },
  openGraph: {
    title: "Partners | FADEN Contracting",
    description:
      "Building success together with our trusted partners. Strategic partnerships driving excellence in construction across Saudi Arabia and Egypt.",
    url: "/partners",
    type: "website",
  },
};

export default async function PartnersPage() {
  const partnersData = await getPartners();

  return (
    <main className="min-h-screen">
      <PageBanner {...partnersData.banner} />
      <PartnerIntroSection />
      <AchievementsSection />
      <PartnerProjectsSection partnersData={partnersData} />
      <CertificationsSection />
    </main>
  );
}
