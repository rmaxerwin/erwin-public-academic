export type TeksRow = {
  id: string;
  subject: string;
  grade: string;
  strand: string | null;
  knowledge_skill_code: string;
  knowledge_skill_text: string;
  student_expectation_code: string | null;
  student_expectation_text: string | null;
  parent_id: string | null;
  year_adopted: number;
  source_url: string;
};

export type StudentExpectation = {
  id: string;
  code: string;
  text: string;
};

export type TeksGroup = {
  id: string;
  subject: string;
  grade: string;
  strand: string | null;
  knowledge_skill_code: string;
  knowledge_skill_text: string;
  year_adopted: number;
  source_url: string;
  expectations: StudentExpectation[];
};

/**
 * Natural sort key for a K&S code like "8.1", "8.10", "K.3", "HS-Geometry.1".
 * Falls back to lexicographic for unrecognized shapes.
 */
export function ksSortKey(code: string): [string, number] {
  const dot = code.lastIndexOf(".");
  if (dot < 0) return [code, 0];
  const head = code.slice(0, dot);
  const tail = parseInt(code.slice(dot + 1), 10);
  return [head, Number.isFinite(tail) ? tail : 0];
}

export function compareKsCodes(a: string, b: string): number {
  const [ah, an] = ksSortKey(a);
  const [bh, bn] = ksSortKey(b);
  if (ah !== bh) return ah.localeCompare(bh);
  return an - bn;
}

/**
 * Group raw teks_standards rows by knowledge_skill_code. Each group's
 * "header" row (parent_id is null, no SE code) carries metadata; child rows
 * (with SE code) become the expectations array.
 */
export function groupTeks(rows: TeksRow[]): TeksGroup[] {
  const groups = new Map<string, TeksGroup>();

  for (const r of rows) {
    if (r.student_expectation_code === null) {
      groups.set(r.knowledge_skill_code, {
        id: r.id,
        subject: r.subject,
        grade: r.grade,
        strand: r.strand,
        knowledge_skill_code: r.knowledge_skill_code,
        knowledge_skill_text: r.knowledge_skill_text,
        year_adopted: r.year_adopted,
        source_url: r.source_url,
        expectations: [],
      });
    }
  }

  for (const r of rows) {
    if (r.student_expectation_code === null) continue;
    const g = groups.get(r.knowledge_skill_code);
    if (!g) continue;
    g.expectations.push({
      id: r.id,
      code: r.student_expectation_code,
      text: r.student_expectation_text ?? "",
    });
  }

  for (const g of groups.values()) {
    g.expectations.sort((a, b) => a.code.localeCompare(b.code));
  }

  return [...groups.values()].sort((a, b) =>
    compareKsCodes(a.knowledge_skill_code, b.knowledge_skill_code),
  );
}

/**
 * Citation in the form `19 TAC §113.20 · Adopted 2022` when the source
 * URL points at a TAC chapter. Otherwise just `Adopted YYYY`.
 */
export function citationLine(group: { subject: string; grade: string; year_adopted: number }) {
  // Phase 1: only TEA Social Studies Grade 8 is seeded.
  if (group.subject === "Social Studies" && group.grade === "8") {
    return `SOURCE · 19 TAC §113.20 · Adopted ${group.year_adopted}`;
  }
  return `SOURCE · Adopted ${group.year_adopted}`;
}
