import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { query } = await request.json();
  if (!query) return NextResponse.json({ error: "Missing query" }, { status: 400 });

  // Use DuckDuckGo image search — no JS required, no API key needed
  // Step 1: Get the vqd token
  const tokenRes = await fetch(`https://duckduckgo.com/?q=${encodeURIComponent(query)}&t=h_&iax=images&ia=images`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    },
  });
  const tokenHtml = await tokenRes.text();
  const vqdMatch = tokenHtml.match(/vqd=["']([^"']+)/);
  if (!vqdMatch) {
    // Fallback: try to extract vqd from a different pattern
    const vqd2 = tokenHtml.match(/vqd=([\d-]+)/);
    if (!vqd2) {
      return NextResponse.json({ images: [], total: 0, debug: "No vqd token found" });
    }
  }
  const vqd = vqdMatch?.[1] || tokenHtml.match(/vqd=([\d-]+)/)?.[1] || "";

  // Step 2: Fetch image results using the API endpoint
  const imageRes = await fetch(
    `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}&f=,,,,,&p=1`,
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://duckduckgo.com/",
      },
    }
  );

  if (!imageRes.ok) {
    return NextResponse.json({ images: [], total: 0, debug: `DDG returned ${imageRes.status}` });
  }

  const data = await imageRes.json();
  const results = (data.results || []).slice(0, 20);

  const images = results.map((r: { image: string; thumbnail: string; title: string; source: string; url: string; width: number; height: number }) => ({
    url: r.image,
    thumb: r.thumbnail,
    title: r.title || "",
    source: r.source || new URL(r.url || r.image).hostname,
    sourceUrl: r.url || "",
    width: r.width || 0,
    height: r.height || 0,
  }));

  return NextResponse.json({ images, total: images.length });
}
