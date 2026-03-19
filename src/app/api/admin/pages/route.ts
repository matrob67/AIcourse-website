import { NextResponse } from "next/server";
import { courseParts } from "@/lib/course-data";

export async function GET() {
  const pages: { partId: string; slug: string; title: string; number: number }[] = [];

  for (const part of courseParts) {
    for (const mod of part.modules) {
      for (const lesson of mod.lessons) {
        pages.push({
          partId: part.id,
          slug: lesson.slug,
          title: lesson.title,
          number: lesson.number,
        });
      }
    }
  }

  return NextResponse.json(pages);
}
