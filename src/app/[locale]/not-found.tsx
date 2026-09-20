import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="flex min-h-screen flex-1 items-center justify-center bg-brand px-4 py-20">
      <div className="mx-auto max-w-2xl text-center">
        {/* Large Sad Face Icon */}
        <div className="mb-8">
          <svg
            className="mx-auto h-40 w-40 text-white sm:h-48 sm:w-48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Face circle */}
            <circle cx="12" cy="12" r="10" />
            {/* Left eye */}
            <circle cx="8" cy="9" r="0.8" fill="currentColor" stroke="none" />
            {/* Right eye */}
            <circle cx="16" cy="9" r="0.8" fill="currentColor" stroke="none" />
            {/* Sad mouth */}
            <path d="M8 16 Q12 14 16 16" />
          </svg>
        </div>

        {/* 404 Number */}
        <div className="mb-6">
          <h1
            className="text-[8rem] leading-none tracking-tight text-white/20 sm:text-[12rem]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            404
          </h1>
        </div>

        {/* Title */}
        <h2
          className="text-[2rem] tracking-tight text-white sm:text-[2.5rem]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t("title")}
        </h2>

        {/* Description */}
        <p className="mt-4 text-[16px] leading-7 text-white/90">
          {t("description")}
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center border-2 border-white bg-white px-8 text-[14px] font-medium text-brand transition-colors hover:bg-white/90"
          >
            {t("backHome")}
          </Link>
          <Link
            href="/contact"
            className="inline-flex h-12 items-center justify-center border-2 border-white px-8 text-[14px] font-medium text-white transition-colors hover:bg-white/10"
          >
            {t("contactUs")}
          </Link>
        </div>

        {/* Quick Links */}
        <div className="mt-12 border-t border-white/20 pt-8">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-wider text-white/80">
            {t("quickLinks")}
          </p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[14px]">
            <Link href="/blog" className="text-white/90 transition-colors hover:text-white hover:underline">
              {t("blog")}
            </Link>
            <Link href="/about" className="text-white/90 transition-colors hover:text-white hover:underline">
              {t("about")}
            </Link>
            <Link href="/membership" className="text-white/90 transition-colors hover:text-white hover:underline">
              {t("membership")}
            </Link>
            <Link href="/partners" className="text-white/90 transition-colors hover:text-white hover:underline">
              {t("partners")}
            </Link>
            <Link href="/events" className="text-white/90 transition-colors hover:text-white hover:underline">
              {t("events")}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
