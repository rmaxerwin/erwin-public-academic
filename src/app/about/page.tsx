import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "About",
  description:
    "Erwin Public is a small set of free, no-account public-interest tools. Academic is the first one — Texas Essential Knowledge and Skills, browseable.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[var(--max)] px-[var(--gutter)] pb-24 pt-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
          — About
        </div>
        <h1 className="mt-6 font-serif text-[clamp(36px,5vw,56px)] font-normal leading-[1.05] tracking-[-0.02em] text-balance">
          Erwin Public
        </h1>
        <div className="mt-10 max-w-[62ch] space-y-6 font-serif text-[19px] leading-[1.6] text-ink">
          <p>
            Erwin Public is a small set of free, no-account public-interest
            tools built on top of public-domain data. <em>Academic</em> is the
            first one: a clean, searchable view of the Texas Essential
            Knowledge and Skills (TEKS) — the state&rsquo;s learning standards
            — alongside district and campus profiles drawn from the Texas
            Education Agency&rsquo;s public reports. The goal is plain: make
            the things citizens already paid for actually easy to read,
            search, and reuse. No paywall, no signup, no dark patterns —
            just public records, formatted with care.
          </p>
        </div>
      </main>
    </>
  );
}
