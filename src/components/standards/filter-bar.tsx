"use client";

import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

type Props = {
  subjects: string[];
  grades: string[];
  defaults: { subject?: string; grade?: string; q?: string };
};

export function FilterBar({ subjects, grades, defaults }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const search = useSearchParams();
  const [, startTransition] = useTransition();

  const [q, setQ] = useState(defaults.q ?? "");

  // Debounce text search → URL.
  useEffect(() => {
    const handle = setTimeout(() => push("q", q), 250);
    return () => clearTimeout(handle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  function push(key: string, value: string) {
    const params = new URLSearchParams(search.toString());
    if (!value || value === "all") params.delete(key);
    else params.set(key, value);
    startTransition(() => {
      router.replace(`${pathname}${params.size ? `?${params}` : ""}`, {
        scroll: false,
      });
    });
  }

  return (
    <div className="grid gap-4 border-y border-rule py-6 md:grid-cols-[200px_180px_1fr]">
      <div className="field-stack">
        <label className="ep-label" htmlFor="subject">
          Subject
        </label>
        <select
          id="subject"
          className="ep-input"
          defaultValue={defaults.subject ?? "all"}
          onChange={(e) => push("subject", e.currentTarget.value)}
        >
          <option value="all">All subjects</option>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="field-stack">
        <label className="ep-label" htmlFor="grade">
          Grade
        </label>
        <select
          id="grade"
          className="ep-input"
          defaultValue={defaults.grade ?? "all"}
          onChange={(e) => push("grade", e.currentTarget.value)}
        >
          <option value="all">All grades</option>
          {grades.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <div className="field-stack">
        <label className="ep-label" htmlFor="q">
          Search
        </label>
        <div className="relative">
          <Search
            aria-hidden
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute"
            size={16}
          />
          <input
            id="q"
            type="search"
            placeholder="Search statements and student expectations…"
            className="ep-input"
            style={{ paddingLeft: 36 }}
            value={q}
            onChange={(e) => setQ(e.currentTarget.value)}
          />
        </div>
      </div>
    </div>
  );
}
