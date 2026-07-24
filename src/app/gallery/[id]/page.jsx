import { notFound } from "next/navigation";
import GalleryDetailPage from "@/sections/gallery-detail/gallery-detail-page";
import { GALLERY_LIST } from "@/lib/gallery/data";

// Static generation for all gallery IDs
export function generateStaticParams() {
  return GALLERY_LIST.map((item) => ({
    id: String(item.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const numericId = parseInt(id, 10);
  const item = GALLERY_LIST.find((i) => i.id === numericId);

  if (!item) {
    return {
      title: "Image Not Found",
    };
  }

  return {
    title: `Gallery — Image ${item.id}`,
    description: `View image ${item.id} from FADEN Contracting's visual showcase of completed projects and designs.`,
    openGraph: {
      title: `Gallery — Image ${item.id} | FADEN Contracting`,
      description: "A visual showcase of completed projects and designs.",
      images: [item.src],
    },
    alternates: {
      canonical: `/gallery/${item.id}`,
    },
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const numericId = parseInt(id, 10);

  if (isNaN(numericId)) {
    notFound();
  }

  const item = GALLERY_LIST.find((i) => i.id === numericId);
  if (!item) {
    notFound();
  }

  return <GalleryDetailPage id={numericId} />;
}