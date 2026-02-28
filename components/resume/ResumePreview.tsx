import type { Resume } from "@/types/resume";

interface ResumePreviewProps {
  resume: Resume;
}

export function ResumePreview({ resume }: ResumePreviewProps) {
  const { personalInfo, education, experience, courses, projects } = resume;

  return (
    <div className="bg-bg rounded-[var(--radius-md)] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-10 md:p-[40px_48px] w-full max-w-[680px] flex flex-col gap-7 font-body">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-[20px] md:text-[24px] font-bold text-text-primary">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        <p className="text-[11px] text-text-secondary">
          {personalInfo.email} | {personalInfo.phone}
        </p>
        <p className="text-[11px] text-text-secondary">
          {personalInfo.city}, {personalInfo.country}
        </p>
      </div>

      <hr className="border-border-subtle" />

      {/* Summary */}
      {personalInfo.summary && (
        <>
          <div className="flex flex-col gap-1.5">
            <h2 className="font-heading text-[12px] font-bold text-accent uppercase tracking-wide">
              Professional Summary
            </h2>
            <p className="text-[11px] text-text-secondary leading-relaxed">{personalInfo.summary}</p>
          </div>
          <hr className="border-border-subtle" />
        </>
      )}

      {/* Education */}
      {education.length > 0 && (
        <>
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-[12px] font-bold text-accent uppercase tracking-wide">
              Education
            </h2>
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <p className="text-[12px] font-semibold text-text-primary">{edu.degree} in {edu.field}</p>
                  <p className="text-[11px] text-text-secondary">{edu.institution}</p>
                </div>
                <p className="text-[11px] text-text-tertiary shrink-0">{edu.startDate} – {edu.endDate}</p>
              </div>
            ))}
          </div>
          <hr className="border-border-subtle" />
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <div className="flex flex-col gap-3">
            <h2 className="font-heading text-[12px] font-bold text-accent uppercase tracking-wide">
              Experience
            </h2>
            {experience.map((exp) => (
              <div key={exp.id} className="flex flex-col gap-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[12px] font-semibold text-text-primary">{exp.title}</p>
                    <p className="text-[11px] text-text-secondary">{exp.company}</p>
                  </div>
                  <p className="text-[11px] text-text-tertiary shrink-0">{exp.startDate} – {exp.endDate}</p>
                </div>
                {exp.description && (
                  <p className="text-[11px] text-text-secondary leading-relaxed">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
          <hr className="border-border-subtle" />
        </>
      )}

      {/* Courses */}
      {courses.length > 0 && (
        <>
          <div className="flex flex-col gap-2">
            <h2 className="font-heading text-[12px] font-bold text-accent uppercase tracking-wide">
              Courses &amp; Certifications
            </h2>
            {courses.map((c) => (
              <div key={c.id} className="flex justify-between items-start">
                <div>
                  <p className="text-[12px] font-semibold text-text-primary">{c.name}</p>
                  <p className="text-[11px] text-text-secondary">{c.provider}</p>
                </div>
                <p className="text-[11px] text-text-tertiary shrink-0">{c.date}</p>
              </div>
            ))}
          </div>
          <hr className="border-border-subtle" />
        </>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="font-heading text-[12px] font-bold text-accent uppercase tracking-wide">
            Projects
          </h2>
          {projects.map((p) => (
            <div key={p.id} className="flex flex-col gap-0.5">
              <p className="text-[12px] font-semibold text-text-primary">{p.name}</p>
              {p.url && <p className="text-[11px] text-accent">{p.url}</p>}
              {p.description && (
                <p className="text-[11px] text-text-secondary leading-relaxed">{p.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
