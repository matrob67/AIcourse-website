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
  const [pastedImage, setPastedImage] = useState<string | null>(null);
  const [inputMode, setInputMode] = useState<"url" | "paste">("url");
  const [caption, setCaption] = useState("");
  const [source, setSource] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [size, setSize] = useState<ImageSize>("large");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");

  // AI generation
  const [aiModel, setAiModel] = useState<string>("mistral-small-latest");
  const [aiLoading, setAiLoading] = useState(false);

  // Image management
  const [editingImage, setEditingImage] = useState<number | null>(null);
  const [deletingImage, setDeletingImage] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentSrc = inputMode === "url" ? imageUrl : pastedImage;

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
    if (inputMode === "url") setImagePreview(imageUrl);
  }, [imageUrl, inputMode]);

  // Global Ctrl+V listener
  const uploadFile = useCallback(async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload-image", { method: "POST", body: form });
    const data = await res.json();
    if (data.url) {
      setPastedImage(data.url);
      setImagePreview(data.url);
      setInputMode("paste");
    }
  }, []);

  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
      // Don't intercept paste in text inputs
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") return;
      for (const item of e.clipboardData.items) {
        if (item.type.startsWith("image/")) {
          e.preventDefault();
          const file = item.getAsFile();
          if (file) uploadFile(file);
          break;
        }
      }
    };
    window.addEventListener("paste", handler);
    return () => window.removeEventListener("paste", handler);
  }, [uploadFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) uploadFile(file);
  }, [uploadFile]);

  const filteredPages = pages.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.toLowerCase()) ||
    p.partId.toLowerCase().includes(search.toLowerCase())
  );

  // Reload blocks
  const reloadBlocks = async () => {
    if (!selectedPage) return;
    const data = await fetch(`/api/admin/page-content?partId=${selectedPage.partId}&slug=${selectedPage.slug}`).then(r => r.json());
    setBlocks(data.blocks || []);
  };

  // AI caption generation
  const generateWithAI = async () => {
    if (!currentSrc) return;
    setAiLoading(true);
    const contextText = selectedBlock !== null ? blocks.find(b => b.index === selectedBlock)?.text || "" : "";
    try {
      const res = await fetch("/api/admin/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          src: currentSrc,
          partId: selectedPage?.partId || "",
          slug: selectedPage?.slug || "",
          contextText,
          model: aiModel,
        }),
      });
      const data = await res.json();
      if (data.error) {
        alert("Erreur Mistral : " + data.error);
      } else {
        if (data.caption) setCaption(data.caption);
        if (data.source) setSource(data.source);
      }
    } catch {
      alert("Erreur de connexion a l'API");
    }
    setAiLoading(false);
  };

  // Insert image
  const handleInsert = async () => {
    if (!selectedPage || selectedBlock === null || !currentSrc) return;
    setSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/admin/insert-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partId: selectedPage.partId,
          slug: selectedPage.slug,
          afterBlockIndex: selectedBlock,
          src: currentSrc,
          alt: caption || "illustration",
          source,
          sourceUrl,
          caption,
          size,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSaveStatus("success");
        await reloadBlocks();
        setImageUrl("");
        setImagePreview("");
        setPastedImage(null);
        setCaption("");
        setSource("");
        setSourceUrl("");
        setSelectedBlock(null);
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        setSaveStatus("error");
      }
    } catch {
      setSaveStatus("error");
    }
    setSaving(false);
  };

  // Delete image
  const handleDeleteImage = async (blockIndex: number) => {
    if (!selectedPage) return;
    setDeletingImage(blockIndex);
    try {
      const res = await fetch("/api/admin/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partId: selectedPage.partId, slug: selectedPage.slug, blockIndex }),
      });
      const data = await res.json();
      if (data.success) {
        await reloadBlocks();
      } else {
        alert("Erreur: " + (data.error || "inconnue"));
      }
    } catch {
      alert("Erreur de connexion");
    }
    setDeletingImage(null);
  };

  // Resize image
  const handleResizeImage = async (blockIndex: number, newSize: ImageSize) => {
    if (!selectedPage) return;
    try {
      const res = await fetch("/api/admin/update-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partId: selectedPage.partId, slug: selectedPage.slug, blockIndex, size: newSize }),
      });
      const data = await res.json();
      if (data.success) {
        await reloadBlocks();
        setEditingImage(null);
      } else {
        alert("Erreur: " + (data.error || "inconnue"));
      }
    } catch {
      alert("Erreur de connexion");
    }
  };

  const canInsert = selectedPage && selectedBlock !== null && currentSrc;

  // Missing hints
  const missingHints: string[] = [];
  if (!currentSrc) missingHints.push("image");
  if (!selectedPage) missingHints.push("page");
  if (selectedBlock === null) missingHints.push("emplacement");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      {/* Header */}
      <div className="flex items-center gap-4 px-6 py-4 border-b" style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}>
        <span className="text-2xl">🖼️</span>
        <h1 className="text-xl font-semibold">Gestionnaire d&apos;images</h1>
        <span className="text-sm ml-auto" style={{ color: "var(--muted)" }}>Interface admin</span>
      </div>

      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 65px)" }}>
        {/* ===== LEFT PANEL: Page + blocks ===== */}
        <div className="w-1/2 border-r flex flex-col overflow-hidden" style={{ borderColor: "var(--card-border)" }}>
          {/* Search */}
          <div className="p-4 border-b shrink-0" style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}>
            <input
              type="text"
              placeholder="Chercher une page... (nom, slug, partie)"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
              style={{ borderColor: "var(--card-border)", background: "var(--background)" }}
            />
            {search && (
              <div className="mt-1 max-h-48 overflow-y-auto rounded-lg border shadow-lg" style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}>
                {filteredPages.slice(0, 20).map(p => (
                  <button
                    key={`${p.partId}/${p.slug}`}
                    onClick={() => { setSelectedPage(p); setSearch(""); }}
                    className="w-full text-left px-3 py-2 text-sm border-b last:border-0 hover:opacity-80"
                    style={{ borderColor: "var(--card-border)" }}
                  >
                    <span className="text-xs mr-2" style={{ color: "var(--muted)" }}>{p.partId}</span>
                    <span className="font-medium">{p.title}</span>
                  </button>
                ))}
                {filteredPages.length === 0 && (
                  <div className="px-3 py-2 text-sm" style={{ color: "var(--muted)" }}>Aucun resultat</div>
                )}
              </div>
            )}
            {selectedPage && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded" style={{ background: "var(--accent)", color: "white", opacity: 0.8 }}>
                  {selectedPage.partId} / {selectedPage.slug}
                </span>
                <span className="text-sm font-medium truncate">{selectedPage.title}</span>
              </div>
            )}
          </div>

          {/* Blocks */}
          <div className="flex-1 overflow-y-auto p-4">
            {!selectedPage && (
              <div className="text-center mt-12" style={{ color: "var(--muted)" }}>
                <p className="text-4xl mb-3">📄</p>
                <p>Cherche une page pour commencer</p>
              </div>
            )}
            {loading && <div className="text-center mt-12" style={{ color: "var(--muted)" }}>Chargement...</div>}
            {selectedPage && !loading && blocks.length === 0 && (
              <div className="text-center mt-12" style={{ color: "var(--muted)" }}>Aucun contenu trouve</div>
            )}
            {!loading && blocks.length > 0 && (
              <div className="space-y-1">
                <p className="text-xs mb-3" style={{ color: "var(--muted)" }}>
                  Clique sur un bloc → l&apos;image sera inseree <strong>apres</strong>. Les 🖼️ sont des images existantes (supprimer / redimensionner).
                </p>
                {blocks.map((block) => {
                  const isImage = block.text.startsWith("<ImageWithSource");
                  const isSelected = selectedBlock === block.index;
                  const isEditing = editingImage === block.index;
                  const currentImgSize = isImage ? (block.text.match(/size="([^"]*)"/)?.[1] || "large") : "";
                  const imgSrc = isImage ? (block.text.match(/src="([^"]*)"/)?.[1] || "") : "";
                  const imgCaption = isImage ? (block.text.match(/caption="([^"]*)"/)?.[1] || "") : "";

                  return (
                    <div
                      key={block.index}
                      onClick={() => !isImage && setSelectedBlock(block.index)}
                      className="rounded-lg px-3 py-2 text-sm border transition-all"
                      style={{
                        cursor: isImage ? "default" : "pointer",
                        background: isSelected ? "var(--accent-light, rgba(99,102,241,0.1))" : isImage ? "var(--card-bg)" : "transparent",
                        borderColor: isSelected ? "var(--accent)" : isImage ? "var(--card-border)" : "transparent",
                        borderStyle: isImage ? "dashed" : "solid",
                        borderLeft: isSelected ? "3px solid var(--accent)" : "3px solid transparent",
                      }}
                    >
                      {isImage ? (
                        <div>
                          <div className="flex items-center gap-2">
                            <span style={{ color: "var(--accent)" }}>🖼️</span>
                            <span className="flex-1 text-xs truncate">{imgCaption || imgSrc.split("/").pop() || "image"}</span>
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: "var(--card-border)", color: "var(--muted)" }}>
                              {currentImgSize}
                            </span>
                          </div>
                          {/* Image preview thumbnail */}
                          {imgSrc && (
                            <div className="mt-1.5 rounded overflow-hidden border" style={{ borderColor: "var(--card-border)", maxHeight: 80 }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={imgSrc} alt="" className="w-full object-contain max-h-20" />
                            </div>
                          )}
                          {/* Action buttons */}
                          <div className="flex gap-1.5 mt-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); setEditingImage(isEditing ? null : block.index); }}
                              className="px-2 py-1 rounded text-[10px] font-medium border transition-colors hover:opacity-80"
                              style={{
                                borderColor: "var(--card-border)",
                                color: isEditing ? "white" : "var(--accent)",
                                background: isEditing ? "var(--accent)" : "transparent",
                              }}
                            >
                              Redimensionner
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (confirm("Supprimer cette image ?")) handleDeleteImage(block.index);
                              }}
                              disabled={deletingImage === block.index}
                              className="px-2 py-1 rounded text-[10px] font-medium border transition-colors hover:opacity-80"
                              style={{ borderColor: "#fecaca", color: "#dc2626", background: "transparent" }}
                            >
                              {deletingImage === block.index ? "..." : "Supprimer"}
                            </button>
                          </div>
                          {/* Resize picker */}
                          {isEditing && (
                            <div className="flex gap-1 mt-2">
                              {(["small", "medium", "large", "full"] as ImageSize[]).map((s) => (
                                <button
                                  key={s}
                                  onClick={(e) => { e.stopPropagation(); handleResizeImage(block.index, s); }}
                                  className="flex-1 py-1 rounded text-[10px] font-medium border transition-colors"
                                  style={{
                                    background: currentImgSize === s ? "var(--accent)" : "transparent",
                                    color: currentImgSize === s ? "white" : "var(--muted)",
                                    borderColor: currentImgSize === s ? "var(--accent)" : "var(--card-border)",
                                  }}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="line-clamp-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words">
                          {block.text.slice(0, 200)}{block.text.length > 200 ? "..." : ""}
                        </span>
                      )}
                      {isSelected && (
                        <div className="mt-1 text-xs font-medium" style={{ color: "var(--accent)" }}>
                          ↓ image inseree ici
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* ===== RIGHT PANEL: Image input + settings ===== */}
        <div className="w-1/2 flex flex-col overflow-y-auto p-6 gap-5">
          {/* Mode toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => { setInputMode("url"); setPastedImage(null); setImagePreview(imageUrl); }}
              className="flex-1 py-2 rounded-lg text-sm font-medium border transition-colors"
              style={{
                background: inputMode === "url" ? "var(--accent)" : "transparent",
                color: inputMode === "url" ? "white" : "var(--muted)",
                borderColor: inputMode === "url" ? "var(--accent)" : "var(--card-border)",
              }}
            >
              🔗 URL
            </button>
            <button
              onClick={() => { setInputMode("paste"); setImagePreview(pastedImage || ""); }}
              className="flex-1 py-2 rounded-lg text-sm font-medium border transition-colors"
              style={{
                background: inputMode === "paste" ? "var(--accent)" : "transparent",
                color: inputMode === "paste" ? "white" : "var(--muted)",
                borderColor: inputMode === "paste" ? "var(--accent)" : "var(--card-border)",
              }}
            >
              📋 Coller / Glisser
            </button>
          </div>

          {/* URL input */}
          {inputMode === "url" && (
            <input
              type="text"
              placeholder="https://..."
              value={imageUrl}
              onChange={e => setImageUrl(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none font-mono"
              style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}
            />
          )}

          {/* Paste / Drop zone */}
          {inputMode === "paste" && (
            <div>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
                tabIndex={0}
                className="rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-colors outline-none hover:opacity-80"
                style={{ borderColor: pastedImage ? "var(--accent)" : "var(--card-border)" }}
              >
                {pastedImage ? (
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>✓ Image chargee</p>
                    <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{pastedImage}</p>
                    <button
                      onClick={e => { e.stopPropagation(); setPastedImage(null); setImagePreview(""); }}
                      className="mt-2 text-xs hover:underline"
                      style={{ color: "#dc2626" }}
                    >
                      Supprimer
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="text-4xl mb-2">📋</p>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>
                      <strong>Ctrl+V</strong> n&apos;importe ou pour coller une image
                    </p>
                    <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>ou glisser-deposer / cliquer pour choisir un fichier</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f); }}
              />
            </div>
          )}

          {/* Image preview */}
          {imagePreview && (
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: "var(--card-border)" }}>
              <div className="px-3 py-1.5 text-xs border-b" style={{ color: "var(--muted)", borderColor: "var(--card-border)", background: "var(--card-bg)" }}>
                Apercu
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="preview" className="w-full object-contain max-h-48" onError={() => setImagePreview("")} />
            </div>
          )}

          {/* ===== AI Generation ===== */}
          {currentSrc && (
            <div className="p-3 rounded-lg border" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
              <div className="flex items-center gap-2">
                <select
                  value={aiModel}
                  onChange={(e) => setAiModel(e.target.value)}
                  className="text-xs rounded border px-2 py-1.5 outline-none"
                  style={{ borderColor: "var(--card-border)", background: "var(--background)" }}
                >
                  <option value="mistral-small-latest">Mistral Small 4</option>
                  <option value="pixtral-large-latest">Pixtral Large</option>
                </select>
                <button
                  onClick={generateWithAI}
                  disabled={aiLoading}
                  className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  style={{
                    background: aiLoading ? "var(--card-border)" : "var(--accent)",
                    color: "white",
                  }}
                >
                  {aiLoading ? "Analyse en cours..." : "✨ Generer legende avec Mistral"}
                </button>
              </div>
            </div>
          )}

          {/* ===== Metadata ===== */}
          <div className="space-y-3">
            <div>
              <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Legende</label>
              <input
                type="text"
                placeholder="Ex : Figure 2 -- Architecture du modele BERT"
                value={caption}
                onChange={e => setCaption(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}
              />
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Source (optionnel)</label>
              <input
                type="text"
                placeholder="Ex : arXiv 1706.03762, Wikipedia"
                value={source}
                onChange={e => setSource(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}
              />
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>URL source (optionnel)</label>
              <input
                type="text"
                placeholder="https://..."
                value={sourceUrl}
                onChange={e => setSourceUrl(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none font-mono text-xs"
                style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }}
              />
            </div>
            <div>
              <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Taille</label>
              <div className="flex gap-2">
                {(["small", "medium", "large", "full"] as ImageSize[]).map(s => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className="flex-1 py-1.5 rounded-lg text-xs border transition-colors"
                    style={{
                      background: size === s ? "var(--accent)" : "transparent",
                      color: size === s ? "white" : "var(--muted)",
                      borderColor: size === s ? "var(--accent)" : "var(--card-border)",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ===== Status & Insert ===== */}
          <div className="space-y-3 mt-auto">
            {saveStatus === "success" && (
              <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "#dcfce7", color: "#166534" }}>
                ✓ Image inseree avec succes !
              </div>
            )}
            {saveStatus === "error" && (
              <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "#fef2f2", color: "#991b1b" }}>
                Erreur lors de l&apos;insertion.
              </div>
            )}
            {missingHints.length > 0 && !canInsert && (
              <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "var(--card-bg)", color: "var(--muted)" }}>
                Manque : {missingHints.join(", ")}
              </div>
            )}
            <button
              onClick={handleInsert}
              disabled={!canInsert || saving}
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: canInsert && !saving ? "var(--accent)" : "var(--card-border)",
                color: canInsert && !saving ? "white" : "var(--muted)",
                cursor: canInsert && !saving ? "pointer" : "not-allowed",
              }}
            >
              {saving ? "Insertion..." : "Inserer l'image"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
