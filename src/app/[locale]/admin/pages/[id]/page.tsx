"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Page = {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: "published" | "draft";
};

type PageStatus = "published" | "draft";

const mockPages: Record<string, Page> = {
  "1": {
    id: "1",
    title: "Home",
    slug: "/",
    content: "Welcome to Dallfi. Build. Work. Connect. Grow.",
    status: "published",
  },
  "2": {
    id: "2",
    title: "About Us",
    slug: "/about",
    content: "Learn more about our company and mission...",
    status: "published",
  },
  "3": {
    id: "3",
    title: "Contact",
    slug: "/contact",
    content: "Get in touch with us through our contact form...",
    status: "published",
  },
  "4": {
    id: "4",
    title: "Privacy Policy",
    slug: "/privacy",
    content: "Our privacy policy and data handling practices...",
    status: "published",
  },
  "5": {
    id: "5",
    title: "Terms of Service",
    slug: "/terms",
    content: "Terms and conditions for using our services...",
    status: "draft",
  },
};

export default function PageEditPage() {
  const params = useParams();
  const router = useRouter();
  const pageId = params.id as string;
  
  const [page, setPage] = useState<Page>(
    mockPages[pageId] || {
      id: pageId,
      title: "",
      slug: "",
      content: "",
      status: "draft",
    }
  );
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const handleSave = () => {
    setSaveStatus("saving");
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this page?")) {
      router.push("/admin/pages");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <p className="section-label">EDIT PAGE</p>
        <h1>{page.title || "New Page"}</h1>
        <p>Edit your page content and settings.</p>
      </div>
      <div className="admin-content">
        <div className="space-y-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={page.title}
              onChange={(e) => setPage({ ...page, title: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Page title"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
            <input
              type="text"
              value={page.slug}
              onChange={(e) => setPage({ ...page, slug: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 font-mono"
              placeholder="/page-slug"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={page.content}
              onChange={(e) => setPage({ ...page, content: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              rows={12}
              placeholder="Write your page content here..."
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
            <select
              value={page.status}
              onChange={(e) => setPage({ ...page, status: e.target.value as PageStatus })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <button
              onClick={handleDelete}
              className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              Delete Page
            </button>
            <div className="flex items-center gap-3">
              {saveStatus === "saved" && (
                <span className="text-sm text-green-600">Page saved successfully!</span>
              )}
              {saveStatus === "error" && (
                <span className="text-sm text-red-600">Error saving page.</span>
              )}
              <button
                onClick={() => router.push("/admin/pages")}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className="rounded-md bg-red-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {saveStatus === "saving" ? "Saving..." : "Save Page"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
