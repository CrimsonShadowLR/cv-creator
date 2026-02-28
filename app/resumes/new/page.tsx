import { redirect } from "next/navigation";

// For now, redirect to editing the first resume.
// In a real app this would create a new resume record first.
export default function NewResumePage() {
  redirect("/resumes/1/edit");
}
