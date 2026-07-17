import Container from "@/components/layout/container";
import { stats } from "./data";

export default function StatsOverlap() {
  return (
    <div className="relative z-30 -mt-[30px] xs:-mt-[42px] sm:-mt-[48px] md:-mt-[54px] lg:-mt-[60px]">
      <Container>
        <div className="grid grid-cols-4 overflow-hidden rounded-[6px] border border-white/30 bg-white/[0.51] shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-md">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-1.5 py-3 text-center xs:px-2 xs:py-4 sm:px-3 sm:py-5 md:px-4 md:py-6 lg:px-6 lg:py-8 ${
                index !== 0 ? "border-l border-white/30" : ""
              }`}
            >
              <p className="text-base font-medium tracking-[-0.035em] text-[#111111] xs:text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-[42px]">
                {stat.value}
              </p>
              <p className="mt-0.5 text-[9px] leading-tight text-[#333333] xs:mt-1 xs:text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-[18px]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
