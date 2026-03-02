import type { Resume } from "@/types/resume";
import { generateMomoTypst, type Lang } from "./momo";

export type { Lang };

export interface TemplateOptions {
  lang: Lang;
}

export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  fontLabel: string;
  accentColor: string;
  supportsLang: boolean;
  generate: (resume: Resume, options: TemplateOptions) => string;
}

export const TEMPLATES: TemplateInfo[] = [
  {
    id: "momo",
    name: "Momo",
    description:
      "Elegant serif layout with teal-accented section headers and a date-aligned entry grid. Supports English and Spanish.",
    fontLabel: "Libertinus Serif",
    accentColor: "#4C8C7A",
    supportsLang: true,
    generate: (resume, { lang }) => generateMomoTypst(resume, lang),
  },
];

export function getTemplate(id: string): TemplateInfo {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}
