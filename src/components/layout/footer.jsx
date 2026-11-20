import FooterView from "./footer-view";
import { getSettings } from "@/lib/settings/data";
import { siteImage } from "@/lib/site-images";

export default async function Footer() {
  const [settings, visionMark] = await Promise.all([
    getSettings(),
    siteImage("visionMark"),
  ]);

  return <FooterView settings={settings} visionMark={visionMark} />;
}
