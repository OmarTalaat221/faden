import { getAllServices, getServicesPageMeta } from "@/lib/services/data";
import ServicesListPreviewClient from "@/sections/preview/services-list-preview-client";

export const metadata = { title: "Preview", robots: { index: false, follow: false } };

export default async function ServicesListPreviewPage() {
  const [meta, response] = await Promise.all([
    getServicesPageMeta(),
    getAllServices(),
  ]);
  return (
    <ServicesListPreviewClient meta={meta} items={response?.items || []} />
  );
}
