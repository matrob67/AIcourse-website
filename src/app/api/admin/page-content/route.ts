import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const partId = searchParams.get("partId");
  const slug = searchParams.get("slug");

  if (!partId || !slug) {
    return NextResponse.json({ error: "Missing partId or slug" }, { status: 400 });
  }

  const contentDir = path.join(process.cwd(), "src", "content", partId);
  const filePath = path.join(contentDir, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  // Strip frontmatter
  let content = raw;
  if (raw.startsWith("---")) {
    const end = raw.indexOf("\n---", 3);
    if (end !== -1) {
      content = raw.slice(end + 4).trimStart();
    }
  }

  // Split into blocks (paragraphs) by double newlines
  const rawBlocks = content.split(/\n{2,}/);
  const blocks = rawBlocks.map((b, i) => ({
    index: i,
    text: b.trim(),
  })).filter(b => b.text.length > 0);

  return NextResponse.json({ raw, blocks });
}
