import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-paper-800 text-paper-200">
      <div className="mx-auto grid max-w-[var(--max)] gap-10 px-[var(--gutter)] py-14 md:grid-cols-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-400">
            About
          </div>
          <p className="mt-4 max-w-[36ch] font-serif text-[18px] leading-[1.5] text-paper-100">
            Erwin Public — free, actually useful.
          </p>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-400">
            Pages
          </div>
          <ul className="mt-4 space-y-2 font-serif text-[16px]">
            <li>
              <Link href="/about" className="text-paper-100 no-underline hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/standards" className="text-paper-100 no-underline hover:underline">
                Standards
              </Link>
            </li>
            <li>
              <Link href="/districts" className="text-paper-100 no-underline hover:underline">
                Districts
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-paper-400">
            License
          </div>
          <p className="mt-4 max-w-[36ch] font-serif text-[14px] leading-[1.55] text-paper-200">
            This site&rsquo;s data and code are in the public domain unless
            otherwise noted.
          </p>
        </div>
      </div>
      <div className="border-t border-paper-700">
        <div className="mx-auto flex max-w-[var(--max)] items-center justify-between px-[var(--gutter)] py-5 font-mono text-[10px] uppercase tracking-[0.18em] text-paper-400">
          <span>Erwin Public · Academic</span>
          <span>Free · Public</span>
        </div>
      </div>
    </footer>
  );
}
