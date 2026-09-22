"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import LocaleSwitcher from "@/components/LocaleSwitcher";
import SearchModal from "@/components/SearchModal";

function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <rect x="2" y="4" width="20" height="3.2" rx="1" />
      <rect x="2" y="10.4" width="20" height="3.2" rx="1" />
      <rect x="2" y="16.8" width="20" height="3.2" rx="1" />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5.2 4.1 19.9 18.8l-2.1 2.1L3.1 6.2z" />
      <path d="m19.9 6.2-2.1-2.1L3.1 18.8l2.1 2.1z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 7 9-7" />
    </svg>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function IconPhone({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <path d="M8 3.5h3.2l1.2 3.2-2 1.2a11 11 0 0 0 5 5l1.2-2 3.2 1.2V15a2.5 2.5 0 0 1-2.5 2.5A13.5 13.5 0 0 1 3.5 8 2.5 2.5 0 0 1 6 5.5Z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

/** DALLFIEXT.png with white filter for red header */
function BrandLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Image
      src="/DALLFIEXT.png"
      alt="Dallfi"
      width={compact ? 180 : 220}
      height={compact ? 52 : 64}
      priority
      className={`w-auto object-contain object-left brightness-0 invert ${
        compact ? "h-10 max-w-[180px]" : "h-12 max-w-[220px] lg:h-14"
      }`}
    />
  );
}

const navLinkClass =
  "inline-block px-3 py-2 text-[15px] font-normal leading-none text-white transition-opacity hover:opacity-75 lg:px-3.5";

type Props = {
  notice?: ReactNode;
};

export default function SiteHeader({ notice }: Props) {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navLinks = [
    { href: "/blog?category=builds", label: t("builds") },
    { href: "/releases", label: t("releases") },
  ] as const;

  return (
    <header className="sticky top-0 z-50">
      {/* Desktop top contact — hidden on mobile */}
      <div className="hidden bg-[#fc0000] md:block">
        <div className="mx-auto flex max-w-[1200px] items-center justify-end gap-6 px-5 py-2 lg:px-8">
          <button
            onClick={() => setSearchOpen(true)}
            className="inline-flex items-center gap-1.5 text-[12px] font-normal text-white/90 transition-opacity hover:opacity-80"
            aria-label="Search"
          >
            <IconSearch className="h-3.5 w-3.5" />
          </button>
          <a
            href="mailto:mail@dallfi.com"
            className="inline-flex items-center gap-1.5 text-[12px] font-normal text-white/90 transition-opacity hover:opacity-80"
          >
            <IconMail className="h-3.5 w-3.5" />
            mail@dallfi.com
          </a>
          <a
            href="tel:+213783217817"
            className="inline-flex items-center gap-1.5 text-[12px] font-normal text-white/90 transition-opacity hover:opacity-80"
          >
            <IconPhone className="h-3.5 w-3.5" />
            +213 783 217 817
          </a>
          <a
            href="https://www.linkedin.com/company/dallfi/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-white/90 transition-opacity hover:opacity-80"
            aria-label="LinkedIn"
          >
            <IconLinkedIn className="h-3.5 w-3.5" />
          </a>
        </div>

        <nav className="mx-auto flex h-[5.25rem] max-w-[1200px] items-center justify-between gap-8 px-5 lg:px-8">
          <div className="flex min-w-0 items-center gap-5">
            <Link href="/" className="shrink-0" aria-label="Dallfi">
              <BrandLogo />
            </Link>
            <span className="hidden h-8 w-px bg-white/30 lg:block" aria-hidden />
            <p className="hidden max-w-[10rem] text-[11px] leading-snug font-normal text-white/85 lg:block">
              Build. Work. Connect. Grow.
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-end gap-x-0.5">
            {navLinks.map((link) => (
              <li key={link.href} className="flex items-center">
                <Link href={link.href} className={navLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="ml-2 flex items-center border-l border-white/30 pl-3">
              <LocaleSwitcher variant="dark" />
            </li>
          </ul>
        </nav>
      </div>

      {/* ——— Mobile header (DropCatch-style stack) ——— */}
      <div className="md:hidden">
        {/* 1. Clean red bar: menu | logo | Log In | locale */}
        <div className="bg-[#fc0000]">
          <div className="flex h-14 items-center gap-1 px-2">
            <button
              type="button"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center text-white"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <IconClose className="h-7 w-7" /> : <IconMenu className="h-7 w-7" />}
            </button>

            <Link href="/" className="min-w-0 flex-1" aria-label="Dallfi">
              <BrandLogo compact />
            </Link>

            <Link
              href="/login"
              className="shrink-0 px-1.5 text-[14px] font-normal whitespace-nowrap text-white"
            >
              {t("login")}
            </Link>
            <LocaleSwitcher variant="dark" />
          </div>

          {open ? (
            <nav className="border-t border-white/20 bg-[#fc0000] px-3 pb-3">
              <ul className="flex flex-col">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block px-1 py-2.5 text-[15px] font-normal text-white"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://www.linkedin.com/company/dallfi/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-1 py-2.5 text-[15px] font-normal text-white"
                  >
                    <IconLinkedIn className="h-4 w-4" />
                    LinkedIn
                  </a>
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
      </div>

      {notice}

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile section bar + Filter / Sort */}
      <div className="md:hidden">
        <div className="flex h-11 items-center justify-between bg-[#444444] px-3">
          <p className="text-[14px] font-bold text-white">{t("sectionTitle")}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="h-7 rounded-sm bg-white px-2.5 text-[12px] font-semibold text-[#1a1a1a]"
            >
              {t("filter")}
            </button>
            <button
              type="button"
              className="h-7 rounded-sm bg-[#6a6a6a] px-2.5 text-[12px] font-semibold text-white"
            >
              {t("sort")}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
