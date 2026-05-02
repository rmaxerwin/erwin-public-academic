import { SiteHeader } from "@/components/site-header";

export default function Loading() {
  return (
    <>
      <SiteHeader current="/districts" />
      <main className="mx-auto w-full max-w-[var(--max)] px-[var(--gutter)] pb-24 pt-12">
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
          — Districts
        </div>
        <Bar className="mt-6 h-12 w-2/3 max-w-[640px]" />
        <Bar className="mt-6 h-6 w-1/2 max-w-[480px]" />

        <ul className="mt-12 border-t border-rule">
          {Array.from({ length: 5 }).map((_, i) => (
            <li key={i} className="border-b border-rule py-6">
              <Bar className="h-6 w-1/3" />
              <Bar className="mt-3 h-3 w-1/2" />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

function Bar({ className = "" }: { className?: string }) {
  return <div className={`bg-paper-100 ${className}`} aria-hidden />;
}
