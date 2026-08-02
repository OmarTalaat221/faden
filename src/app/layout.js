import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://faden-wine.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "FADEN Contracting Company | Construction Excellence Since 1976",
    template: "%s | FADEN Contracting",
  },
  description:
    "FADEN Contracting Company — a leading Saudi construction firm established in 1976 in Riyadh. Delivering end-to-end engineering, construction, and MEP solutions with 50 years of proven excellence across Saudi Arabia.",
  keywords: [
    "FADEN Contracting",
    "Saudi construction company",
    "Riyadh contractors",
    "engineering works Saudi Arabia",
    "MEP works",
    "construction Saudi Arabia",
    "شركة فادن للمقاولات",
    "مقاولات الرياض",
    "مقاولات السعودية",
  ],
  authors: [{ name: "FADEN Contracting Company" }],
  creator: "FADEN Contracting Company",
  publisher: "FADEN Contracting Company",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-SA": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_SA",
    url: "https://www.fadensa.com",
    siteName: "FADEN Contracting Company",
    title: "FADEN Contracting Company | Construction Excellence Since 1976",
    description:
      "Leading Saudi construction firm delivering end-to-end engineering, construction, and MEP solutions across Saudi Arabia.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FADEN Contracting Company",
    description:
      "Leading Saudi construction firm since 1976. End-to-end engineering, construction, and MEP solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "construction",
};

export const viewport = {
  themeColor: "#e42421",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "FADEN Contracting Company",
  alternateName: "شركة فادن للمقاولات",
  url: "https://www.fadensa.com",
  logo: "https://www.fadensa.com/images/faden/logo.webp",
  image: "https://www.fadensa.com/images/faden/image-05.jpg",
  description:
    "Leading Saudi construction and contracting company established in 1976, headquartered in Riyadh. Specialized in engineering works, construction, and MEP services.",
  foundingDate: "1976",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Riyadh",
    addressCountry: "SA",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+966-11-2158333",
    contactType: "customer service",
    email: "info@fadensa.com",
    areaServed: "SA",
    availableLanguage: ["en", "ar"],
  },
  sameAs: ["https://www.linkedin.com/company/faden-contracting/"],
  areaServed: {
    "@type": "Country",
    name: "Saudi Arabia",
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 1000,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" className={inter.variable}>
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/faden/image-05.jpg"
          fetchPriority="high"
        />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
