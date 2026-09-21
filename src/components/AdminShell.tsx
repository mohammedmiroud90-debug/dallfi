"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/AdminHeader";

type Locale = "en" | "fr" | "es" | "ar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Detect current locale from pathname first
  useEffect(() => {
    const pathLocale = pathname.split('/')[1];
    if (pathLocale === "en" || pathLocale === "fr" || pathLocale === "es" || pathLocale === "ar") {
      setLocale(pathLocale as Locale);
    } else {
      // Fallback to saved locale or default
      const saved = localStorage.getItem("dallfi-locale");
      if (saved === "en" || saved === "fr" || saved === "es" || saved === "ar") {
        setLocale(saved);
      }
    }
  }, [pathname]);

  useEffect(() => {
    // Check authentication - try both localStorage and cookies
    const token = localStorage.getItem("admin_token") || document.cookie.includes("admin_token");
    if (!token) {
      router.replace(`/${locale}/login`);
    } else {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [router, locale]);

  useEffect(() => {
    localStorage.setItem("dallfi-locale", locale);
  }, [locale]);

  const handleLocaleChange = (newLocale: Locale) => {
    setLocale(newLocale);
    // Navigate to the same page with new locale
    const pathParts = pathname.split('/');
    const currentPath = pathParts.slice(2).join('/'); // Remove locale from path
    router.replace(`/${newLocale}/admin${currentPath ? '/' + currentPath : ''}`);
  };

  async function logout() {
    localStorage.removeItem("admin_token");
    document.cookie = "admin_token=; path=/; max-age=0; SameSite=Strict";
    router.replace(`/${locale}/login`);
    router.refresh();
  }

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
      <AdminHeader
        locale={locale}
        pathname={pathname}
        onLocaleChange={handleLocaleChange}
        onLogout={logout}
      />
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