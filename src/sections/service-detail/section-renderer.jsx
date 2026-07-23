import OverviewSection from "./overview-section";
import BulletsSection from "./bullets-section";
import ProcessSection from "./process-section";

export default function SectionRenderer({ section }) {
  if (!section || !section.type) return null;

  switch (section.type) {
    case "OVERVIEW":
      return <OverviewSection section={section} />;

    case "BULLETS":
      return <BulletsSection section={section} muted={false} />;

    case "PROCESS":
      return <ProcessSection section={section} />;

    default:
      if (process.env.NODE_ENV === "development") {
        console.warn(`[SectionRenderer] Unknown section type: ${section.type}`);
      }
      return null;
  }
}
