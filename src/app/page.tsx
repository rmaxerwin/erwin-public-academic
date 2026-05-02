import Link from "next/link";
import { EPMark } from "@/components/marks";
import { TopNav } from "@/components/top-nav";

export default function Home() {
  return (
    <>
      <header className="border-b border-rule">
        <div className="mx-auto flex max-w-[var(--max)] items-center justify-end px-[var(--gutter)] py-5">
          <TopNav current="/" />
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="flex flex-col items-center gap-8 text-center">
          <div className="flex items-center gap-4">
            <EPMark size={56} color="#1a160f" accent="#c25a3a" />
            <span
              className="font-serif text-[44px] leading-none tracking-[-0.015em]"
              style={{ fontWeight: 400 }}
            >
              Erwin{" "}
              <span className="italic font-light text-ink-soft">Public</span>
            </span>
          </div>
          <p className="font-serif italic text-ink-soft text-lg">
            Academic — coming soon.
          </p>
          <Link href="/standards" className="ep-btn ghost mt-2">
            Browse standards
            <span className="arrow">→</span>
          </Link>
        </div>
      </main>
    </>
  );
}
