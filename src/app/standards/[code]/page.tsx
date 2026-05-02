import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { createClient } from "@/lib/supabase/server";
import { citationLine, groupTeks, type TeksRow } from "@/lib/teks";

export const revalidate = 86400;

type Params = Promise<{ code: string }>;

export default async function StandardDetail({
  params,
}: {
  params: Params;
}) {
  const { code: rawCode } = await params;
  const code = decodeURIComponent(rawCode);

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("teks_standards")
    .select("*")
    .eq("knowledge_skill_code", code);

  if (error) throw new Error(error.message);
  const rows = (data ?? []) as TeksRow[];
  if (rows.length === 0) notFound();

  const [group] = groupTeks(rows);
  if (!group) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[var(--max)] px-[var(--gutter)] pb-24 pt-12">
        <Link
          href="/standards"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute hover:text-ink"
        >
          <ArrowLeft size={14} />
          Back to standards
        </Link>

        <nav
          aria-label="Breadcrumb"
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute"
        >
          <Link href="/standards" className="hover:text-ink">
            Standards
          </Link>
          <Sep />
          <span>{group.subject}</span>
          <Sep />
          <span>Grade {group.grade}</span>
          <Sep />
          <span className="text-tutor">{group.knowledge_skill_code}</span>
        </nav>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            {group.strand && (
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
                {group.strand}
              </div>
            )}
            <h1 className="font-serif text-[clamp(32px,4vw,48px)] font-normal leading-[1.1] tracking-[-0.02em] text-balance">
              {group.knowledge_skill_text}
            </h1>

            <h2 className="mt-16 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
              The student is expected to
            </h2>
            <ul className="mt-4 space-y-4">
              {group.expectations.map((e) => (
                <li key={e.id} className="ep-card !border-t-tutor">
                  <div className="eyebrow !text-tutor">{e.code}</div>
                  <p className="font-serif text-[19px] leading-[1.5] text-ink m-0">
                    {e.text}
                  </p>
                </li>
              ))}
            </ul>

            <section className="mt-20 border-t border-rule pt-12">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
                Use this standard
              </h2>
              <p className="mt-4 max-w-[60ch] font-serif text-[19px] italic font-light leading-[1.55] text-ink-soft">
                The Texas Essential Knowledge and Skills are an act of state
                government — they belong to the public. Anyone can teach to
                them, build curriculum from them, or fold them into their own
                materials. We just open the door.
              </p>
            </section>
          </div>

          <aside className="border-t border-rule pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
              About this standard
            </div>
            <dl className="mt-6 space-y-5 text-[14px]">
              <Row label="Subject" value={group.subject} />
              <Row label="Grade" value={group.grade} />
              {group.strand && <Row label="Strand" value={group.strand} />}
              <Row label="Code" value={group.knowledge_skill_code} mono />
              <Row label="Year adopted" value={String(group.year_adopted)} />
              <Row
                label="Expectations"
                value={String(group.expectations.length)}
              />
            </dl>

            <a
              href={group.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="ep-btn ghost mt-8 inline-flex w-full justify-center"
            >
              Source document
              <ExternalLink size={14} />
            </a>

            <div className="mt-8 border-t border-rule pt-6 font-mono text-[10px] uppercase tracking-[0.12em] leading-[1.6] text-ink-mute">
              {citationLine(group)}
              <br />
              Texas Education Agency
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

function Sep() {
  return <span className="mx-2 text-ink-mute">/</span>;
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
