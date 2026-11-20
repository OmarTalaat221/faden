import { getSettings } from "@/lib/settings/data";
import { siteImage } from "@/lib/site-images";
import FooterPreviewClient from "@/sections/preview/footer-preview-client";

// Beside Site Settings. The footer is what that screen mostly writes - the
// address, the phone, the social accounts, the links along the bottom - and
// it is the same on every page, so there is no one page to show instead.
export const metadata = { title: "Preview", robots: { index: false, follow: false } };

export default async function FooterPreviewPage() {
  const [settings, visionMark] = await Promise.all([
    getSettings(),
    siteImage("visionMark"),
  ]);

  return <FooterPreviewClient initial={settings} visionMark={visionMark} />;
}
