"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface PageInfo {
  partId: string;
  slug: string;
  title: string;
  number: number;
}

interface Block {
  index: number;
  text: string;
}

type ImageSize = "small" | "medium" | "large" | "full";

export default function AdminImagesPage() {
  const [pages, setPages] = useState<PageInfo[]>([]);
  const [search, setSearch] = useState("");
  const [selectedPage, setSelectedPage] = useState<PageInfo | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Image inputs
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [pastedImage, setPastedImage] = useState<string | null>(null); // local /images/admin/...
  const [inputMode, setInputMode] = useState<"url" | "paste">("url");
  const [alt, setAlt] = useState("");
  const [source, setSource] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [size, setSize] = useState<ImageSize>("large");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  const pasteZoneRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load pages list
  useEffect(() => {
    fetch("/api/admin/pages").then(r => r.json()).then(setPages);
  }, []);

  // Load page content when selected
  useEffect(() => {
    if (!selectedPage) return;
    setLoading(true);
    setBlocks([]);
    setSelectedBlock(null);
    fetch(`/api/admin/page-content?partId=${selectedPage.partId}&slug=${selectedPage.slug}`)
      .then(r => r.json())
      .then(data => {
        setBlocks(data.blocks || []);
        setLoading(false);
      });
  }, [selectedPage]);

  // Update preview when URL changes
  useEffect(() => {
    if (inputMode === "url") {
      setImagePreview(imageUrl);
    }
  }, [imageUrl, inputMode]);

  const filteredPages = pages.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase()) ||
    p.partId.toLowerCase().includes(search.toLowerCase())
  );

  const handlePasteZone = useCallback(async (e: React.ClipboardEvent) => {
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

  const handleInsert = async () => {
    if (!selectedPage || selectedBlock === null || !imagePreview || !alt || !source) return;
    setSaving(true);
    setSaveStatus("idle");

    const src = inputMode === "url" ? imageUrl : pastedImage;
    if (!src) { setSaving(false); return; }

    try {
      const res = await fetch("/api/admin/insert-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partId: selectedPage.partId,
          slug: selectedPage.slug,
          afterBlockIndex: selectedBlock,
          src,
          alt,
          source,
          sourceUrl,
          caption,
          size,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus("success");
        // Reload blocks
        fetch(`/api/admin/page-content?partId=${selectedPage.partId}&slug=${selectedPage.slug}`)
          .then(r => r.json())
          .then(d => setBlocks(d.blocks || []));
        // Reset image inputs
        setImageUrl("");
        setImagePreview("");
        setPastedImage(null);
        setAlt("");
        setSource("");
        setSourceUrl("");
        setCaption("");
        setSelectedBlock(null);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
    setSaving(false);
  };

  const currentSrc = inputMode === "url" ? imageUrl : pastedImage;
  const canInsert = selectedPage && selectedBlock !== null && currentSrc && alt && source;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col" style={{ fontFamily: "var(--font-geist-sans)" }}>
      {/* Header */}
      <div className="border-b border-card-border px-6 py-4 flex items-center gap-4 bg-card">
        <span className="text-2xl">🖼️</span>
        <h1 className="text-xl font-semibold">Insérer une image</h1>
        <span className="text-sm text-muted ml-auto">Interface admin — cours AI</span>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 65px)" }}>
        {/* LEFT PANEL: Page selection + content */}
        <div className="w-1/2 border-r border-card-border flex flex-col overflow-hidden">
          {/* Page search */}
          <div className="p-4 border-b border-card-border bg-card shrink-0">
            <input
              type="text"
              placeholder="Chercher une page… (nom, slug, partie)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
            />
            {search && (
              <div className="mt-1 max-h-48 overflow-y-auto rounded-lg border border-card-border bg-card shadow-lg">
                {filteredPages.slice(0, 20).map(p => (
                  <button
                    key={`${p.partId}/${p.slug}`}
                    onClick={() => { setSelectedPage(p); setSearch(""); }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-muted/10 border-b border-card-border last:border-0"
                  >
                    <span className="text-muted text-xs mr-2">{p.partId}</span>
                    <span className="font-medium">{p.title}</span>
                  </button>
                ))}
                {filteredPages.length === 0 && (
                  <div className="px-3 py-2 text-sm text-muted">Aucun résultat</div>
                )}
              </div>
            )}
            {selectedPage && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                  {selectedPage.partId} / {selectedPage.slug}
                </span>
                <span className="text-sm font-medium truncate">{selectedPage.title}</span>
              </div>
            )}
          </div>

          {/* Content blocks */}
          <div className="flex-1 overflow-y-auto p-4">
            {!selectedPage && (
              <div className="text-center text-muted mt-12">
                <p className="text-4xl mb-3">📄</p>
                <p>Cherche une page pour commencer</p>
              </div>
            )}
            {loading && (
              <div className="text-center text-muted mt-12">Chargement…</div>
            )}
            {selectedPage && !loading && blocks.length === 0 && (
              <div className="text-center text-muted mt-12">Aucun contenu trouvé</div>
            )}
            {!loading && blocks.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs text-muted mb-3">
                  Clique sur un bloc → l&apos;image sera insérée <strong>après</strong>
                </p>
                {blocks.map((block) => {
                  const isSelected = selectedBlock === block.index;
                  const isImage = block.text.startsWith("<ImageWithSource");
                  return (
                    <div
                      key={block.index}
                      onClick={() => !isImage && setSelectedBlock(block.index)}
                      className={`
                        rounded-lg px-3 py-2 text-sm transition-all border
                        ${isImage
                          ? "border-dashed border-card-border bg-card/50 text-muted cursor-default opacity-60"
                          : isSelected
                            ? "border-accent bg-accent/10 cursor-pointer ring-2 ring-accent/30"
                            : "border-transparent hover:border-card-border hover:bg-card/50 cursor-pointer"
                        }
                      `}
                    >
                      {isImage ? (
                        <span className="text-xs font-mono text-accent">🖼️ image existante</span>
                      ) : (
                        <span className="line-clamp-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words">
                          {block.text.slice(0, 200)}{block.text.length > 200 ? "…" : ""}
                        </span>
                      )}
                      {isSelected && (
                        <div className="mt-1 text-xs text-accent font-medium">
                          ↓ image ici
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Image input + settings */}
        <div className="w-1/2 flex flex-col overflow-y-auto p-6 gap-5">
          {/* Mode toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => { setInputMode("url"); setPastedImage(null); setImagePreview(imageUrl); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                inputMode === "url" ? "bg-accent text-white border-accent" : "border-card-border hover:border-accent text-muted"
              }`}
            >
              🔗 URL
            </button>
            <button
              onClick={() => { setInputMode("paste"); setImagePreview(pastedImage || ""); }}
              className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-colors ${
                inputMode === "paste" ? "bg-accent text-white border-accent" : "border-card-border hover:border-accent text-muted"
              }`}
            >
              📋 Coller / Glisser
            </button>
          </div>

          {/* URL input */}
          {inputMode === "url" && (
            <div>
              <label className="text-xs text-muted mb-1 block">URL de l&apos;image</label>
              <input
                type="text"
                placeholder="https://..."
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus:border-accent font-mono"
              />
            </div>
          )}

          {/* Paste zone */}
          {inputMode === "paste" && (
            <div>
              <div
                ref={pasteZoneRef}
                onPaste={handlePasteZone}
                onClick={() => fileInputRef.current?.click()}
                tabIndex={0}
                className={`
                  relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer
                  transition-colors outline-none
                  ${pastedImage ? "border-accent bg-accent/5" : "border-card-border hover:border-accent/50 hover:bg-card/30"}
                `}
              >
                {pastedImage ? (
                  <div>
                    <p className="text-accent text-sm font-medium mb-1">✓ Image chargée</p>
                    <p className="text-xs text-muted">{pastedImage}</p>
                    <button
                      onClick={e => { e.stopPropagation(); setPastedImage(null); setImagePreview(""); }}
                      className="mt-2 text-xs text-red-400 hover:underline"
                    >
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-4xl mb-2">📋</p>
                    <p className="text-sm text-muted">Ctrl+V pour coller</p>
                    <p className="text-xs text-muted mt-1">ou cliquer pour choisir un fichier</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          )}

          {/* Image preview */}
          {imagePreview && (
            <div className="rounded-xl border border-card-border overflow-hidden bg-card/30">
              <div className="p-2 text-xs text-muted border-b border-card-border">Aperçu</div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imagePreview}
                alt="preview"
                className="w-full object-contain max-h-48"
                onError={() => setImagePreview("")}
              />
            </div>
          )}

          {/* Metadata fields */}
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted mb-1 block">Texte alt <span className="text-red-400">*</span></label>
              <input
                type="text"
                placeholder="Description courte de l'image"
                value={alt}
                onChange={e => setAlt(e.target.value)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">Légende (optionnel)</label>
              <input
                type="text"
                placeholder="Ex : Figure 2 — Architecture du modèle BERT"
                value={caption}
                onChange={e => setCaption(e.target.value)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">Source <span className="text-red-400">*</span></label>
              <input
                type="text"
                placeholder="Ex : Wikipedia Commons, arXiv 2310.xxx, HuggingFace"
                value={source}
                onChange={e => setSource(e.target.value)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">URL source (optionnel)</label>
              <input
                type="text"
                placeholder="https://..."
                value={sourceUrl}
                onChange={e => setSourceUrl(e.target.value)}
                className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm outline-none focus:border-accent font-mono text-xs"
              />
            </div>
            <div>
              <label className="text-xs text-muted mb-1 block">Taille</label>
              <div className="flex gap-2">
                {(["small", "medium", "large", "full"] as ImageSize[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`flex-1 py-1.5 rounded-lg text-xs border transition-colors ${
                      size === s ? "bg-accent text-white border-accent" : "border-card-border hover:border-accent text-muted"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status & button */}
          <div className="space-y-3 mt-auto">
            {selectedBlock !== null && selectedPage && (
              <div className="text-xs bg-accent/10 text-accent px-3 py-2 rounded-lg border border-accent/20">
                ✓ Bloc sélectionné — image insérée après le bloc {selectedBlock + 1} de {selectedPage.slug}
              </div>
            )}
            {!selectedBlock && selectedBlock !== 0 && (
              <div className="text-xs text-muted px-3 py-2 rounded-lg border border-card-border">
                ← Clique sur un bloc dans la page pour choisir l&apos;emplacement
              </div>
            )}

            {saveStatus === "success" && (
              <div className="text-xs bg-green-500/10 text-green-400 px-3 py-2 rounded-lg border border-green-500/20">
                ✓ Image insérée avec succès !
              </div>
            )}
            {saveStatus === "error" && (
              <div className="text-xs bg-red-500/10 text-red-400 px-3 py-2 rounded-lg border border-red-500/20">
                ✗ Erreur lors de l&apos;insertion
              </div>
            )}

            <button
              onClick={handleInsert}
              disabled={!canInsert || saving}
              className={`w-full py-3 rounded-xl text-sm font-semibold transition-all ${
                canInsert && !saving
                  ? "bg-accent text-white hover:bg-accent/90 shadow-lg shadow-accent/20"
                  : "bg-card text-muted border border-card-border cursor-not-allowed"
              }`}
            >
              {saving ? "Insertion…" : "Insérer l'image"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
