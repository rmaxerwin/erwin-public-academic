import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { createClient } from "@/lib/supabase/server";
import { taprDistrictReportUrl } from "@/lib/tapr";

export const dynamic = "force-dynamic";

const TEA_DISTRICT_NUMBER = "220905";
const SLUG = "fort-worth-isd";

export default async function FortWorthIsdPage() {
  const supabase = await createClient();

  const { data: district, error: dErr } = await supabase
    .from("districts")
    .select("*")
    .eq("tea_district_number", TEA_DISTRICT_NUMBER)
    .maybeSingle();
  if (dErr) throw new Error(dErr.message);
  if (!district) {
    return (
      <>
        <SiteHeader current="/districts" />
        <main className="mx-auto w-full max-w-[var(--max)] px-[var(--gutter)] pb-24 pt-12">
          <p className="font-serif text-[19px] italic text-ink-soft">
            Fort Worth ISD has not been seeded yet. Run{" "}
            <code className="font-mono text-[14px]">npm run db:seed:fwisd</code>.
          </p>
        </main>
      </>
    );
  }

  const { data: campuses, error: cErr } = await supabase
    .from("campuses")
    .select("tea_campus_number, name, grade_levels, enrollment")
    .eq("district_id", district.id)
    .order("name", { ascending: true });
  if (cErr) throw new Error(cErr.message);

  return (
    <>
      <SiteHeader current="/districts" />
      <main className="mx-auto w-full max-w-[var(--max)] px-[var(--gutter)] pb-24 pt-12">
        <Link
          href="/districts"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute hover:text-ink"
        >
          <ArrowLeft size={14} />
          Back to districts
        </Link>

        <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_300px]">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
              — District
            </div>
            <h1 className="mt-4 font-serif text-[clamp(36px,5vw,56px)] font-normal leading-[1.05] tracking-[-0.02em] text-balance">
              {district.name}
            </h1>

            <h2 className="mt-16 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
              Campuses
            </h2>
            {(campuses ?? []).length === 0 ? (
              <p className="mt-4 font-serif text-[19px] italic text-ink-soft">
                No campuses seeded yet.
              </p>
            ) : (
              <table className="mt-4 w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-rule">
                    <Th>Name</Th>
                    <Th>Grades</Th>
                    <Th>Enrollment</Th>
                  </tr>
                </thead>
                <tbody>
                  {(campuses ?? []).map((c) => (
                    <tr
                      key={c.tea_campus_number}
                      className="border-b border-rule hover:bg-paper-100"
                    >
                      <td className="py-4 pr-4">
                        <Link
                          href={`/districts/${SLUG}/${c.tea_campus_number}`}
                          className="font-serif text-[18px] text-ink no-underline hover:underline"
                        >
                          {c.name}
                        </Link>
                        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
                          {c.tea_campus_number}
                        </div>
                      </td>
                      <td className="py-4 pr-4 font-mono text-[13px] text-ink-soft">
                        {c.grade_levels}
                      </td>
                      <td className="py-4 font-mono text-[13px] text-ink-soft">
                        {c.enrollment ?? (
                          <span className="text-ink-mute">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <aside className="border-t border-rule pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
              About this district
            </div>
            <dl className="mt-6 space-y-5 text-[14px]">
              <Row label="TEA #" value={district.tea_district_number} mono />
              <Row label="County" value={district.county} />
              <Row label="ESC region" value={district.region} />
              <Row
                label="Enrollment"
                value={
                  district.enrollment != null
                    ? String(district.enrollment)
                    : "Pending TAPR pull"
                }
                mono={district.enrollment != null}
              />
            </dl>

            <a
              href={taprDistrictReportUrl(district.tea_district_number)}
              target="_blank"
              rel="noopener noreferrer"
              className="ep-btn ghost mt-8 inline-flex w-full justify-center"
            >
              TEA TAPR
              <ExternalLink size={14} />
            </a>
          </aside>
        </div>
      </main>
    </>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="py-3 pr-4 font-mono text-[10px] uppercase tracking-[0.12em] font-medium text-ink-mute">
      {children}
    </th>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="grid grid-cols-[110px_1fr] items-baseline gap-4">
      <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
        {label}
      </dt>
      <dd
        className={
          mono
            ? "font-mono text-[13px] text-ink"
            : "font-serif text-[16px] text-ink"
        }
      >
        {value}
      </dd>
    </div>
  );
}
