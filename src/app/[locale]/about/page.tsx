import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Pages.about");
  return { title: `${t("title")} — DALLFI`, description: t("intro") };
}

export default async function AboutPage() {
  const t = await getTranslations("Pages.about");

  return (
    <main className="flex-1 bg-[#f7f8fa]">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <p className="mb-3 text-[13px] font-semibold tracking-wide text-brand uppercase">
          DALLFI
        </p>
        <h1 className="font-[family-name:var(--font-display)] text-[2rem] tracking-tight text-black sm:text-[2.5rem]">
          {t("title")}
        </h1>
        <p className="mt-4 text-[16px] leading-7 text-black/75">{t("intro")}</p>
        <div className="mt-8 space-y-4 text-[15px] leading-7 text-black/80">
          <p>{t("body1")}</p>
          <p>{t("body2")}</p>
        </div>

        {/* Founder Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative shrink-0 flex items-center gap-4">
              <Image
                src="/Founder9.png"
                alt="Founder & CEO"
                width={120}
                height={120}
                className="rounded-full object-cover border-4 border-white shadow-lg grayscale"
              />
              <a
                href="https://www.linkedin.com/in/ibrahim-mohammed-fr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-semibold text-gray-900 mb-1">Founder & CEO</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Leading DALLFI's vision to create a digital ecosystem where people and businesses build, work, connect, and grow together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
