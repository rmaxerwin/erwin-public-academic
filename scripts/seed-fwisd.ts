/**
 * scripts/seed-fwisd.ts
 *
 *   npm run db:seed:fwisd
 *
 * Seeds Fort Worth ISD: district row, sample campuses, and synthetic
 * STAAR-style assessment rows. Idempotent — re-running is a no-op.
 *
 * Reads:
 *   src/data/districts/fort-worth-isd.json
 *   src/data/districts/fort-worth-isd-campuses.json
 *
 * Generates synthetic assessments via src/data/synthetic-assessments.ts.
 * Every assessment row is tagged with a source_note that explicitly
 * marks it as fake — see SYNTHETIC_SOURCE_NOTE.
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { generateAllAssessments } from "../src/data/synthetic-assessments";

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

type DistrictFile = {
  tea_district_number: string;
  name: string;
  county: string;
  region: string;
  enrollment: number | null;
  source_url: string;
};

type CampusRow = {
  tea_campus_number: string;
  name: string;
  grade_levels: string;
  enrollment: number | null;
  needs_review?: boolean;
};

type CampusFile = {
  district_tea_number: string;
  source_url: string;
  campuses: CampusRow[];
};

async function main() {
  const update = process.argv.includes("--update");

  const districtPath = resolve("src/data/districts/fort-worth-isd.json");
  const campusPath = resolve("src/data/districts/fort-worth-isd-campuses.json");

  const district = JSON.parse(await readFile(districtPath, "utf8")) as DistrictFile;
  const campusFile = JSON.parse(await readFile(campusPath, "utf8")) as CampusFile;

  console.log(`→ District: ${district.name} (${district.tea_district_number})`);
  console.log(`→ Campuses in source file: ${campusFile.campuses.length}`);
  console.log(`→ Mode: ${update ? "UPDATE (overwrite editable fields)" : "insert-only (idempotent)"}\n`);

  // 1) District — idempotent insert keyed on tea_district_number
  const { data: existingDistrict, error: dErr } = await supabase
    .from("districts")
    .select("id, name")
    .eq("tea_district_number", district.tea_district_number)
    .maybeSingle();
  if (dErr) {
    console.error("District lookup failed:", dErr.message);
    process.exit(1);
  }

  let districtId: string;
  if (existingDistrict) {
    districtId = existingDistrict.id;
    if (update) {
      const { error: uErr } = await supabase
        .from("districts")
        .update({
          name: district.name,
          county: district.county,
          region: district.region,
          enrollment: district.enrollment,
          source_url: district.source_url,
        })
        .eq("id", districtId);
      if (uErr) {
        console.error("District update failed:", uErr.message);
        process.exit(1);
      }
      console.log(`  · district updated (id=${districtId})`);
    } else {
      console.log(`  · district exists — skipping insert (id=${districtId})`);
    }
  } else {
    const { data, error } = await supabase
      .from("districts")
      .insert({
        tea_district_number: district.tea_district_number,
        name: district.name,
        county: district.county,
        region: district.region,
        enrollment: district.enrollment,
        source_url: district.source_url,
      })
      .select("id")
      .single();
    if (error || !data) {
      console.error("District insert failed:", error?.message);
      process.exit(1);
    }
    districtId = data.id as string;
    console.log(`  · district inserted (id=${districtId})`);
  }

  // 2) Campuses — match by tea_campus_number first, then (in --update mode)
  // fall back to matching by name within the district so a placeholder
  // number can be swapped for the real TEA number without losing the
  // campus row (and its attached assessments).
  const { data: existingCampuses, error: cErr } = await supabase
    .from("campuses")
    .select("id, tea_campus_number, name")
    .eq("district_id", districtId);
  if (cErr) {
    console.error("Campus lookup failed:", cErr.message);
    process.exit(1);
  }
  const existingByNumber = new Map<string, { id: string; name: string }>();
  const existingByName = new Map<string, { id: string; tea_campus_number: string }>();
  for (const c of existingCampuses ?? []) {
    existingByNumber.set(c.tea_campus_number, { id: c.id, name: c.name });
    existingByName.set(c.name.toLowerCase(), {
      id: c.id,
      tea_campus_number: c.tea_campus_number,
    });
  }

  let campusInserted = 0;
  let campusUpdated = 0;
  let campusSkipped = 0;
  // Keyed by the source-file tea_campus_number so the assessment step
  // can resolve campus_id for synthetic-row generation.
  const campusIdByNumber = new Map<string, string>();

  for (const c of campusFile.campuses) {
    const byNumber = existingByNumber.get(c.tea_campus_number);
    if (byNumber) {
      campusIdByNumber.set(c.tea_campus_number, byNumber.id);
      if (update) {
        const { error: uErr } = await supabase
          .from("campuses")
          .update({
            name: c.name,
            grade_levels: c.grade_levels,
            enrollment: c.enrollment,
            source_url: campusFile.source_url,
          })
          .eq("id", byNumber.id);
        if (uErr) {
          console.error(`Campus update failed for ${c.tea_campus_number}:`, uErr.message);
          process.exit(1);
        }
        campusUpdated++;
      } else {
        campusSkipped++;
      }
      continue;
    }

    if (update) {
      const byName = existingByName.get(c.name.toLowerCase());
      if (byName) {
        // Same campus, new TEA number. Swap the key + update editable fields.
        const { error: uErr } = await supabase
          .from("campuses")
          .update({
            tea_campus_number: c.tea_campus_number,
            grade_levels: c.grade_levels,
            enrollment: c.enrollment,
            source_url: campusFile.source_url,
          })
          .eq("id", byName.id);
        if (uErr) {
          console.error(
            `Campus number swap failed for "${c.name}" (${byName.tea_campus_number} → ${c.tea_campus_number}):`,
            uErr.message,
          );
          process.exit(1);
        }
        campusIdByNumber.set(c.tea_campus_number, byName.id);
        console.log(
          `  · campus "${c.name}" — TEA # ${byName.tea_campus_number} → ${c.tea_campus_number}`,
        );
        campusUpdated++;
        continue;
      }
    }

    const { data, error } = await supabase
      .from("campuses")
      .insert({
        district_id: districtId,
        tea_campus_number: c.tea_campus_number,
        name: c.name,
        grade_levels: c.grade_levels,
        enrollment: c.enrollment,
        source_url: campusFile.source_url,
      })
      .select("id")
      .single();
    if (error || !data) {
      console.error(`Campus insert failed for ${c.tea_campus_number}:`, error?.message);
      process.exit(1);
    }
    campusIdByNumber.set(c.tea_campus_number, data.id as string);
    campusInserted++;
  }
  console.log(
    `  · campuses — inserted ${campusInserted}, updated ${campusUpdated}, skipped ${campusSkipped}`,
  );

  // 3) Synthetic assessments — idempotent on (campus_id, year, subject, grade)
  const assessments = generateAllAssessments(campusFile.campuses);
  const { data: existingA, error: aErr } = await supabase
    .from("assessments")
    .select("campus_id, year, subject, grade")
    .in(
      "campus_id",
      Array.from(campusIdByNumber.values()),
    );
  if (aErr) {
    console.error("Assessment lookup failed:", aErr.message);
    process.exit(1);
  }
  const existingKey = new Set(
    (existingA ?? []).map(
      (r) => `${r.campus_id}|${r.year}|${r.subject}|${r.grade}`,
    ),
  );

  const rowsToInsert = assessments
    .map((a) => {
      const campusId = campusIdByNumber.get(a.tea_campus_number);
      if (!campusId) return null;
      const key = `${campusId}|${a.year}|${a.subject}|${a.grade}`;
      if (existingKey.has(key)) return null;
      return {
        campus_id: campusId,
        year: a.year,
        subject: a.subject,
        grade: a.grade,
        approaches_pct: a.approaches_pct,
        meets_pct: a.meets_pct,
        masters_pct: a.masters_pct,
        source_note: a.source_note,
        source_url: null,
      };
    })
    .filter((r): r is NonNullable<typeof r> => r !== null);

  let assessInserted = 0;
  if (rowsToInsert.length > 0) {
    // Insert in chunks; supabase-js handles arrays fine but keep it modest.
    const CHUNK = 200;
    for (let i = 0; i < rowsToInsert.length; i += CHUNK) {
      const slice = rowsToInsert.slice(i, i + CHUNK);
      const { error } = await supabase.from("assessments").insert(slice);
      if (error) {
        console.error("Assessment insert failed:", error.message);
        process.exit(1);
      }
      assessInserted += slice.length;
    }
  }
  const assessSkipped = assessments.length - assessInserted;
  console.log(
    `  · assessments — generated ${assessments.length}, inserted ${assessInserted}, skipped ${assessSkipped}`,
  );

  console.log("\n✓ Seed complete.\n");

  // Final row counts
  const counts = await Promise.all(
    ["districts", "campuses", "assessments"].map(async (t) => {
      const { count } = await supabase
        .from(t)
        .select("*", { count: "exact", head: true });
      return [t, count ?? 0] as const;
    }),
  );
  console.log("Row counts:");
  for (const [t, c] of counts) {
    console.log(`  ${t.padEnd(14)}  ${c}`);
  }
  console.log("");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
