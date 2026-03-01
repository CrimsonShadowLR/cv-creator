import { EditResumeClient } from "./EditResumeClient";

interface EditResumePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditResumePage({ params }: EditResumePageProps) {
  const { id } = await params;
  return <EditResumeClient resumeId={id} />;
}
