import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";
import Image from "next/image";
import { MapPin } from "lucide-react";

export default function ProjectHeroSection({ project }) {
  return (
    <section className="relative overflow-hidden bg-white pt-10 sm:pt-12 md:pt-14 lg:pt-16">
      <DecorativePattern
        variant="triangles"
        className="pointer-events-none left-0 top-0 w-[220px] sm:w-[260px] lg:w-[300px] xl:w-[318px]"
      />

      <Container className="relative z-10">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg sm:aspect-[16/8] md:aspect-[16/7]">
          <Image
            src={project.img}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 1320px) 100vw, 1320px"
            className="object-cover"
          />
        </div>

        <h1 className="mt-6 text-2xl font-semibold text-[var(--foreground)] sm:mt-7 sm:text-3xl md:mt-8 md:text-4xl lg:text-[42px]">
          {project.title}
        </h1>

        <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--muted-foreground)] sm:text-base md:text-[17px]">
          <MapPin size={16} className="shrink-0 text-[var(--brand-primary)]" />
          {project.location}
        </p>
      </Container>
    </section>
  );
}
