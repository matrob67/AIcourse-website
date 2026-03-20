import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { partId, slug, blockIndex, size } = body;

  if (!partId || !slug || blockIndex === undefined || !size) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), "src", "content", partId, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const raw = fs.readFileSync(filePath, "utf-8");

  // Strip frontmatter
  let frontmatter = "";
  let content = raw;
  if (raw.startsWith("---")) {
    const end = raw.indexOf("\n---", 3);
    if (end !== -1) {
      frontmatter = raw.slice(0, end + 4);
      content = raw.slice(end + 4);
    }
  }

  // Normalize line endings and split
  content = content.replace(/\r\n/g, "\n");
  const rawBlocks = content.split(/\n{2,}/);
  const nonEmptyIndices: number[] = [];
  rawBlocks.forEach((b, i) => {
    if (b.trim().length > 0) nonEmptyIndices.push(i);
  });

  const targetRawIndex = nonEmptyIndices[blockIndex];
  if (targetRawIndex === undefined) {
    return NextResponse.json({ error: "Block not found" }, { status: 404 });
  }

  const blockText = rawBlocks[targetRawIndex].trim();
  if (!blockText.startsWith("<ImageWithSource")) {
    return NextResponse.json({ error: "Block is not an image" }, { status: 400 });
  }

  // Replace or add size attribute
  let updated = blockText;
  if (/size="[^"]*"/.test(updated)) {
    updated = updated.replace(/size="[^"]*"/, `size="${size}"`);
  } else {
    // Add size before />
    updated = updated.replace(/\/>/, `  size="${size}"\n/>`);
  }

  rawBlocks[targetRawIndex] = updated;

  const newContent = rawBlocks.join("\n\n");
  const newFile = frontmatter + newContent;

  fs.writeFileSync(filePath, newFile, "utf-8");

  return NextResponse.json({ success: true });
}
