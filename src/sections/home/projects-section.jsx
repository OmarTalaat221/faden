import DecorativePattern from "@/components/common/decorative-pattern";
import RevealImage from "@/components/common/reveal-image";
import Container from "@/components/layout/container";
import ButtonLink from "@/components/ui/button-link";
import Image from "next/image";
import { projects } from "./data";

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="projects-heading"
    >
      {/* Decorative pattern - top right */}
      <DecorativePattern
        variant="triangles"
        className="right-0 top-0 -z-0 w-[180px] sm:w-[240px] lg:w-[320px] xl:w-[380px]"
      />

      {/* Decorative pattern - bottom left */}
      <DecorativePattern
        variant="trianglesOutlined"
        className="bottom-0 left-0 -z-0 w-[180px] sm:w-[240px] lg:w-[320px] xl:w-[380px]"
      />

      <Container>
        {/* Header */}
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)] sm:text-[16px]">
              Our Projects
            </p>
            <h2
              id="projects-heading"
              className="mt-3 text-lg font-normal leading-relaxed text-[var(--muted-foreground)] sm:text-xl md:text-[22px] lg:text-2xl xl:text-[26px]"
            >
              Discover our projects that reflect our expertise, versatility, and
              commitment to excellence at every stage.
            </h2>
          </div>

          <div className="shrink-0">
            <ButtonLink
              href="#projects"
              variant="outline"
              className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
            >
              View Details
            </ButtonLink>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="relative z-10 mt-10 grid grid-cols-1 gap-6 sm:mt-12 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-7">
          {projects.map((project, index) => (
            <article key={project.id} className="group flex flex-col">
              <RevealImage
                delay={index * 150}
                className="aspect-[4/3] w-full overflow-hidden rounded-[6px]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </RevealImage>
              <h3 className="mt-5 text-base font-semibold text-[var(--foreground)] sm:text-lg lg:text-xl">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted-foreground)] sm:text-[15px]">
                {project.category}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
