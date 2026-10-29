export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // /shades is the temporary shade-picker page; drop it from this
        // list when that page is removed.
        disallow: ["/api/", "/admin/", "/shades"],
      },
    ],
    sitemap: "https://www.fadensa.com/sitemap.xml",
    host: "https://www.fadensa.com",
  };
}
