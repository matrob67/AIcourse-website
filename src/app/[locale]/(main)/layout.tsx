"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

function getLocaleFromPathname(pathname: string): Locale {
  if (pathname.startsWith("/en/") || pathname === "/en") return "en";
  return "fr";
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:block sticky top-0 h-screen shrink-0">
        <Sidebar locale={locale} />
      </div>

      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center gap-3 px-4 py-3 border-b bg-sidebar-bg border-sidebar-border">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-1.5 rounded-lg hover:bg-accent-light transition-colors"
          aria-label={t(locale, "mobile.openMenu")}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-lg font-bold">🧠 AI State of the Art</span>
      </div>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative h-full w-80 max-w-[85vw] shadow-2xl animate-slide-in">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-3 right-3 z-10 p-1.5 rounded-lg hover:bg-accent-light transition-colors"
              aria-label={t(locale, "mobile.closeMenu")}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Sidebar locale={locale} onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <main className="flex-1 min-w-0 pt-14 lg:pt-0">{children}</main>
    </div>
  );
}
