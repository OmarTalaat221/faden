import { requirePageVisible } from "@/lib/settings/data";
import EquipmentPage from "@/sections/equipment/equipment-page";
import {
  getEquipmentList,
  getEquipmentPageMeta,
} from "@/lib/equipment/data";

export const metadata = {
  title: "Our Equipment",
  description:
    "Explore FADEN Contracting's modern fleet of heavy machinery and technical assets. Our advanced equipment ensures efficiency, precision, and safety across all construction projects.",
  keywords: [
    "FADEN Equipment",
    "Heavy Machinery",
    "Construction Equipment",
    "Saudi Contracting Fleet",
    "Cranes",
    "Excavators",
    "Bulldozers",
  ],
  openGraph: {
    title: "Our Equipment | FADEN Contracting",
    description:
      "Explore our modern fleet of machinery and technical assets employed in projects.",
    images: ["/images/faden/clients-banner.webp"],
  },
  alternates: {
    canonical: "/equipment",
  },
};

export default async function Page() {
  await requirePageVisible("equipment");

  const [equipment, meta] = await Promise.all([
    getEquipmentList(),
    getEquipmentPageMeta(),
  ]);

  return <EquipmentPage equipment={equipment} meta={meta} />;
}
