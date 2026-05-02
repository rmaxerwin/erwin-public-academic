import { SiteHeader } from "@/components/site-header";
import { FilterBar } from "@/components/standards/filter-bar";
import { StandardGroup } from "@/components/standards/standard-group";
import { createClient } from "@/lib/supabase/server";
import { compareKsCodes, groupTeks, type TeksRow } from "@/lib/teks";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{
  subject?: string;
  grade?: string;
  q?: string;
}>;

export default async function StandardsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const subject = params.subject;
  const grade = params.grade;
  const q = (params.q ?? "").trim();

  const supabase = await createClient();

  // Fetch all rows for the selected (subject, grade), then group + filter
  // by search in memory. With ~hundreds of rows per grade this is cheap.
  let query = supabase
    .from("teks_standards")
    .select("*")
    .order("knowledge_skill_code", { ascending: true });
  if (subject) query = query.eq("subject", subject);
  if (grade) query = query.eq("grade", grade);

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const rows = (data ?? []) as TeksRow[];
  let groups = groupTeks(rows);

  if (q) {
    const needle = q.toLowerCase();
    groups = groups
      .map((g) => {
        const ksHit = g.knowledge_skill_text.toLowerCase().includes(needle);
        const matchedSes = g.expectations.filter((e) =>
          e.text.toLowerCase().includes(needle),
        );
        if (ksHit) return g; // keep all SEs when the K&S itself matches
        if (matchedSes.length) return { ...g, expectations: matchedSes };
        return null;
      })
      .filter((g): g is NonNullable<typeof g> => g !== null);
  }

  groups.sort((a, b) =>
    compareKsCodes(a.knowledge_skill_code, b.knowledge_skill_code),
  );

  // Distinct subjects/grades for filter dropdowns (computed from a separate
  // unfiltered fetch so the dropdowns don't collapse as the user filters).
  const { data: allDistinct } = await supabase
    .from("teks_standards")
    .select("subject, grade")
    .is("student_expectation_code", null);

  const subjects = [
    ...new Set((allDistinct ?? []).map((r) => r.subject)),
  ].sort();
  const grades = [
    ...new Set((allDistinct ?? []).map((r) => r.grade)),
  ].sort((a, b) => {
    const an = parseInt(a, 10);
    const bn = parseInt(b, 10);
    if (Number.isFinite(an) && Number.isFinite(bn)) return an - bn;
    return a.localeCompare(b);
  });

  return (
    <>
      <SiteHeader current="/standards" />
      <main className="mx-auto w-full max-w-[var(--max)] px-[var(--gutter)] pb-24 pt-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
          — Standards
        </div>
        <h1 className="mt-6 font-serif text-[clamp(36px,5vw,56px)] font-normal leading-[1.05] tracking-[-0.02em] text-balance">
          Texas Essential Knowledge and Skills
        </h1>
        <p className="mt-6 max-w-[60ch] font-serif text-[19px] font-light italic leading-[1.5] text-ink-soft">
          Public-domain learning standards for every Texas student.
          Browseable, searchable, and yours to use.
        </p>

        <div className="mt-12">
          <FilterBar
            subjects={subjects}
            grades={grades}
            defaults={{ subject, grade, q }}
          />
        </div>

        <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
          {groups.length} K&amp;S statement{groups.length === 1 ? "" : "s"}
          {q && ` matching “${q}”`}
        </div>

        {groups.length === 0 ? (
          <EmptyState query={q} />
        ) : (
          <div className="mt-4">
            {groups.map((g) => (
              <StandardGroup key={g.id} group={g} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="mt-16 max-w-[60ch] border-t border-rule pt-16">
      <p className="font-serif text-[22px] italic font-light leading-[1.4] text-ink">
        {query
          ? `No standards match “${query}”.`
          : "Nothing here yet."}
      </p>
      <p className="mt-3 font-sans text-[14px] text-ink-soft">
        Try a different subject or grade, or search for a topic such as
        <em className="font-serif"> reconstruction</em>,{" "}
        <em className="font-serif">manifest destiny</em>, or{" "}
        <em className="font-serif">Bill of Rights</em>.
      </p>
    </div>
  );
}
