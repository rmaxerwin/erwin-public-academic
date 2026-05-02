import Link from "next/link";
import { SiteHeader } from "@/components/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-[var(--max)] flex-1 flex-col items-start justify-center px-[var(--gutter)] py-24">
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
          — 404
        </div>
        <h1 className="mt-6 max-w-[18ch] font-serif text-[clamp(36px,5vw,56px)] font-normal leading-[1.05] tracking-[-0.02em] text-balance">
          We couldn&rsquo;t find that page.
        </h1>
        <p className="mt-6 max-w-[60ch] font-serif text-[19px] font-light italic leading-[1.5] text-ink-soft">
          The standards and records you&rsquo;re looking for might be under a
          different URL. Try the index.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/standards" className="ep-btn primary">
            Browse standards
          </Link>
          <Link href="/districts" className="ep-btn ghost">
            Browse districts
          </Link>
        </div>
      </main>
    </>
  );
}
