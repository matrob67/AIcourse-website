"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface Block {
  index: number;
  text: string;
}

type ImageSize = "small" | "medium" | "large" | "full";
type VisionModel = "pixtral-large-latest" | "mistral-small-latest";

interface AdminImagePanelProps {
  partId: string;
  slug: string;
}

const MODELS: { id: VisionModel; label: string; desc: string }[] = [
  { id: "pixtral-large-latest", label: "Pixtral Large", desc: "Plus précis" },
  { id: "mistral-small-latest", label: "Mistral Small 4", desc: "Plus rapide" },
];

export default function AdminImagePanel({ partId, slug }: AdminImagePanelProps) {
  const [open, setOpen] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [pastedImage, setPastedImage] = useState<string | null>(null);
  const [alt, setAlt] = useState("");
  const [source, setSource] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [size, setSize] = useState<ImageSize>("large");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const [visionModel, setVisionModel] = useState<VisionModel>("pixtral-large-latest");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzeError, setAnalyzeError] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load blocks when panel opens
  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetch(`/api/admin/page-content?partId=${partId}&slug=${slug}`)
      .then(r => r.json())
      .then(data => {
        setBlocks(data.blocks || []);
        setLoading(false);
      });
  }, [open, partId, slug]);

  useEffect(() => {
    if (!pastedImage) setImagePreview(imageUrl);
  }, [imageUrl, pastedImage]);

  const handlePaste = useCallback(async (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const file = item.getAsFile();
        if (!file) continue;
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/admin/upload-image", { method: "POST", body: form });
        const data = await res.json();
        if (data.url) {
          setPastedImage(data.url);
          setImagePreview(data.url);
        }
        break;
      }
    }
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload-image", { method: "POST", body: form });
    const data = await res.json();
    if (data.url) {
      setPastedImage(data.url);
      setImagePreview(data.url);
    }
  }, []);

  const handleAnalyze = async () => {
    const src = pastedImage || imageUrl;
    if (!src) return;
    setAnalyzing(true);
    setAnalyzeError("");
    try {
      const contextText = selectedBlock !== null
        ? blocks.find(b => b.index === selectedBlock)?.text ?? ""
        : "";
      const res = await fetch("/api/admin/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src, partId, slug, contextText, model: visionModel }),
      });
      const data = await res.json();
      if (data.error) {
        setAnalyzeError(data.error);
      } else {
        if (data.alt) setAlt(data.alt);
        if (data.caption) setCaption(data.caption);
        if (data.source) setSource(data.source);
      }
    } catch {
      setAnalyzeError("Erreur réseau");
    }
    setAnalyzing(false);
  };

  const handleInsert = async () => {
    if (selectedBlock === null) return;
    const src = pastedImage || imageUrl;
    if (!src) return;

    setSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/admin/insert-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partId, slug, afterBlockIndex: selectedBlock, src, alt, source, sourceUrl, caption, size }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus("success");
        fetch(`/api/admin/page-content?partId=${partId}&slug=${slug}`)
          .then(r => r.json())
          .then(d => setBlocks(d.blocks || []));
        setImageUrl(""); setImagePreview(""); setPastedImage(null);
        setAlt(""); setSource(""); setSourceUrl(""); setCaption("");
        setSelectedBlock(null);
        setTimeout(() => window.location.reload(), 800);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
    setSaving(false);
  };

  const currentSrc = pastedImage || imageUrl;
  const canInsert = selectedBlock !== null && !!currentSrc;
  const canAnalyze = !!currentSrc;

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(true)}
        title="Insérer une image"
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-accent text-white shadow-lg shadow-accent/30 flex items-center justify-center text-xl hover:scale-110 transition-transform"
      >
        🖼️
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}

      {/* Slide-over drawer */}
      <div className={`fixed top-0 right-0 z-50 h-full w-[480px] bg-background border-l border-card-border shadow-2xl flex flex-col transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-card-border shrink-0">
          <div>
            <h2 className="font-semibold text-base">🖼️ Insérer une image</h2>
            <p className="text-xs text-muted mt-0.5">{partId} / {slug}</p>
          </div>
          <button onClick={() => setOpen(false)} className="text-muted hover:text-foreground text-xl leading-none">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-5">

          {/* STEP 1 - Select block */}
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
              1 · Après quel paragraphe ?
            </p>
            {loading && <p className="text-sm text-muted">Chargement…</p>}
            <div className="space-y-0 max-h-56 overflow-y-auto rounded-lg border border-card-border">
              {blocks.map(block => {
                const isImage = block.text.startsWith("<ImageWithSource");
                const isSelected = selectedBlock === block.index;
                return (
                  <div
                    key={block.index}
                    onClick={() => !isImage && setSelectedBlock(block.index)}
                    className={`px-3 py-2 text-xs cursor-pointer border-b border-card-border last:border-0 transition-colors ${
                      isImage ? "text-muted opacity-50 cursor-default bg-card/30"
                      : isSelected ? "bg-accent/10 text-accent font-medium"
                      : "hover:bg-card/50"
                    }`}
                  >
                    {isImage
                      ? "🖼️ image existante"
                      : <span className="line-clamp-2 font-mono leading-relaxed">{block.text.slice(0, 120)}{block.text.length > 120 ? "…" : ""}</span>
                    }
                    {isSelected && <span className="block text-accent text-xs mt-0.5">↓ image ici</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 2 - Image */}
          <div>
            <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-2">
              2 · Image
            </p>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="https://..."
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                disabled={!!pastedImage}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-xs font-mono outline-none focus:border-accent disabled:opacity-40"
              />
              <div
                onPaste={handlePaste}
                onClick={() => fileInputRef.current?.click()}
                tabIndex={0}
                className={`rounded-xl border-2 border-dashed p-4 text-center cursor-pointer transition-colors outline-none ${pastedImage ? "border-accent bg-accent/5" : "border-card-border hover:border-accent/50"}`}
              >
                {pastedImage ? (
                  <div>
                    <p className="text-accent text-xs font-medium">✓ Image collée</p>
                    <button
                      onClick={e => { e.stopPropagation(); setPastedImage(null); setImagePreview(imageUrl); }}
                      className="text-xs text-red-400 hover:underline mt-1"
                    >Supprimer</button>
                  </div>
                ) : (
                  <p className="text-xs text-muted">📋 Ctrl+V ou cliquer pour choisir un fichier</p>
                )}
              </div>
            </div>

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />

            {imagePreview && (
              <div className="mt-2 rounded-lg border border-card-border overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="preview" className="w-full max-h-32 object-contain" onError={() => setImagePreview("")} />
              </div>
            )}
          </div>

          {/* STEP 3 - AI Analysis */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-muted uppercase tracking-wide">3 · Infos</p>
              {/* Model selector + analyze button */}
              <div className="flex items-center gap-1.5">
                <div className="flex rounded-lg border border-card-border overflow-hidden">
                  {MODELS.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setVisionModel(m.id)}
                      title={m.desc}
                      className={`px-2 py-1 text-xs transition-colors ${visionModel === m.id ? "bg-accent text-white" : "text-muted hover:text-foreground hover:bg-card/50"}`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={!canAnalyze || analyzing}
                  title="Analyser l'image avec l'IA"
                  className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${canAnalyze && !analyzing ? "border-accent text-accent hover:bg-accent hover:text-white" : "border-card-border text-muted cursor-not-allowed"}`}
                >
                  {analyzing ? "…" : "✨ Générer"}
                </button>
              </div>
            </div>

            {analyzeError && (
              <p className="text-xs text-red-400 mb-2">{analyzeError}</p>
            )}

            <div className="space-y-2">
              <input type="text" placeholder="Texte alt (optionnel)" value={alt} onChange={e => setAlt(e.target.value)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-1.5 text-xs outline-none focus:border-accent" />
              <textarea placeholder="Légende (optionnel)" value={caption} onChange={e => setCaption(e.target.value)} rows={2}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-1.5 text-xs outline-none focus:border-accent resize-none" />
              <input type="text" placeholder="Source (optionnel)" value={source} onChange={e => setSource(e.target.value)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-1.5 text-xs outline-none focus:border-accent" />
              <input type="text" placeholder="URL source (optionnel)" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-1.5 text-xs font-mono outline-none focus:border-accent" />
              <div className="flex gap-1.5">
                {(["small", "medium", "large", "full"] as ImageSize[]).map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    className={`flex-1 py-1 rounded text-xs border transition-colors ${size === s ? "bg-accent text-white border-accent" : "border-card-border text-muted hover:border-accent"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-card-border shrink-0 space-y-2">
          {saveStatus === "success" && (
            <div className="text-xs bg-green-500/10 text-green-400 px-3 py-2 rounded-lg border border-green-500/20 text-center">
              ✓ Image insérée — rechargement…
            </div>
          )}
          {saveStatus === "error" && (
            <div className="text-xs bg-red-500/10 text-red-400 px-3 py-2 rounded-lg border border-red-500/20 text-center">
              ✗ Erreur lors de l&apos;insertion
            </div>
          )}
          <button
            onClick={handleInsert}
            disabled={!canInsert || saving}
            className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${canInsert && !saving ? "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20" : "bg-card text-muted border border-card-border cursor-not-allowed"}`}
          >
            {saving ? "Insertion…" : "Insérer l'image"}
          </button>
        </div>
      </div>
    </>
  );
}
