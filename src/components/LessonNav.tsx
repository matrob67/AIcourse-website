"use client";

import Link from "next/link";

interface NavLesson {
  number: number;
  title: string;
  slug: string;
  partId: string;
}

export default function LessonNav({
  prev,
  next,
}: {
  prev: NavLesson | null;
  next: NavLesson | null;
}) {
  return (
    <div className="flex justify-between items-stretch gap-4 mt-12 pt-8 border-t border-card-border">
      {prev ? (
        <Link
          href={`/${prev.partId}/${prev.slug}`}
          className="flex-1 group p-4 rounded-lg border border-card-border hover:border-accent hover:bg-accent-light transition-colors"
        >
          <div className="text-xs text-muted mb-1">← Précédent</div>
          <div className="text-sm font-medium group-hover:text-accent">
            {prev.number}. {prev.title}
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <Link
          href={`/${next.partId}/${next.slug}`}
          className="flex-1 group p-4 rounded-lg border border-card-border hover:border-accent hover:bg-accent-light transition-colors text-right"
        >
          <div className="text-xs text-muted mb-1">Suivant →</div>
          <div className="text-sm font-medium group-hover:text-accent">
            {next.number}. {next.title}
          </div>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
