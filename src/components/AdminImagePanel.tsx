"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type ImageSize = "small" | "medium" | "large" | "full";
type InputMode = "url" | "paste" | "search";

interface Block { index: number; text: string; }
interface EditState { blockIndex: number; caption: string; source: string; sourceUrl: string; alt: string; size: ImageSize; }
interface SearchResult { url: string; thumb: string; title: string; source: string; width: number; height: number; sourceUrl?: string; }
interface SuggestGroup { query: string; images: SearchResult[]; suggestedBlockIndex?: number | null; }

export default function AdminImagePanel({ partId, slug }: { partId: string; slug: string }) {
  const [open, setOpen] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loadingBlocks, setLoadingBlocks] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  const [inputMode, setInputMode] = useState<InputMode>("search");
  const [imageUrl, setImageUrl] = useState("");
  const [pastedImage, setPastedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [selectedSearchImage, setSelectedSearchImage] = useState<SearchResult | null>(null);
  const [downloading, setDownloading] = useState(false);

  // Auto-suggest state
  const [suggestGroups, setSuggestGroups] = useState<SuggestGroup[]>([]);
  const [suggesting, setSuggesting] = useState(false);

  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [source, setSource] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [size, setSize] = useState<ImageSize>("medium");

  const [aiModel, setAiModel] = useState("mistral-small-latest");
  const [aiLoading, setAiLoading] = useState(false);

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const [editState, setEditState] = useState<EditState | null>(null);
  const [savingEdit, setSavingEdit] = useState(false);
  const [deletingImage, setDeletingImage] = useState<number | null>(null);

  const reloadBlocks = useCallback(async () => {
    const data = await fetch(`/api/admin/page-content?partId=${partId}&slug=${slug}`).then(r => r.json());
    setBlocks(data.blocks || []);
  }, [partId, slug]);

  useEffect(() => {
    if (!open) return;
    setLoadingBlocks(true);
    reloadBlocks().finally(() => setLoadingBlocks(false));
  }, [open, reloadBlocks]);

  useEffect(() => {
    if (inputMode === "url") setImagePreview(imageUrl);
  }, [imageUrl, inputMode]);

  // Determine current image src based on mode
  const currentSrc = inputMode === "url" ? imageUrl
    : inputMode === "paste" ? pastedImage
    : selectedSearchImage ? imagePreview // after download, this is the local URL
    : null;

  const uploadFile = useCallback(async (file: File) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload-image", { method: "POST", body: form });
    const data = await res.json();
    if (data.url) { setPastedImage(data.url); setImagePreview(data.url); }
  }, []);

  useEffect(() => {
    if (!open || inputMode !== "paste") return;
    const handler = (e: ClipboardEvent) => {
      if (!e.clipboardData) return;
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
  }, [open, inputMode, uploadFile]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.type.startsWith("image/")) uploadFile(file);
  }, [uploadFile]);

  // Auto-suggest images for the current page
  const handleSuggest = async () => {
    setSuggesting(true);
    setSuggestGroups([]);
    setSearchResults([]);
    try {
      const res = await fetch("/api/admin/suggest-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partId, slug }),
      });
      const data = await res.json();
      if (data.results) {
        setSuggestGroups(data.results);
      }
    } catch { alert("Erreur de suggestion"); }
    setSuggesting(false);
  };

  // Search Google Images
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setSearching(true);
    setSearchResults([]);
    setSelectedSearchImage(null);
    try {
      const res = await fetch("/api/admin/search-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: searchQuery }),
      });
      const data = await res.json();
      setSearchResults(data.images || []);
    } catch { alert("Erreur de recherche"); }
    setSearching(false);
  };

  const [downloadError, setDownloadError] = useState("");
  const [hoveredImage, setHoveredImage] = useState<SearchResult | null>(null);

  // Select a search result visually (single click)
  const previewSearchImage = (img: SearchResult) => {
    setSelectedSearchImage(img);
    setSource("");
    setSourceUrl(img.sourceUrl || img.url);
  };

  // Confirm selection and download locally (double click or button)
  const confirmSearchImage = async (img: SearchResult) => {
    setSelectedSearchImage(img);
    setDownloading(true);
    setDownloadError("");
    setSource("");
    setSourceUrl(img.sourceUrl || img.url);

    // Try full URL first, then thumbnail as fallback
    const urlsToTry = [img.url, img.thumb].filter(Boolean);

    for (const tryUrl of urlsToTry) {
      try {
        const res = await fetch("/api/admin/download-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: tryUrl }),
        });
        const data = await res.json();
        if (data.localUrl) {
          setImagePreview(data.localUrl);
          setDownloading(false);
          autoAnalyze(data.localUrl, img.source);
          return; // success
        }
      } catch { /* try next */ }
    }

    // All URLs failed
    setDownloadError("Image bloquée par le site source. Essaie une autre.");
    setDownloading(false);
  };

  // Auto analyze image after download
  const autoAnalyze = async (src: string, imgSource: string) => {
    setAiLoading(true);
    const contextText = selectedBlock !== null ? blocks.find(b => b.index === selectedBlock)?.text || "" : "";
    try {
      const res = await fetch("/api/admin/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src, partId, slug, contextText, model: aiModel }),
      });
      const data = await res.json();
      if (!data.error) {
        if (data.alt) setAlt(data.alt);
        if (data.caption) setCaption(data.caption);
        if (data.source && data.source !== imgSource) setSource(data.source);
      }
    } catch { /* silent */ }
    setAiLoading(false);
  };

  const generateWithAI = async () => {
    if (!currentSrc) return;
    setAiLoading(true);
    const contextText = selectedBlock !== null ? blocks.find(b => b.index === selectedBlock)?.text || "" : "";
    try {
      const res = await fetch("/api/admin/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ src: currentSrc, partId, slug, contextText, model: aiModel }),
      });
      const data = await res.json();
      if (data.error) alert("Erreur Mistral : " + data.error);
      else {
        if (data.alt) setAlt(data.alt);
        if (data.caption) setCaption(data.caption);
      }
    } catch { alert("Erreur de connexion"); }
    setAiLoading(false);
  };

  const handleInsert = async () => {
    if (!currentSrc || selectedBlock === null) return;
    setSaving(true); setStatus("idle");
    try {
      const res = await fetch("/api/admin/insert-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partId, slug, afterBlockIndex: selectedBlock, src: currentSrc, alt: alt || caption || "illustration", source, sourceUrl, caption, size }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        await reloadBlocks();
        setImageUrl(""); setImagePreview(""); setPastedImage(null);
        setAlt(""); setCaption(""); setSource(""); setSourceUrl("");
        setSelectedBlock(null); setSelectedSearchImage(null); setSearchResults([]);
      } else setStatus("error");
    } catch { setStatus("error"); }
    setSaving(false);
  };

  const openEdit = (block: Block) => {
    setEditState({
      blockIndex: block.index,
      caption: block.text.match(/caption="([^"]*)"/)?.[1] || "",
      source: block.text.match(/\bsource="([^"]*)"/)?.[1] || "",
      sourceUrl: block.text.match(/sourceUrl="([^"]*)"/)?.[1] || "",
      alt: block.text.match(/alt="([^"]*)"/)?.[1] || "",
      size: (block.text.match(/size="([^"]*)"/)?.[1] || "large") as ImageSize,
    });
  };

  const saveEdit = async () => {
    if (!editState) return;
    setSavingEdit(true);
    try {
      const res = await fetch("/api/admin/update-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partId, slug, blockIndex: editState.blockIndex, ...editState }),
      });
      const data = await res.json();
      if (data.success) { await reloadBlocks(); setEditState(null); }
      else alert("Erreur: " + (data.error || "inconnue"));
    } catch { alert("Erreur de connexion"); }
    setSavingEdit(false);
  };

  const handleDeleteImage = async (blockIndex: number) => {
    setDeletingImage(blockIndex);
    try {
      const res = await fetch("/api/admin/delete-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ partId, slug, blockIndex }),
      });
      const data = await res.json();
      if (data.success) { await reloadBlocks(); if (editState?.blockIndex === blockIndex) setEditState(null); }
      else alert("Erreur: " + (data.error || "inconnue"));
    } catch { alert("Erreur de connexion"); }
    setDeletingImage(null);
  };

  const canInsert = !!currentSrc && selectedBlock !== null;

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl hover:scale-110 transition-transform"
        style={{ background: "var(--accent)", color: "white" }} title="Insérer une image">
        🖼️
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
      <div className="relative ml-auto w-full max-w-4xl h-full overflow-y-auto shadow-2xl flex flex-col"
        style={{ background: "var(--background)", borderLeft: "1px solid var(--card-border)" }}>

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center gap-3 px-5 py-4 border-b"
          style={{ background: "var(--background)", borderColor: "var(--card-border)" }}>
          <span className="text-xl">🖼️</span>
          <div className="flex-1">
            <h2 className="text-base font-bold">Insérer une image</h2>
            <p className="text-xs" style={{ color: "var(--muted)" }}>{partId}/{slug}</p>
          </div>
          <button onClick={() => setOpen(false)} className="text-xl px-2 hover:opacity-60">✕</button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">

          {/* 1. IMAGE SOURCE */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>1. Image</h3>
            <div className="flex gap-1.5 mb-3">
              {([
                { mode: "search" as InputMode, label: "🔍 Rechercher" },
                { mode: "url" as InputMode, label: "🔗 URL" },
                { mode: "paste" as InputMode, label: "📋 Coller" },
              ]).map(({ mode, label }) => (
                <button key={mode}
                  onClick={() => { setInputMode(mode); if (mode === "url") { setPastedImage(null); setImagePreview(imageUrl); } else if (mode === "paste") setImagePreview(pastedImage || ""); }}
                  className="flex-1 py-2 rounded-lg text-xs font-medium border transition-colors"
                  style={{ background: inputMode === mode ? "var(--accent)" : "transparent", color: inputMode === mode ? "white" : "var(--muted)", borderColor: inputMode === mode ? "var(--accent)" : "var(--card-border)" }}>
                  {label}
                </button>
              ))}
            </div>

            {/* SEARCH MODE */}
            {inputMode === "search" && (
              <div>
                {/* Auto-suggest button */}
                <button onClick={handleSuggest} disabled={suggesting}
                  className="w-full py-2.5 rounded-lg text-sm font-medium text-white mb-3 transition-colors"
                  style={{ background: suggesting ? "var(--card-border)" : "var(--accent)" }}>
                  {suggesting ? "Analyse de la page en cours..." : "✨ Trouver des images pour cette page"}
                </button>

                {/* Manual search */}
                <div className="flex gap-2 mb-3">
                  <input type="text" placeholder="Ou recherche manuelle..."
                    value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSearch()}
                    className="flex-1 rounded-lg border px-3 py-2 text-sm outline-none"
                    style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }} />
                  <button onClick={handleSearch} disabled={searching || !searchQuery.trim()}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white shrink-0"
                    style={{ background: searching ? "var(--card-border)" : "var(--accent)" }}>
                    {searching ? "..." : "🔍"}
                  </button>
                </div>

                {/* Auto-suggest results (grouped by query) */}
                {suggestGroups.length > 0 && (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto relative">
                    {/* Hover preview overlay */}
                    {hoveredImage && (
                      <div className="sticky top-0 z-20 rounded-lg overflow-hidden border shadow-lg mb-2" style={{ borderColor: "var(--accent)", background: "var(--background)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={hoveredImage.thumb || hoveredImage.url} alt={hoveredImage.title || "preview"} className="w-full object-contain max-h-64" referrerPolicy="no-referrer" />
                        <div className="px-3 py-2 text-xs" style={{ color: "var(--foreground)" }}>
                          <p className="font-medium truncate">{hoveredImage.title}</p>
                          <p style={{ color: "var(--muted)" }}>{hoveredImage.source} — {hoveredImage.width}×{hoveredImage.height}</p>
                        </div>
                      </div>
                    )}
                    {suggestGroups.map((group, gi) => (
                      <div key={gi}>
                        <div className="flex items-center gap-2 mb-1.5 px-1">
                          <p className="text-xs font-medium" style={{ color: "var(--accent)" }}>🔍 {group.query}</p>
                          {group.suggestedBlockIndex != null && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                              📍 bloc {group.suggestedBlockIndex}
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-3 rounded-lg border p-2" style={{ borderColor: "var(--card-border)" }}>
                          {group.images.map((img, i) => (
                            <div key={i}
                              onClick={() => {
                                if (downloading) return;
                                previewSearchImage(img);
                                if (group.suggestedBlockIndex != null && selectedBlock === null) {
                                  setSelectedBlock(group.suggestedBlockIndex);
                                }
                              }}
                              onDoubleClick={() => !downloading && confirmSearchImage(img)}
                              onMouseEnter={() => setHoveredImage(img)}
                              onMouseLeave={() => setHoveredImage(null)}
                              className="relative rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-offset-1 transition-all border"
                              style={{
                                borderColor: selectedSearchImage?.url === img.url ? "var(--accent)" : "var(--card-border)",
                                borderWidth: selectedSearchImage?.url === img.url ? 2 : 1,
                                ringColor: "var(--accent)",
                                aspectRatio: "16/9",
                              }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={img.thumb || img.url} alt={img.title || "result"} className="w-full h-full object-cover"
                                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                                referrerPolicy="no-referrer" />
                              <div className="absolute bottom-0 left-0 right-0 px-2 py-1"
                                style={{ background: "rgba(0,0,0,0.7)", color: "white" }}>
                                <p className="text-[11px] truncate font-medium">{img.title}</p>
                                <p className="text-[10px] truncate opacity-75">{img.source}</p>
                              </div>
                              {selectedSearchImage?.url === img.url && (
                                <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs" style={{ background: "var(--accent)" }}>✓</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {/* Confirm button for selected image */}
                    {selectedSearchImage && !downloading && !imagePreview && (
                      <button onClick={() => confirmSearchImage(selectedSearchImage)}
                        className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
                        style={{ background: "var(--accent)" }}>
                        Utiliser cette image →
                      </button>
                    )}
                  </div>
                )}

                {/* Manual search results */}
                {searchResults.length > 0 && suggestGroups.length === 0 && (
                  <div className="relative">
                    {/* Hover preview overlay */}
                    {hoveredImage && (
                      <div className="sticky top-0 z-20 rounded-lg overflow-hidden border shadow-lg mb-2" style={{ borderColor: "var(--accent)", background: "var(--background)" }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={hoveredImage.thumb || hoveredImage.url} alt={hoveredImage.title || "preview"} className="w-full object-contain max-h-64" referrerPolicy="no-referrer" />
                        <div className="px-3 py-2 text-xs" style={{ color: "var(--foreground)" }}>
                          <p className="font-medium truncate">{hoveredImage.title}</p>
                          <p style={{ color: "var(--muted)" }}>{hoveredImage.source} — {hoveredImage.width}×{hoveredImage.height}</p>
                        </div>
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto rounded-lg border p-2" style={{ borderColor: "var(--card-border)" }}>
                      {searchResults.map((img, i) => (
                        <div key={i}
                          onClick={() => !downloading && previewSearchImage(img)}
                          onDoubleClick={() => !downloading && confirmSearchImage(img)}
                          onMouseEnter={() => setHoveredImage(img)}
                          onMouseLeave={() => setHoveredImage(null)}
                          className="relative rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-offset-1 transition-all border"
                          style={{
                            borderColor: selectedSearchImage?.url === img.url ? "var(--accent)" : "var(--card-border)",
                            borderWidth: selectedSearchImage?.url === img.url ? 2 : 1,
                            ringColor: "var(--accent)",
                            aspectRatio: "16/9",
                          }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={img.url} alt={img.title || "result"} className="w-full h-full object-cover"
                            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                            referrerPolicy="no-referrer" />
                          <div className="absolute bottom-0 left-0 right-0 px-2 py-1"
                            style={{ background: "rgba(0,0,0,0.7)", color: "white" }}>
                            <p className="text-[11px] truncate font-medium">{img.title}</p>
                            <p className="text-[10px] truncate opacity-75">{img.source}</p>
                          </div>
                          {selectedSearchImage?.url === img.url && (
                            <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs" style={{ background: "var(--accent)" }}>✓</div>
                          )}
                        </div>
                      ))}
                    </div>
                    {/* Confirm button for selected image */}
                    {selectedSearchImage && !downloading && !imagePreview && (
                      <button onClick={() => confirmSearchImage(selectedSearchImage)}
                        className="w-full mt-2 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
                        style={{ background: "var(--accent)" }}>
                        Utiliser cette image →
                      </button>
                    )}
                  </div>
                )}

                {(searching || suggesting) && <p className="text-sm text-center py-4" style={{ color: "var(--muted)" }}>{suggesting ? "Mistral analyse la page..." : "Recherche..."}</p>}

                {/* Download status */}
                {downloading && (
                  <div className="mt-2 text-xs text-center py-2 rounded-lg" style={{ background: "var(--card-bg)", color: "var(--accent)" }}>
                    Téléchargement + analyse IA en cours...
                  </div>
                )}
                {downloadError && (
                  <div className="mt-2 text-xs text-center py-2 rounded-lg" style={{ background: "#fef2f2", color: "#991b1b" }}>
                    {downloadError}
                  </div>
                )}
              </div>
            )}

            {/* URL MODE */}
            {inputMode === "url" && (
              <input type="text" placeholder="https://..." value={imageUrl} onChange={e => setImageUrl(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none font-mono"
                style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }} />
            )}

            {/* PASTE MODE */}
            {inputMode === "paste" && (
              <div onDrop={handleDrop} onDragOver={e => e.preventDefault()} onClick={() => fileInputRef.current?.click()} tabIndex={0}
                className="rounded-xl border-2 border-dashed p-6 text-center cursor-pointer hover:opacity-80"
                style={{ borderColor: pastedImage ? "var(--accent)" : "var(--card-border)" }}>
                {pastedImage ? (
                  <div>
                    <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>Image chargée</p>
                    <p className="text-xs mt-1 truncate" style={{ color: "var(--muted)" }}>{pastedImage}</p>
                    <button onClick={e => { e.stopPropagation(); setPastedImage(null); setImagePreview(""); }} className="mt-2 text-xs text-red-500 hover:underline">Supprimer</button>
                  </div>
                ) : (
                  <div>
                    <p className="text-3xl mb-1">📋</p>
                    <p className="text-sm" style={{ color: "var(--muted)" }}>Ctrl+V ou glisser-déposer</p>
                  </div>
                )}
              </div>
            )}

            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) uploadFile(f); }} />

            {/* Preview */}
            {imagePreview && (
              <div className="mt-3 rounded-lg border overflow-hidden" style={{ borderColor: "var(--card-border)" }}>
                <div className="flex items-center justify-between px-3 py-1.5 text-xs border-b" style={{ color: "var(--muted)", borderColor: "var(--card-border)", background: "var(--card-bg)" }}>
                  <span>Aperçu</span>
                  {aiLoading && <span style={{ color: "var(--accent)" }}>✨ Analyse IA...</span>}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="preview" className="w-full object-contain max-h-48" onError={() => setImagePreview("")} />
              </div>
            )}
          </section>

          {/* 2. BLOCKS */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>2. Emplacement</h3>
            <div className="rounded-lg border overflow-hidden" style={{ borderColor: "var(--card-border)", maxHeight: 280, overflowY: "auto" }}>
              {loadingBlocks && <p className="p-3 text-xs" style={{ color: "var(--muted)" }}>Chargement...</p>}
              {blocks.map(block => {
                const isImage = block.text.startsWith("<ImageWithSource");
                const isSelected = selectedBlock === block.index;
                const isEditingThis = editState?.blockIndex === block.index;
                const imgCaption = isImage ? (block.text.match(/caption="([^"]*)"/)?.[1] || "") : "";
                const imgSrc = isImage ? (block.text.match(/src="([^"]*)"/)?.[1] || "") : "";
                const imgSize = isImage ? (block.text.match(/size="([^"]*)"/)?.[1] || "large") : "";
                return (
                  <div key={block.index}
                    onClick={() => !isImage && setSelectedBlock(block.index)}
                    className="px-3 py-2 text-xs border-b last:border-0 transition-colors"
                    style={{
                      borderColor: "var(--card-border)", cursor: isImage ? "default" : "pointer",
                      background: isEditingThis ? "rgba(99,102,241,0.08)" : isSelected ? "var(--accent-light)" : isImage ? "var(--card-bg)" : "transparent",
                      borderLeft: isEditingThis ? "3px solid var(--accent)" : isSelected ? "3px solid var(--accent)" : "3px solid transparent",
                    }}>
                    {isImage ? (
                      <div>
                        <div className="flex items-center gap-2">
                          <span style={{ color: "var(--accent)" }}>🖼️</span>
                          <span className="flex-1 truncate" style={{ color: "var(--foreground)" }}>{imgCaption || imgSrc.split("/").pop() || "image"}</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono" style={{ background: "var(--card-border)", color: "var(--muted)" }}>{imgSize}</span>
                        </div>
                        <div className="flex gap-1.5 mt-1.5" onClick={e => e.stopPropagation()}>
                          <button onClick={() => isEditingThis ? setEditState(null) : openEdit(block)}
                            className="px-2 py-1 rounded text-[10px] font-medium border transition-colors"
                            style={{ borderColor: "var(--card-border)", color: isEditingThis ? "white" : "var(--accent)", background: isEditingThis ? "var(--accent)" : "transparent" }}>
                            {isEditingThis ? "✕ Fermer" : "Modifier"}
                          </button>
                          <button onClick={() => { if (confirm("Supprimer cette image ?")) handleDeleteImage(block.index); }}
                            disabled={deletingImage === block.index}
                            className="px-2 py-1 rounded text-[10px] font-medium border hover:opacity-80"
                            style={{ borderColor: "#fecaca", color: "#dc2626" }}>
                            {deletingImage === block.index ? "..." : "Supprimer"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <span className="font-mono line-clamp-2 break-words" style={{ color: "var(--foreground)" }}>
                        {block.text.slice(0, 150)}{block.text.length > 150 ? "..." : ""}
                      </span>
                    )}
                    {isSelected && !isImage && (
                      <div className="mt-1 text-xs font-medium" style={{ color: "var(--accent)" }}>↓ image ici</div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* EDIT PANEL */}
          {editState && (
            <section className="rounded-xl border p-4 space-y-3" style={{ borderColor: "var(--accent)", background: "rgba(99,102,241,0.04)" }}>
              <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--accent)" }}>✏️ Modifier</h3>
              <input type="text" placeholder="Légende..." value={editState.caption}
                onChange={e => setEditState(s => s ? { ...s, caption: e.target.value } : s)}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                style={{ borderColor: "var(--card-border)", background: "var(--background)" }} />
              <input type="text" placeholder="Source..." value={editState.source}
                onChange={e => setEditState(s => s ? { ...s, source: e.target.value } : s)}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                style={{ borderColor: "var(--card-border)", background: "var(--background)" }} />
              <div className="flex gap-2">
                {(["small", "medium", "large", "full"] as ImageSize[]).map(s => (
                  <button key={s} onClick={() => setEditState(st => st ? { ...st, size: s } : st)}
                    className="flex-1 py-1.5 rounded-lg text-xs border transition-colors"
                    style={{ background: editState.size === s ? "var(--accent)" : "transparent", color: editState.size === s ? "white" : "var(--muted)", borderColor: editState.size === s ? "var(--accent)" : "var(--card-border)" }}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={saveEdit} disabled={savingEdit}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold text-white"
                  style={{ background: savingEdit ? "var(--card-border)" : "var(--accent)" }}>
                  {savingEdit ? "..." : "Enregistrer"}
                </button>
                <button onClick={() => setEditState(null)} className="px-4 py-2 rounded-xl text-sm border"
                  style={{ borderColor: "var(--card-border)", color: "var(--muted)" }}>Annuler</button>
              </div>
            </section>
          )}

          {/* 3. METADATA */}
          <section>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--muted)" }}>3. Métadonnées</h3>
              {currentSrc && (
                <button onClick={generateWithAI} disabled={aiLoading}
                  className="px-3 py-1 rounded-lg text-xs font-medium border transition-colors"
                  style={{ borderColor: "var(--accent)", color: aiLoading ? "var(--muted)" : "var(--accent)" }}>
                  {aiLoading ? "..." : "✨ Générer"}
                </button>
              )}
            </div>
            <div className="space-y-2">
              <textarea placeholder="Légende (cliquer ✨ Générer pour remplir automatiquement)" value={caption} onChange={e => setCaption(e.target.value)}
                rows={3}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none resize-none"
                style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }} />
              <input type="text" placeholder="URL source (optionnel)" value={sourceUrl} onChange={e => setSourceUrl(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none font-mono text-xs"
                style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }} />
              <div className="flex gap-1.5">
                {(["small", "medium", "large", "full"] as ImageSize[]).map(s => (
                  <button key={s} onClick={() => setSize(s)}
                    className="flex-1 py-1.5 rounded-lg text-xs border transition-colors"
                    style={{ background: size === s ? "var(--accent)" : "transparent", color: size === s ? "white" : "var(--muted)", borderColor: size === s ? "var(--accent)" : "var(--card-border)" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 p-4 border-t space-y-2" style={{ background: "var(--background)", borderColor: "var(--card-border)" }}>
          {status === "success" && <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "#dcfce7", color: "#166534" }}>Image insérée !</div>}
          {status === "error" && <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "#fef2f2", color: "#991b1b" }}>Erreur</div>}
          {!canInsert && (
            <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "var(--card-bg)", color: "var(--muted)" }}>
              Manque : {[!currentSrc && "image", selectedBlock === null && "emplacement"].filter(Boolean).join(", ")}
            </div>
          )}
          <button onClick={handleInsert} disabled={!canInsert || saving}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
            style={{ background: canInsert && !saving ? "var(--accent)" : "var(--card-border)", color: canInsert && !saving ? "white" : "var(--muted)", cursor: canInsert && !saving ? "pointer" : "not-allowed" }}>
            {saving ? "Insertion..." : "Insérer l'image"}
          </button>
        </div>
      </div>
    </div>
  );
}
