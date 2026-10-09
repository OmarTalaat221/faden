// 19 equipment items - rotate: true means rotate 180deg

import { apiGet } from "@/lib/api";

export async function getEquipmentList() {
  return apiGet("/equipment");
}

export async function getEquipmentPageMeta() {
  return apiGet("/equipment/meta");
}
