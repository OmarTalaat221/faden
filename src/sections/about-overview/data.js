import { apiGet } from "@/lib/api";
// What the page shows until something is uploaded on the About page
// (About -> Overview -> Intro -> Photo).
const DEMO_OVERVIEW_IMAGE = "/images/faden/about-us-section.webp";
//
// The company profile is a file rather than a picture, and it belongs to this
// page, so it is stored on the record (intro.companyProfile) and the file that
// ships with the site stands in until one is uploaded. The API accepts image
// uploads only today - see docs/BACKEND-REQUESTS.md.
const DEMO_COMPANY_PROFILE = "/docs/faden-company-profile-2026.pdf";

export async function getAboutOverview() {
  const data = await apiGet("/about/overview");

  return {
    ...data,
    intro: {
      ...data.intro,
      image: data.intro.image || DEMO_OVERVIEW_IMAGE,
      companyProfile: data.intro.companyProfile || DEMO_COMPANY_PROFILE,
      imageAlt: data.intro.imageAlt || data.intro.lead,
    },
  };
}
