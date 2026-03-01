"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, Save, Check } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { PersonalInfoForm } from "@/components/forms/PersonalInfoForm";
import { EducationSection } from "@/components/forms/EducationSection";
import { ExperienceSection } from "@/components/forms/ExperienceSection";
import { CoursesSection } from "@/components/forms/CoursesSection";
import { ProjectsSection } from "@/components/forms/ProjectsSection";
import { getResume, saveResume } from "@/lib/db";
import type { Resume } from "@/types/resume";

const TABS = [
  { key: "personal", label: "Personal Info" },
  { key: "education", label: "Education" },
  { key: "experience", label: "Experience" },
  { key: "courses", label: "Courses" },
  { key: "projects", label: "Projects" },
] as const;

type TabKey = (typeof TABS)[number]["key"];

function todayString() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

interface EditResumeClientProps {
  resumeId: string;
}

export function EditResumeClient({ resumeId }: EditResumeClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabKey>("personal");
  const [resume, setResume] = useState<Resume | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    getResume(resumeId).then((r) => {
      if (!r) {
        router.replace("/");
        return;
      }
      setResume(r);
      setLoading(false);
    });
  }, [resumeId, router]);

  const persistResume = async (updated: Resume) => {
    const withDate = { ...updated, lastEdited: todayString() };
    setSaveStatus("saving");
    await saveResume(withDate);
    setResume(withDate);
    setSaveStatus("saved");
    setTimeout(() => setSaveStatus("idle"), 2000);
  };

  const updatePersonal = async (personalInfo: Resume["personalInfo"]) => {
    if (!resume) return;
    await persistResume({ ...resume, personalInfo });
  };

  const updateSection = async <K extends "education" | "experience" | "courses" | "projects">(
    key: K,
    value: Resume[K]
  ) => {
    if (!resume) return;
    await persistResume({ ...resume, [key]: value });
  };

  const handleSaveClick = () => {
    if (!resume || activeTab === "personal") return;
    persistResume(resume);
  };

  if (loading || !resume) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center h-full">
          <p className="font-body text-text-secondary text-[14px]">Loading…</p>
        </div>
      </AppLayout>
    );
  }

  const SaveIcon = saveStatus === "saved" ? Check : Save;
  const saveLabel =
    saveStatus === "saving" ? "Saving…" : saveStatus === "saved" ? "Saved!" : "Save";

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 md:px-8 py-4 md:py-5 border-b border-border-subtle bg-bg shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              <ArrowLeft size={22} />
            </button>
            <h1 className="font-heading text-[17px] md:text-[24px] font-bold text-text-primary">
              <span className="hidden md:inline">Edit Resume — </span>
              {TABS.find((t) => t.key === activeTab)?.label}
            </h1>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <Button
              variant="outline"
              icon={Eye}
              onClick={() => router.push(`/resumes/${resume.id}/preview`)}
            >
              <span className="hidden md:inline">Preview</span>
            </Button>
            <Button
              variant="primary"
              icon={SaveIcon}
              form={activeTab === "personal" ? "personal-info-form" : undefined}
              type={activeTab === "personal" ? "submit" : "button"}
              onClick={activeTab !== "personal" ? handleSaveClick : undefined}
              disabled={saveStatus === "saving"}
            >
              {saveLabel}
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border-subtle bg-bg shrink-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 md:px-5 py-3 font-body text-[13px] md:text-[14px] whitespace-nowrap shrink-0 border-b-2 transition-colors cursor-pointer ${
                activeTab === tab.key
                  ? "border-accent text-accent font-semibold"
                  : "border-transparent text-text-tertiary font-medium hover:text-text-secondary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8">
          <div className="max-w-3xl mx-auto w-full">
            {activeTab === "personal" && (
              <PersonalInfoForm
                defaultValues={resume.personalInfo}
                onSubmit={updatePersonal}
                formId="personal-info-form"
              />
            )}
            {activeTab === "education" && (
              <EducationSection
                items={resume.education}
                onChange={(education) => updateSection("education", education)}
              />
            )}
            {activeTab === "experience" && (
              <ExperienceSection
                items={resume.experience}
                onChange={(experience) => updateSection("experience", experience)}
              />
            )}
            {activeTab === "courses" && (
              <CoursesSection
                items={resume.courses}
                onChange={(courses) => updateSection("courses", courses)}
              />
            )}
            {activeTab === "projects" && (
              <ProjectsSection
                items={resume.projects}
                onChange={(projects) => updateSection("projects", projects)}
              />
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
