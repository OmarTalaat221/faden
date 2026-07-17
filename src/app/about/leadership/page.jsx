import PageBanner from "@/components/common/page-banner";
import { leadershipData } from "@/sections/about-leadership/data";
import MessagesSection from "@/sections/about-leadership/messages-section";
import SubsidiariesSection from "@/sections/about-leadership/subsidiaries-section";

export const metadata = {
  title: "Leadership Messages",
  description:
    "Messages from FADEN Contracting leadership team. Words from our CEO, CFO, Projects Manager, and HR Manager reflecting our commitment, integrity, and shared vision.",
  alternates: {
    canonical: "/about/leadership",
  },
  openGraph: {
    title: "Leadership Messages | FADEN Contracting",
    description:
      "Messages that reflect our commitment, integrity, and shared vision for the future.",
    url: "/about/leadership",
    type: "website",
  },
};

export default function LeadershipPage() {
  return (
    <main className="min-h-screen bg-white">
      <PageBanner {...leadershipData.banner} />
      <MessagesSection />
      <SubsidiariesSection />
    </main>
  );
}
