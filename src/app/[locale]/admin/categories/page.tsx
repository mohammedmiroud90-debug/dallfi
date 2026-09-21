"use client";

import { useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
};

const mockCategories: Category[] = [
  { id: "1", name: "Builds", slug: "builds", description: "Project builds and tutorials", postCount: 12 },
  { id: "2", name: "Releases", slug: "releases", description: "Software releases and updates", postCount: 8 },
  { id: "3", name: "News", slug: "news", description: "Company news and announcements", postCount: 5 },
  { id: "4", name: "Tutorials", slug: "tutorials", description: "Step-by-step guides", postCount: 15 },
  { id: "5", name: "Updates", slug: "updates", description: "Product updates and features", postCount: 3 },
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", slug: "", description: "" });

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.slug) {
      const category: Category = {
        id: String(categories.length + 1),
        name: newCategory.name,
        slug: newCategory.slug,
        description: newCategory.description,
        postCount: 0,
      };
      setCategories([...categories, category]);
      setNewCategory({ name: "", slug: "", description: "" });
      setIsAddingCategory(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <p className="section-label">CATEGORIES</p>
        <h1>Manage Categories</h1>
        <p>Organize and manage content categories for your posts.</p>
      </div>
      <div className="admin-content">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
          />
          <button
            onClick={() => setIsAddingCategory(true)}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
          >
            + New Category
          </button>
        </div>

        {isAddingCategory && (
          <div className="mb-6 rounded-md border border-gray-200 bg-gray-50 p-4">
            <h3 className="mb-4 font-semibold text-gray-900">Add New Category</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Category name"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Slug</label>
                <input
                  type="text"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="category-slug"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  placeholder="Category description"
                  rows={2}
                />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleAddCategory}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
              >
                Add Category
              </button>
              <button
                onClick={() => {
                  setIsAddingCategory(false);
                  setNewCategory({ name: "", slug: "", description: "" });
                }}
                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Slug
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Posts
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-medium text-gray-900">{category.name}</td>
                  <td className="px-4 py-4 text-sm text-gray-600 font-mono">{category.slug}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{category.description}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{category.postCount}</td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="rounded bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-100">
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
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

        {filteredCategories.length === 0 && (
          <div className="py-8 text-center text-gray-500">
            No categories found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}