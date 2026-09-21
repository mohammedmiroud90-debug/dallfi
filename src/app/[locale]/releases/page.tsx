import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export async function generateMetadata() {
  const t = await getTranslations("Releases");
  return { title: `${t("title")} — DALLFI`, description: t("description") };
}

export default async function ReleasesPage() {
  const t = await getTranslations("Releases");

  const windowsReleases = [
    {
      id: 1,
      name: "DALLFI Download Manager",
      version: "1.0.0",
      description: "A modern desktop application for managing file downloads with pause, resume, and scheduling features.",
      status: "Stable",
      downloadLink: "#",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      )
    },
    {
      id: 2,
      name: "DALLFI Desktop Suite",
      version: "0.9.5",
      description: "All-in-one desktop application combining download manager, file organizer, and cloud sync.",
      status: "Beta",
      downloadLink: "#",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const chromeExtensions = [
    {
      id: 1,
      name: "DALLFI Web Assistant",
      version: "2.1.0",
      description: "Browser extension that helps manage downloads directly from your browser with advanced queue management.",
      status: "Stable",
      downloadLink: "#",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
      )
    },
    {
      id: 2,
      name: "DALLFI Quick Capture",
      version: "1.3.2",
      description: "Quickly capture and organize web content, links, and resources directly to your DALLFI account.",
      status: "Stable",
      downloadLink: "#",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];

  return (
    <main className="flex-1">
      {/* Header Section - Black Background */}
      <div className="bg-black">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-6 lg:py-16">
          <h1 className="font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.15] font-normal tracking-[0.5px] text-white">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-[clamp(1rem,2vw,1.2rem)] leading-relaxed font-normal text-gray-300">
            {t("description")}
          </p>
        </div>
      </div>

      {/* Windows Section - Full-width White Background */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-6 lg:py-16">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xl font-semibold text-gray-900 uppercase tracking-wider">
                Windows Software
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {windowsReleases.map((release) => (
              <div
                key={release.id}
                className="py-8 group border border-gray-200 hover:border-[#fc0000] transition-all duration-300 bg-white hover:bg-gray-50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{release.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">Version {release.version}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{release.description}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className={`px-3 py-1 text-xs font-medium rounded ${
                      release.status === "Stable"
                        ? "bg-[#fc0000]/10 text-[#fc0000] border border-[#fc0000]/20"
                        : "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20"
                    }`}>
                      {release.status}
                    </span>
                    <Link
                      href={release.downloadLink}
                      className="inline-flex items-center justify-center rounded-[4px] bg-[#fc0000] px-4 py-3.5 text-[0.95rem] font-semibold tracking-[0.04em] text-white uppercase transition-colors hover:bg-[#d40000]"
                    >
                      Download
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chrome Extensions Section - White Background */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-6 lg:py-16">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-xl font-semibold text-gray-900 uppercase tracking-wider">
                Chrome Extensions
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {chromeExtensions.map((release) => (
              <div
                key={release.id}
                className="py-8 group border border-gray-200 hover:border-[#fc0000] transition-all duration-300 bg-white hover:bg-gray-50"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{release.name}</h3>
                    <p className="text-sm text-gray-500 mb-2">Version {release.version}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{release.description}</p>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <span className={`px-3 py-1 text-xs font-medium rounded ${
                      release.status === "Stable"
                        ? "bg-[#fc0000]/10 text-[#fc0000] border border-[#fc0000]/20"
                        : "bg-yellow-500/10 text-yellow-600 border border-yellow-500/20"
                    }`}>
                      {release.status}
                    </span>
                    <Link
                      href={release.downloadLink}
                      className="inline-flex items-center justify-center rounded-[4px] bg-[#fc0000] px-4 py-3.5 text-[0.95rem] font-semibold tracking-[0.04em] text-white uppercase transition-colors hover:bg-[#d40000]"
                    >
                      Add to Chrome
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
