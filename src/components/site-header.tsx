import Link from "next/link";
import { GlyphTutor } from "@/components/marks";
import { TopNav } from "@/components/top-nav";

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-[var(--max)] items-center justify-between gap-6 px-[var(--gutter)] py-5">
        <Link href="/" className="flex items-center gap-3 no-underline">
          <GlyphTutor size={32} color="#c25a3a" />
          <span className="font-serif text-[20px] leading-none tracking-[-0.015em]">
            Erwin{" "}
            <span className="font-light italic text-ink-soft">Public</span>
            <span className="mx-2 text-ink-mute">·</span>
            <span>Academic</span>
          </span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          <TopNav current={current} />
          <span className="ep-badge text-tutor">
            <span className="dot" />
            FREE · PUBLIC
          </span>
        </div>
      </div>
      <div className="mx-auto flex max-w-[var(--max)] px-[var(--gutter)] pb-4 md:hidden">
        <TopNav current={current} />
      </div>
    </header>
  );
}
