import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DistrictsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("districts")
    .select("tea_district_number, name, county, region, enrollment")
    .order("name", { ascending: true });
  if (error) throw new Error(error.message);

  const districts = data ?? [];

  return (
    <>
      <SiteHeader current="/districts" />
      <main className="mx-auto w-full max-w-[var(--max)] px-[var(--gutter)] pb-24 pt-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
          — Districts
        </div>
        <h1 className="mt-6 font-serif text-[clamp(36px,5vw,56px)] font-normal leading-[1.05] tracking-[-0.02em] text-balance">
          Texas school districts
        </h1>
        <p className="mt-6 max-w-[60ch] font-serif text-[19px] font-light italic leading-[1.5] text-ink-soft">
          We are starting with one district and growing the catalog from
          there. Each district will get a public profile with its campuses
          and the standards taught at each grade level. More to come.
        </p>

        <div className="mt-12">
          {districts.length === 0 ? (
            <p className="font-serif text-[19px] italic text-ink-soft">
              No districts seeded yet.
            </p>
          ) : (
            <ul className="border-t border-rule">
              {districts.map((d) => (
                <li
                  key={d.tea_district_number}
                  className="border-b border-rule"
                >
                  <Link
                    href={`/districts/${slugify(d.name)}`}
                    className="grid grid-cols-[1fr_auto] items-baseline gap-4 py-6 no-underline hover:bg-paper-100"
                  >
                    <div>
                      <div className="font-serif text-[24px] leading-tight tracking-[-0.01em]">
                        {d.name}
                      </div>
                      <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
                        TEA #{d.tea_district_number} · {d.county} County ·{" "}
                        {d.region}
                      </div>
                    </div>
                    <span className="font-serif text-tutor">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </>
  );
}

function slugify(name: string): string {
  // Only used for known districts — Fort Worth ISD → fort-worth-isd.
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
