import { TemplatesClient } from "./TemplatesClient";

interface TemplatesPageProps {
  searchParams: Promise<{ resume?: string }>;
}

export default async function TemplatesPage({
  searchParams,
}: TemplatesPageProps) {
  const { resume } = await searchParams;
  return <TemplatesClient initialResumeId={resume} />;
}
