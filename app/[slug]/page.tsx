"use client";

import { useState, useEffect, useCallback, use } from "react";
import Link from "next/link";

interface ClipPageProps {
    params: Promise<{ slug: string }>;
}

export default function ClipPage({ params }: ClipPageProps) {
    const { slug } = use(params);
    const [content, setContent] = useState("");
    const [originalContent, setOriginalContent] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [clipExists, setClipExists] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    const showToast = useCallback((message: string, type: "success" | "error") => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    }, []);

    // Fetch existing clip on mount
    useEffect(() => {
        async function fetchClip() {
            try {
                const res = await fetch(`/api/clip/${slug}`);
                const data = await res.json();
                if (data.exists && data.content) {
                    setContent(data.content);
                    setOriginalContent(data.content);
                    setClipExists(true);
                }
            } catch {
                showToast("Failed to load clip", "error");
            } finally {
                setIsLoading(false);
            }
        }
        fetchClip();
    }, [slug, showToast]);

    const handleSave = async () => {
        if (!content.trim()) return;
        setIsSaving(true);
        try {
            const res = await fetch(`/api/clip/${slug}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ content }),
            });
            const data = await res.json();
            if (data.saved) {
                setOriginalContent(content);
                setClipExists(true);
                showToast("Clip saved! Expires in 24 hours.", "success");
            } else {
                showToast(data.error || "Failed to save", "error");
            }
        } catch {
            showToast("Network error — please try again", "error");
        } finally {
            setIsSaving(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            showToast("Copied to clipboard!", "success");
        } catch {
            showToast("Could not copy — try selecting manually", "error");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Delete this clip? This cannot be undone.")) return;
        setIsDeleting(true);
        try {
            const res = await fetch(`/api/clip/${slug}`, { method: "DELETE" });
            const data = await res.json();
            if (data.deleted) {
                setContent("");
                setOriginalContent(null);
                setClipExists(false);
                showToast("Clip deleted", "success");
            }
        } catch {
            showToast("Failed to delete clip", "error");
        } finally {
            setIsDeleting(false);
        }
    };

    const hasChanges = content !== (originalContent ?? "");

    return (
        <main className="app-container">
            <div className="card-wrapper card-wrapper-wide">
                <div className="card">
                    {/* Back link */}
                    <Link href="/" className="back-link" id="back-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        New clip
                    </Link>

                    {/* Header */}
                    <div className="clip-header">
                        <div>
                            <div className="clip-slug">/{slug}</div>
                            <div className="clip-url">bytesshare.vercel.app/{slug}</div>
                        </div>
                    </div>

                    {/* Status bar */}
                    <div className="status-bar">
                        <span className="status-label">Status</span>
                        {isLoading ? (
                            <span className="status-badge new">
                                <span className="spinner" style={{ width: 12, height: 12 }} />
                                Loading…
                            </span>
                        ) : clipExists ? (
                            <span className="status-badge exists">
                                <span className="status-dot" />
                                Clip exists
                            </span>
                        ) : (
                            <span className="status-badge new">
                                <span className="status-dot" />
                                New clip
                            </span>
                        )}
                    </div>

                    {/* Textarea */}
                    {isLoading ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: "4rem 0" }}>
                            <span className="spinner" />
                        </div>
                    ) : (
                        <>
                            <textarea
                                className="textarea"
                                placeholder="Paste your text here…"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                maxLength={50000}
                                spellCheck={false}
                                id="clip-textarea"
                            />
                            <div className="char-count">
                                {content.length.toLocaleString()} / 50,000
                            </div>
                        </>
                    )}

                    {/* Action buttons */}
                    {!isLoading && (
                        <div className="btn-group">
                            <button
                                className="btn btn-primary"
                                onClick={handleSave}
                                disabled={isSaving || !content.trim() || !hasChanges}
                                id="save-button"
                            >
                                {isSaving ? (
                                    <>
                                        <span className="spinner" />
                                        Saving…
                                    </>
                                ) : (
                                    <>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                                            <polyline points="17 21 17 13 7 13 7 21" />
                                            <polyline points="7 3 7 8 15 8" />
                                        </svg>
                                        Save
                                    </>
                                )}
                            </button>

                            <button
                                className="btn btn-secondary"
                                onClick={handleCopy}
                                disabled={!content}
                                id="copy-button"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                </svg>
                                Copy
                            </button>

                            {clipExists && (
                                <button
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                    id="delete-button"
                                >
                                    {isDeleting ? (
                                        <span className="spinner" style={{ borderTopColor: "var(--rose)" }} />
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                        </svg>
                                    )}
                                </button>
                            )}
                        </div>
                    )}

                    {/* Expiry info */}
                    <div className="expiry-info" style={{ marginTop: "1.25rem" }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <span>Clips auto-expire 24 hours after saving</span>
                    </div>
                </div>
            </div>

            {/* Toast notification */}
            {toast && (
                <div className={`toast show ${toast.type}`} role="alert">
                    {toast.message}
                </div>
            )}
        </main>
    );
}
