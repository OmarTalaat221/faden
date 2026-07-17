"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * RevealImage — Curtain Reveal Animation
 *
 * بيلف صورة (أو أي محتوى) ويضيف overlay أحمر بيتحرك من الشمال لليمين
 * لما العنصر يظهر في الـ viewport (مرة واحدة بس).
 *
 * Props:
 * - as: HTML tag (default: "div")
 * - className: classes للـ wrapper (نفس classes الـ div القديم)
 * - overlayColor: لون الـ overlay (default: brand-primary)
 * - duration: مدة الأنيميشن بالـ ms (default: 900)
 * - delay: تأخير قبل البداية بالـ ms (default: 0)
 * - threshold: نسبة ظهور العنصر لبدء الأنيميشن (default: 0.2)
 */
export default function RevealImage({
  as: Tag = "div",
  className,
  children,
  overlayColor = "var(--brand-primary)",
  duration = 900,
  delay = 0,
  threshold = 0.2,
}) {
  const ref = useRef(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Support reduced motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setRevealed(true), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return (
    <Tag ref={ref} className={cn("relative", className)}>
      {children}

      {/* Curtain Overlay */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          backgroundColor: overlayColor,
          transformOrigin: revealed ? "right center" : "left center",
          transform: revealed ? "scaleX(0)" : "scaleX(1)",
          transition: `transform ${duration}ms cubic-bezier(0.65, 0, 0.35, 1)`,
        }}
      />
    </Tag>
  );
}
