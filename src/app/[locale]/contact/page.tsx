import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Pages.contact");
  return { title: `${t("title")} — DALLFI`, description: t("intro") };
}

export default async function ContactPage() {
  const t = await getTranslations("Pages.contact");

  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-3 text-[13px] font-semibold tracking-wide text-brand uppercase">
            {t("eyebrow") || "GET IN TOUCH"}
          </p>
          <h1 className="font-[family-name:var(--font-display)] text-[2.5rem] tracking-tight text-black sm:text-[3rem]">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-7 text-black/75">{t("intro")}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — Contact Form */}
          <div>
            <ContactForm />
          </div>

          {/* Right — Contact Info */}
          <div>
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center bg-black/5">
                  <svg
                    className="h-5 w-5 text-black/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-black">{t("emailLabel") || "Email"}</h3>
                  <a
                    href="mailto:belhachemiamohammed@gmail.com"
                    className="mt-1 block text-[15px] text-black/70 transition-colors hover:text-black hover:underline"
                  >
                    belhachemiamohammed@gmail.com
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center bg-black/5">
                  <svg
                    className="h-5 w-5 text-black/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-black">{t("phoneLabel") || "Phone"}</h3>
                  <a
                    href="tel:+442081428846"
                    className="mt-1 block text-[15px] text-black/70 transition-colors hover:text-black hover:underline"
                  >
                    +44 20 8142 8846
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center bg-black/5">
                  <svg
                    className="h-5 w-5 text-black/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-[14px] font-semibold text-black">{t("locationLabel") || "Location"}</h3>
                  <p className="mt-1 text-[15px] text-black/70">
                    {t("address") || "Remote & Global"}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-10 border-t border-black/10 pt-10">
              <h3 className="text-[14px] font-semibold text-black">{t("followUs") || "Follow us"}</h3>
              <div className="mt-4 flex gap-3">
                <a
                  href="https://www.linkedin.com/company/dallfi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center bg-black text-white transition-opacity hover:opacity-80"
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@dallfi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center bg-black text-white transition-opacity hover:opacity-80"
                  aria-label="YouTube"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
