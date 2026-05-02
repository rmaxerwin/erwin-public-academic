"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SERIES = [
  { key: "approaches", label: "Approaches", color: "#2b5577" },
  { key: "meets", label: "Meets", color: "#406f94" },
  { key: "masters", label: "Masters", color: "#7aa3c2" },
] as const;

const orderIndex = (key: string) => {
  const i = SERIES.findIndex((s) => s.key === key);
  return i === -1 ? 99 : i;
};

export type ChartRow = {
  yearSubject: string;
  approaches: number;
  meets: number;
  masters: number;
};

export function AssessmentChart({ data }: { data: ChartRow[] }) {
  return (
    <div className="w-full">
      <div className="h-[420px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 16, left: 0, bottom: 24 }}
          >
            <CartesianGrid
              stroke="#c9bda3"
              strokeDasharray="2 4"
              vertical={false}
            />
            <XAxis
              dataKey="yearSubject"
              tick={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fill: "#7a6f5a",
              }}
              tickMargin={8}
              interval={0}
              angle={-30}
              textAnchor="end"
              height={70}
            />
            <YAxis
              domain={[0, 100]}
              tick={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fill: "#7a6f5a",
              }}
              label={{
                value: "% of students",
                angle: -90,
                position: "insideLeft",
                style: {
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  fill: "#7a6f5a",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                },
              }}
            />
            <Tooltip
              contentStyle={{
                background: "#fbf8f2",
                border: "1px solid #c9bda3",
                borderRadius: 2,
                fontFamily: "var(--font-sans)",
                fontSize: 13,
              }}
              labelStyle={{ color: "#1a160f" }}
              itemSorter={(item) => orderIndex(String(item.dataKey ?? ""))}
            />
            {SERIES.map((s) => (
              <Bar key={s.key} dataKey={s.key} fill={s.color} name={s.label} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Static legend in declared series order — recharts' Legend reorders by value. */}
      <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.12em] text-ink-soft">
        {SERIES.map((s) => (
          <li key={s.key} className="inline-flex items-center gap-2">
            <span
              aria-hidden
              className="inline-block h-[10px] w-[10px]"
              style={{ background: s.color, borderRadius: 1 }}
            />
            {s.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
