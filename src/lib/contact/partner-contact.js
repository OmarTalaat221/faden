// How to reach the strategic partner, on the contact page under FADEN's own
// details. Only the Riyadh branch is listed: the site no longer presents
// Egypt as a market, so the partner's Alexandria and Cairo offices are left
// off rather than reintroducing a country the rest of the site has dropped.
//
// DEMO — contact_page and settings carry one set of contact details, FADEN's,
// and the dashboard saves only those, so a second set has no column to live
// in. Taken from the partner's own contact page at globalenergy-eg.com, where
// the Riyadh address appears in two different forms; this is the one printed
// on that contact page rather than the one in their footer, and it is worth
// confirming with the partner before launch. No email: theirs is behind
// Cloudflare's email protection and never rendered in plain text.

export const DEMO_PARTNER_CONTACT = {
  name: "Global Energy SAE",
  caption:
    "The partner on joint work in the Kingdom. For anything FADEN is delivering, the details above reach the project team directly.",
  logo: "/images/faden/partner-global-energy.webp",
  website: "https://globalenergy-eg.com/",
  websiteLabel: "globalenergy-eg.com",
  items: [
    {
      icon: "map-pin",
      label: "Riyadh office",
      value:
        "Building No. 7988, Al Takhasasi Branch Street,\nAl Nakheel District, Riyadh 12384",
    },
    {
      icon: "phone",
      label: "Phone",
      value: "+966 54 183 1023",
      href: "tel:+966541831023",
    },
    {
      icon: "clock",
      label: "Office hours",
      value: "Sunday to Thursday, 8:00 to 17:00",
    },
  ],
};
