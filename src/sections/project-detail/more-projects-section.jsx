"use client";

import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";
import ProjectCard from "@/sections/projects/project-card";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

export default function MoreProjectsSection({ projects = [] }) {
  if (!projects.length) return null;

  return (
    <section className="relative overflow-hidden bg-white py-10 sm:py-12 md:py-14 lg:py-16">
      <DecorativePattern
        variant="trianglesRight"
        className="pointer-events-none right-0 top-0 w-[280px] sm:w-[380px] lg:w-[460px] xl:w-[512px]"
      />

      <Container className="relative z-10">
        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px]">
          MORE PROJECTS
        </p>
        <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl">
          An overview of other notable developments within the company&apos;s
          portfolio.
        </p>

        <div className="mt-8">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            pagination={{ clickable: true }}
            breakpoints={{
              480: { slidesPerView: 1.6, spaceBetween: 20 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!pb-10"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <ProjectCard project={project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>

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
