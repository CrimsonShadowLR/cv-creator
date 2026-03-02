"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Download, Pencil } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { getResume } from "@/lib/db";
import { getTemplate } from "@/lib/templates";
import { compileToPdf } from "@/lib/typst-client";
import type { Resume } from "@/types/resume";

interface PreviewClientProps {
  resumeId: string;
}

export function PreviewClient({ resumeId }: PreviewClientProps) {
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [resumeNotFound, setResumeNotFound] = useState(false);
  const [downloading, setDownloading] = useState(false);

  async function handleDownloadPdf() {
    if (!resume) return;
    setDownloading(true);
    try {
      // Use the Momo template with English as the default for quick download.
      // For full template + language control, use the Generate page.
      const template = getTemplate("momo");
      const typstSource = template.generate(resume, { lang: "en" });
      const pdfBytes = await compileToPdf(typstSource);

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resume.title || "resume"}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      alert(
        err instanceof Error
          ? err.message
          : "Failed to generate PDF. Please try again.",
      );
    } finally {
      setDownloading(false);
    }
  }

  useEffect(() => {
    getResume(resumeId).then((r) => {
      if (!r) {
        setResumeNotFound(true);
        return;
      }
      setResume(r);
      setLoading(false);
    });
  }, [resumeId]);

  if (resumeNotFound) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center h-full gap-3">
          <p className="font-body text-text-secondary text-[14px]">Resume not found.</p>
          <Link href="/" className="font-body text-accent text-[14px] hover:underline">
            Go to Dashboard
          </Link>
        </div>
      </AppLayout>
    );
  }

  if (loading || !resume) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <p className="font-body text-text-secondary text-[14px]">Loading…</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-border-subtle bg-bg shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              href="/"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <ArrowLeft size={22} />
            </Link>
            <h1 className="font-heading text-[17px] md:text-[24px] font-bold text-text-primary">
              Resume Preview
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/resumes/${resumeId}/edit`}
              className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] border border-border-default text-text-secondary hover:bg-bg-surface transition-colors md:hidden"
            >
              <Pencil size={17} />
            </Link>
            <Link
              href={`/resumes/${resumeId}/edit`}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] border border-border-default text-text-primary font-body text-[14px] font-medium hover:bg-bg-surface transition-colors"
            >
              <Pencil size={16} />
              Edit
            </Link>
            <button
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-accent text-white font-body text-[13px] md:text-[14px] font-semibold hover:bg-indigo-600 transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <Download size={16} />
              <span className="hidden md:inline">
                {downloading ? "Generating…" : "Download PDF"}
              </span>
              <span className="md:hidden">{downloading ? "…" : "PDF"}</span>
            </button>
          </div>
        </div>

        {/* Paper */}
        <div className="flex-1 overflow-y-auto flex justify-center p-4 md:p-8 bg-bg-surface">
          <ResumePreview resume={resume} />
        </div>
      </div>
    </AppLayout>
  );
}
