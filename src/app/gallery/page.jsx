import GalleryPage from "@/sections/gallery/gallery-page";

export const metadata = {
  title: "Gallery",
  description:
    "Explore FADEN Contracting's visual showcase of completed projects and architectural designs across Saudi Arabia.",
  keywords: [
    "FADEN Gallery",
    "Project Gallery",
    "Construction Photos",
    "Architecture Showcase",
    "Saudi Contracting Projects",
  ],
  openGraph: {
    title: "Gallery | FADEN Contracting",
    description:
      "A visual showcase of completed projects and designs by FADEN Contracting.",
    images: ["/images/faden/gallery-page-1.webp"],
  },
  alternates: {
    canonical: "/gallery",
  },
};

export default function Page() {
  return <GalleryPage />;
}