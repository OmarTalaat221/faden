import FadenLogo from "@/components/common/faden-logo";
import Container from "@/components/layout/container";
import { Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Clients", href: "#clients" },
  { label: "Contact Us", href: "#contact" },
];

// SVG Icons للـ Social Media
const InstagramIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const socialLinks = [
  { label: "Instagram", Icon: InstagramIcon, href: "#" },
  { label: "Twitter", Icon: TwitterIcon, href: "#" },
  {
    label: "LinkedIn",
    Icon: LinkedInIcon,
    href: "https://www.linkedin.com/company/faden-contracting/",
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-20 bg-[#FEFEFE] pt-14 sm:pt-16 lg:pt-20"
    >
      <Container className="grid gap-10 pb-12 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.15fr_1fr_1.15fr_0.9fr] lg:gap-14 lg:pb-14">
        {/* Logo Column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <FadenLogo
            width={186}
            height={125}
            className="w-[150px] sm:w-[170px] lg:w-[186px]"
          />
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-5 text-base font-semibold text-[var(--foreground)] sm:text-[17px]">
            Quick Links
          </h3>
          <ul className="space-y-3 text-sm text-[var(--muted-foreground)] sm:text-[15px]">
            {quickLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="transition-colors hover:text-[var(--brand-primary)]"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="mb-5 text-base font-semibold text-[var(--foreground)] sm:text-[17px]">
            Contact Us
          </h3>
          <ul className="space-y-4 text-sm text-[var(--muted-foreground)] sm:text-[15px]">
            <li className="flex items-center gap-3">
              <MapPin
                size={18}
                className="shrink-0 text-[var(--brand-primary)]"
              />
              <span>Riyadh, Saudi Arabia</span>
            </li>
            <li>
              <a
                href="tel:+966114508555"
                className="flex items-center gap-3 transition-colors hover:text-[var(--brand-primary)]"
                dir="ltr"
              >
                <Phone
                  size={18}
                  className="shrink-0 text-[var(--brand-primary)]"
                />
                <span>+966 11 4508555</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:info@fadensa.com"
                className="flex items-center gap-3 transition-colors hover:text-[var(--brand-primary)]"
              >
                <Mail
                  size={18}
                  className="shrink-0 text-[var(--brand-primary)]"
                />
                <span>info@fadensa.com</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="sm:col-span-2 lg:col-span-1">
          <h3 className="mb-5 text-base font-semibold text-[var(--foreground)] sm:text-[17px]">
            Follow Us
          </h3>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const { Icon } = social;
              const isExternal = social.href.startsWith("http");
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  className="text-[var(--muted-foreground)] transition-colors hover:text-[var(--brand-primary)]"
                >
                  <Icon size={22} />
                </a>
              );
            })}
          </div>
        </div>
      </Container>

      {/* Copyright Bar */}
      <div className="bg-[var(--brand-primary)] py-3 text-center text-[11px] text-white sm:text-xs">
        © 2026 By FADEN Contracting C.E. All Rights Reserved
      </div>
    </footer>
  );
}
