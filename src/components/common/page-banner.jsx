import PageBannerView from "./page-banner-view";
import { siteImage } from "@/lib/site-images";

/**
 * The banner across the top of an inner page. The header is provided by the
 * root layout, not here.
 *
 * `backgroundImage` is optional: left out, the default set in the dashboard
 * (Site Settings -> Images) is used.
 */
export default async function PageBanner({
  title,
  subtitle,
  backgroundImage,
  className,
}) {
  return (
    <PageBannerView
      title={title}
      subtitle={subtitle}
      backgroundImage={backgroundImage || (await siteImage("pageBanner"))}
      className={className}
    />
  );
}
