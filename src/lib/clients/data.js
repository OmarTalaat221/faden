// Auto-generate 59 clients (client-1.png -> client-58.png)

import { apiGet } from "@/lib/api";

export async function getClientsList() {
  return apiGet("/clients");
}

export async function getClientsPageMeta() {
  return apiGet("/clients/meta");
}
