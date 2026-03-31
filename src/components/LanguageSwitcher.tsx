"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale: Locale = locale === "fr" ? "en" : "fr";

  const handleSwitch = () => {
    const newPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={handleSwitch}
      className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium hover:bg-accent-light transition-colors"
      style={{ border: "1px solid var(--sidebar-border)" }}
      title={otherLocale === "en" ? "Switch to English" : "Passer en français"}
    >
      {locale === "fr" ? "🇫🇷 FR" : "🇺🇸 EN"}
      <span className="opacity-50 mx-0.5">/</span>
      <span className="opacity-50">{otherLocale.toUpperCase()}</span>
    </button>
  );
}
