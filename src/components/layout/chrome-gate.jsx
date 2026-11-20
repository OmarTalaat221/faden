"use client";

import { usePathname } from "next/navigation";

/**
 * Hides the site's own furniture - the header, the footer, the floating
 * contact button - on the preview pages the dashboard shows beside its
 * editor. They are the same on every page and nobody is editing them there,
 * so in a narrow pane they are only taking up room.
 */
export default function ChromeGate({ children }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/preview")) return null;
  return children;
}
