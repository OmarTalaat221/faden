"use client";

import Container from "@/components/layout/container";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

function PhotoLightbox({ photos, title, index, onClose, onNavigate }) {
  const total = photos.length;

  const goPrev = useCallback(
    () => onNavigate((index - 1 + total) % total),
    [index, total, onNavigate],
  );

  const goNext = useCallback(
    () => onNavigate((index + 1) % total),
    [index, total, onNavigate],
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [goPrev, goNext, onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${title || "Project"} photos`}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-black/85 backdrop-blur-sm"
        tabIndex={-1}
      />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close viewer"
        className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6 sm:top-6"
      >
        <X size={20} />
      </button>

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous photo"
        className="absolute left-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-4 sm:size-12"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label="Next photo"
        className="absolute right-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-4 sm:size-12"
      >
        <ChevronRight size={22} />
      </button>

      <div className="relative z-[5] aspect-[4/3] w-full max-w-3xl">
        <Image
          src={photos[index]}
          alt={`${title || "Project"} photo ${index + 1}`}
          fill
          sizes="(max-width: 768px) 100vw, 768px"
          className="object-contain"
          priority
        />
      </div>

      <p className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-sm text-white/80">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
    </div>
  );
}

export default function ProjectPhotosSection({ photos = [], title, caption }) {
  const [openIndex, setOpenIndex] = useState(-1);

  if (!photos.length) return null;

  return (
    <section className="relative bg-white py-10 sm:py-12 md:py-14">
      <Container>
        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px]">
          PROJECT PHOTOS
        </p>
        <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl">
          {caption ||
            "A Closer Look: Exploring the Design and Construction Milestones."}
        </p>

        <div className="mt-8">
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1.6}
            pagination={{ clickable: true }}
            breakpoints={{
              480: { slidesPerView: 2.2, spaceBetween: 16 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="!pb-10"
          >
            {photos.map((photo, i) => (
              <SwiperSlide key={i}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Open ${title || "project"} photo ${i + 1}`}
                  className="group relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden rounded-lg"
                >
                  <Image
                    src={photo}
                    alt={`${title || "Project"} photo ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 60vw, (max-width: 1024px) 33vw, 300px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

      {openIndex >= 0 && (
        <PhotoLightbox
          photos={photos}
          title={title}
          index={openIndex}
          onClose={() => setOpenIndex(-1)}
          onNavigate={setOpenIndex}
        />
      )}

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .swiper-pagination-bullet-active {
          background: var(--brand-primary);
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
