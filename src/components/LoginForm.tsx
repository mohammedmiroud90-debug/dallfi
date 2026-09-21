"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const t = useTranslations("Login");
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("loginFailed"));
      }

      // Store the token in both localStorage and set cookie
      if (data.token) {
        localStorage.setItem("admin_token", data.token);
        document.cookie = `admin_token=${data.token}; path=/; max-age=86400; SameSite=Strict`;
        // Redirect to admin page
        router.push("/admin");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : t("loginFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Clean Interactive Login/Register Switch - Header Style */}
      <div className="mb-6">
        <div className="flex items-center justify-center gap-8 border-b border-gray-300 pb-3">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`text-sm font-medium transition-all duration-200 relative ${
              isLogin
                ? "text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {t("login")}
            {isLogin && (
              <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`text-sm font-medium transition-all duration-200 relative ${
              !isLogin
                ? "text-black"
                : "text-gray-600 hover:text-black"
            }`}
          >
            {t("register")}
            {!isLogin && (
              <span className="absolute -bottom-3 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-3 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {!isLogin && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required={!isLogin}
              className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900 placeholder-gray-500 text-sm"
              placeholder="Your name"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900 placeholder-gray-500 text-sm"
            placeholder="Email"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900 placeholder-gray-500 text-sm"
            placeholder="At least 6 characters"
          />
        </div>

        {!isLogin && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Re-enter password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={!isLogin}
              className="w-full px-3 py-2 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black focus:border-black text-gray-900 placeholder-gray-500 text-sm"
              placeholder="Re-enter password"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#fc0000] text-white py-2.5 px-4 font-medium hover:bg-[#d40000] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm rounded-sm"
        >
          {loading ? t("loading") : (isLogin ? t("login") : "Create your KDP account")}
        </button>
      </form>

      {!isLogin && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-600 leading-relaxed">
            By creating an account, you agree to Amazon's Conditions of Use. You can find the privacy notice that applies to you here.
          </p>
        </div>
      )}
    </div>
  );
}
