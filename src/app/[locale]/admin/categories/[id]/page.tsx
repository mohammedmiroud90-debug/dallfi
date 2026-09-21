"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
};

const mockCategories: Record<string, Category> = {
  "1": {
    id: "1",
    name: "Builds",
    slug: "builds",
    description: "Project builds and tutorials",
  },
  "2": {
    id: "2",
    name: "Releases",
    slug: "releases",
    description: "Software releases and updates",
  },
  "3": {
    id: "3",
    name: "News",
    slug: "news",
    description: "Company news and announcements",
  },
  "4": {
    id: "4",
    name: "Tutorials",
    slug: "tutorials",
    description: "Step-by-step guides",
  },
  "5": {
    id: "5",
    name: "Updates",
    slug: "updates",
    description: "Product updates and features",
  },
};

export default function CategoryEditPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id as string;
  
  const [category, setCategory] = useState<Category>(
    mockCategories[categoryId] || {
      id: categoryId,
      name: "",
      slug: "",
      description: "",
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
    if (confirm("Are you sure you want to delete this category? This will affect all posts in this category.")) {
      router.push("/admin/categories");
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <p className="section-label">EDIT CATEGORY</p>
        <h1>{category.name || "New Category"}</h1>
        <p>Edit your category details and settings.</p>
      </div>
      <div className="admin-content">
        <div className="space-y-6">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              value={category.name}
              onChange={(e) => setCategory({ ...category, name: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              placeholder="Category name"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
            <input
              type="text"
              value={category.slug}
              onChange={(e) => setCategory({ ...category, slug: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 font-mono"
              placeholder="category-slug"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={category.description}
              onChange={(e) => setCategory({ ...category, description: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              rows={4}
              placeholder="Category description"
            />
          </div>

          <div className="rounded-md bg-blue-50 border border-blue-200 p-4">
            <h4 className="mb-2 font-semibold text-blue-900">Category Information</h4>
            <p className="text-sm text-blue-800">
              This category is used to organize your posts. Changing the slug will affect URL structures.
              Make sure to update any references if you change the slug.
            </p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <button
              onClick={handleDelete}
              className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
            >
              Delete Category
            </button>
            <div className="flex items-center gap-3">
              {saveStatus === "saved" && (
                <span className="text-sm text-green-600">Category saved successfully!</span>
              )}
              {saveStatus === "error" && (
                <span className="text-sm text-red-600">Error saving category.</span>
              )}
              <button
                onClick={() => router.push("/admin/categories")}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saveStatus === "saving"}
                className="rounded-md bg-red-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
              >
                {saveStatus === "saving" ? "Saving..." : "Save Category"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
