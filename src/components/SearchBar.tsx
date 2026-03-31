"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getCourseParts } from "@/lib/course-data";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface SearchResult {
  lessonId: string;
  lessonNumber: number;
  lessonTitle: string;
  moduleTitle: string;
  partTitle: string;
  partId: string;
  slug: string;
  href: string;
  keywords: string;
}

interface SearchBarProps {
  open: boolean;
  onClose: () => void;
  locale: Locale;
}

function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function SearchBar({ open, onClose, locale }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();

  // Build search index per locale
  const searchIndex = useMemo(() => {
    const index: SearchResult[] = [];
    const parts = getCourseParts(locale);
    for (const part of parts) {
      for (const mod of part.modules) {
        for (const lesson of mod.lessons) {
          index.push({
            lessonId: lesson.id,
            lessonNumber: lesson.number,
            lessonTitle: lesson.title,
            moduleTitle: mod.title,
            partTitle: part.shortTitle,
            partId: part.id,
            slug: lesson.slug,
            href: `/${locale}/${part.id}/${lesson.slug}`,
            keywords: (lesson.keywords ?? []).join(" "),
          });
        }
      }
    }
    return index;
  }, [locale]);

  const search = useCallback(
    (q: string): SearchResult[] => {
      if (!q.trim()) return [];
      const terms = normalize(q)
        .split(/\s+/)
        .filter((term) => term.length > 0);
      return searchIndex.filter((item) => {
        const haystack = normalize(
          `${item.lessonTitle} ${item.moduleTitle} ${item.partTitle} ${item.keywords}`
        );
        return terms.every((term) => haystack.includes(term));
      });
    },
    [searchIndex]
  );

  // Focus input when opened; reset when closed
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      setQuery("");
      setResults([]);
      setActiveIndex(0);
    }
  }, [open]);

  // Update results on query change
  useEffect(() => {
    const res = search(query);
    setResults(res);
    setActiveIndex(0);
  }, [query, search]);

  // Scroll active item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector<HTMLLIElement>(
        `[data-index="${activeIndex}"]`
      );
      activeEl?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      onClose();
    },
    [router, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      if (results[activeIndex]) {
        navigate(results[activeIndex].href);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(2px)" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-xl mx-4 rounded-xl shadow-2xl overflow-hidden"
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--sidebar-border)",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{ borderBottom: "1px solid var(--sidebar-border)" }}
        >
          <svg
            className="w-4 h-4 flex-shrink-0"
            style={{ color: "var(--muted)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder={t(locale, "search.placeholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: "var(--foreground)" }}
            autoComplete="off"
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs px-1.5 py-0.5 rounded transition-colors hover:bg-accent-light"
              style={{ color: "var(--muted)" }}
              tabIndex={-1}
            >
              ✕
            </button>
          )}
          <kbd
            className="hidden sm:flex items-center text-xs px-1.5 py-0.5 rounded"
            style={{
              background: "var(--code-bg)",
              color: "var(--muted)",
              border: "1px solid var(--sidebar-border)",
              fontFamily: "var(--font-mono)",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() === "" ? (
            <div
              className="px-4 py-6 text-sm text-center"
              style={{ color: "var(--muted)" }}
            >
              {t(locale, "search.typeToSearch")}{" "}
              <span style={{ color: "var(--accent)" }}>
                {searchIndex.length} {t(locale, "search.sections")}
              </span>{" "}
              {t(locale, "search.ofCourse")}
            </div>
          ) : results.length === 0 ? (
            <div
              className="px-4 py-6 text-sm text-center"
              style={{ color: "var(--muted)" }}
            >
              {t(locale, "search.noResults")}{" "}
              <span style={{ color: "var(--foreground)" }}>
                &ldquo;{query}&rdquo;
              </span>
            </div>
          ) : (
            <ul ref={listRef} role="listbox">
              {results.map((item, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <li
                    key={item.lessonId}
                    data-index={idx}
                    role="option"
                    aria-selected={isActive}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => navigate(item.href)}
                    className="flex items-start gap-3 px-4 py-2.5 cursor-pointer transition-colors"
                    style={{
                      background: isActive
                        ? "var(--accent-light)"
                        : "transparent",
                    }}
                  >
                    <span
                      className="flex-shrink-0 mt-0.5 text-xs font-mono w-7 text-right"
                      style={{ color: "var(--accent)" }}
                    >
                      {item.lessonNumber}.
                    </span>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-sm font-medium truncate"
                        style={{ color: "var(--foreground)" }}
                      >
                        {item.lessonTitle}
                      </div>
                      <div
                        className="text-xs truncate mt-0.5"
                        style={{ color: "var(--muted)" }}
                      >
                        {item.partTitle}
                        <span className="mx-1">·</span>
                        {item.moduleTitle}
                      </div>
                    </div>
                    {isActive && (
                      <svg
                        className="flex-shrink-0 mt-1 w-3.5 h-3.5"
                        style={{ color: "var(--accent)" }}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer hint */}
        {results.length > 0 && (
          <div
            className="flex items-center gap-3 px-4 py-2 text-xs"
            style={{
              borderTop: "1px solid var(--sidebar-border)",
              color: "var(--muted)",
            }}
          >
            <span>
              <kbd
                className="px-1 py-0.5 rounded mr-1"
                style={{
                  background: "var(--code-bg)",
                  border: "1px solid var(--sidebar-border)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                ↑↓
              </kbd>
              {t(locale, "search.navigate")}
            </span>
            <span>
              <kbd
                className="px-1 py-0.5 rounded mr-1"
                style={{
                  background: "var(--code-bg)",
                  border: "1px solid var(--sidebar-border)",
                  fontFamily: "var(--font-mono)",
                }}
              >
                ↵
              </kbd>
              {t(locale, "search.open")}
            </span>
            <span className="ml-auto">
              {results.length} {results.length > 1 ? t(locale, "search.results") : t(locale, "search.result")}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
