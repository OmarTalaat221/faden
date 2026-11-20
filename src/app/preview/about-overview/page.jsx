import { getAboutOverview } from "@/sections/about-overview/data";
import { getServicesPageMeta } from "@/lib/services/data";
import AboutOverviewPreviewClient from "@/sections/preview/about-overview-preview-client";

export const metadata = { title: "Preview", robots: { index: false, follow: false } };

export default async function AboutOverviewPreviewPage() {
  // "Why Choose FADEN" closes this page but is stored on the services record,
  // so it is read here and passed through unchanged: it is not edited on the
  // screen this preview sits beside.
  const [overview, servicesMeta] = await Promise.all([
    getAboutOverview(),
    getServicesPageMeta(),
  ]);

  return (
    <AboutOverviewPreviewClient initial={overview} whyChoose={servicesMeta.whyChoose} />
  );
}
