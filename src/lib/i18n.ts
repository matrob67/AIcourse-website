export type Locale = "fr" | "en";

export const locales: Locale[] = ["fr", "en"];
export const defaultLocale: Locale = "fr";

const ui: Record<Locale, Record<string, string>> = {
  fr: {
    // Meta
    "meta.title": "AI State of the Art — Cours complet",
    "meta.description":
      "307 sections pour maîtriser l'IA moderne : ML, Deep Learning, LLM, NLP, MLOps, et Mistral AI.",

    // Home
    "home.hero.title": "AI State of the Art",
    "home.hero.description":
      "Un cours complet de <strong>{total} sections</strong> pour maîtriser l'intelligence artificielle moderne, du niveau 0 jusqu'aux techniques les plus avancées.",
    "home.hero.cta": "Commencer le cours →",
    "home.hero.mistral": "🇫🇷 Section Mistral AI",
    "home.sections": "sections",
    "home.modules": "modules",
    "home.explore": "Explorer →",
    "home.feature.papers.title": "Papers arxiv",
    "home.feature.papers.desc":
      "Chaque technique est liée à son paper original avec lien direct vers arxiv.",
    "home.feature.images.title": "Illustrations sourcées",
    "home.feature.images.desc":
      "Diagrammes d'architecture, graphiques de benchmarks et schémas explicatifs avec sources citées.",
    "home.feature.uptodate.title": "Toujours à jour",
    "home.feature.uptodate.desc":
      "L'actu scientifique AI est intégrée directement dans les sections thématiques.",

    // Sidebar
    "sidebar.tagline": "307 sections · Du niveau 0 au SOTA",
    "sidebar.search": "Rechercher…",

    // Search
    "search.placeholder": "Rechercher une section…",
    "search.typeToSearch": "Tapez pour rechercher parmi les",
    "search.sections": "sections",
    "search.ofCourse": "du cours",
    "search.noResults": "Aucun résultat pour",
    "search.navigate": "naviguer",
    "search.open": "ouvrir",
    "search.result": "résultat",
    "search.results": "résultats",

    // Navigation
    "nav.previous": "← Précédent",
    "nav.next": "Suivant →",
    "nav.section": "Section",

    // Lesson page
    "lesson.renderError": "Erreur de rendu du contenu",
    "lesson.renderErrorDesc":
      "Le contenu de cette section contient une erreur de formatage et sera corrigé prochainement.",
    "lesson.pending": "📝 Contenu en cours de rédaction",
    "lesson.pendingDesc":
      "Cette section sera bientôt disponible avec des explications détaillées, des illustrations sourcées et des liens vers les papers de référence.",

    // Mobile
    "mobile.openMenu": "Ouvrir le menu",
    "mobile.closeMenu": "Fermer le menu",
  },
  en: {
    // Meta
    "meta.title": "AI State of the Art — Complete Course",
    "meta.description":
      "307 sections to master modern AI: ML, Deep Learning, LLMs, NLP, MLOps, and Mistral AI.",

    // Home
    "home.hero.title": "AI State of the Art",
    "home.hero.description":
      "A complete course with <strong>{total} sections</strong> to master modern artificial intelligence, from zero to the most advanced techniques.",
    "home.hero.cta": "Start the course →",
    "home.hero.mistral": "🇫🇷 Mistral AI Section",
    "home.sections": "sections",
    "home.modules": "modules",
    "home.explore": "Explore →",
    "home.feature.papers.title": "Arxiv Papers",
    "home.feature.papers.desc":
      "Each technique is linked to its original paper with a direct link to arxiv.",
    "home.feature.images.title": "Sourced Illustrations",
    "home.feature.images.desc":
      "Architecture diagrams, benchmark graphs, and explanatory schemas with cited sources.",
    "home.feature.uptodate.title": "Always Up to Date",
    "home.feature.uptodate.desc":
      "The latest AI research is directly integrated into the thematic sections.",

    // Sidebar
    "sidebar.tagline": "307 sections · From zero to SOTA",
    "sidebar.search": "Search…",

    // Search
    "search.placeholder": "Search a section…",
    "search.typeToSearch": "Type to search among",
    "search.sections": "sections",
    "search.ofCourse": "of the course",
    "search.noResults": "No results for",
    "search.navigate": "navigate",
    "search.open": "open",
    "search.result": "result",
    "search.results": "results",

    // Navigation
    "nav.previous": "← Previous",
    "nav.next": "Next →",
    "nav.section": "Section",

    // Lesson page
    "lesson.renderError": "Content rendering error",
    "lesson.renderErrorDesc":
      "This section contains a formatting error and will be fixed soon.",
    "lesson.pending": "📝 Content in progress",
    "lesson.pendingDesc":
      "This section will soon be available with detailed explanations, sourced illustrations, and links to reference papers.",

    // Mobile
    "mobile.openMenu": "Open menu",
    "mobile.closeMenu": "Close menu",
  },
};

export function t(locale: Locale, key: string): string {
  return ui[locale]?.[key] ?? ui.fr[key] ?? key;
}
