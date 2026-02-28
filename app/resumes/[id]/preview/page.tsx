import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Download, Pencil } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ResumePreview } from "@/components/resume/ResumePreview";
import { mockResumes } from "@/lib/mock-data";

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResumePreviewPage({ params }: PreviewPageProps) {
  const { id } = await params;
  const resume = mockResumes.find((r) => r.id === id);
  if (!resume) notFound();

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-border-subtle bg-bg shrink-0">
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">
              <ArrowLeft size={22} />
            </Link>
            <h1 className="font-heading text-[17px] md:text-[24px] font-bold text-text-primary">
              Resume Preview
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={`/resumes/${id}/edit`}
              className="flex items-center justify-center w-9 h-9 rounded-[var(--radius-sm)] border border-border-default text-text-secondary hover:bg-bg-surface transition-colors md:hidden"
            >
              <Pencil size={17} />
            </Link>
            <Link
              href={`/resumes/${id}/edit`}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] border border-border-default text-text-primary font-body text-[14px] font-medium hover:bg-bg-surface transition-colors"
            >
              <Pencil size={16} />
              Edit
            </Link>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] bg-accent text-white font-body text-[13px] md:text-[14px] font-semibold hover:bg-indigo-600 transition-colors cursor-pointer">
              <Download size={16} />
              <span className="hidden md:inline">Download PDF</span>
              <span className="md:hidden">PDF</span>
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
