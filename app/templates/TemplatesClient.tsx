"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Download, Languages, LayoutTemplate, User } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { getAllResumes } from "@/lib/db";
import { TEMPLATES, getTemplate } from "@/lib/templates";
import { compileToPdf } from "@/lib/typst-client";
import type { Resume } from "@/types/resume";
import type { Lang } from "@/lib/templates";

interface TemplatesClientProps {
  initialResumeId?: string;
}

export function TemplatesClient({ initialResumeId }: TemplatesClientProps) {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>(
    initialResumeId ?? "",
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>("momo");
  const [lang, setLang] = useState<Lang>("en");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllResumes().then((data) => {
      setResumes(data);
      if (!initialResumeId && data.length > 0) {
        setSelectedResumeId(data[0].id);
      }
      setLoading(false);
    });
  }, [initialResumeId]);

  const selectedTemplate =
    TEMPLATES.find((t) => t.id === selectedTemplateId) ?? TEMPLATES[0];
  const selectedResume =
    resumes.find((r) => r.id === selectedResumeId) ?? null;

  async function handleGenerate() {
    if (!selectedResume) return;
    setGenerating(true);
    setError(null);
    try {
      const template = getTemplate(selectedTemplateId);
      const typstSource = template.generate(selectedResume, { lang });

      // Compile entirely in the browser via WASM.
      // First call downloads ~11 MB from CDN (cached by the browser thereafter).
      const pdfBytes = await compileToPdf(typstSource);

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedResume.title || "resume"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate PDF.",
      );
    } finally {
      setGenerating(false);
    }
  }

  if (loading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <p className="font-body text-text-secondary text-[14px]">
            Loading…
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col lg:flex-row h-full overflow-hidden">
        {/* ── LEFT: Options panel ──────────────────────────────── */}
        <div className="w-full lg:w-[340px] shrink-0 border-b lg:border-b-0 lg:border-r border-border-subtle bg-bg overflow-y-auto p-6 flex flex-col gap-6">
          {/* Heading */}
          <div>
            <h1 className="font-heading text-[22px] font-bold text-text-primary">
              Generate CV
            </h1>
            <p className="font-body text-[13px] text-text-secondary mt-1">
              Choose a profile and template, then download your PDF.
            </p>
          </div>

          {/* 1 · Profile */}
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-1.5">
              <User size={13} className="text-text-tertiary" />
              <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
                Profile
              </span>
            </label>
            {resumes.length === 0 ? (
              <p className="font-body text-[13px] text-text-secondary">
                No resumes yet.{" "}
                <Link href="/resumes/new" className="text-accent underline">
                  Create one
                </Link>
                .
              </p>
            ) : (
              <select
                value={selectedResumeId}
                onChange={(e) => setSelectedResumeId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-[var(--radius-sm)] border border-border-default bg-bg text-text-primary font-body text-[13px] focus:outline-none focus:border-accent"
              >
                {resumes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* 2 · Template */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5">
              <LayoutTemplate size={13} className="text-text-tertiary" />
              <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
                Template
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {TEMPLATES.map((tpl) => {
                const active = tpl.id === selectedTemplateId;
                return (
                  <button
                    key={tpl.id}
                    onClick={() => setSelectedTemplateId(tpl.id)}
                    className={`flex flex-col gap-1.5 text-left px-4 py-3 rounded-[var(--radius-md)] border transition-colors cursor-pointer ${
                      active
                        ? "border-accent bg-accent-light"
                        : "border-border-default bg-bg hover:bg-bg-surface"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p
                        className={`font-body text-[14px] font-semibold ${
                          active ? "text-accent" : "text-text-primary"
                        }`}
                      >
                        {tpl.name}
                      </p>
                      <div className="flex items-center gap-2">
                        {tpl.supportsLang && (
                          <span className="text-[10px] font-body font-medium px-1.5 py-0.5 rounded bg-border-subtle text-text-tertiary">
                            EN/ES
                          </span>
                        )}
                        <div
                          className="w-3.5 h-3.5 rounded-full border border-white/20"
                          style={{ background: tpl.accentColor }}
                        />
                      </div>
                    </div>
                    <p className="font-body text-[11px] text-text-secondary leading-relaxed">
                      {tpl.description}
                    </p>
                    <p className="font-body text-[11px] text-text-tertiary">
                      {tpl.fontLabel}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 · Language (only if template supports it) */}
          {selectedTemplate.supportsLang && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                <Languages size={13} className="text-text-tertiary" />
                <span className="font-body text-[11px] font-semibold uppercase tracking-wide text-text-tertiary">
                  Language
                </span>
              </div>
              <div className="flex gap-2">
                {(["en", "es"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`flex-1 py-2 rounded-[var(--radius-sm)] font-body text-[13px] font-medium border transition-colors cursor-pointer ${
                      lang === l
                        ? "bg-accent text-white border-accent"
                        : "border-border-default text-text-secondary hover:bg-bg-surface"
                    }`}
                  >
                    {l === "en" ? "English" : "Español"}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <p className="font-body text-[12px] text-error leading-relaxed bg-error-bg px-3 py-2 rounded-[var(--radius-sm)]">
              {error}
            </p>
          )}

          {/* Generate button */}
          <div className="flex flex-col gap-1.5">
            <button
              onClick={handleGenerate}
              disabled={generating || !selectedResume}
              className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-[var(--radius-md)] bg-accent text-white font-body text-[14px] font-semibold hover:bg-indigo-600 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Download size={16} />
              {generating ? "Generating PDF…" : "Generate & Download PDF"}
            </button>
            {generating && (
              <p className="font-body text-[11px] text-text-tertiary text-center">
                First load fetches ~11 MB from CDN — cached after that.
              </p>
            )}
          </div>
        </div>

        {/* ── RIGHT: Resume preview ─────────────────────────────── */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center p-6 md:p-8 bg-bg-surface gap-4">
          <p className="font-body text-[11px] font-semibold uppercase tracking-wide text-text-tertiary self-start">
            Resume Preview
          </p>
          {selectedResume ? (
            <ResumePreview resume={selectedResume} />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="font-body text-[14px] text-text-secondary">
                Select a profile to see the preview
              </p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
