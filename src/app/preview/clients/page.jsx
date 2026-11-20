import { getClientsList, getClientsPageMeta } from "@/lib/clients/data";
import ListPreviewClient from "@/sections/preview/list-preview-client";

export const metadata = { title: "Preview", robots: { index: false, follow: false } };

export default async function ClientsPreviewPage() {
  const [items, meta] = await Promise.all([getClientsList(), getClientsPageMeta()]);
  return <ListPreviewClient kind="clients" items={items} meta={meta} />;
}
