import Link from "next/link";
import { Plus } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { ResumeCard } from "@/components/resume/ResumeCard";
import { mockResumes } from "@/lib/mock-data";

export default function DashboardPage() {
  const total = mockResumes.length;
  const completed = 3;
  const inProgress = total - completed;

  return (
    <AppLayout>
      <div className="p-5 md:p-8 flex flex-col gap-7 max-w-5xl mx-auto w-full">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-[22px] md:text-[28px] font-bold text-text-primary">
              Welcome back, Alex
            </h1>
            <p className="font-body text-[14px] md:text-[15px] text-text-secondary">
              Here&apos;s an overview of your resumes
            </p>
          </div>
          <Link
            href="/resumes/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent text-white rounded-[var(--radius-md)] font-body text-[14px] font-semibold hover:bg-indigo-600 transition-colors shrink-0"
          >
            <Plus size={16} strokeWidth={2.5} />
            New Resume
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <div className="bg-bg rounded-[var(--radius-lg)] border border-border-subtle p-4 md:p-5 flex flex-col gap-1">
            <p className="font-heading text-[28px] md:text-[32px] font-extrabold text-text-primary">{total}</p>
            <p className="font-body text-[12px] md:text-[13px] text-text-secondary">Total Resumes</p>
          </div>
          <div className="bg-bg rounded-[var(--radius-lg)] border border-border-subtle p-4 md:p-5 flex flex-col gap-1">
            <p className="font-heading text-[28px] md:text-[32px] font-extrabold text-accent">{completed}</p>
            <p className="font-body text-[12px] md:text-[13px] text-text-secondary">Completed</p>
          </div>
          <div className="bg-bg rounded-[var(--radius-lg)] border border-border-subtle p-4 md:p-5 flex flex-col gap-1">
            <p className="font-heading text-[28px] md:text-[32px] font-extrabold text-warning">{inProgress}</p>
            <p className="font-body text-[12px] md:text-[13px] text-text-secondary">In Progress</p>
          </div>
        </div>

        {/* Recent Resumes */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-[17px] md:text-[20px] font-bold text-text-primary">
              Recent Resumes
            </h2>
            <Link href="/resumes" className="font-body text-[13px] text-accent font-medium hover:underline">
              See All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockResumes.map((resume) => (
              <ResumeCard
                key={resume.id}
                id={resume.id}
                title={resume.title}
                lastEdited={`Last edited: ${resume.lastEdited}`}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
