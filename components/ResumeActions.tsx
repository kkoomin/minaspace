"use client";

import { Download } from "lucide-react";

export default function ResumeActions() {
  return (
    <button
      onClick={() => window.print()}
      className="print-hidden mb-8 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors"
      style={{
        borderColor: "var(--color-border)",
        color: "var(--color-text-secondary)",
        background: "var(--color-bg-secondary)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border-strong)";
        e.currentTarget.style.color = "var(--color-text-primary)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border)";
        e.currentTarget.style.color = "var(--color-text-secondary)";
      }}
    >
      <Download size={12} />
      PDF로 저장
    </button>
  );
}
