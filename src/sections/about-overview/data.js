import { apiGet } from "@/lib/api";
import { siteImage } from "@/lib/site-images";

// The photo falls back to the one set in Site Settings -> Images until a
// real one is uploaded in the dashboard (About -> Overview -> Intro -> Photo).

export async function getAboutOverview() {
  const data = await apiGet("/about/overview");

  return {
    ...data,
    intro: {
      ...data.intro,
      image: data.intro.image || (await siteImage("aboutOverview")),
      imageAlt: data.intro.imageAlt || data.intro.lead,
    },
  };
}
