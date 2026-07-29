import ProjectsPage from "@/sections/projects/projects-page";

export const metadata = {
  title: "Our Projects | FADEN Contracting",
  description:
    "Explore FADEN Contracting's portfolio of successful construction and infrastructure projects across Saudi Arabia and the region.",
  openGraph: {
    title: "Our Projects | FADEN Contracting",
    description:
      "A portfolio of successful projects across diverse sectors including engineering, construction, MEP, water treatment, and infrastructure.",
    images: ["/images/faden/projects-banner.webp"],
  },
};

export default function Page() {
  return <ProjectsPage />;
}