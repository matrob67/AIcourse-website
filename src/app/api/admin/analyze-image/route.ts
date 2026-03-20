import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function POST(request: NextRequest) {
  const { src, partId, slug, contextText, model } = await request.json();

  if (!src) return NextResponse.json({ error: "Missing src" }, { status: 400 });

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "MISTRAL_API_KEY not set" }, { status: 500 });

  // Vision-capable models: mistral-small-latest (Small 4 supports vision natively)
  // and pixtral-large-latest (Large with vision)
  const modelMap: Record<string, string> = {
    "mistral-small-latest": "mistral-small-latest",
    "pixtral-large-latest": "pixtral-large-latest",
  };
  const selectedModel = modelMap[model] || model || "pixtral-large-latest";

  // Build image content — local files → base64, remote URLs → direct
  let imageContent: { type: "image_url"; image_url: { url: string } };

  if (src.startsWith("/images/admin/")) {
    // Local file: read and convert to base64
    const filePath = path.join(process.cwd(), "public", src);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Local image not found" }, { status: 404 });
    }
    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).slice(1).toLowerCase();
    const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg"
      : ext === "png" ? "image/png"
      : ext === "gif" ? "image/gif"
      : ext === "webp" ? "image/webp"
      : "image/png";
    const base64 = buffer.toString("base64");
    imageContent = { type: "image_url", image_url: { url: `data:${mime};base64,${base64}` } };
  } else {
    imageContent = { type: "image_url", image_url: { url: src } };
  }

  const systemPrompt = `Tu es un assistant qui analyse des images pour un cours en ligne sur l'intelligence artificielle.
Tu génères des métadonnées pédagogiques en français, adaptées au niveau du cours.`;

  const userPrompt = `Analyse cette image destinée à la section "${slug}" (partie : ${partId}) du cours IA.

${contextText ? `Contexte du paragraphe autour de l'insertion :\n"${contextText.slice(0, 400)}"\n` : ""}

Génère en JSON strict (sans markdown) :
{
  "alt": "description factuelle courte de l'image (5-10 mots)",
  "caption": "légende pédagogique expliquant ce que montre l'image dans le contexte du cours (1-2 phrases, en français)",
  "source": "source ou auteur de l'image si identifiable dans l'image (sinon chaîne vide)"
}`;

  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: selectedModel,
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            imageContent,
            { type: "text", text: userPrompt },
          ],
        },
      ],
      max_tokens: 300,
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return NextResponse.json({ error: `Mistral API error: ${response.status} — ${err}` }, { status: 502 });
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content ?? "";

  // Parse JSON from response (strip possible markdown code fences)
  let parsed: { alt?: string; caption?: string; source?: string } = {};
  try {
    const jsonStr = raw.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "").trim();
    parsed = JSON.parse(jsonStr);
  } catch {
    // Fallback: return raw as caption
    parsed = { caption: raw.trim() };
  }

  return NextResponse.json(parsed);
}
