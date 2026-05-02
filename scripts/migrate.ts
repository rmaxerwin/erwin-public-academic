/**
 * scripts/migrate.ts
 *
 * Runs the Phase 1 schema migration for Erwin Public — Academic.
 *
 *   npm run db:migrate
 *
 * Reads SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from .env.local.
 * Calls supabase.rpc('exec_sql', { query }) to execute DDL.
 *
 * If exec_sql doesn't exist yet, prints the one-time bootstrap SQL
 * (scripts/_bootstrap.sql) for you to paste into the Studio SQL Editor,
 * then re-run this script.
 */

import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

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

type Step = { name: string; sql: string };

const steps: Step[] = [
  {
    name: "extensions",
    sql: `create extension if not exists pgcrypto;`,
  },

  // ───── teks_standards ─────
  {
    name: "table: teks_standards",
    sql: `
      create table if not exists public.teks_standards (
        id                        uuid primary key default gen_random_uuid(),
        subject                   text not null,
        grade                     text not null,
        strand                    text,
        knowledge_skill_code      text not null,
        knowledge_skill_text      text not null,
        student_expectation_code  text,
        student_expectation_text  text,
        parent_id                 uuid references public.teks_standards(id) on delete cascade,
        year_adopted              int  not null,
        source_url                text not null,
        created_at                timestamptz not null default now(),
        updated_at                timestamptz not null default now()
      );
      create index if not exists teks_standards_subject_grade_idx
        on public.teks_standards (subject, grade);
      create index if not exists teks_standards_parent_id_idx
        on public.teks_standards (parent_id);
    `,
  },

  // ───── districts ─────
  {
    name: "table: districts",
    sql: `
      create table if not exists public.districts (
        id                  uuid primary key default gen_random_uuid(),
        tea_district_number text unique not null,
        name                text not null,
        county              text not null,
        region              text not null,
        enrollment          int,
        source_url          text not null,
        created_at          timestamptz not null default now(),
        updated_at          timestamptz not null default now()
      );
    `,
  },

  // ───── campuses ─────
  {
    name: "table: campuses",
    sql: `
      create table if not exists public.campuses (
        id                uuid primary key default gen_random_uuid(),
        district_id       uuid not null references public.districts(id) on delete cascade,
        tea_campus_number text unique not null,
        name              text not null,
        grade_levels      text not null,
        enrollment        int,
        source_url        text not null,
        created_at        timestamptz not null default now(),
        updated_at        timestamptz not null default now()
      );
      create index if not exists campuses_district_id_idx
        on public.campuses (district_id);
    `,
  },

  // ───── assessments ─────
  {
    name: "table: assessments",
    sql: `
      create table if not exists public.assessments (
        id              uuid primary key default gen_random_uuid(),
        campus_id       uuid not null references public.campuses(id) on delete cascade,
        year            int  not null,
        subject         text not null,
        grade           text not null,
        approaches_pct  numeric not null,
        meets_pct       numeric not null,
        masters_pct     numeric not null,
        source_note     text not null,
        source_url      text,
        created_at      timestamptz not null default now(),
        updated_at      timestamptz not null default now()
      );
      create index if not exists assessments_campus_year_idx
        on public.assessments (campus_id, year);
      create index if not exists assessments_year_subject_grade_idx
        on public.assessments (year, subject, grade);
    `,
  },

  // ───── updated_at trigger ─────
  {
    name: "trigger: set_updated_at",
    sql: `
      create or replace function public.set_updated_at()
      returns trigger language plpgsql as $$
      begin
        new.updated_at = now();
        return new;
      end;
      $$;

      do $$
      declare t text;
      begin
        for t in
          select unnest(array['teks_standards','districts','campuses','assessments'])
        loop
          execute format(
            'drop trigger if exists set_updated_at on public.%I;', t
          );
          execute format(
            'create trigger set_updated_at before update on public.%I
             for each row execute function public.set_updated_at();', t
          );
        end loop;
      end$$;
    `,
  },

  // ───── RLS + public read policies ─────
  {
    name: "rls: enable + public read",
    sql: `
      do $$
      declare t text;
      begin
        for t in
          select unnest(array['teks_standards','districts','campuses','assessments'])
        loop
          execute format('alter table public.%I enable row level security;', t);
          execute format('drop policy if exists "public read" on public.%I;', t);
          execute format(
            'create policy "public read" on public.%I for select to anon, authenticated using (true);',
            t
          );
        end loop;
      end$$;
    `,
  },
];

async function execSql(query: string): Promise<{ ok: true } | { ok: false; error: string }> {
  const { error } = await supabase.rpc("exec_sql", { query });
  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

async function ensureBootstrap(): Promise<void> {
  // Probe with a no-op DDL.
  const probe = await execSql("select 1;");
  if (probe.ok) return;

  // Surface the bootstrap SQL.
  const here = dirname(fileURLToPath(import.meta.url));
  const bootstrap = await readFile(join(here, "_bootstrap.sql"), "utf8");

  console.error(
    [
      "",
      "✗ exec_sql RPC is not available on this project yet.",
      "",
      "  One-time setup — paste this into Supabase Studio → SQL Editor → Run:",
      "",
      "  (file: scripts/_bootstrap.sql)",
      "",
      "──────────────── BEGIN bootstrap.sql ────────────────",
      bootstrap.trimEnd(),
      "──────────────── END bootstrap.sql ──────────────────",
      "",
      "Then re-run: npm run db:migrate",
      "",
    ].join("\n"),
  );
  process.exit(2);
}

async function tableCount(name: string): Promise<number | string> {
  const { count, error } = await supabase
    .from(name)
    .select("*", { count: "exact", head: true });
  if (error) return `error: ${error.message}`;
  return count ?? 0;
}

async function main() {
  console.log("→ Connecting to", SUPABASE_URL);
  await ensureBootstrap();

  for (const step of steps) {
    process.stdout.write(`  · ${step.name} ... `);
    const res = await execSql(step.sql);
    if (!res.ok) {
      console.log("FAIL");
      console.error("    " + res.error);
      process.exit(1);
    }
    console.log("ok");
  }

  console.log("\n✓ Migration complete.\n");

  const tables = ["teks_standards", "districts", "campuses", "assessments"];
  console.log("Row counts:");
  for (const t of tables) {
    const c = await tableCount(t);
    console.log(`  ${t.padEnd(18)}  ${c}`);
  }
  console.log("");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
