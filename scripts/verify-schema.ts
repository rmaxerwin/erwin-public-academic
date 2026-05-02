/**
 * scripts/verify-schema.ts
 *
 *   npm run db:verify
 *
 * Connects with the anon key (the same key the browser will use) and
 * confirms a public SELECT works on every table created by migrate.ts.
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !ANON_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, ANON_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const tables = ["teks_standards", "districts", "campuses", "assessments"] as const;

async function main() {
  console.log("→ Verifying public read access as anon at", SUPABASE_URL, "\n");

  let allOk = true;
  for (const t of tables) {
    const { data, error } = await supabase.from(t).select("*").limit(1);
    if (error) {
      console.log(`  ✗ ${t.padEnd(18)} ${error.message}`);
      allOk = false;
    } else {
      console.log(`  ✓ ${t.padEnd(18)} returned ${data.length} row(s)`);
    }
  }

  if (!allOk) {
    console.error("\nSchema verify failed.");
    process.exit(1);
  }
  console.log("\n✓ All four tables are readable by anon.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
