export const CONTACT_PAGE_DATA = {
  banner: {
    title: "Contact Us",
    subtitle: "Your ideas matter, contact us to start shaping them today.",
    image: "/images/faden/contact-us-banner.webp",
  },
  info: {
    title: "Contact Information",
    subtitle: "Find us at our office or drop us a line. We're ready to help.",
    items: [
      {
        icon: "map-pin",
        label: "Our Address",
        value: "Takhassusi Street\nRiyadh - Saudi Arabia",
      },
      {
        icon: "mail",
        label: "Email Us",
        value: "info@fadensa.com",
        href: "mailto:info@fadensa.com",
      },
      {
        icon: "phone",
        label: "Call Us",
        value: "+966 11 2158333",
        href: "tel:+966112158333",
      },
    ],
  },
  form: {
    title: "Send us a message",
    fields: {
      fullName: { label: "Full Name", placeholder: "" },
      email: { label: "Email Address", placeholder: "" },
      phone: { label: "Phone Number", placeholder: "" },
      subject: { label: "Subject", placeholder: "" },
      message: { label: "Message", placeholder: "" },
    },
    submitLabel: "Send Message",
    successMessage: "Your message has been sent successfully. We'll get back to you soon!",
    errorMessage: "Something went wrong. Please try again.",
  },
  map: {
    eyebrow: "Visit Our Office",
    subtitle: "Located in the heart of Riyadh's business district",
    // Google Maps Embed URL for Takhassusi Street, Riyadh
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.5!2d46.6367!3d24.7136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQyJzQ5LjAiTiA0NsKwMzgnMTIuMSJF!5e0!3m2!1sen!2ssa!4v1700000000000",
  },
};
// ========================================
// API ACCESSORS (fall back to the data above)
// ========================================

import { apiGet, apiGetObject } from "@/lib/api";

// `info.items` (address / phone / email) is built by the server from Site
// Settings, so the footer and this page can never show different numbers.
export async function getContactPageData() {
  return apiGetObject("/contact/page", CONTACT_PAGE_DATA);
}
