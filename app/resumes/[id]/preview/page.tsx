import { PreviewClient } from "./PreviewClient";

interface PreviewPageProps {
  params: Promise<{ id: string }>;
}

export default async function ResumePreviewPage({ params }: PreviewPageProps) {
  const { id } = await params;
  return <PreviewClient resumeId={id} />;
}
