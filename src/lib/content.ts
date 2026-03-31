import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Locale } from "./i18n";

function getContentDir(locale: Locale = "fr"): string {
  const dir = locale === "en" ? "src/content-en" : "src/content";
  return path.join(process.cwd(), dir);
}

export interface LessonContent {
  slug: string;
  frontmatter: {
    title: string;
    description?: string;
    arxiv?: string[];
    links?: { label: string; url: string }[];
    [key: string]: unknown;
  };
  content: string;
}

export function getLessonContent(partId: string, slug: string, locale: Locale = "fr"): LessonContent | null {
  const contentDir = getContentDir(locale);
  const filePath = path.join(contentDir, partId, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as LessonContent["frontmatter"],
    content,
  };
}

export function getAllContentSlugs(locale: Locale = "fr"): { partId: string; slug: string }[] {
  const contentDir = getContentDir(locale);
  const slugs: { partId: string; slug: string }[] = [];

  if (!fs.existsSync(contentDir)) return slugs;

  const partDirs = fs.readdirSync(contentDir);
  for (const partId of partDirs) {
    const partPath = path.join(contentDir, partId);
    if (!fs.statSync(partPath).isDirectory()) continue;

    const files = fs.readdirSync(partPath).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      slugs.push({ partId, slug: file.replace(".mdx", "") });
    }
  }

  return slugs;
}
