import { Globe, ShieldCheck, Users, Wrench } from "lucide-react";

import { apiGet } from "@/lib/api";

export async function getAboutOverview() {
  return apiGet("/about/overview");
}
