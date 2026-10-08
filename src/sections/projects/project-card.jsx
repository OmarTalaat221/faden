import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProjectCard({ project, className }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn("group block cursor-pointer", className)}
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg bg-muted aspect-[4/3]">
        <Image
          src={project.img}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Text */}
      <div className="mt-3 sm:mt-4">
        <h3 className="text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] font-semibold text-foreground leading-snug line-clamp-2">
          {project.title}
        </h3>
        <p className="mt-1 text-[12px] sm:text-[13px] md:text-[14px] text-muted-foreground font-medium">
          {project.service.name}
        </p>
      </div>
    </Link>
  );
}
