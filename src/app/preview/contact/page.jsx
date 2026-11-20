import { getContactPageData } from "@/lib/contact/data";
import { siteImage } from "@/lib/site-images";
import ContactPreviewClient from "@/sections/preview/contact-preview-client";

export const metadata = { title: "Preview", robots: { index: false, follow: false } };

export default async function ContactPreviewPage() {
  const [data, partnerLogo] = await Promise.all([
    getContactPageData(),
    siteImage("partnerLogo"),
  ]);
  return <ContactPreviewClient initial={data} partnerLogo={partnerLogo} />;
}
