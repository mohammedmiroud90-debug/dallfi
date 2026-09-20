"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("ContactForm");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="bg-[#f7f8fa] p-6 sm:p-8">
      <h2 className="mb-6 text-[1.5rem] font-semibold text-black">
        {t("title") || "Send us a message"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-[14px] font-medium text-black">
            {t("nameLabel") || "Name"} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="h-12 w-full border border-black/20 bg-white px-4 text-[15px] text-black transition-colors placeholder:text-black/40 focus:border-black focus:outline-none"
            placeholder={t("namePlaceholder") || "Your name"}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-2 block text-[14px] font-medium text-black">
            {t("emailLabel") || "Email"} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="h-12 w-full border border-black/20 bg-white px-4 text-[15px] text-black transition-colors placeholder:text-black/40 focus:border-black focus:outline-none"
            placeholder={t("emailPlaceholder") || "your@email.com"}
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="mb-2 block text-[14px] font-medium text-black">
            {t("subjectLabel") || "Subject"} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="h-12 w-full border border-black/20 bg-white px-4 text-[15px] text-black transition-colors placeholder:text-black/40 focus:border-black focus:outline-none"
            placeholder={t("subjectPlaceholder") || "What's this about?"}
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="message" className="mb-2 block text-[14px] font-medium text-black">
            {t("messageLabel") || "Message"} <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={6}
            className="w-full border border-black/20 bg-white px-4 py-3 text-[15px] text-black transition-colors placeholder:text-black/40 focus:border-black focus:outline-none"
            placeholder={t("messagePlaceholder") || "Your message..."}
          />
        </div>

        {/* Status Messages */}
        {status === "success" && (
          <div className="bg-green-50 border border-green-200 p-4 text-[14px] text-green-800">
            {t("successMessage") || "Message sent successfully! We'll get back to you soon."}
          </div>
        )}

        {status === "error" && (
          <div className="bg-red-50 border border-red-200 p-4 text-[14px] text-red-800">
            {t("errorMessage") || "Failed to send message. Please try again or email us directly."}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex h-12 w-full items-center justify-center bg-black px-8 text-[14px] font-medium text-white transition-colors hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending"
            ? t("sendingButton") || "Sending..."
            : t("sendButton") || "Send message"}
        </button>
      </form>
    </div>
  );
}
