/**
 * scripts/seed-teks.ts
 *
 *   npm run db:seed:teks
 *
 * Seeds public.teks_standards from src/data/teks-grade-8-social-studies.json
 * (or any JSON file passed as a CLI argument).
 *
 * Idempotent: existing rows for the JSON's (subject, grade) are detected
 * by knowledge_skill_code / student_expectation_code and skipped. To
 * re-import after edits, delete the existing rows first.
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

config({ path: ".env.local" });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

type StudentExpectation = {
  code: string;
  text: string;
  needs_review?: boolean;
};

type Standard = {
  strand: string;
  knowledge_skill_code: string;
  knowledge_skill_text: string;
  student_expectations: StudentExpectation[];
  needs_review?: boolean;
};

type TeksFile = {
  subject: string;
  grade: string;
  year_adopted: number;
  source_url: string;
  source_note?: string;
  standards: Standard[];
};

async function main() {
  const path = process.argv[2] ?? "src/data/teks-grade-8-social-studies.json";
  const abs = resolve(path);
  console.log("→ Loading", abs);

  const raw = await readFile(abs, "utf8");
  const file = JSON.parse(raw) as TeksFile;

  console.log(
    `→ Subject: ${file.subject} · Grade: ${file.grade} · Adopted: ${file.year_adopted}`,
  );
  console.log(`→ ${file.standards.length} K&S statements in source file\n`);

  // Pre-load all existing rows for this (subject, grade) so we can skip duplicates.
  const { data: existing, error: existErr } = await supabase
    .from("teks_standards")
    .select("id, knowledge_skill_code, student_expectation_code")
    .eq("subject", file.subject)
    .eq("grade", file.grade);

  if (existErr) {
    console.error("Failed to read existing rows:", existErr.message);
    process.exit(1);
  }

  // K&S codes: rows where student_expectation_code is null
  const existingKsByCode = new Map<string, string>();
  const existingSeCodes = new Set<string>();
  for (const r of existing ?? []) {
    if (r.student_expectation_code) {
      existingSeCodes.add(r.student_expectation_code);
    } else if (r.knowledge_skill_code) {
      existingKsByCode.set(r.knowledge_skill_code, r.id);
    }
  }
  console.log(
    `→ Found ${existingKsByCode.size} existing K&S rows and ${existingSeCodes.size} existing student-expectation rows\n`,
  );

  let ksInserted = 0;
  let ksSkipped = 0;
  let seInserted = 0;
  let seSkipped = 0;

  for (const s of file.standards) {
    let parentId = existingKsByCode.get(s.knowledge_skill_code);

    if (parentId) {
      ksSkipped++;
      process.stdout.write(`  · ${s.knowledge_skill_code} (skip) `);
    } else {
      const { data, error } = await supabase
        .from("teks_standards")
        .insert({
          subject: file.subject,
          grade: file.grade,
          strand: s.strand,
          knowledge_skill_code: s.knowledge_skill_code,
          knowledge_skill_text: s.knowledge_skill_text,
          student_expectation_code: null,
          student_expectation_text: null,
          parent_id: null,
          year_adopted: file.year_adopted,
          source_url: file.source_url,
        })
        .select("id")
        .single();

      if (error || !data) {
        console.error(
          `\n  ✗ failed to insert ${s.knowledge_skill_code}: ${error?.message}`,
        );
        process.exit(1);
      }
      parentId = data.id as string;
      existingKsByCode.set(s.knowledge_skill_code, parentId);
      ksInserted++;
      process.stdout.write(`  · ${s.knowledge_skill_code} (ins) `);
    }

    for (const se of s.student_expectations) {
      if (existingSeCodes.has(se.code)) {
        seSkipped++;
        continue;
      }
      const { error } = await supabase.from("teks_standards").insert({
        subject: file.subject,
        grade: file.grade,
        strand: s.strand,
        knowledge_skill_code: s.knowledge_skill_code,
        knowledge_skill_text: s.knowledge_skill_text,
        student_expectation_code: se.code,
        student_expectation_text: se.text,
        parent_id: parentId,
        year_adopted: file.year_adopted,
        source_url: file.source_url,
      });
      if (error) {
        console.error(
          `\n  ✗ failed to insert ${se.code}: ${error.message}`,
        );
        process.exit(1);
      }
      existingSeCodes.add(se.code);
      seInserted++;
    }
    process.stdout.write(`+${s.student_expectations.length} SE\n`);
  }

  console.log("\n✓ Seed complete.\n");
  console.log("  K&S statements         inserted:", ksInserted, " skipped:", ksSkipped);
  console.log("  Student expectations   inserted:", seInserted, " skipped:", seSkipped);

  const { count, error: countErr } = await supabase
    .from("teks_standards")
    .select("*", { count: "exact", head: true })
    .eq("subject", file.subject)
    .eq("grade", file.grade);
  if (countErr) {
    console.error(countErr.message);
  } else {
    console.log(`\n  Total rows for ${file.subject} / Grade ${file.grade}: ${count}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
