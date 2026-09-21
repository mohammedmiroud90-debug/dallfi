"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M5.2 4.1 19.9 18.8l-2.1 2.1L3.1 6.2z" />
      <path d="m19.9 6.2-2.1-2.1L3.1 18.8l2.1 2.1z" />
    </svg>
  );
}

function IconSearch({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

type SearchResult = {
  id: string;
  title: string;
  type: "post" | "page" | "category";
  url: string;
};

const mockResults: SearchResult[] = [
  { id: "1", title: "Getting Started with Dallfi", type: "post", url: "/blog/getting-started" },
  { id: "2", title: "Latest Release Notes v2.0", type: "post", url: "/blog/release-notes" },
  { id: "3", title: "About Us", type: "page", url: "/about" },
  { id: "4", title: "Contact", type: "page", url: "/contact" },
  { id: "5", title: "Builds", type: "category", url: "/blog?category=builds" },
  { id: "6", title: "Releases", type: "category", url: "/releases" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchModal({ isOpen, onClose }: Props) {
  const t = useTranslations("Nav");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = mockResults.filter(
        (result) =>
          result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          result.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  const handleResultClick = (url: string) => {
    router.push(url);
    onClose();
    setSearchQuery("");
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "post":
        return "bg-blue-100 text-blue-800";
      case "page":
        return "bg-green-100 text-green-800";
      case "category":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20">
      {/* Grey transparent overlay */}
      <div
        className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search modal */}
      <div className="relative w-full max-w-2xl mx-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200">
            <IconSearch className="h-5 w-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="flex-1 text-lg text-gray-900 placeholder-gray-400 outline-none"
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  onClose();
                }
              }}
            />
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={t("searchClose")}
            >
              <IconClose className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          {/* Search results */}
          <div className="max-h-96 overflow-y-auto">
            {searchQuery.trim() === "" ? (
              <div className="px-6 py-8 text-center text-gray-500">
                <p className="text-sm">{t("search")}</p>
              </div>
            ) : results.length === 0 ? (
              <div className="px-6 py-8 text-center text-gray-500">
                <p className="text-sm">No results found for "{searchQuery}"</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result.url)}
                    className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {result.title}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 capitalize">{result.type}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getTypeColor(result.type)}`}>
                        {result.type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-700 font-mono">ESC</kbd>
                  to close
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-700 font-mono">↑↓</kbd>
                  to navigate
                </span>
              </div>
              <span>{results.length} results</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
