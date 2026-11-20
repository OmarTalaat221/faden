import { getEquipmentList, getEquipmentPageMeta } from "@/lib/equipment/data";
import ListPreviewClient from "@/sections/preview/list-preview-client";

export const metadata = { title: "Preview", robots: { index: false, follow: false } };

export default async function EquipmentPreviewPage() {
  const [items, meta] = await Promise.all([getEquipmentList(), getEquipmentPageMeta()]);
  return <ListPreviewClient kind="equipment" items={items} meta={meta} />;
}
