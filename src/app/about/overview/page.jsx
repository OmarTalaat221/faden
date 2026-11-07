import PageBanner from "@/components/common/page-banner";
import { getAboutOverview } from "@/sections/about-overview/data";
import OverviewIntro from "@/sections/about-overview/overview-intro";
import OverviewStats from "@/sections/about-overview/overview-stats";
import WhyChooseSection from "@/sections/about-overview/why-choose-section";
import { getServicesPageMeta } from "@/lib/services/data";

export const metadata = {
  title: "Company Overview",
  description:
    "Established in 1976 and headquartered in Riyadh, FADEN Contracting has evolved into one of the region's leading construction enterprises with 48+ years of engineering and construction excellence.",
  alternates: {
    canonical: "/about/overview",
  },
  openGraph: {
    title: "Company Overview | FADEN Contracting",
    description:
      "A Track Record Spanning 50 Years — FADEN Construction is dedicated to excellence in building and design.",
    url: "/about/overview",
    type: "website",
  },
};

export default async function CompanyOverviewPage() {
  // "Why Choose FADEN" closes this page, but its copy is stored on the
  // services meta record (services_meta.whyChoose), which has no editor in
  // the dashboard yet.
  const [overviewData, servicesMeta] = await Promise.all([
    getAboutOverview(),
    getServicesPageMeta(),
  ]);

  return (
    <main className="min-h-screen">
      <PageBanner {...overviewData.banner} />
      <OverviewIntro />
      <OverviewStats />
      <WhyChooseSection whyChoose={servicesMeta.whyChoose} />
    </main>
  );
}
