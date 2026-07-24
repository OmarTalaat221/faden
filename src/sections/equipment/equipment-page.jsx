import HeavyEquipmentSection from "./heavy-equipment-section";
import IntroSection from "./intro-section";

export default function EquipmentPage() {
  return (
    <>
      {/* <PageBanner
        title="Our Equipment"
        subtitle="Modern Machinery Powering Every Project With Precision And Safety."
        backgroundImage="/images/faden/clients-banner.webp"
      /> */}

      <IntroSection />

      <HeavyEquipmentSection />
    </>
  );
}
