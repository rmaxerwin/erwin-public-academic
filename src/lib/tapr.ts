/**
 * Deep-link a district's TEA Texas Academic Performance Report (TAPR).
 *
 * The TEA report broker accepts a district number and a year and renders
 * the district-level TAPR directly, skipping the search form.
 *
 * `ccyy` is the spring year of the school year (2023–24 → 2024).
 */

export const LATEST_TAPR_YEAR = 2024;

export function taprDistrictReportUrl(
  teaDistrictNumber: string,
  year: number = LATEST_TAPR_YEAR,
): string {
  const params = new URLSearchParams({
    _service: "marykay",
    _program: "perfrept.perfmast.sas",
    _debug: "0",
    ccyy: String(year),
    lev: "D",
    id: teaDistrictNumber,
    prgopt: "reports/tapr/paper_tapr.sas",
  });
  return `https://rptsvr1.tea.texas.gov/cgi/sas/broker?${params.toString()}`;
}
