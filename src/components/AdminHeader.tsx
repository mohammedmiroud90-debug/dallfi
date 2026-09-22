"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type Locale = "en" | "fr" | "es" | "ar";

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

function AdminLocaleSwitcher({ value, onLocaleChange }: { value: Locale; onLocaleChange: (locale: Locale) => void }) {
  const localeLabels: Record<Locale, string> = {
    en: "EN",
    fr: "FR",
    es: "ES",
    ar: "ع",
  };

  return (
    <label className="inline-flex items-center gap-1.5">
      <span className="sr-only">Language</span>
      <svg
        className="h-4 w-4 text-white/90"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
      <select
        className="h-8 cursor-pointer appearance-none rounded-md border border-white/25 bg-transparent px-2 pr-7 text-[13px] font-normal text-white outline-none"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath fill='%23ffffff' d='M0 0l5 6 5-6z'/%3E%3C/svg%3E\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 8px center",
        }}
        value={value}
        onChange={(event) => onLocaleChange(event.target.value as Locale)}
        aria-label="Language"
      >
        {Object.entries(localeLabels).map(([code, label]) => (
          <option key={code} value={code} className="text-charcoal">
            {label}
          </option>
        ))}
      </select>
    </label>
  );
}

function BrandLogo() {
  return (
    <Image
      src="/DALLFIEXT.png"
      alt="Dallfi"
      width={200}
      height={72}
      priority
      className="w-auto h-14 max-w-[200px] object-contain object-left brightness-0 invert"
    />
  );
}

const navLinkClass =
  "inline-block px-3 py-2 text-[15px] font-normal leading-none text-white transition-opacity hover:opacity-75 lg:px-3.5 admin-nav-link";

type Props = {
  locale: Locale;
  pathname: string;
  onLocaleChange: (locale: Locale) => void;
  onLogout: () => void;
};

const labels: Record<string, { nav: string[]; view: string; signOut: string }> = {
  en: {
    nav: ["Overview", "Posts", "Pages", "Categories", "Settings"],
    view: "View site ↗",
    signOut: "Sign out",
  },
  fr: {
    nav: ["Vue d'ensemble", "Articles", "Pages", "Catégories", "Paramètres"],
    view: "Voir le site ↗",
    signOut: "Déconnexion",
  },
  es: {
    nav: ["Visión general", "Artículos", "Páginas", "Categorías", "Configuración"],
    view: "Ver sitio ↗",
    signOut: "Cerrar sesión",
  },
  ar: {
    nav: ["نظرة عامة", "المقالات", "الصفحات", "الفئات", "الإعدادات"],
    view: "عرض الموقع ↗",
    signOut: "تسجيل الخروج",
  },
};

const navKeys = ["overviewLabel", "managePosts", "managePages", "manageCategories", "websiteSettings"];

const paths = [
  "/admin",
  "/admin/posts",
  "/admin/pages",
  "/admin/categories",
  "/admin/settings",
];

export default function AdminHeader({ locale, pathname, onLocaleChange, onLogout }: Props) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Admin");
  const text = labels[locale] || labels.en;

  return (
    <header className="sticky top-0 z-50">
      {/* Desktop header — same design as home header */}
      <div className="hidden bg-[#fc0000] md:block">
        <nav className="flex h-16 items-center justify-between gap-8 px-8 lg:px-12">
          <div className="flex min-w-0 items-center gap-5">
            <Link href={`/${locale}/admin`} className="shrink-0" aria-label="Dallfi">
              <BrandLogo />
            </Link>
            <span className="hidden h-8 w-px bg-white/30 lg:block" aria-hidden />
            <p className="hidden max-w-[10rem] text-[11px] leading-snug font-normal text-white/85 lg:block">
              {t("navLabel")}
            </p>
          </div>

          <ul className="flex flex-wrap items-center justify-end gap-x-0.5">
            {paths.map((href, index) => {
              const fullPath = `/${locale}${href}`;
              return (
                <li key={href} className="flex items-center">
                  <Link
                    href={fullPath}
                    className={pathname === fullPath ? `${navLinkClass} opacity-100` : navLinkClass}
                  >
                    {text.nav[index]}
                  </Link>
                </li>
              );
            })}
            <li className="ml-2 flex items-center border-l border-white/30 pl-3">
              <AdminLocaleSwitcher value={locale} onLocaleChange={onLocaleChange} />
            </li>
            <li className="ml-2 flex items-center">
              <Link
                href={`/${locale}`}
                className="inline-block px-3 py-2 text-[15px] font-normal leading-none text-white transition-opacity hover:opacity-75 lg:px-3.5 admin-nav-link"
              >
                {text.view}
              </Link>
            </li>
            <li className="ml-2 flex items-center">
              <button
                onClick={onLogout}
                className="inline-block px-3 py-2 text-[15px] font-normal leading-none text-white transition-opacity hover:opacity-75 lg:px-3.5 admin-nav-link"
              >
                {text.signOut}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* ——— Mobile header (same design as home header) ——— */}
      <div className="md:hidden">
        <div className="bg-[#fc0000]">
          <div className="flex h-12 items-center gap-1 px-2">
            <button
              type="button"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center text-white"
              onClick={() => setOpen((value) => !value)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
            </button>

            <Link href={`/${locale}/admin`} className="min-w-0 flex-1" aria-label="Dallfi">
              <BrandLogo />
            </Link>

            <AdminLocaleSwitcher value={locale} onLocaleChange={onLocaleChange} />
          </div>

          {open ? (
            <nav className="border-t border-white/20 bg-[#fc0000] px-3 pb-3">
              <ul className="flex flex-col">
                {paths.map((href, index) => {
                  const fullPath = `/${locale}${href}`;
                  return (
                    <li key={href}>
                      <Link
                        href={fullPath}
                        className="block px-1 py-2.5 text-[15px] font-normal text-white admin-nav-link"
                        onClick={() => setOpen(false)}
                      >
                        {text.nav[index]}
                      </Link>
                    </li>
                  );
                })}
                <li>
                  <Link
                    href={`/${locale}`}
                    className="block px-1 py-2.5 text-[15px] font-normal text-white admin-nav-link"
                    onClick={() => setOpen(false)}
                  >
                    {text.view}
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      onLogout();
                      setOpen(false);
                    }}
                    className="block w-full text-left px-1 py-2.5 text-[15px] font-normal text-white admin-nav-link"
                  >
                    {text.signOut}
                  </button>
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
      </div>
    </header>
  );
}
