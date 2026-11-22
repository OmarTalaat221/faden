import CtaSection from "@/components/common/cta-section";
import PageBanner from "@/components/common/page-banner";
import NewsListSection from "./news-list-section";

/**
 * The news page: a banner, the list, and the contact band every other page
 * ends on.
 *
 * There is no separate intro paragraph. The banner's subtitle already says
 * what the page is, and a second block of scene-setting above a list of
 * headlines only delays them.
 */
export default function NewsPage({ items, meta }) {
  const banner = meta?.banner ?? {};
  const cta = meta?.cta ?? {};

  return (
    <>
      <PageBanner
        title={banner.title || "News"}
        subtitle={banner.subtitle}
        backgroundImage={banner.image}
      />

      <NewsListSection items={items} />

      <CtaSection
        title={cta.title}
        subtitle={cta.subtitle}
        backgroundImage={cta.image}
        primaryButton={
          cta.primaryButton || { label: "Contact Us", href: "/contact" }
        }
        secondaryButton={null}
      />
    </>
  );
}
