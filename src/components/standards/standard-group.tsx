import Link from "next/link";
import type { TeksGroup } from "@/lib/teks";
import { citationLine } from "@/lib/teks";

export function StandardGroup({ group }: { group: TeksGroup }) {
  return (
    <article className="border-t border-rule py-8 first:border-t-0">
      <div className="mb-3 flex items-baseline gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-tutor">
          {group.knowledge_skill_code}
        </span>
        {group.strand && (
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
            {group.subject} · Grade {group.grade} · {group.strand}
          </span>
        )}
      </div>

      <Link
        href={`/standards/${encodeURIComponent(group.knowledge_skill_code)}`}
        className="group block no-underline"
      >
        <h2 className="font-serif text-[24px] font-medium leading-[1.2] tracking-[-0.01em] text-ink group-hover:underline">
          {group.knowledge_skill_text}
        </h2>
      </Link>

      <details className="mt-4 group">
        <summary className="cursor-pointer list-none font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute hover:text-ink select-none">
          <span className="inline-block w-3 transition-transform group-open:rotate-90">
            ›
          </span>{" "}
          {group.expectations.length} student expectation
          {group.expectations.length === 1 ? "" : "s"}
        </summary>

        <ul className="mt-4 space-y-3">
          {group.expectations.map((e) => (
            <li
              key={e.id}
              className="grid grid-cols-[64px_1fr] gap-4 border-l-2 border-rule pl-4"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-tutor pt-1">
                {e.code}
              </span>
              <p className="font-serif text-[17px] leading-[1.5] text-ink">
                {e.text}
              </p>
            </li>
          ))}
        </ul>
      </details>

      <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
        {citationLine(group)}
      </div>
    </article>
  );
}
