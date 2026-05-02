import { SiteHeader } from "@/components/site-header";

export default function Loading() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-[var(--max)] px-[var(--gutter)] pb-24 pt-12">
        <Bar className="h-3 w-32" />
        <Bar className="mt-12 h-3 w-64" />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_280px]">
          <div>
            <Bar className="h-3 w-24" />
            <Bar className="mt-4 h-10 w-full max-w-[700px]" />
            <Bar className="mt-3 h-10 w-3/4 max-w-[600px]" />

            <Bar className="mt-16 h-3 w-44" />
            <div className="mt-6 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="border border-rule p-6">
                  <Bar className="h-3 w-12" />
                  <Bar className="mt-3 h-5 w-full" />
                  <Bar className="mt-2 h-5 w-4/5" />
                </div>
              ))}
            </div>
          </div>
          <aside className="border-t border-rule pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <Bar className="h-3 w-32" />
            <div className="mt-6 space-y-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Bar key={i} className="h-4 w-full" />
              ))}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

function Bar({ className = "" }: { className?: string }) {
  return <div className={`bg-paper-100 ${className}`} />;
}
