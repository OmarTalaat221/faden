import { Mail, MapPin, Phone } from "lucide-react";

const ICON_MAP = {
  "map-pin": MapPin,
  mail: Mail,
  phone: Phone,
};

export default function ContactInfo({ info }) {
  if (!info) return null;

  return (
    <div className="h-full">
      <h2 className="text-xl font-semibold text-[var(--foreground)] sm:text-2xl md:text-[26px] lg:text-[32px]">
        {info.title}
      </h2>
      {info.subtitle && (
        <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)] sm:text-[16px] md:text-[18px]">
          {info.subtitle}
        </p>
      )}

      <ul className="mt-8 space-y-9 md:mt-12 md:space-y-12">
        {info.items.map((item, i) => {
          const Icon = ICON_MAP[item.icon];
          return (
            <li key={i} className="flex items-start gap-3">
              {Icon && (
                <Icon
                  className="mt-0.5 h-5 w-5 shrink-0 text-[var(--brand-primary)]"
                  strokeWidth={2.5}
                  fill="currentColor"
                  fillOpacity={0.15}
                />
              )}
              <div>
                <p className="text-sm font-semibold text-[var(--foreground)] sm:text-[15px] md:text-base">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-0.5 inline-block whitespace-pre-line text-sm text-[var(--muted-foreground)] underline underline-offset-2 decoration-1 transition-colors hover:text-[var(--brand-primary)] sm:text-[15px] md:text-base"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-0.5 whitespace-pre-line text-sm text-[var(--muted-foreground)] sm:text-[15px] md:text-base">
                    {item.value}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
