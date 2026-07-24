import ClientsPage from "@/sections/clients/clients-page";

export const metadata = {
  title: "Our Clients",
  description:
    "Discover the organizations and businesses who trust FADEN Contracting to transform their ambitions into reality. Our global partners rely on our proven expertise and integrity.",
  keywords: [
    "FADEN Clients",
    "Our Partners",
    "Trusted Clients",
    "Saudi Contracting Clients",
    "FADEN Global Partners",
  ],
  openGraph: {
    title: "Our Clients | FADEN Contracting",
    description:
      "Organizations and businesses who trust FADEN to transform their ambitions into reality.",
    images: ["/images/faden/clients-banner.webp"],
  },
  alternates: {
    canonical: "/clients",
  },
};

export default function Page() {
  return <ClientsPage />;
}