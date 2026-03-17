import type { Metadata } from "next";
import ResumeDownLoadButton from "@/components/ResumeDownLoadButton";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <main
      className="relative mx-auto min-h-[calc(100vh-52px)] max-w-[640px] px-6 pb-20 pt-12"
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
          구민하 Minha Koo
        </h1>
        <p
          className="mb-3 text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          프론트엔드 개발자
        </p>
        <div
          className="flex flex-wrap gap-4 font-mono text-xs"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          <a
            href="mailto:minha.koo.9@gmail.com"
            style={{ color: "inherit" }}
            className="hover:opacity-70 transition-opacity"
          >
            minha.koo.9@gmail.com
          </a>
          <span>+82 10 7139 5028</span>
          <a
            href="https://linkedin.com/in/minha-koo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit" }}
            className="hover:opacity-70 transition-opacity"
          >
            linkedin
          </a>
          <a
            href="https://github.com/kkoomin"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit" }}
            className="hover:opacity-70 transition-opacity"
          >
            github
          </a>
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

        <div className="exp-item mb-5">
          <div className="flex items-baseline justify-between gap-3 mb-0.5">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              (주)에스엘디티 · 솔드아웃
            </span>
            <span
              className="shrink-0 font-mono text-xs"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              2023.02 — 2024.05
            </span>
          </div>
          <p
            className="mb-1.5 text-[13px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            프론트엔드 개발자 · 플랫폼 파트
          </p>
          <ul className="flex flex-col gap-1 pl-3.5">
            {[
              "판매/결제 페이지 Nuxt → Next.js 마이그레이션",
              "중고상품 거래 서비스 신규 기능 개발 및 Zustand 스토어 리팩터링",
              "APP WebView 영역 기능 개발 및 고도화",
            ].map((item) => (
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

        <div className="exp-item mb-5">
          <div className="flex items-baseline justify-between gap-3 mb-0.5">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              (주)루나소프트
            </span>
            <span
              className="shrink-0 font-mono text-xs"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              2020.09 — 2023.01
            </span>
          </div>
          <p
            className="mb-1.5 text-[13px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            프론트엔드 개발자 · 솔루션개발팀
          </p>
          <ul className="flex flex-col gap-1 pl-3.5">
            {[
              "글로벌 상담센터 TF 파트너스센터 어드민 초기 개발",
              "광고 관리 어드민 Angular → React 마이그레이션",
              "이커머스 마케팅 솔루션 어드민 리빌딩",
            ].map((item) => (
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

        <div className="mb-2.5">
          <p
            className="mb-1.5 text-xs"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            Languages &amp; Frameworks
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["Next.js", "React", "TypeScript", "Vue.js", "Nuxt"].map(
              (skill) => (
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
              ),
            )}
          </div>
        </div>

        <div>
          <p
            className="mb-1.5 text-xs"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            Libraries &amp; Tools
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              "TanStack Query",
              "Zustand",
              "React Hook Form",
              "Tailwind CSS",
            ].map((skill) => (
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

        <div className="exp-item mb-5">
          <div className="flex items-baseline justify-between gap-3 mb-0.5">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              FlatIron School London
            </span>
            <span
              className="shrink-0 font-mono text-xs"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              2019.04 수료
            </span>
          </div>
          <p
            className="text-[13px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Software Engineering Course
          </p>
        </div>

        <div className="exp-item">
          <div className="flex items-baseline justify-between gap-3 mb-0.5">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              이화여자대학교
            </span>
            <span
              className="shrink-0 font-mono text-xs"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              2017.08 졸업
            </span>
          </div>
          <p
            className="text-[13px]"
            style={{ color: "var(--color-text-secondary)" }}
          >
            국어국문학과, 경영학과
          </p>
        </div>
      </section>
    </main>
  );
}
