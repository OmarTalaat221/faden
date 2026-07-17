export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: "https://www.fadensa.com/sitemap.xml",
    host: "https://www.fadensa.com",
  };
}
