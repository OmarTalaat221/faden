import ServicePreviewClient from "@/sections/preview/service-preview-client";

// Beside the Services editor in the dashboard: the service page drawn from
// whatever is in the form, unsaved changes and all.
export const metadata = {
  title: "Preview",
  robots: { index: false, follow: false },
};

export default function ServicePreviewPage() {
  return <ServicePreviewClient />;
}
