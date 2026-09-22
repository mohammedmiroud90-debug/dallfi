"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "dallfi-cookie-consent";

export default function CookieConsent() {
  const t = useTranslations("Cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function accept(value: "all" | "necessary") {
    window.localStorage.setItem(STORAGE_KEY, value);
    setVisible(false);
  }

  if (!visible) {
    return null;
  }

  const linkClass =
    "font-medium text-white underline decoration-white/70 underline-offset-2 hover:decoration-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
        className="relative w-full max-w-xl bg-brand p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:p-8"
      >
        <Image
          src="/DALLFIEXT.png"
          alt="DALLFI"
          width={220}
          height={64}
          priority
          className="absolute top-5 right-5 h-12 w-auto max-w-[140px] object-contain object-right brightness-0 invert sm:top-6 sm:right-6 sm:h-16 sm:max-w-[180px]"
        />

        <h2
          id="cookie-title"
          className="pr-36 text-[1.4rem] font-bold text-white sm:pr-44 sm:text-[1.5rem]"
        >
          {t("title")}
        </h2>
        <div className="mt-4 space-y-3 pr-4 text-[14px] leading-6 text-white sm:pr-8">
          <p>{t("p1")}</p>
          <p>
            {t.rich("p2", {
              cookie: (chunks) => (
                <a href="#cookies" className={linkClass}>
                  {chunks}
                </a>
              ),
              privacy: (chunks) => (
                <a href="#privacy" className={linkClass}>
                  {chunks}
                </a>
              ),
              imprint: (chunks) => (
                <a href="#imprint" className={linkClass}>
                  {chunks}
                </a>
              ),
            })}
          </p>
          <p>{t("p3")}</p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            className="font-nav h-11 border-2 border-white bg-transparent px-5 text-[14px] font-medium text-white transition-colors hover:bg-white hover:text-brand"
          >
            {t("settings")}
          </button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => accept("necessary")}
              className="font-nav h-11 border-2 border-white bg-transparent px-5 text-[14px] font-medium text-white transition-colors hover:bg-white hover:text-brand"
            >
              {t("necessary")}
            </button>
            <button
              type="button"
              onClick={() => accept("all")}
              className="font-nav h-11 bg-white px-6 text-[14px] font-semibold text-brand transition-colors hover:bg-white/90"
            >
              {t("accept")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
