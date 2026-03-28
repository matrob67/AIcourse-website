"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { courseParts } from "@/lib/course-data";
import SearchBar from "@/components/SearchBar";

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const [openParts, setOpenParts] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const part of courseParts) {
      if (pathname.startsWith(`/${part.id}`)) {
        initial[part.id] = true;
      }
    }
    return initial;
  });
  const [openModules, setOpenModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    for (const part of courseParts) {
      for (const mod of part.modules) {
        for (const lesson of mod.lessons) {
          if (pathname === `/${part.id}/${lesson.slug}`) {
            initial[mod.id] = true;
            break;
          }
        }
      }
    }
    return initial;
  });

  const togglePart = (id: string) => {
    setOpenParts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleModule = (id: string) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
    <aside className="w-72 min-w-72 h-screen bg-sidebar-bg border-r border-sidebar-border flex flex-col overflow-hidden">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold" onClick={onNavigate}>
          <span className="text-2xl">🧠</span>
          <span>AI State of the Art</span>
        </Link>
        <p className="text-xs text-muted mt-1">307 sections &middot; Du niveau 0 au SOTA</p>
      </div>

      {/* Search trigger */}
      <div className="px-3 py-2 border-b border-sidebar-border">
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted hover:bg-accent-light hover:text-foreground transition-colors"
          style={{ border: "1px solid var(--sidebar-border)", background: "var(--code-bg)" }}
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <span className="flex-1 text-left">Rechercher…</span>
          <kbd className="text-xs px-1 py-0.5 rounded hidden sm:inline-block" style={{ background: "var(--sidebar-bg)", border: "1px solid var(--sidebar-border)", fontFamily: "var(--font-mono)" }}>
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto sidebar-scroll p-2">
        {courseParts.map((part) => (
          <div key={part.id} className="mb-1">
            {/* Part header */}
            <button
              onClick={() => togglePart(part.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-accent-light transition-colors ${
                pathname.startsWith(`/${part.id}`) ? "bg-accent-light text-accent" : ""
              }`}
            >
              <span>{part.icon}</span>
              <span className="flex-1 text-left">{part.shortTitle}</span>
              <svg
                className={`w-4 h-4 transition-transform ${openParts[part.id] ? "rotate-90" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Modules */}
            {openParts[part.id] && (
              <div className="ml-2">
                {part.modules.map((mod) => (
                  <div key={mod.id} className="mb-0.5">
                    <button
                      onClick={() => toggleModule(mod.id)}
                      className="w-full flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-muted hover:text-foreground hover:bg-accent-light/50 transition-colors"
                    >
                      <svg
                        className={`w-3 h-3 transition-transform flex-shrink-0 ${openModules[mod.id] ? "rotate-90" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      <span className="text-left">{mod.title}</span>
                    </button>

                    {/* Lessons */}
                    {openModules[mod.id] && (
                      <div className="ml-3 border-l border-sidebar-border">
                        {mod.lessons.map((lesson) => {
                          const href = `/${part.id}/${lesson.slug}`;
                          const isActive = pathname === href;
                          return (
                            <Link
                              key={lesson.id}
                              href={href}
                              onClick={onNavigate}
                              className={`block px-3 py-1 text-xs rounded-r transition-colors ${
                                isActive
                                  ? "bg-accent-light text-accent font-medium border-l-2 border-accent -ml-px"
                                  : "text-muted hover:text-foreground hover:bg-accent-light/30"
                              }`}
                            >
                              <span className="opacity-50 mr-1">{lesson.number}.</span>
                              {lesson.title}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
    </>
  );
}
