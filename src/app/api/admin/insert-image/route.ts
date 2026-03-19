import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { partId, slug, afterBlockIndex, src, alt, source, sourceUrl, caption, size } = body;

  if (!partId || !slug || afterBlockIndex === undefined || !src) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "src", "content", partId, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  // Strip frontmatter to find content start
  let frontmatter = "";
  let content = raw;
  if (raw.startsWith("---")) {
    const end = raw.indexOf("\n---", 3);
    if (end !== -1) {
      frontmatter = raw.slice(0, end + 4);
      content = raw.slice(end + 4);
    }
  }

  // Split content by double newlines
  const rawBlocks = content.split(/\n{2,}/);
  const nonEmptyIndices: number[] = [];
  rawBlocks.forEach((b, i) => {
    if (b.trim().length > 0) nonEmptyIndices.push(i);
  });

  // Find the raw block index corresponding to afterBlockIndex (among non-empty blocks)
  const targetRawIndex = nonEmptyIndices[afterBlockIndex] ?? nonEmptyIndices[nonEmptyIndices.length - 1];

  // Build the ImageWithSource component string
  const safeAlt = alt ? alt.replace(/"/g, "'") : "";
  const safeCaption = caption ? caption.replace(/"/g, "'") : "";
  const safeSource = source ? source.replace(/"/g, "'") : "";
  const safeSourceUrl = sourceUrl ? sourceUrl.replace(/"/g, "'") : "";
  const imageComponent = [
    `<ImageWithSource`,
    `  src="${src}"`,
    safeAlt ? `  alt="${safeAlt}"` : null,
    safeSource ? `  source="${safeSource}"` : null,
    safeSourceUrl ? `  sourceUrl="${safeSourceUrl}"` : null,
    safeCaption ? `  caption="${safeCaption}"` : null,
    `  size="${size || "large"}"`,
    `/>`,
  ].filter(Boolean).join("\n");

  // Insert after the target block
  rawBlocks.splice(targetRawIndex + 1, 0, imageComponent);

  const newContent = rawBlocks.join("\n\n");
  const newFile = frontmatter + newContent;

  fs.writeFileSync(filePath, newFile, "utf-8");

  return NextResponse.json({ success: true });
}
