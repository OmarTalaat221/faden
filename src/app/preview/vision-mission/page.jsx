import { getAboutVisionMission } from "@/sections/about-vision-mission/data";
import VisionMissionPreviewClient from "@/sections/preview/vision-mission-preview-client";

export const metadata = { title: "Preview", robots: { index: false, follow: false } };

export default async function VisionMissionPreviewPage() {
  return <VisionMissionPreviewClient initial={await getAboutVisionMission()} />;
}
