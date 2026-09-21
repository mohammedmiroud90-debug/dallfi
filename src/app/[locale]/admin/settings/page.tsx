"use client";

import { useState } from "react";

type Settings = {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  enableComments: boolean;
  enableRegistration: boolean;
  postsPerPage: number;
  maintenanceMode: boolean;
};

const defaultSettings: Settings = {
  siteName: "Dallfi",
  siteDescription: "Build. Work. Connect. Grow.",
  contactEmail: "mail@dallfi.com",
  contactPhone: "+213 783 217 817",
  enableComments: true,
  enableRegistration: false,
  postsPerPage: 10,
  maintenanceMode: false,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<"general" | "content" | "advanced">("general");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const handleSave = () => {
    setSaveStatus("saving");
    // Simulate API call
    setTimeout(() => {
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    }, 1000);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  return (
    <div className="admin-page">
      <div className="admin-page-title">
        <p className="section-label">SETTINGS</p>
        <h1>Website Settings</h1>
        <p>Control your website preferences and configuration.</p>
      </div>
      <div className="admin-content">
        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="flex gap-6">
            <button
              onClick={() => setActiveTab("general")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "general"
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              General
            </button>
            <button
              onClick={() => setActiveTab("content")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "content"
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Content
            </button>
            <button
              onClick={() => setActiveTab("advanced")}
              className={`pb-3 text-sm font-medium transition-colors ${
                activeTab === "advanced"
                  ? "border-b-2 border-red-600 text-red-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Advanced
            </button>
          </nav>
        </div>

        {/* General Settings */}
        {activeTab === "general" && (
          <div className="space-y-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Site Name</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Site Description</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                rows={3}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Contact Phone</label>
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </div>
        )}

        {/* Content Settings */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Posts Per Page</label>
              <input
                type="number"
                value={settings.postsPerPage}
                onChange={(e) => setSettings({ ...settings, postsPerPage: parseInt(e.target.value) || 10 })}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                min="1"
                max="50"
              />
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="enableComments"
                checked={settings.enableComments}
                onChange={(e) => setSettings({ ...settings, enableComments: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="enableComments" className="text-sm font-medium text-gray-700">
                Enable Comments
              </label>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="enableRegistration"
                checked={settings.enableRegistration}
                onChange={(e) => setSettings({ ...settings, enableRegistration: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="enableRegistration" className="text-sm font-medium text-gray-700">
                Enable User Registration
              </label>
            </div>
          </div>
        )}

        {/* Advanced Settings */}
        {activeTab === "advanced" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="maintenanceMode"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700">
                Maintenance Mode
              </label>
            </div>
            {settings.maintenanceMode && (
              <div className="rounded-md bg-yellow-50 border border-yellow-200 p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Warning:</strong> Maintenance mode will make your website inaccessible to regular users.
                  Only administrators will be able to access the site.
                </p>
              </div>
            )}
            <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
              <h4 className="mb-2 font-semibold text-gray-900">Danger Zone</h4>
              <p className="mb-3 text-sm text-gray-600">
                These actions are irreversible. Please be careful.
              </p>
              <button className="rounded-md border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-100">
                Clear All Cache
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
          <button
            onClick={handleReset}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
          >
            Reset to Defaults
          </button>
          <div className="flex items-center gap-3">
            {saveStatus === "saved" && (
              <span className="text-sm text-green-600">Settings saved successfully!</span>
            )}
            {saveStatus === "error" && (
              <span className="text-sm text-red-600">Error saving settings.</span>
            )}
            <button
              onClick={handleSave}
              disabled={saveStatus === "saving"}
              className="rounded-md bg-red-600 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
            >
              {saveStatus === "saving" ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}