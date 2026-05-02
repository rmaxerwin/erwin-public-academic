/**
 * Generates STAAR-style synthetic results.
 *
 * EVERY row carries source_note marking it as fake. Any UI surfacing these
 * numbers must show that note prominently — never let a visitor mistake
 * synthetic data for real TAPR results.
 */

export const SYNTHETIC_SOURCE_NOTE =
  "Synthetic data — for UI development only. Not real TEA assessment results.";

export type SyntheticAssessment = {
  tea_campus_number: string;
  year: number;
  subject: "Reading" | "Math" | "Science" | "Social Studies";
  grade: string;
  approaches_pct: number;
  meets_pct: number;
  masters_pct: number;
  source_note: string;
};

const YEARS = [2022, 2023, 2024, 2025] as const;

// Cheap deterministic PRNG so generated numbers are stable across runs.
function mulberry32(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(...parts: (string | number)[]): number {
  let h = 2166136261;
  for (const p of parts) {
    const s = String(p);
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
  }
  return h >>> 0;
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function gradeBandSubjects(gradeLevels: string): {
  subjects: SyntheticAssessment["subject"][];
  testedGrades: string[];
} {
  // STAAR is administered 3-8 + EOC for HS. Fort Worth campus grade
  // bands map roughly to:
  //   PK-5  → Reading + Math (3-5), Science (5)
  //   6-8   → Reading + Math (6-8), Science (8), Social Studies (8)
  //   9-12  → EOC: English I/II (Reading), Algebra I (Math), Biology
  //           (Science), US History (Social Studies). We collapse to
  //           the four canonical subjects.
  if (gradeLevels.startsWith("PK") || /^[K1-5]/.test(gradeLevels)) {
    return {
      subjects: ["Reading", "Math", "Science"],
      testedGrades: ["3", "4", "5"],
    };
  }
  if (/^6/.test(gradeLevels)) {
    return {
      subjects: ["Reading", "Math", "Science", "Social Studies"],
      testedGrades: ["6", "7", "8"],
    };
  }
  // 9-12
  return {
    subjects: ["Reading", "Math", "Science", "Social Studies"],
    testedGrades: ["EOC"],
  };
}

export function generateAssessmentsForCampus(
  teaCampusNumber: string,
  gradeLevels: string,
): SyntheticAssessment[] {
  const { subjects, testedGrades } = gradeBandSubjects(gradeLevels);
  const out: SyntheticAssessment[] = [];

  for (const subject of subjects) {
    // Per-(campus,subject) baseline so a campus has a recognizable shape
    // year over year, not pure noise.
    const baselineRand = mulberry32(hashSeed(teaCampusNumber, subject));
    const approachesBase = 50 + Math.floor(baselineRand() * 30); // 50–79
    const meetsBase = 25 + Math.floor(baselineRand() * 25); // 25–49
    const mastersBase = 8 + Math.floor(baselineRand() * 17); // 8–24

    for (const year of YEARS) {
      for (const grade of testedGrades) {
        const r = mulberry32(hashSeed(teaCampusNumber, subject, grade, year));
        const drift = (r() - 0.5) * 8; // ±4 pts year-over-year wiggle
        const approaches = clamp(Math.round(approachesBase + drift), 40, 85);
        const meets = clamp(
          Math.round(meetsBase + drift * 0.7),
          20,
          Math.min(60, approaches - 5),
        );
        const masters = clamp(
          Math.round(mastersBase + drift * 0.4),
          5,
          Math.min(30, meets - 3),
        );

        out.push({
          tea_campus_number: teaCampusNumber,
          year,
          subject,
          grade,
          approaches_pct: approaches,
          meets_pct: meets,
          masters_pct: masters,
          source_note: SYNTHETIC_SOURCE_NOTE,
        });
      }
    }
  }
  return out;
}

export function generateAllAssessments(
  campuses: { tea_campus_number: string; grade_levels: string }[],
): SyntheticAssessment[] {
  return campuses.flatMap((c) =>
    generateAssessmentsForCampus(c.tea_campus_number, c.grade_levels),
  );
}
