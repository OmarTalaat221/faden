import { apiGet } from "@/lib/api";

// Demo photo, shown until a real one is uploaded in the dashboard
// (About -> Overview -> Intro -> Photo). An uploaded photo always wins;
// delete this constant and the fallback below once one is set.
const DEMO_OVERVIEW_IMAGE = "/images/faden/about-us-section.webp";

export async function getAboutOverview() {
  const data = await apiGet("/about/overview");

  return {
    ...data,
    intro: {
      ...data.intro,
      image: data.intro.image || DEMO_OVERVIEW_IMAGE,
      imageAlt: data.intro.imageAlt || data.intro.lead,
    },
  };
}
