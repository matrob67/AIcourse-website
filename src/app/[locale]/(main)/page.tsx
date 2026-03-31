import Link from "next/link";
import { getCourseParts, getTotalLessons } from "@/lib/course-data";
import { locales, t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  const loc = locale as Locale;
  const parts = getCourseParts(loc);
  const total = getTotalLessons(loc);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      {/* Hero */}
      <div className="mb-16">
        <h1 className="text-4xl font-extrabold mb-4">
          🧠 {t(loc, "home.hero.title")}
        </h1>
        <p
          className="text-xl text-muted mb-6 max-w-2xl"
          dangerouslySetInnerHTML={{
            __html: t(loc, "home.hero.description").replace("{total}", String(total)),
          }}
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={`/${loc}/fondamentaux/ml-overview`}
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            {t(loc, "home.hero.cta")}
          </Link>
          <Link
            href={`/${loc}/mistral/mistral-history`}
            className="px-6 py-3 border border-card-border rounded-lg font-medium hover:bg-accent-light transition-colors"
          >
            {t(loc, "home.hero.mistral")}
          </Link>
        </div>
      </div>

      {/* Parts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {parts.map((part) => {
          const lessonCount = part.modules.reduce(
            (acc, m) => acc + m.lessons.length,
            0
          );
          const firstLesson = part.modules[0]?.lessons[0];
          return (
            <Link
              key={part.id}
              href={firstLesson ? `/${loc}/${part.id}/${firstLesson.slug}` : "#"}
              className="group p-6 rounded-xl border border-card-border bg-card-bg hover:border-accent hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">{part.icon}</div>
              <h2 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">
                {part.title}
              </h2>
              <p className="text-sm text-muted mb-3">{part.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">
                  {lessonCount} {t(loc, "home.sections")} &middot; {part.modules.length} {t(loc, "home.modules")}
                </span>
                <span className="text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {t(loc, "home.explore")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Key features */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-lg bg-card-bg border border-card-border">
          <div className="text-2xl mb-2">📄</div>
          <h3 className="font-semibold mb-1">{t(loc, "home.feature.papers.title")}</h3>
          <p className="text-sm text-muted">{t(loc, "home.feature.papers.desc")}</p>
        </div>
        <div className="p-5 rounded-lg bg-card-bg border border-card-border">
          <div className="text-2xl mb-2">🖼️</div>
          <h3 className="font-semibold mb-1">{t(loc, "home.feature.images.title")}</h3>
          <p className="text-sm text-muted">{t(loc, "home.feature.images.desc")}</p>
        </div>
        <div className="p-5 rounded-lg bg-card-bg border border-card-border">
          <div className="text-2xl mb-2">🔬</div>
          <h3 className="font-semibold mb-1">{t(loc, "home.feature.uptodate.title")}</h3>
          <p className="text-sm text-muted">{t(loc, "home.feature.uptodate.desc")}</p>
        </div>
      </div>
    </div>
  );
}
