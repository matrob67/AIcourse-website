import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
  const { url } = await request.json();
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "image/*",
      },
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      return NextResponse.json({ error: `Failed to download: ${res.status}` }, { status: 502 });
    }

    const contentType = res.headers.get("content-type") || "image/png";
    const ext = contentType.includes("jpeg") || contentType.includes("jpg")
      ? "jpg"
      : contentType.includes("gif")
      ? "gif"
      : contentType.includes("webp")
      ? "webp"
      : contentType.includes("svg")
      ? "svg"
      : "png";

    const buffer = Buffer.from(await res.arrayBuffer());

    // Reject if too small (probably an error page) or too large
    if (buffer.length < 1000) {
      return NextResponse.json({ error: "Image too small (probably blocked)" }, { status: 400 });
    }
    if (buffer.length > 10_000_000) {
      return NextResponse.json({ error: "Image too large (>10MB)" }, { status: 400 });
    }

    const filename = `img-${Date.now()}.${ext}`;
    const dir = path.join(process.cwd(), "public", "images", "admin");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    fs.writeFileSync(path.join(dir, filename), buffer);

    return NextResponse.json({
      localUrl: `/images/admin/${filename}`,
      size: buffer.length,
      contentType,
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
