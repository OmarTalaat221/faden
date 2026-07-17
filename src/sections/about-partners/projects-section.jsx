"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Container from "@/components/layout/container";
import { partnersData } from "./data";

import "swiper/css";
import "swiper/css/pagination";

export default function PartnerProjectsSection() {
  const { projects } = partnersData;

  return (
    <section className="relative w-full bg-white py-10 sm:py-12 md:py-14 lg:py-16">
      <Container>
        <div className="relative z-10">
          {/* Eyebrow - max 16px */}
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            {projects.eyebrow}
          </p>
          {/* Subtitle - max 24px */}
          <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            {projects.subtitle}
          </p>

          {/* Swiper */}
          <div className="mt-8 partner-projects-swiper">
            <Swiper
              modules={[Pagination]}
              spaceBetween={20}
              pagination={{ clickable: true }}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!pb-10"
            >
              {projects.items.map((project, i) => (
                <SwiperSlide key={i}>
                  <article className="flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Title - max 20px */}
                    <h3 className="mt-3 text-base font-semibold text-[var(--foreground)] sm:text-lg md:text-[19px] xl:text-xl">
                      {project.title}
                    </h3>

                    {/* Meta - max 14px */}
                    <p className="mt-1 text-xs font-normal text-[var(--muted-foreground)] sm:text-[13px] lg:text-sm">
                      {project.meta}
                    </p>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </Container>

      <style jsx global>{`
        .partner-projects-swiper .swiper-pagination-bullet {
          background: #d1d5db;
          opacity: 1;
          width: 8px;
          height: 8px;
        }
        .partner-projects-swiper .swiper-pagination-bullet-active {
          background: var(--brand-primary);
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </section>
  );
}
