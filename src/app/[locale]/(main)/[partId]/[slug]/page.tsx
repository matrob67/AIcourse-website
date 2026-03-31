import { notFound } from "next/navigation";
import { getLessonBySlug, getAdjacentLessons, getAllLessons } from "@/lib/course-data";
import { getLessonContent } from "@/lib/content";
import { renderMDX } from "@/lib/mdx";
import LessonNav from "@/components/LessonNav";
import AdminImagePanel from "@/components/AdminImagePanel";
import { locales, t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

interface Props {
  params: Promise<{ locale: string; partId: string; slug: string }>;
}

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    getAllLessons(locale).map((l) => ({
      locale,
      partId: l.partId,
      slug: l.slug,
    }))
  );
}

export async function generateMetadata({ params }: Props) {
  const { locale, partId, slug } = await params;
  const loc = locale as Locale;
  const result = getLessonBySlug(partId, slug, loc);
  if (!result) return { title: "Not Found" };
  return {
    title: `${result.lesson.number}. ${result.lesson.title} — AI State of the Art`,
    description: `${t(loc, "nav.section")} ${result.lesson.number} : ${result.lesson.title}`,
  };
}

export default async function LessonPage({ params }: Props) {
  const { locale, partId, slug } = await params;
  const loc = locale as Locale;
  const result = getLessonBySlug(partId, slug, loc);
  if (!result) notFound();

  const { lesson, module, part } = result;
  const { prev, next } = getAdjacentLessons(partId, slug, loc);
  const content = getLessonContent(partId, slug, loc);

  // Render MDX if content exists, with error handling
  let MDXContent: React.ComponentType | null = null;
  let mdxError: string | null = null;
  if (content) {
    try {
      MDXContent = await renderMDX(content.content);
    } catch (e) {
      mdxError = e instanceof Error ? e.message : "MDX render error";
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted mb-6">
        <span>{part.icon} {part.shortTitle}</span>
        <span>/</span>
        <span>{module.title}</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="text-sm text-accent font-medium mb-2">
          {t(loc, "nav.section")} {lesson.number}
        </div>
        <h1 className="text-3xl font-extrabold mb-3">{lesson.title}</h1>

        {/* arxiv & links */}
        {(lesson.arxiv || lesson.links) && (
          <div className="flex flex-wrap gap-3 mt-3">
            {lesson.arxiv?.map((id) => (
              <a
                key={id}
                href={`https://arxiv.org/abs/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent-light text-accent text-xs font-medium hover:underline"
              >
                📄 arxiv:{id}
              </a>
            ))}
            {lesson.links?.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-card-bg border border-card-border text-xs font-medium hover:border-accent hover:text-accent"
              >
                🔗 {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="prose">
        {MDXContent ? (
          <MDXContent />
        ) : mdxError ? (
          <div className="callout callout-warning">
            <p className="font-semibold mb-1">{t(loc, "lesson.renderError")}</p>
            <p className="text-sm">{t(loc, "lesson.renderErrorDesc")}</p>
          </div>
        ) : (
          <div className="callout callout-info">
            <p className="font-semibold mb-1">{t(loc, "lesson.pending")}</p>
            <p className="text-sm">{t(loc, "lesson.pendingDesc")}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <LessonNav prev={prev} next={next} locale={loc} />

      {/* Admin: insert image */}
      <AdminImagePanel partId={partId} slug={slug} />
    </div>
  );
}
