import { apiGet } from "@/lib/api";

export async function getAboutVisionMission() {
  return apiGet("/about/vision-mission");
}
