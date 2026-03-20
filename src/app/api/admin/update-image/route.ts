import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
  const { partId, slug, blockIndex, size } = await request.json();
  if (!partId || !slug || blockIndex === undefined || !size)
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const filePath = path.join(process.cwd(), "src", "content", partId, `${slug}.mdx`);
  if (!fs.existsSync(filePath))
    return NextResponse.json({ error: "File not found" }, { status: 404 });

  const raw = fs.readFileSync(filePath, "utf-8");
  let frontmatter = "", content = raw;
  if (raw.startsWith("---")) {
    const end = raw.indexOf("\n---", 3);
    if (end !== -1) { frontmatter = raw.slice(0, end + 4); content = raw.slice(end + 4); }
  }

  content = content.replace(/\r\n/g, "\n");
  const rawBlocks = content.split(/\n{2,}/);
  const nonEmpty = rawBlocks.filter(b => b.trim().length > 0);
  const target = nonEmpty[blockIndex];

  if (!target?.trim().startsWith("<ImageWithSource"))
    return NextResponse.json({ error: "Not an image block" }, { status: 400 });

  const updated = target.replace(/size="[^"]*"/, `size="${size}"`);
  const idx = rawBlocks.indexOf(target);
  if (idx !== -1) rawBlocks[idx] = updated;

  fs.writeFileSync(filePath, frontmatter + rawBlocks.join("\n\n"), "utf-8");
  return NextResponse.json({ success: true });
}
