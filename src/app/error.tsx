"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex w-full max-w-[var(--max)] flex-1 flex-col items-start justify-center px-[var(--gutter)] py-24">
      <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
        — Something went wrong
      </div>
      <h1 className="mt-6 max-w-[20ch] font-serif text-[clamp(36px,5vw,56px)] font-normal leading-[1.05] tracking-[-0.02em]">
        A page is misbehaving.
      </h1>
      <p className="mt-6 max-w-[60ch] font-serif text-[19px] font-light italic leading-[1.5] text-ink-soft">
        We hit an unexpected error rendering this page. Try again, or head back
        to the index — the rest of the site is still here.
      </p>
      {error?.digest && (
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">
          Reference: {error.digest}
        </p>
      )}
      <div className="mt-10 flex flex-wrap gap-3">
        <button onClick={reset} className="ep-btn primary">
          Try again
        </button>
        <Link href="/" className="ep-btn ghost">
          Back to home
        </Link>
      </div>
    </main>
  );
}
