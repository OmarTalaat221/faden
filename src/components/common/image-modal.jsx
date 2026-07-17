"use client";

import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * ImageModal - Compact modal for viewing images (certificates, gallery, etc.)
 * - Small, centered card with border
 * - X button INSIDE the top-left of the card (black bg)
 * - Smooth fade + scale animation
 * - Image object-contain (any aspect ratio)
 *
 * @param {boolean} open
 * @param {() => void} onClose
 * @param {string} src
 * @param {string} alt
 */
export default function ImageModal({ open, onClose, src, alt = "" }) {
  const closeBtnRef = useRef(null);

  // Escape key
  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Image viewer"}
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6",
        "transition-opacity duration-300 ease-out",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/70 backdrop-blur-sm"
        tabIndex={-1}
      />

      {/* Card - compact size, responsive scale */}
      <div
        className={cn(
          "relative z-10 flex w-full flex-col rounded-md border border-[#C9C7C6] bg-transparent",
          "max-w-[260px] p-4 xs:max-w-[280px] xs:p-5 sm:max-w-[340px] sm:p-5 md:max-w-[400px] md:p-6 lg:max-w-[440px]",
          "transition-all duration-300 ease-out",
          open ? "scale-100 opacity-100" : "scale-90 opacity-0",
        )}
      >
        {/* Close button - top-left INSIDE the card */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute -left-3 -top-3 z-10 grid size-7 place-items-center rounded-md bg-black text-white shadow-md transition hover:bg-[var(--brand-primary)] sm:-left-4 sm:-top-4 sm:size-8 md:size-9"
        >
          <X size={16} strokeWidth={3.5} className="sm:hidden" />
          <X size={18} strokeWidth={3.5} className="hidden sm:block" />
        </button>

        {/* Image */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-sm">
          {src && (
            <Image
              src={src}
              alt={alt}
              width={800}
              height={1100}
              className="h-auto w-full object-contain"
              priority
            />
          )}
        </div>
      </div>
    </div>
  );
}
