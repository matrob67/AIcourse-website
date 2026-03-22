import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

async function tryDownload(url: string, referer?: string): Promise<Response | null> {
  const headers: Record<string, string> = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
    "Sec-Fetch-Dest": "image",
    "Sec-Fetch-Mode": "no-cors",
    "Sec-Fetch-Site": "cross-site",
  };
  if (referer) headers["Referer"] = referer;

  try {
    const res = await fetch(url, { headers, signal: AbortSignal.timeout(15000), redirect: "follow" });
    if (res.ok) return res;
  } catch { /* try next */ }
  return null;
}

export async function POST(request: NextRequest) {
  const { url } = await request.json();
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  try {
    const origin = new URL(url).origin;

    // Try multiple strategies
    const res =
      (await tryDownload(url, origin + "/")) ||
      (await tryDownload(url, "https://www.google.com/")) ||
      (await tryDownload(url));

    if (!res) {
      return NextResponse.json({ error: "Impossible de telecharger (bloque par le site)" }, { status: 502 });
    }

    const contentType = res.headers.get("content-type") || "image/png";
    const ext = contentType.includes("jpeg") || contentType.includes("jpg") ? "jpg"
      : contentType.includes("gif") ? "gif"
      : contentType.includes("webp") ? "webp"
      : contentType.includes("svg") ? "svg"
      : "png";

    const buffer = Buffer.from(await res.arrayBuffer());

    if (buffer.length < 500) {
      return NextResponse.json({ error: "Image trop petite (probablement bloquee)" }, { status: 400 });
    }
    if (buffer.length > 10_000_000) {
      return NextResponse.json({ error: "Image trop grande (>10MB)" }, { status: 400 });
    }

    const filename = `img-${Date.now()}.${ext}`;
    const dir = path.join(process.cwd(), "public", "images", "admin");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, filename), buffer);

    return NextResponse.json({ localUrl: `/images/admin/${filename}`, size: buffer.length, contentType });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Erreur inconnue";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
