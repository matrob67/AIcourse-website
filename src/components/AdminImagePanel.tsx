"use client";

import { useState, useRef, useCallback, useEffect } from "react";

type ImageSize = "small" | "medium" | "large" | "full";

interface Block {
  index: number;
  text: string;
}

interface EditState {
  blockIndex: number;
  caption: string;
  source: string;
  sourceUrl: string;
  alt: string;
  size: ImageSize;
}

export default function AdminImagePanel({ partId, slug }: { partId: string; slug: string }) {
  const [open, setOpen] = useState(false);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loadingBlocks, setLoadingBlocks] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  const [inputMode, setInputMode] = useState<"url" | "paste">("url");
  const [imageUrl, setImageUrl] = useState("");
  const [pastedImage, setPastedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [alt, setAlt] = useState("");
  const [caption, setCaption] = useState("");
  const [source, setSource] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [size, setSize] = useState<ImageSize>("large");

  const [aiModel, setAiModel] = useState("mistral-small-latest");
  const [aiLoading, setAiLoading] = useState(false);

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  // Edit panel (separate from insert)
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

  const currentSrc = inputMode === "url" ? imageUrl : pastedImage;

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
        if (data.source) setSource(data.source);
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
        setAlt(""); setCaption(""); setSource(""); setSourceUrl(""); setSelectedBlock(null);
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
      <div className="relative ml-auto w-full max-w-2xl h-full overflow-y-auto shadow-2xl flex flex-col"
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

          {/* 1. IMAGE */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>1. Image</h3>
            <div className="flex gap-2 mb-3">
              {(["url", "paste"] as const).map(mode => (
                <button key={mode}
                  onClick={() => { setInputMode(mode); if (mode === "url") { setPastedImage(null); setImagePreview(imageUrl); } else setImagePreview(pastedImage || ""); }}
                  className="flex-1 py-2 rounded-lg text-sm font-medium border transition-colors"
                  style={{ background: inputMode === mode ? "var(--accent)" : "transparent", color: inputMode === mode ? "white" : "var(--muted)", borderColor: inputMode === mode ? "var(--accent)" : "var(--card-border)" }}>
                  {mode === "url" ? "🔗 URL" : "📋 Coller / Glisser"}
                </button>
              ))}
            </div>
            {inputMode === "url" && (
              <input type="text" placeholder="https://..." value={imageUrl} onChange={e => setImageUrl(e.target.value)}
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none font-mono"
                style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }} />
            )}
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
                    <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>ou cliquer pour choisir un fichier</p>
                  </div>
                )}
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) uploadFile(f); }} />
            {imagePreview && (
              <div className="mt-3 rounded-lg border overflow-hidden" style={{ borderColor: "var(--card-border)" }}>
                <div className="px-3 py-1.5 text-xs border-b" style={{ color: "var(--muted)", borderColor: "var(--card-border)", background: "var(--card-bg)" }}>Aperçu</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="preview" className="w-full object-contain max-h-48" onError={() => setImagePreview("")} />
              </div>
            )}
          </section>

          {/* 2. BLOCKS */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>
              2. Contenu de la page
            </h3>
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
                      borderColor: "var(--card-border)",
                      cursor: isImage ? "default" : "pointer",
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
                          <button
                            onClick={() => isEditingThis ? setEditState(null) : openEdit(block)}
                            className="px-2 py-1 rounded text-[10px] font-medium border transition-colors"
                            style={{ borderColor: "var(--card-border)", color: isEditingThis ? "white" : "var(--accent)", background: isEditingThis ? "var(--accent)" : "transparent" }}>
                            {isEditingThis ? "✕ Fermer" : "Modifier"}
                          </button>
                          <button
                            onClick={() => { if (confirm("Supprimer cette image ?")) handleDeleteImage(block.index); }}
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
                      <div className="mt-1 text-xs font-medium" style={{ color: "var(--accent)" }}>↓ image insérée ici</div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* EDIT PANEL — shown outside list when an image is selected for editing */}
          {editState && (
            <section className="rounded-xl border p-4 space-y-3" style={{ borderColor: "var(--accent)", background: "rgba(99,102,241,0.04)" }}>
              <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--accent)" }}>
                ✏️ Modifier l&apos;image
              </h3>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Légende</label>
                <input type="text" placeholder="Légende..." value={editState.caption}
                  onChange={e => setEditState(s => s ? { ...s, caption: e.target.value } : s)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--card-border)", background: "var(--background)" }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Source</label>
                <input type="text" placeholder="Source..." value={editState.source}
                  onChange={e => setEditState(s => s ? { ...s, source: e.target.value } : s)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--card-border)", background: "var(--background)" }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>URL source</label>
                <input type="text" placeholder="https://..." value={editState.sourceUrl}
                  onChange={e => setEditState(s => s ? { ...s, sourceUrl: e.target.value } : s)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none font-mono text-xs"
                  style={{ borderColor: "var(--card-border)", background: "var(--background)" }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Taille</label>
                <div className="flex gap-2">
                  {(["small", "medium", "large", "full"] as ImageSize[]).map(s => (
                    <button key={s} onClick={() => setEditState(st => st ? { ...st, size: s } : st)}
                      className="flex-1 py-1.5 rounded-lg text-xs border transition-colors"
                      style={{ background: editState.size === s ? "var(--accent)" : "transparent", color: editState.size === s ? "white" : "var(--muted)", borderColor: editState.size === s ? "var(--accent)" : "var(--card-border)" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-1">
                <button onClick={saveEdit} disabled={savingEdit}
                  className="flex-1 py-2 rounded-xl text-sm font-semibold text-white transition-colors"
                  style={{ background: savingEdit ? "var(--card-border)" : "var(--accent)" }}>
                  {savingEdit ? "Enregistrement..." : "Enregistrer les modifications"}
                </button>
                <button onClick={() => setEditState(null)}
                  className="px-4 py-2 rounded-xl text-sm border transition-colors"
                  style={{ borderColor: "var(--card-border)", color: "var(--muted)" }}>
                  Annuler
                </button>
              </div>
            </section>
          )}

          {/* 3. METADATA (for new image) */}
          <section>
            <h3 className="text-xs font-semibold uppercase tracking-wide mb-2" style={{ color: "var(--muted)" }}>3. Métadonnées (nouvelle image)</h3>
            {currentSrc && (
              <div className="flex items-center gap-2 mb-3 p-3 rounded-lg border" style={{ background: "var(--card-bg)", borderColor: "var(--card-border)" }}>
                <select value={aiModel} onChange={e => setAiModel(e.target.value)}
                  className="text-xs rounded border px-2 py-1.5 outline-none"
                  style={{ borderColor: "var(--card-border)", background: "var(--background)" }}>
                  <option value="mistral-small-latest">Mistral Small 4</option>
                  <option value="pixtral-large-latest">Pixtral Large</option>
                </select>
                <button onClick={generateWithAI} disabled={aiLoading}
                  className="flex-1 py-1.5 rounded-lg text-xs font-medium text-white"
                  style={{ background: aiLoading ? "var(--card-border)" : "var(--accent)" }}>
                  {aiLoading ? "Analyse..." : "✨ Générer avec Mistral"}
                </button>
              </div>
            )}
            <div className="space-y-3">
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Légende</label>
                <input type="text" placeholder="Ex : Figure 2 — Architecture BERT" value={caption} onChange={e => setCaption(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Source (optionnel)</label>
                <input type="text" placeholder="Ex : arXiv 1706.03762" value={source} onChange={e => setSource(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none"
                  style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>URL source (optionnel)</label>
                <input type="text" placeholder="https://..." value={sourceUrl} onChange={e => setSourceUrl(e.target.value)}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none font-mono text-xs"
                  style={{ borderColor: "var(--card-border)", background: "var(--card-bg)" }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "var(--muted)" }}>Taille</label>
                <div className="flex gap-2">
                  {(["small", "medium", "large", "full"] as ImageSize[]).map(s => (
                    <button key={s} onClick={() => setSize(s)}
                      className="flex-1 py-1.5 rounded-lg text-xs border transition-colors"
                      style={{ background: size === s ? "var(--accent)" : "transparent", color: size === s ? "white" : "var(--muted)", borderColor: size === s ? "var(--accent)" : "var(--card-border)" }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <div className="sticky bottom-0 p-4 border-t space-y-2" style={{ background: "var(--background)", borderColor: "var(--card-border)" }}>
          {status === "success" && <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "#dcfce7", color: "#166534" }}>Image insérée ! Rechargez pour voir.</div>}
          {status === "error" && <div className="text-xs px-3 py-2 rounded-lg" style={{ background: "#fef2f2", color: "#991b1b" }}>Erreur lors de l&apos;insertion.</div>}
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
