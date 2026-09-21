import Image from "next/image";
import { getTranslations } from "next-intl/server";

export default async function HomeIntro() {
  const t = await getTranslations("Pages.about");

  return (
    <section id="about" className="relative overflow-hidden border-t border-[#dce0e6] bg-[#f3f5f8] text-[#1a1a1a]">
      <div className="mx-auto grid max-w-[1200px] lg:min-h-[420px] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <h2 className="text-[1.75rem] leading-tight font-semibold tracking-tight text-[#1a1a1a] sm:text-[2rem]">
            {t("title")}
          </h2>

          <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#333]">
            {t("intro")}
          </p>

          <div className="mt-5 max-w-xl space-y-4 text-[15px] leading-7 text-[#444]">
            <p>{t("body1")}</p>
            <p>{t("body2")}</p>
          </div>
        </div>

        <div className="relative min-h-[280px] bg-black sm:min-h-[360px] lg:min-h-full">
          <Image
            src="/about/unicef-digital.webp"
            alt="Digital impact — people collaborating with technology"
            fill
            className="object-cover object-center grayscale contrast-[1.05] brightness-[0.92]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-white/10"
            aria-hidden
          />
        </div>
      </div>

      {/* Founder Section */}
      <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 lg:px-8">
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
    </section>
  );
}
