"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { saveResume } from "@/lib/db";
import type { Resume } from "@/types/resume";

function todayString() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default function NewResumePage() {
  const router = useRouter();

  useEffect(() => {
    const id = crypto.randomUUID();
    const resume: Resume = {
      id,
      title: "Untitled Resume",
      lastEdited: todayString(),
      personalInfo: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        city: "",
        country: "",
        summary: "",
      },
      education: [],
      experience: [],
      courses: [],
      projects: [],
    };
    saveResume(resume).then(() => {
      router.replace(`/resumes/${id}/edit`);
    });
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="font-body text-text-secondary text-[14px]">Creating resume…</p>
    </div>
  );
}
