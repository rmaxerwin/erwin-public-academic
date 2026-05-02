import { SiteHeader } from "@/components/site-header";

export default function Loading() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[var(--max)] px-[var(--gutter)] pb-24 pt-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
          — Standards
        </div>
        <Bar className="mt-6 h-12 w-2/3 max-w-[640px]" />
        <Bar className="mt-6 h-6 w-1/2 max-w-[480px]" />

        <div className="mt-12 grid gap-4 border-y border-rule py-6 md:grid-cols-[200px_180px_1fr]">
          <Bar className="h-[42px]" />
          <Bar className="h-[42px]" />
          <Bar className="h-[42px]" />
        </div>

        <div className="mt-8 space-y-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border-t border-rule pt-8">
              <Bar className="h-3 w-24" />
              <Bar className="mt-3 h-7 w-3/4" />
              <Bar className="mt-3 h-4 w-1/2" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

function Bar({ className = "" }: { className?: string }) {
  return <div className={`bg-paper-100 ${className}`} />;
}
