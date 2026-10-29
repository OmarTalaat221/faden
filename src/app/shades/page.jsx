import ShadesCompare from "@/sections/shades/shades-compare";

// Temporary page for the client to pick a background shade. Remove this
// folder, /sections/shades and /public/shades once a shade is signed off.

export const metadata = {
  title: "Background shades",
  // Not part of the site: keep it out of search results and the sitemap.
  robots: { index: false, follow: false },
};

export default function Page() {
  return <ShadesCompare />;
}
