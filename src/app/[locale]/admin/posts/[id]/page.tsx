"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Post = {
  id: string;
  title: string;
  content: string;
  status: "published" | "draft" | "archived";
  category: string;
  tags: string;
};

type PostStatus = "published" | "draft" | "archived";

const mockPosts: Record<string, Post> = {
  "1": {
    id: "1",
    title: "Getting Started with Dallfi",
    content: "This is a comprehensive guide to getting started with Dallfi...",
    status: "published",
    category: "Builds",
    tags: "tutorial, guide, getting-started",
  },
  "2": {
    id: "2",
    title: "Latest Release Notes v2.0",
    content: "Version 2.0 brings exciting new features and improvements...",
    status: "published",
    category: "Releases",
    tags: "release, update, version",
  },
  "3": {
    id: "3",
    title: "Upcoming Features",
    content: "Here's a sneak peek at what's coming in future releases...",
    status: "draft",
    category: "Builds",
    tags: "features, roadmap, future",
  },
};

export default function PostEditPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.id as string;
  
  const [post, setPost] = useState<Post>(
    mockPosts[postId] || {
      id: postId,
      title: "",
      content: "",
      status: "draft",
      category: "",
      tags: "",
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
    if (confirm("Are you sure you want to delete this post?")) {
      router.push("/admin/posts");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <p className="section-label">EDIT POST</p>
        <h1>{post.title || "New Post"}</h1>
        <p>Edit your post content and settings.</p>
      </div>
      <div className="admin-content">
        <div className="space-y-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Post title"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Content</label>
            <textarea
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              rows={12}
              placeholder="Write your post content here..."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Category</label>
              <select
                value={post.category}
                onChange={(e) => setPost({ ...post, category: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                <option value="">Select category</option>
                <option value="Builds">Builds</option>
                <option value="Releases">Releases</option>
                <option value="News">News</option>
                <option value="Tutorials">Tutorials</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Status</label>
              <select
                value={post.status}
                onChange={(e) => setPost({ ...post, status: e.target.value as PostStatus })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              value={post.tags}
              onChange={(e) => setPost({ ...post, tags: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="tag1, tag2, tag3"
            />
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <button
              onClick={handleDelete}
              className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              Delete Post
            </button>
            <div className="flex items-center gap-3">
              {saveStatus === "saved" && (
                <span className="text-sm text-green-600">Post saved successfully!</span>
              )}
              {saveStatus === "error" && (
                <span className="text-sm text-red-600">Error saving post.</span>
              )}
              <button
                onClick={() => router.push("/admin/posts")}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className="rounded-md bg-red-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {saveStatus === "saving" ? "Saving..." : "Save Post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
