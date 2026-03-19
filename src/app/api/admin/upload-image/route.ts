import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Determine extension from mime type
  const ext = file.type === "image/png" ? "png"
    : file.type === "image/jpeg" ? "jpg"
    : file.type === "image/gif" ? "gif"
    : file.type === "image/webp" ? "webp"
    : "png";

  const filename = `img-${Date.now()}.${ext}`;
  const uploadDir = path.join(process.cwd(), "public", "images", "admin");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, filename);
  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({ url: `/images/admin/${filename}` });
}
