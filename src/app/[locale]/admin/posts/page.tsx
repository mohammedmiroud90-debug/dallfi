"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

type Post = {
  id: string;
  title: string;
  status: "published" | "draft" | "archived";
  date: string;
  author: string;
  category: string;
};

type StatusFilter = "all" | "published" | "draft" | "archived";

const mockPosts: Post[] = [
  { id: "1", title: "Getting Started with Dallfi", status: "published", date: "2026-01-15", author: "Admin", category: "Builds" },
  { id: "2", title: "Latest Release Notes v2.0", status: "published", date: "2026-01-10", author: "Admin", category: "Releases" },
  { id: "3", title: "Upcoming Features", status: "draft", date: "2026-01-12", author: "Admin", category: "Builds" },
  { id: "4", title: "API Documentation", status: "draft", date: "2026-01-08", author: "Admin", category: "Builds" },
  { id: "5", title: "Old Announcement", status: "archived", date: "2025-12-20", author: "Admin", category: "Releases" },
];

export default function PostsPage() {
  const t = useTranslations("Admin");
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const filteredPosts = posts.filter(
    (post) =>
      (statusFilter === "all" || post.status === statusFilter) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const deletePost = (id: string) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <p className="section-label">{t("posts")}</p>
        <h1>{t("postsTitle")}</h1>
        <p>{t("postsDesc")}</p>
      </div>
      <div className="admin-content">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <input
              type="text"
              placeholder={t("searchPosts")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="all">{t("allStatus")}</option>
              <option value="published">{t("published")}</option>
              <option value="draft">{t("draft")}</option>
              <option value="archived">{t("archived")}</option>
            </select>
          </div>
          <button className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700">
            {t("newPost")}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {t("title")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {t("status")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {t("category")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {t("date")}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {t("author")}
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                  {t("actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="font-medium text-gray-900 hover:text-red-600"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(post.status)}`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{post.category}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{post.date}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{post.author}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="rounded bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">
                        {t("edit")}
                      </button>
                      <button
                        onClick={() => deletePost(post.id)}
                        className="rounded bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                      >
                        {t("delete")}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            {t("noResults")}
          </div>
        )}
      </div>
    </div>
  );
}