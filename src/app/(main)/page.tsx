import Link from "next/link";
import { courseParts, getTotalLessons } from "@/lib/course-data";

export default function Home() {
  const total = getTotalLessons();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
      {/* Hero */}
      <div className="mb-16">
        <h1 className="text-4xl font-extrabold mb-4">
          🧠 AI State of the Art
        </h1>
        <p className="text-xl text-muted mb-6 max-w-2xl">
          Un cours complet de <strong>{total} sections</strong> pour maîtriser
          l&apos;intelligence artificielle moderne, du niveau 0 jusqu&apos;aux
          techniques les plus avancées.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/fondamentaux/ml-overview"
            className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
          >
            Commencer le cours →
          </Link>
          <Link
            href="/mistral/mistral-history"
            className="px-6 py-3 border border-card-border rounded-lg font-medium hover:bg-accent-light transition-colors"
          >
            🇫🇷 Section Mistral AI
          </Link>
        </div>
      </div>

      {/* Parts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {courseParts.map((part) => {
          const lessonCount = part.modules.reduce(
            (acc, m) => acc + m.lessons.length,
            0
          );
          const firstLesson = part.modules[0]?.lessons[0];
          return (
            <Link
              key={part.id}
              href={firstLesson ? `/${part.id}/${firstLesson.slug}` : "#"}
              className="group p-6 rounded-xl border border-card-border bg-card-bg hover:border-accent hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">{part.icon}</div>
              <h2 className="text-lg font-bold mb-1 group-hover:text-accent transition-colors">
                {part.title}
              </h2>
              <p className="text-sm text-muted mb-3">{part.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted">
                  {lessonCount} sections &middot; {part.modules.length} modules
                </span>
                <span className="text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Explorer →
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
          <h3 className="font-semibold mb-1">Papers arxiv</h3>
          <p className="text-sm text-muted">
            Chaque technique est liée à son paper original avec lien direct vers
            arxiv.
          </p>
        </div>
        <div className="p-5 rounded-lg bg-card-bg border border-card-border">
          <div className="text-2xl mb-2">🖼️</div>
          <h3 className="font-semibold mb-1">Illustrations sourcées</h3>
          <p className="text-sm text-muted">
            Diagrammes d&apos;architecture, graphiques de benchmarks et schémas
            explicatifs avec sources citées.
          </p>
        </div>
        <div className="p-5 rounded-lg bg-card-bg border border-card-border">
          <div className="text-2xl mb-2">🔬</div>
          <h3 className="font-semibold mb-1">Toujours à jour</h3>
          <p className="text-sm text-muted">
            L&apos;actu scientifique AI est intégrée directement dans les
            sections thématiques.
          </p>
        </div>
      </div>
    </div>
  );
}
