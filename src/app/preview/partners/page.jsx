import { getPartners } from "@/sections/partners/data";
import PartnersPreviewClient from "@/sections/preview/partners-preview-client";

// Beside the Partners editor: the page as saved, replaced by whatever is in
// the form as it is typed.
export const metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default async function PartnersPreviewPage() {
  return <PartnersPreviewClient initial={await getPartners()} />;
}
