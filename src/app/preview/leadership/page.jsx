import { getAboutLeadership } from "@/sections/about-leadership/data";
import LeadershipPreviewClient from "@/sections/preview/leadership-preview-client";

export const metadata = { title: "Preview", robots: { index: false, follow: false } };

export default async function LeadershipPreviewPage() {
  return <LeadershipPreviewClient initial={await getAboutLeadership()} />;
}
