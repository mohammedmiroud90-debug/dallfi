"use client";

import { useState } from "react";
import Link from "next/link";

type Page = {
  id: string;
  title: string;
  slug: string;
  status: "published" | "draft";
  lastUpdated: string;
};

type StatusFilter = "all" | "published" | "draft";

const mockPages: Page[] = [
  { id: "1", title: "Home", slug: "/", status: "published", lastUpdated: "2026-01-15" },
  { id: "2", title: "About Us", slug: "/about", status: "published", lastUpdated: "2026-01-10" },
  { id: "3", title: "Contact", slug: "/contact", status: "published", lastUpdated: "2026-01-08" },
  { id: "4", title: "Privacy Policy", slug: "/privacy", status: "published", lastUpdated: "2025-12-20" },
  { id: "5", title: "Terms of Service", slug: "/terms", status: "draft", lastUpdated: "2026-01-12" },
];

export default function PagesPage() {
  const [pages, setPages] = useState<Page[]>(mockPages);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredPages = pages.filter(
    (page) =>
      (statusFilter === "all" || page.status === statusFilter) &&
      (page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       page.slug.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const deletePage = (id: string) => {
    setPages(pages.filter((page) => page.id !== id));
  };

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <p className="section-label">PAGES</p>
        <h1>Manage Pages</h1>
        <p>Update the public pages across your website.</p>
      </div>
      <div className="admin-content">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">
            + New Page
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Slug
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Last Updated
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <Link
                      href={`/admin/pages/${page.id}`}
                      className="font-medium text-gray-900 hover:text-red-600"
                    >
                      {page.title}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 font-mono">{page.slug}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(page.status)}`}>
                      {page.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{page.lastUpdated}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="rounded bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">
                        Edit
                      </button>
                      <button
                        onClick={() => deletePage(page.id)}
                        className="rounded bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPages.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No pages found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}