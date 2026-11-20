"use client";

import Container from "@/components/layout/container";
import ButtonLink from "@/components/ui/button-link";

/** The contact band's markup, shared with the preview. See PageBannerView. */
export default function CtaSectionView({
  title,
  subtitle,
  backgroundImage,
  primaryButton,
  secondaryButton,
}) {
  return (
    <section
      data-preview-anchor="cta"
      className="relative isolate overflow-hidden py-10 text-white sm:py-14"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 15, 15, 0.62), rgba(15, 15, 15, 0.62)), url('${backgroundImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      aria-labelledby="cta-heading"
    >
      <Container className="flex flex-col items-start gap-6">
        <div>
          <h2
            id="cta-heading"
            className="text-2xl font-semibold sm:text-3xl lg:text-[32px]"
          >
            {title}
          </h2>
          <p className="mt-3 max-w-[760px] text-sm leading-7 text-white/70 sm:text-base">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {primaryButton && (
            <ButtonLink href={primaryButton.href} className="min-w-36">
              {primaryButton.label}
            </ButtonLink>
          )}
          {secondaryButton && (
            <ButtonLink
              href={secondaryButton.href}
              variant="ghost"
              className="min-w-36 border border-white/40 text-white hover:bg-white/10"
            >
              {secondaryButton.label}
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  );
}
