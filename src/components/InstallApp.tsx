"use client";

import { useEffect, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallApp() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ai-course-install-dismissed")) {
      setDismissed(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setDismissed(true);
    }
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
      setDismissed(true);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem("ai-course-install-dismissed", "1");
  };

  if (dismissed || !deferredPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[80] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-gray-900/95 backdrop-blur-xl border border-indigo-500/20 rounded-xl p-4 shadow-2xl max-w-[280px]">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">🧠</span>
            <p className="text-sm font-medium text-white">
              Installer AI Course
            </p>
          </div>
          <button
            onClick={handleDismiss}
            className="text-white/30 hover:text-white/60 text-lg leading-none transition-colors"
          >
            &times;
          </button>
        </div>
        <p className="text-[11px] text-white/50 mb-3">
          Accède au cours directement depuis ton écran d&apos;accueil, comme une
          vraie app.
        </p>
        <button
          onClick={handleInstall}
          className="w-full py-2 px-3 bg-indigo-500 text-white text-xs font-medium rounded-lg hover:bg-indigo-400 transition-colors cursor-pointer"
        >
          Installer
        </button>
      </div>
    </div>
  );
}
