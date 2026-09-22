"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

function FooterLinks({
  items,
}: {
  items: ReadonlyArray<{ href: string; label: string; external?: boolean }>;
}) {
  return (
    <ul className="space-y-2 text-[14px] font-normal text-white/90">
      {items.map((item) => (
        <li key={`${item.href}-${item.label}`}>
          {item.external ? (
            <a href={item.href} className="transition-colors hover:text-white hover:underline">
              {item.label}
            </a>
          ) : (
            <Link href={item.href} className="transition-colors hover:text-white hover:underline">
              {item.label}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function BlogBadge() {
  return (
    <Link
      href="/blog"
      className="inline-flex h-12 min-w-[7.5rem] items-center justify-center border border-white/80 px-3 text-center text-[12px] leading-tight font-normal text-white transition-colors hover:bg-white/10"
    >
      Dallfi
      <br />
      blog
    </Link>
  );
}

function PartnerMark({ label, sub }: { label: string; sub?: string }) {
  return (
    <div className="inline-flex min-h-12 flex-col justify-center border border-white/80 px-3 py-1.5 text-white">
      {sub ? (
        <span className="text-[9px] font-normal tracking-[0.08em] text-white/70 uppercase">
          {sub}
        </span>
      ) : null}
      <span className="text-[13px] font-semibold leading-tight">{label}</span>
    </div>
  );
}

function SocialIcons() {
  return (
    <div className="flex items-center gap-4">
      <a
        href="https://www.linkedin.com/company/dallfi"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white transition-opacity hover:opacity-70"
        aria-label="LinkedIn"
      >
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>
      <a
        href="https://www.youtube.com/@dallfi"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white transition-opacity hover:opacity-70"
        aria-label="YouTube"
      >
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      </a>
    </div>
  );
}

export default function SiteFooter() {
  const t = useTranslations("Footer");

  const rowOne = [
    { href: "/", label: t("home") },
    { href: "/blog?category=builds", label: t("builds") },
    { href: "/releases", label: t("releases") },
    { href: "/about", label: t("howItWorks") },
  ] as const;

  const rowTwo = [
    { href: "/about", label: t("aboutUs") },
    { href: "/contact", label: t("contactUs") },
    { href: "/privacy", label: t("terms") },
    { href: "tel:+442081428846", label: t("support"), external: true },
  ] as const;

  return (
    <footer className="bg-[#333333] text-white">
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          {/* Left — brand, slogan, links, copyright */}
          <div className="min-w-0 flex-1">
            <Link href="/" className="inline-flex items-center" aria-label="Dallfi">
              <Image
                src="/DALLFIEXT.png"
                alt="Dallfi"
                width={180}
                height={48}
                className="h-10 w-auto object-contain object-left brightness-0 invert sm:h-11"
              />
            </Link>

            <p className="mt-3 text-[14px] font-semibold text-white">
              {t("sloganLeft")}
              <span className="mx-2 font-normal text-white/50" aria-hidden>
                |
              </span>
              {t("sloganRight")}
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <FooterLinks items={rowOne} />
              </div>
              <div>
                <FooterLinks items={rowTwo} />
              </div>
            </div>

            {/* Copyright */}
            <p className="mt-8 text-[13px] text-white/60">
              © 2026 Dallfi Softwares. All rights reserved.
            </p>
          </div>

          {/* Right — badge / card marks & social */}
          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex flex-wrap items-end gap-3 lg:justify-end">
              <PartnerMark label="DALLFI" sub={t("ecosystem")} />
              <BlogBadge />
              <PartnerMark label="Dallfi Softwares" sub={t("poweredBy")} />
              <div
                className="inline-flex h-12 w-12 items-center justify-center bg-white text-[#333]"
                aria-hidden
              >
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M12 3a9 9 0 1 0 9 9" strokeLinecap="round" />
                  <path d="M21 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-end">
              <SocialIcons />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
