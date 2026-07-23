import Link from "next/link";
import Container from "@/components/layout/container";

export default function ServiceNotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center py-20">
      <Container className="text-center">
        <p className="text-[13px] font-semibold uppercase tracking-[0.15em] text-[var(--brand-primary)]">
          404
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl md:text-5xl">
          Service Not Found
        </h1>
        <p className="mt-4 text-base text-[var(--muted-foreground)] sm:text-lg">
          The service you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-md bg-[var(--brand-primary)] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[var(--brand-primary-hover)]"
        >
          Back to Home
        </Link>
      </Container>
    </section>
  );
}