"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type Locale = "en" | "fr" | "es" | "ar";

const labels: Record<Locale, { nav: string[]; view: string; signOut: string; menu: string }> = {
  en: {
    nav: ["Overview", "Posts", "Pages", "Categories", "Settings"],
    view: "View site ↗",
    signOut: "Sign out",
    menu: "Open admin menu",
  },
  fr: {
    nav: ["Vue d'ensemble", "Articles", "Pages", "Catégories", "Paramètres"],
    view: "Voir le site ↗",
    signOut: "Déconnexion",
    menu: "Ouvrir le menu",
  },
  es: {
    nav: ["Visión general", "Artículos", "Páginas", "Categorías", "Configuración"],
    view: "Ver sitio ↗",
    signOut: "Cerrar sesión",
    menu: "Abrir menú",
  },
  ar: {
    nav: ["نظرة عامة", "المقالات", "الصفحات", "الفئات", "الإعدادات"],
    view: "عرض الموقع ↗",
    signOut: "تسجيل الخروج",
    menu: "فتح القائمة",
  },
};

const paths = [
  "/admin",
  "/admin/posts",
  "/admin/pages",
  "/admin/categories",
  "/admin/settings",
];

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

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("dallfi-locale");
    if (saved === "en" || saved === "fr" || saved === "es" || saved === "ar") setLocale(saved);

    // Check authentication
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    localStorage.setItem("dallfi-locale", locale);
  }, [locale]);

  async function logout() {
    localStorage.removeItem("admin_token");
    document.cookie = "admin_token=; path=/; max-age=0; SameSite=Strict";
    router.replace("/login");
    router.refresh();
  }

  const text = labels[locale];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="dallfi-admin" dir={locale === "ar" ? "rtl" : "ltr"}>
      <header className="dallfi-admin-header">
        <div className="admin-header-row">
          <Link href="/admin" className="dallfi-admin-logo">
            <Image
              src="/Dallfi.png"
              alt="Dallfi"
              width={125}
              height={52}
              priority
              className="brightness-0 invert"
            />
          </Link>
          <div className="admin-header-tools">
            <AdminLocaleSwitcher value={locale} onLocaleChange={setLocale} />
            <Link href="/">{text.view}</Link>
            <button
              className="admin-menu-toggle"
              onClick={() => setOpen((value) => !value)}
              aria-label={text.menu}
              aria-expanded={open}
            >
              <i />
              <i />
              <i />
            </button>
          </div>
        </div>
        <nav className={open ? "is-open" : ""} aria-label="Admin dashboard">
          {paths.map((href, index) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={pathname === href ? "active" : ""}
            >
              {text.nav[index]}
            </Link>
          ))}
          <button className="admin-mobile-signout" onClick={logout}>
            {text.signOut}
          </button>
        </nav>
        <button className="admin-desktop-signout" onClick={logout}>
          {text.signOut}
        </button>
      </header>
      <main className="dallfi-admin-main">{children}</main>
      <footer className="admin-footer">
        <span>Copyright © 2026 DALLFI. All Rights Reserved.</span>
        <nav aria-label="Admin legal links">
          <Link href="/privacy">Privacy Policy</Link>
        </nav>
      </footer>
    </div>
  );
}