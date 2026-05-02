import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import {
  AssessmentChart,
  type ChartRow,
} from "@/components/districts/assessment-chart";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const TEA_DISTRICT_NUMBER = "220905";
const SLUG = "fort-worth-isd";

type Params = Promise<{ campusNumber: string }>;

const SUBJECTS = ["Reading", "Math", "Science", "Social Studies"] as const;
type Subject = (typeof SUBJECTS)[number];

export default async function CampusPage({ params }: { params: Params }) {
  const { campusNumber } = await params;
  const supabase = await createClient();

  const { data: district } = await supabase
    .from("districts")
    .select("id, name")
    .eq("tea_district_number", TEA_DISTRICT_NUMBER)
    .maybeSingle();
  if (!district) notFound();

  const { data: campus } = await supabase
    .from("campuses")
    .select("id, tea_campus_number, name, grade_levels, enrollment")
    .eq("tea_campus_number", campusNumber)
    .eq("district_id", district.id)
    .maybeSingle();
  if (!campus) notFound();

  const { data: assessmentRows } = await supabase
    .from("assessments")
    .select("year, subject, grade, approaches_pct, meets_pct, masters_pct, source_note")
    .eq("campus_id", campus.id)
    .order("year", { ascending: true });

  const chartData = buildChartRows(assessmentRows ?? []);

  // Standards taught here: distinct (subject, grade) from teks_standards
  // intersected with this campus's grade band.
  const campusGrades = expandGradeBand(campus.grade_levels);
  const { data: distinct } = await supabase
    .from("teks_standards")
    .select("subject, grade")
    .is("student_expectation_code", null);
  const taughtHere = uniqueByKey(distinct ?? [])
    .filter((r) => campusGrades.includes(r.grade))
    .sort((a, b) => {
      if (a.subject !== b.subject) return a.subject.localeCompare(b.subject);
      const ag = parseInt(a.grade, 10);
      const bg = parseInt(b.grade, 10);
      if (Number.isFinite(ag) && Number.isFinite(bg)) return ag - bg;
      return a.grade.localeCompare(b.grade);
    });

  return (
    <>
      <SiteHeader current="/districts" />
      <main className="mx-auto w-full max-w-[var(--max)] px-[var(--gutter)] pb-24 pt-12">
        <Link
          href={`/districts/${SLUG}`}
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute hover:text-ink"
        >
          <ArrowLeft size={14} />
          Back to {district.name}
        </Link>

        <div className="mt-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
            {district.name} — Campus
          </div>
          <h1 className="mt-4 font-serif text-[clamp(32px,4vw,48px)] font-normal leading-[1.05] tracking-[-0.02em] text-balance">
            {campus.name}
          </h1>
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 font-mono text-[12px] uppercase tracking-[0.12em] text-ink-soft">
            <Pair label="TEA #" value={campus.tea_campus_number} />
            <Pair label="Grades" value={campus.grade_levels} />
            <Pair
              label="Enrollment"
              value={
                campus.enrollment != null ? String(campus.enrollment) : "—"
              }
            />
          </dl>
        </div>

        {/* Synthetic-data banner — must remain prominent any time the chart shows. */}
        <div
          role="note"
          className="mt-12 border border-records/30 bg-records-tint px-5 py-4 text-records"
          style={{ borderRadius: 2 }}
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.14em]">
            Synthetic data
          </div>
          <p className="mt-2 font-serif text-[16px] leading-[1.5] text-ink">
            These numbers are synthetic test data for UI development only.
            They are not real STAAR results. Real TAPR integration is coming.
          </p>
        </div>

        <section className="mt-8">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
            Synthetic STAAR-style results — 2022–2025
          </h2>
          {chartData.length === 0 ? (
            <p className="mt-4 font-serif text-[19px] italic text-ink-soft">
              No assessment rows for this campus yet. Run{" "}
              <code className="font-mono text-[14px]">
                npm run db:seed:fwisd
              </code>
              .
            </p>
          ) : (
            <div className="mt-6">
              <AssessmentChart data={chartData} />
            </div>
          )}
        </section>

        <section className="mt-20 border-t border-rule pt-12">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
            Standards taught here
          </h2>
          <p className="mt-4 max-w-[60ch] font-serif text-[19px] italic font-light leading-[1.55] text-ink-soft">
            TEKS standards aligned to this campus&rsquo;s grade levels.
          </p>
          {taughtHere.length === 0 ? (
            <p className="mt-6 font-serif text-[16px] italic text-ink-soft">
              No matching TEKS subject/grade combinations are seeded yet.
            </p>
          ) : (
            <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {taughtHere.map((r) => (
                <li key={`${r.subject}|${r.grade}`}>
                  <Link
                    href={`/standards?subject=${encodeURIComponent(r.subject)}&grade=${encodeURIComponent(r.grade)}`}
                    className="ep-card !border-t-tutor block no-underline hover:bg-paper-100"
                  >
                    <div className="eyebrow !text-tutor">Grade {r.grade}</div>
                    <div className="font-serif text-[18px] leading-tight">
                      {r.subject}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </>
  );
}

function Pair({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-ink-mute">{label}</dt>
      <dd className="mt-1 text-ink normal-case tracking-normal font-serif text-[16px]">
        {value}
      </dd>
    </div>
  );
}

type AssessmentRow = {
  year: number;
  subject: string;
  approaches_pct: number;
  meets_pct: number;
  masters_pct: number;
};

function buildChartRows(rows: AssessmentRow[]): ChartRow[] {
  // Average across grades within (year, subject), then keep only the four
  // most recent years per subject — sorted year asc, subject in canonical
  // order.
  const grouped = new Map<
    string,
    { sumA: number; sumMe: number; sumMa: number; n: number; year: number; subject: string }
  >();
  for (const r of rows) {
    const key = `${r.year}|${r.subject}`;
    const g = grouped.get(key);
    if (g) {
      g.sumA += Number(r.approaches_pct);
      g.sumMe += Number(r.meets_pct);
      g.sumMa += Number(r.masters_pct);
      g.n += 1;
    } else {
      grouped.set(key, {
        sumA: Number(r.approaches_pct),
        sumMe: Number(r.meets_pct),
        sumMa: Number(r.masters_pct),
        n: 1,
        year: r.year,
        subject: r.subject,
      });
    }
  }

  const yearsSeen = Array.from(new Set(rows.map((r) => r.year))).sort(
    (a, b) => a - b,
  );
  const recentYears = yearsSeen.slice(-4);

  const out: ChartRow[] = [];
  for (const year of recentYears) {
    for (const subject of SUBJECTS) {
      const g = grouped.get(`${year}|${subject}`);
      if (!g) continue;
      out.push({
        yearSubject: `${year} · ${shortSubject(subject)}`,
        approaches: round(g.sumA / g.n),
        meets: round(g.sumMe / g.n),
        masters: round(g.sumMa / g.n),
      });
    }
  }
  return out;
}

function shortSubject(s: Subject | string): string {
  if (s === "Social Studies") return "Soc";
  if (s === "Reading") return "Read";
  if (s === "Science") return "Sci";
  return s;
}

function round(n: number) {
  return Math.round(n);
}

function expandGradeBand(band: string): string[] {
  // "PK-5" → ["PK","K","1",...,"5"]; "6-8" → ["6","7","8"]; "9-12" → ["9",...,"12"]
  const parts = band.split(/[\s-]+/).filter(Boolean);
  if (parts.length === 0) return [];
  if (parts.length === 1) return [normalizeGrade(parts[0])];

  const start = parts[0];
  const end = parts[parts.length - 1];

  const ladder = ["PK", "K", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const startIdx = ladder.indexOf(normalizeGrade(start));
  const endIdx = ladder.indexOf(normalizeGrade(end));
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) return [];
  return ladder.slice(startIdx, endIdx + 1);
}

function normalizeGrade(g: string): string {
  const upper = g.toUpperCase();
  if (upper === "PK" || upper === "PRE-K") return "PK";
  if (upper === "K" || upper === "KG") return "K";
  return g.replace(/^0+/, "");
}

function uniqueByKey(rows: { subject: string; grade: string }[]) {
  const seen = new Set<string>();
  const out: { subject: string; grade: string }[] = [];
  for (const r of rows) {
    const k = `${r.subject}|${r.grade}`;
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(r);
  }
  return out;
}
