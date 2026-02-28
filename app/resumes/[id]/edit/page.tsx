import { notFound } from "next/navigation";
import { mockResumes } from "@/lib/mock-data";
import { EditResumeClient } from "./EditResumeClient";

interface EditResumePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditResumePage({ params }: EditResumePageProps) {
  const { id } = await params;
  const resume = mockResumes.find((r) => r.id === id);
  if (!resume) notFound();

  return <EditResumeClient resume={resume} />;
}
