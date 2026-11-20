import CtaSectionView from "./cta-section-view";
import { siteImage } from "@/lib/site-images";

export default async function CtaSection({
  title = "Ready to Start Your Project?",
  subtitle = "Contact us today for a personalized consultation, and let's bring your construction vision to life.",
  backgroundImage,
  primaryButton = { label: "Contact Us", href: "#contact" },
  secondaryButton = { label: "View Projects", href: "#projects" },
}) {
  return (
    <CtaSectionView
      title={title}
      subtitle={subtitle}
      backgroundImage={backgroundImage || (await siteImage("ctaBackground"))}
      primaryButton={primaryButton}
      secondaryButton={secondaryButton}
    />
  );
}
