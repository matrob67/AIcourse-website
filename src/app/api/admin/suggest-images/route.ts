import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
  const { partId, slug } = await request.json();
  if (!partId || !slug) return NextResponse.json({ error: "Missing partId/slug" }, { status: 400 });

  // 1. Read the MDX content
  const filePath = path.join(process.cwd(), "src", "content", partId, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
  const raw = fs.readFileSync(filePath, "utf-8");

  // Strip frontmatter
  const content = raw.replace(/^---[\s\S]*?---\s*/, "").slice(0, 2000);

  // 2. Ask Mistral to generate search queries
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    // Fallback: generate queries from title and headings
    const title = raw.match(/title:\s*"([^"]+)"/)?.[1] || slug;
    const headings = [...content.matchAll(/^##\s+(.+)/gm)].map(m => m[1]).slice(0, 3);
    const queries = [
      `${title} diagram`,
      `${title} architecture`,
      ...headings.map(h => `${h} illustration`),
    ].slice(0, 4);
    return NextResponse.json({ queries });
  }

  const title = raw.match(/title:\s*"([^"]+)"/)?.[1] || slug;

  // Parse blocks for position suggestion
  const lines = content.split("\n");
  const blockPositions: { heading: string; lineIndex: number; blockIndex: number }[] = [];
  let blockIdx = 0;
  for (let li = 0; li < lines.length; li++) {
    const line = lines[li].trim();
    if (line.startsWith("## ") || line.startsWith("### ")) {
      blockPositions.push({ heading: line.replace(/^#+\s*/, ""), lineIndex: li, blockIndex: blockIdx });
    }
    if (line.length > 0) blockIdx++;
  }

  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistral-small-latest",
      messages: [
        {
          role: "system",
          content: `Tu generes des requetes de recherche d'images pour un cours d'IA. Reponds UNIQUEMENT avec un JSON array d'objets {"query": "...", "afterHeading": "..."}. "query" est une requete de recherche Google Images en anglais. "afterHeading" est le titre de section (## ou ###) apres lequel l'image devrait etre inseree. Privilegia les diagrammes techniques et figures de papers.`,
        },
        {
          role: "user",
          content: `Page: "${title}" (section ${partId}/${slug})

Sections de la page:
${blockPositions.map(b => `- ${b.heading}`).join("\n")}

Contenu (extrait):
${content.slice(0, 1500)}

Genere 4-5 requetes avec placement. Reponds UNIQUEMENT avec le JSON array, sans markdown.`,
        },
      ],
      max_tokens: 400,
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    // Fallback
    return NextResponse.json({
      queries: [`${title} diagram`, `${title} architecture neural network`],
    });
  }

  const data = await res.json();
  const rawText = data.choices?.[0]?.message?.content || "[]";

  let queries: string[] = [];
  let suggestedBlocks: Record<string, number> = {};
  try {
    const cleaned = rawText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsed = JSON.parse(cleaned);
    if (Array.isArray(parsed) && typeof parsed[0] === "object") {
      // New format: [{query, afterHeading}]
      queries = parsed.map((p: { query: string }) => p.query);
      for (const item of parsed) {
        if (item.afterHeading) {
          const match = blockPositions.find(b =>
            b.heading.toLowerCase().includes(item.afterHeading.toLowerCase()) ||
            item.afterHeading.toLowerCase().includes(b.heading.toLowerCase())
          );
          if (match) suggestedBlocks[item.query] = match.blockIndex;
        }
      }
    } else {
      // Old format: ["query1", "query2"]
      queries = parsed;
    }
  } catch {
    queries = [`${title} diagram`, `${title} architecture`];
  }

  // 3. Search images for each query
  const allResults: { query: string; images: unknown[] }[] = [];

  for (const query of queries.slice(0, 5)) {
    try {
      // Get vqd token from DuckDuckGo
      const tokenRes = await fetch(
        `https://duckduckgo.com/?q=${encodeURIComponent(query)}&t=h_&iax=images&ia=images`,
        { headers: { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" } }
      );
      const tokenHtml = await tokenRes.text();
      const vqd = tokenHtml.match(/vqd=["']([^"']+)/)?.[1] || tokenHtml.match(/vqd=([\d-]+)/)?.[1] || "";

      if (!vqd) continue;

      const imageRes = await fetch(
        `https://duckduckgo.com/i.js?l=us-en&o=json&q=${encodeURIComponent(query)}&vqd=${vqd}&f=,,,,,&p=1`,
        {
          headers: {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
            Referer: "https://duckduckgo.com/",
          },
        }
      );

      if (!imageRes.ok) continue;

      const imgData = await imageRes.json();
      const results = (imgData.results || []).slice(0, 6).map(
        (r: { image: string; thumbnail: string; title: string; source: string; url: string; width: number; height: number }) => ({
          url: r.image,
          thumb: r.thumbnail,
          title: r.title || "",
          source: r.source || "",
          sourceUrl: r.url || "",
          width: r.width || 0,
          height: r.height || 0,
        })
      );

      allResults.push({ query, images: results });
    } catch {
      // Skip failed queries
    }
  }

  // Add suggested block index to each result group
  const resultsWithBlocks = allResults.map(r => ({
    ...r,
    suggestedBlockIndex: suggestedBlocks[r.query] ?? null,
  }));

  return NextResponse.json({ queries, results: resultsWithBlocks, total: allResults.reduce((n, r) => n + r.images.length, 0) });
}
