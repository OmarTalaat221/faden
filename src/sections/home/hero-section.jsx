import ButtonLink from "@/components/ui/button-link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative isolate h-screen min-h-[640px] w-full bg-brand-secondary text-white"
    >
      <Image
        src="/images/faden/home-banner.webp"
        alt="FADEN completed construction project"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={80}
        className="-z-20 object-cover object-center"
      />

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(7,24,38,0.72)_0%,rgba(10,22,29,0.55)_45%,rgba(7,12,10,0.75)_100%)]" />

      {/* <Header /> */}

      <div className="relative z-10 flex h-full items-center justify-center px-5 pb-40 text-center sm:px-7 sm:pb-44 lg:px-10">
        <div className="max-w-[920px]">
          <h1 className="text-balance text-[22px] sm:text-[54px]  md:text-[72px] font-medium leading-[1.08] tracking-[-0.045em]">
            Faden Contracting Company
          </h1>
          <p className="mx-auto mt-6 max-w-[760px] text-pretty text-base leading-7 text-white/75 sm:text-lg lg:text-xl">
            Delivering end-to-end solutions from planning to project completion
          </p>
          <ButtonLink
            href="#projects"
            className="mt-10 min-w-44 px-8 py-4 sm:mt-12"
          >
            View Projects
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
