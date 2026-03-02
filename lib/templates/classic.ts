import type { Resume } from "@/types/resume";
import { generateTypst } from "@/lib/typst-template";

export function generateClassicTypst(resume: Resume): string {
  return generateTypst(resume);
}
