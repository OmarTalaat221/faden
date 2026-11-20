import HeavyEquipmentSection from "./heavy-equipment-section";
import IntroSection from "./intro-section";

export default function EquipmentPage({ equipment = [], meta = {} }) {
  return (
    <>
      {/* <PageBanner
        title="Our Equipment"
        subtitle="Modern Machinery Powering Every Project With Precision And Safety."
        backgroundImage="/images/faden/clients-banner.webp"
      /> */}

      <IntroSection intro={meta.intro} />

      <HeavyEquipmentSection equipment={equipment} heavy={meta.heavy} />
    </>
  );
}
