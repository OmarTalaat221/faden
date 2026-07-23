"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Container from "@/components/layout/container";
import DecorativePattern from "@/components/common/decorative-pattern";

import "swiper/css";
import "swiper/css/pagination";

export default function KeyProjectsSection({ projects = [] }) {
  if (!projects.length) return null;

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 md:py-20 lg:py-24">
      <DecorativePattern
        variant="trianglesOutlined"
        opacity={0.35}
        className="pointer-events-none absolute right-0 top-0 w-[180px] sm:w-[220px] md:w-[260px]"
      />

      <Container>
        <div className="max-w-3xl">
          <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-sm md:text-[15px] lg:text-base">
            Key Projects
          </p>
          <p className="mt-3 text-base font-normal text-[var(--muted-foreground)] sm:text-lg md:text-xl lg:text-[22px] xl:text-2xl">
            Explore some of the key projects we&apos;ve proudly delivered.
          </p>
        </div>

        <div className="mt-8 md:mt-10">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!pb-12"
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <article className="group">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                    <Image
                      src={project.img}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-base font-semibold text-[var(--foreground)] sm:text-lg md:text-xl lg:text-[22px]">
                      {project.title}
                    </h3>
                    {project.subtitle && (
                      <p className="mt-1 text-xs text-[var(--muted-foreground)] sm:text-sm md:text-[15px] lg:text-base">
                        {project.subtitle}
                      </p>
                    )}
                  </div>
                </article>
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
