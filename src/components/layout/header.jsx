"use client";

import FadenLogo from "@/components/common/faden-logo";
import Container from "@/components/layout/container";
import ButtonLink from "@/components/ui/button-link";
import { cn } from "@/lib/utils";
import { ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const aboutSubItems = [
  { label: "Company Overview", href: "/about/overview" },
  { label: "Our Vision & Mission", href: "/about/vision-mission" },
  { label: "Leadership Messages", href: "/about/leadership" },
  { label: "Our Partners", href: "/about/partners" },
  { label: "Our Certifications", href: "/about/certifications" },
];

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "", children: aboutSubItems },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/#projects" },
  { label: "Clients", href: "/#clients" },
];

// ============ Active State Helper ============
/**
 * Determines if a nav item should be marked as active based on current pathname.
 * - Empty href = group only (never navigable, active if any child matches)
 * - Home ("/") is active only when pathname is exactly "/"
 * - Anchor links (starting with "/#") are never active (scroll targets)
 */
function isItemActive(item, pathname) {
  // Group with no direct href — active if any child matches
  if (!item.href) {
    if (Array.isArray(item.children)) {
      return item.children.some((c) => pathname === c.href);
    }
    return false;
  }
  // Root
  if (item.href === "/") {
    return pathname === "/";
  }
  // Anchor links to home (e.g., /#services) — only active on home
  if (item.href.startsWith("/#")) {
    return false;
  }
  // Exact match for other routes
  return pathname === item.href;
}

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const TwitterIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
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

// ============ Desktop Nav Item ============
function DesktopNavItem({ item, pathname, isSticky }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const isActive = isItemActive(item, pathname);
  const isGroupOnly = !item.href; // No href = group trigger only

  const triggerClasses = cn(
    "relative flex items-center gap-1 py-2 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors duration-300",
    isGroupOnly && "cursor-default select-none",
    isSticky
      ? isActive
        ? "text-[var(--brand-primary)]"
        : "text-[var(--foreground)] hover:text-[var(--brand-primary)]"
      : isActive
        ? "text-white"
        : "text-white/85 hover:text-white",
  );

  const triggerContent = (
    <>
      {item.label}
      {hasChildren && (
        <ChevronDown
          size={14}
          className="transition-transform duration-300 group-hover/nav:rotate-180"
        />
      )}
      <span
        className={cn(
          "pointer-events-none absolute -bottom-1 left-1/2 h-[2px] -translate-x-1/2 bg-[var(--brand-primary)] transition-all duration-300 ease-out",
          isActive
            ? "w-full opacity-100"
            : "w-0 opacity-0 group-hover/nav:w-full group-hover/nav:opacity-100",
        )}
      />
    </>
  );

  return (
    <div className="group/nav relative">
      {isGroupOnly ? (
        <span className={triggerClasses} aria-haspopup="true">
          {triggerContent}
        </span>
      ) : (
        <a href={item.href} className={triggerClasses}>
          {triggerContent}
        </a>
      )}

      {/* Dropdown */}
      {hasChildren && (
        <div
          className={cn(
            "invisible absolute left-1/2 top-full z-50 mt-3 w-[240px] -translate-x-1/2 rounded-md py-2 opacity-0 shadow-xl ring-1 transition-all duration-200 group-hover/nav:visible group-hover/nav:mt-2 group-hover/nav:opacity-100",
            isSticky
              ? "bg-white ring-black/5"
              : "bg-[#4A4A4A] ring-white/10 backdrop-blur-md",
          )}
        >
          {item.children.map((sub) => {
            const isSubActive = pathname === sub.href;
            return (
              <a
                key={sub.label}
                href={sub.href}
                className={cn(
                  "block border-b-[#C9C7C6] border-b-[0.01px]! last:border-0! px-4 py-2.5 text-[13px] font-medium transition-colors",
                  isSticky
                    ? isSubActive
                      ? "bg-[var(--muted)] text-[var(--brand-primary)]"
                      : "text-[var(--foreground)] hover:bg-[var(--muted)] hover:text-[var(--brand-primary)]"
                    : isSubActive
                      ? "bg-white/10 text-white"
                      : "text-white/90 hover:bg-white/10 hover:text-white",
                )}
              >
                {sub.label}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============ Header Content (Desktop + Hamburger) ============
function HeaderContent({ variant, open, setOpen, pathname }) {
  const isSticky = variant === "sticky";

  return (
    <Container className="flex h-[72px] items-center justify-between px-4 xs:px-5 sm:h-[84px] sm:px-6 md:px-8 lg:h-[96px] lg:px-10">
      <FadenLogo
        light={!isSticky}
        priority={!isSticky}
        className="w-[90px] xs:w-[100px] sm:w-[110px] md:w-[120px] lg:w-[130px] xl:w-[140px]"
      />

      {/* Desktop Nav */}
      <nav
        aria-label="Main navigation"
        className="hidden items-center gap-10 lg:flex"
      >
        {navItems.map((item) => (
          <DesktopNavItem
            key={item.label}
            item={item}
            pathname={pathname}
            isSticky={isSticky}
          />
        ))}
      </nav>

      <ButtonLink
        href="/contact"
        variant={isSticky ? "outline" : "ghost"}
        className={cn(
          "hidden min-h-10 rounded-[4px] px-6 py-2 text-[13px] font-medium lg:inline-flex",
          isSticky &&
            "border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white",
        )}
      >
        Contact us
      </ButtonLink>

      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "grid size-11 place-items-center rounded-md border transition lg:hidden",
          isSticky
            ? "border-[var(--border)] text-[var(--foreground)] hover:border-[var(--brand-primary)]"
            : "border-white/30 text-white hover:border-white",
        )}
      >
        <Menu size={22} />
      </button>
    </Container>
  );
}

// ============ Mobile Nav Item (Accordion) ============
function MobileNavItem({ item, pathname, setOpen }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const isActive = isItemActive(item, pathname);
  // Auto-expand group if we are inside one of its children
  const [expanded, setExpanded] = useState(isActive && hasChildren);

  if (!hasChildren) {
    return (
      <a
        href={item.href}
        onClick={() => setOpen(false)}
        className={cn(
          "block py-3 text-[15px] font-bold uppercase tracking-[0.08em] transition-colors",
          isActive
            ? "text-[var(--brand-primary)]"
            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
        )}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className={cn(
          "flex w-full items-center justify-between py-3 text-[15px] font-bold uppercase tracking-[0.08em] transition-colors",
          isActive
            ? "text-[var(--brand-primary)]"
            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
        )}
        aria-expanded={expanded}
      >
        <span>{item.label}</span>
        <ChevronDown
          size={16}
          className={cn(
            "transition-transform duration-300",
            expanded && "rotate-180",
          )}
        />
      </button>

      {/* Sub items */}
      <div
        className={cn(
          "grid overflow-hidden transition-all duration-300 ease-out",
          expanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mb-2 ml-3 flex flex-col border-l border-[var(--border)] pl-4">
            {item.children.map((sub) => {
              const isSubActive = pathname === sub.href;
              return (
                <a
                  key={sub.label}
                  href={sub.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "py-2 text-[13px] font-medium transition-colors",
                    isSubActive
                      ? "text-[var(--brand-primary)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--brand-primary)]",
                  )}
                >
                  {sub.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close sidebar when navigating to another page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Static Header (فوق Hero) */}
      <header className="absolute inset-x-0 top-0 z-40">
        <HeaderContent
          variant="hero"
          open={open}
          setOpen={setOpen}
          pathname={pathname}
        />
      </header>

      {/* Sticky Header (بعد Scroll) */}
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-white shadow-md backdrop-blur-md transition-transform duration-500 ease-out",
          scrolled ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <HeaderContent
          variant="sticky"
          open={open}
          setOpen={setOpen}
          pathname={pathname}
        />
      </header>

      {/* Mobile Sidebar Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
      />

      {/* Mobile Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[70] flex w-[85%] max-w-[340px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex items-center justify-between border-b border-[var(--border)] px-6 py-5">
          <FadenLogo light={false} className="w-[130px]" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="grid size-9 place-items-center rounded-md text-[var(--foreground)] transition hover:bg-[var(--muted)]"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <MobileNavItem
                  item={item}
                  pathname={pathname}
                  setOpen={setOpen}
                />
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <ButtonLink
              href="/#contact"
              variant="outline"
              onClick={() => setOpen(false)}
              className="inline-flex border-[var(--brand-primary)] px-6 py-2 text-[14px] font-medium text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white"
            >
              Contact us
            </ButtonLink>
          </div>

          <div className="mt-6 flex items-center gap-2">
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
                  className="grid size-9 place-items-center rounded-md bg-[var(--muted)] text-[var(--muted-foreground)] transition hover:bg-[var(--brand-primary)] hover:text-white"
                >
                  <Icon size={16} />
                </a>
              );
            })}
          </div>
        </nav>
      </aside>
    </>
  );
}
