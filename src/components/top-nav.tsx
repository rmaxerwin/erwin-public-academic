import Link from "next/link";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/standards", label: "Standards" },
  { href: "/districts", label: "Districts" },
];

export function TopNav({ current }: { current?: string }) {
  return (
    <nav
      aria-label="Primary"
      className="font-sans text-[14px] text-ink-soft"
    >
      {LINKS.map((l, i) => {
        const isCurrent = current === l.href;
        return (
          <span key={l.href}>
            <Link
              href={l.href}
              aria-current={isCurrent ? "page" : undefined}
              className={
                isCurrent
                  ? "text-ink underline underline-offset-4"
                  : "hover:text-ink"
              }
            >
              {l.label}
            </Link>
            {i < LINKS.length - 1 && (
              <span
                aria-hidden
                className="mx-3 font-mono text-[11px] text-ink-mute"
              >
                ·
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
