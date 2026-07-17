import ButtonLink from "@/components/ui/button-link";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  actionHref,
  className,
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-[760px]">
        <p className="mb-3 text-[16px] font-bold uppercase tracking-[0.02em] text-brand-primary">
          {eyebrow}
        </p>
        {title ? (
          <h2 className="text-balance text-2xl font-medium tracking-[-0.025em] text-foreground sm:text-3xl">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className="mt-2 text-pretty text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
            {description}
          </p>
        ) : null}
      </div>
      {actionHref ? (
        <ButtonLink
          href={actionHref}
          variant="outline"
          className="w-fit shrink-0 px-5 py-2.5 text-xs"
        >
          View Details
        </ButtonLink>
      ) : null}
    </div>
  );
}
