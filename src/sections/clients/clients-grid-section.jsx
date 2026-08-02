import DecorativePattern from "@/components/common/decorative-pattern";
import Container from "@/components/layout/container";
import { CLIENTS_LIST } from "@/lib/clients/data";
import Image from "next/image";

export default function ClientsGridSection() {
  return (
    <section className="relative overflow-hidden pb-16 sm:pb-20 md:pb-24">
      {/* Decorative Pattern - Bottom Right */}
      <DecorativePattern
        variant="trianglesOutlinedRight"
        // opacity={0.3}
        className="bottom-1/4 right-0 "
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 xs:grid-cols-3 sm:grid-cols-4 sm:gap-x-8 sm:gap-y-12 md:grid-cols-5 md:gap-x-10 md:gap-y-14 lg:grid-cols-6 lg:gap-x-12 lg:gap-y-16">
          {CLIENTS_LIST.map((client) => (
            <div
              key={client.id}
              className="group flex h-20 items-center justify-center sm:h-24 md:h-28"
            >
              <Image
                src={client.logo}
                alt={client.name}
                width={200}
                height={100}
                className="max-h-full w-auto max-w-full object-contain transition-transform duration-300 ease-out group-hover:scale-110"
                sizes="(max-width: 480px) 40vw, (max-width: 640px) 28vw, (max-width: 768px) 22vw, (max-width: 1024px) 18vw, 180px"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
