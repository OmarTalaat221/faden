import { apiGet } from "@/lib/api";

// `info.items` (address / phone / email) is built by the server from Site
// Settings, so the footer and this page can never show different numbers.
export async function getContactPageData() {
  return apiGet("/contact/page");
}
