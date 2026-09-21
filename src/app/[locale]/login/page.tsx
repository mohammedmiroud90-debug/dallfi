import { getTranslations, getLocale } from "next-intl/server";
import LoginForm from "@/components/LoginForm";
import Image from "next/image";

export default async function LoginPage() {
  const t = await getTranslations("Login");
  const currentLocale = await getLocale();
  const isRtl = currentLocale === "ar";

  return (
    <div className="min-h-screen flex flex-col login-page">
      <main className="flex-1 flex" dir={isRtl ? "rtl" : "ltr"}>
        {/* Left side - Login Form */}
        <div className="w-full lg:w-2/5 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-sm">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("title")}</h1>
              <p className="text-sm text-gray-600">{t("description")}</p>
            </div>
            <LoginForm />
          </div>
        </div>

        {/* Right side - DALLFI90.png Image */}
        <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-gray-50 to-gray-100 items-center justify-center p-12">
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src="/DALLFI90.png"
              alt="DALLFI"
              width={800}
              height={600}
              className="max-w-full max-h-[600px] object-contain"
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}