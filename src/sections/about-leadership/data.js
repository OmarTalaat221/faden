import { apiGet } from "@/lib/api";

export async function getAboutLeadership() {
  return apiGet("/about/leadership");
}
