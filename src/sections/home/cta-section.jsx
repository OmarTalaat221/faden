import Container from "@/components/layout/container";
import ButtonLink from "@/components/ui/button-link";

export default function CtaSection() {
  return (
    <section
      className="relative isolate overflow-hidden py-16 text-white sm:py-20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(15, 15, 15, 0.62), rgba(15, 15, 15, 0.62)), url('/images/faden/start-project-section.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundAttachment: "fixed",
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
            Ready to Start Your Project?
          </h2>
          <p className="mt-3 max-w-[760px] text-sm leading-7 text-white/70 sm:text-base">
            Contact us today for a personalized consultation, and let&apos;s
            bring your construction vision to life.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" className="min-w-36">
            Contact Us
          </ButtonLink>
          <ButtonLink
            href="/projects"
            variant="ghost"
            className="min-w-36 border border-white/40 text-white hover:bg-white/10"
          >
            View Projects
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
