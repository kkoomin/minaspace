import type { Metadata } from "next";
import ResumeDownLoadButton from "@/components/ResumeDownLoadButton";
import resumeData from "@/content/resume/resumeData";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  const { name, name_en, role, contact, skills, experiences, education } =
    resumeData;

  return (
    <main
      className="relative mx-auto min-h-[calc(100vh-52px)] max-w-[640px] px-6 py-12 lg:max-w-[860px]"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="absolute top-6 right-6">
        <ResumeDownLoadButton />
      </div>

      {/* 헤더 */}
      <div className="mb-9">
        <h1
          className="mb-1 text-[22px] font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          {name} {name_en}
        </h1>
        <p
          className="mb-3 text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {role}
        </p>
        <div
          className="flex flex-wrap gap-4 font-mono text-xs"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <a
            href={`mailto:${contact.email}`}
            style={{ color: "inherit" }}
            className="hover:opacity-70 transition-opacity"
          >
            {contact.email}
          </a>
          <span>{contact.phone}</span>
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit" }}
              className="hover:opacity-70 transition-opacity"
            >
              linkedin
            </a>
          )}
          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit" }}
              className="hover:opacity-70 transition-opacity"
            >
              github
            </a>
          )}
        </div>
      </div>

      {/* Experience */}
      <section className="resume-section mb-8">
        <h2
          className="resume-section-title mb-4 border-b pb-2 text-[11px] font-medium uppercase tracking-[0.07em]"
          style={{
            color: "var(--color-text-tertiary)",
            borderColor: "var(--color-border)",
          }}
        >
          Experience
        </h2>

        {experiences.map((exp, i) => (
          <div
            key={exp.company}
            className={`exp-item ${i < experiences.length - 1 ? "mb-5" : ""}`}
          >
            <div className="flex items-baseline justify-between gap-3 mb-0.5">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                {exp.company}
              </span>
              <span
                className="shrink-0 font-mono text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {exp.period}
              </span>
            </div>
            <p
              className="mb-1.5 text-[13px]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {exp.title}
            </p>
            <ul className="flex flex-col gap-1 pl-3.5">
              {exp.achievements.map((item) => (
                <li
                  key={item}
                  className="relative text-[13px] leading-[1.55] list-none"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  <span
                    className="absolute -left-3.5"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Skills */}
      <section className="resume-section mb-8">
        <h2
          className="resume-section-title mb-4 border-b pb-2 text-[11px] font-medium uppercase tracking-[0.07em]"
          style={{
            color: "var(--color-text-tertiary)",
            borderColor: "var(--color-border)",
          }}
        >
          Skills
        </h2>

        {skills.map((skillGroup, i) => (
          <div
            key={skillGroup.category}
            className={i < skills.length - 1 ? "mb-2.5" : ""}
          >
            <p
              className="mb-1.5 text-xs"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              {skillGroup.category}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {skillGroup.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded border px-[9px] py-[3px] text-xs"
                  style={{
                    background: "var(--color-bg-secondary)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="resume-section mb-8">
        <h2
          className="resume-section-title mb-4 border-b pb-2 text-[11px] font-medium uppercase tracking-[0.07em]"
          style={{
            color: "var(--color-text-tertiary)",
            borderColor: "var(--color-border)",
          }}
        >
          Education
        </h2>

        {education.map((edu, i) => (
          <div
            key={edu.school}
            className={`exp-item ${i < education.length - 1 ? "mb-5" : ""}`}
          >
            <div className="flex items-baseline justify-between gap-3 mb-0.5">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--color-text-primary)" }}
              >
                {edu.school}
              </span>
              <span
                className="shrink-0 font-mono text-xs"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {edu.graduated}
              </span>
            </div>
            <p
              className="text-[13px]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {edu.degree}
            </p>
          </div>
        ))}
      </section>
    </main>
  );
}
