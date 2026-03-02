import { redirect } from "next/navigation";

export default function NewResumePage() {
  const id = crypto.randomUUID();
  redirect(`/resumes/${id}/edit`);
}
