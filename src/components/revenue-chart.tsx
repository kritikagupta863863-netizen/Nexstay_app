"use client";

import { useState } from "react";

type Period = "monthly" | "3months" | "6months" | "9months" | "year-2026" | "year-2025" | "year-2024";

type DataPoint = { label: string; value: number };

const periodData: Record<Period, { points: DataPoint[]; unit: string; total: number }> = {
  monthly: {
    unit: "weekly",
    total: 184500,
    points: [
      { label: "Week 1", value: 42000 },
      { label: "Week 2", value: 51000 },
      { label: "Week 3", value: 46500 },
      { label: "Week 4", value: 45000 },
    ],
  },
  "3months": {
    unit: "monthly",
    total: 531000,
    points: [
      { label: "Jul", value: 168000 },
      { label: "Aug", value: 178500 },
      { label: "Sep", value: 184500 },
    ],
  },
  "6months": {
    unit: "monthly",
    total: 1015000,
    points: [
      { label: "Apr", value: 148000 },
      { label: "May", value: 155000 },
      { label: "Jun", value: 161500 },
      { label: "Jul", value: 168000 },
      { label: "Aug", value: 178500 },
      { label: "Sep", value: 184500 },
    ],
  },
  "9months": {
    unit: "monthly",
    total: 1384500,
    points: [
      { label: "Jan", value: 132000 },
      { label: "Feb", value: 138000 },
      { label: "Mar", value: 141500 },
      { label: "Apr", value: 148000 },
      { label: "May", value: 155000 },
      { label: "Jun", value: 161500 },
      { label: "Jul", value: 168000 },
      { label: "Aug", value: 178500 },
      { label: "Sep", value: 184500 },
    ],
  },
  "year-2026": {
    unit: "monthly",
    total: 1384500,
    points: [
      { label: "Jan", value: 132000 },
      { label: "Feb", value: 138000 },
      { label: "Mar", value: 141500 },
      { label: "Apr", value: 148000 },
      { label: "May", value: 155000 },
      { label: "Jun", value: 161500 },
      { label: "Jul", value: 168000 },
      { label: "Aug", value: 178500 },
      { label: "Sep", value: 184500 },
    ],
  },
  "year-2025": {
    unit: "monthly",
    total: 1740000,
    points: [
      { label: "Jan", value: 118000 },
      { label: "Feb", value: 122000 },
      { label: "Mar", value: 128000 },
      { label: "Apr", value: 136000 },
      { label: "May", value: 141000 },
      { label: "Jun", value: 148000 },
      { label: "Jul", value: 152000 },
      { label: "Aug", value: 158000 },
      { label: "Sep", value: 162000 },
      { label: "Oct", value: 168000 },
      { label: "Nov", value: 174000 },
      { label: "Dec", value: 178000 },
    ],
  },
  "year-2024": {
    unit: "monthly",
    total: 1590000,
    points: [
      { label: "Jan", value: 104000 },
      { label: "Feb", value: 108000 },
      { label: "Mar", value: 112000 },
      { label: "Apr", value: 118000 },
      { label: "May", value: 124000 },
      { label: "Jun", value: 131000 },
      { label: "Jul", value: 138000 },
      { label: "Aug", value: 143000 },
      { label: "Sep", value: 148000 },
      { label: "Oct", value: 154000 },
      { label: "Nov", value: 160000 },
      { label: "Dec", value: 165000 },
    ],
  },
};

const periodLabels: Record<Period, string> = {
  monthly: "This Month",
  "3months": "Last 3 Months",
  "6months": "Last 6 Months",
  "9months": "Last 9 Months",
  "year-2026": "2026",
  "year-2025": "2025",
  "year-2024": "2024",
};

function formatINR(value: number) {
  if (value >= 100000) return `\u20b9${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `\u20b9${(value / 1000).toFixed(0)}K`;
  return `\u20b9${value}`;
}

function formatINRFull(value: number) {
  return `\u20b9${value.toLocaleString("en-IN")}`;
}

function LineGraph({ points }: { points: DataPoint[] }) {
  const W = 600;
  const H = 180;
  const PAD = { top: 20, right: 20, bottom: 32, left: 52 };
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;

  const max = Math.max(...points.map((p) => p.value));
  const min = Math.min(...points.map((p) => p.value));
  const paddedMin = Math.max(0, min - (max - min) * 0.15);
  const range = max - paddedMin || 1;

  const toX = (i: number) =>
    PAD.left + (points.length === 1 ? innerW / 2 : (i / (points.length - 1)) * innerW);
  const toY = (v: number) => PAD.top + innerH - ((v - paddedMin) / range) * innerH;

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${toX(i).toFixed(1)} ${toY(p.value).toFixed(1)}`)
    .join(" ");

  const fillD =
    pathD +
    ` L ${toX(points.length - 1).toFixed(1)} ${(PAD.top + innerH).toFixed(1)}` +
    ` L ${toX(0).toFixed(1)} ${(PAD.top + innerH).toFixed(1)} Z`;

  const yTicks = [paddedMin, paddedMin + range * 0.5, max];

  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="revenue-line-svg"
      aria-label="Revenue trend line chart"
      role="img"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="rev-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b62d8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3b62d8" stopOpacity="0.01" />
        </linearGradient>
      </defs>

      {yTicks.map((tick, i) => {
        const y = toY(tick);
        return (
          <g key={i}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 3" />
            <text x={PAD.left - 8} y={y + 4} textAnchor="end" fontSize="9" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
              {formatINR(tick)}
            </text>
          </g>
        );
      })}

      <path d={fillD} fill="url(#rev-grad)" />
      <path d={pathD} fill="none" stroke="#3b62d8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {points.map((p, i) => {
        const cx = toX(i);
        const cy = toY(p.value);
        const isHov = hovered === i;
        const tipX = Math.min(Math.max(cx, PAD.left + 34), W - PAD.right - 34);
        return (
          <g key={p.label}>
            <text x={cx} y={H - 4} textAnchor="middle" fontSize="9" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace">
              {p.label}
            </text>

            {isHov && (
              <g>
                <line x1={cx} x2={cx} y1={PAD.top} y2={PAD.top + innerH} stroke="#3b62d8" strokeWidth="1" strokeDasharray="3 2" opacity="0.45" />
                <rect x={tipX - 36} y={cy - 30} width={72} height={22} rx={6} fill="#1e3a8a" />
                <text x={tipX} y={cy - 15} textAnchor="middle" fontSize="9.5" fill="#fff" fontFamily="'JetBrains Mono', monospace" fontWeight="600">
                  {formatINR(p.value)}
                </text>
              </g>
            )}

            <circle cx={cx} cy={cy} r={isHov ? 6 : 3.5} fill={isHov ? "#1e3a8a" : "#3b62d8"} stroke="#fff" strokeWidth="2" />

            <rect
              x={cx - 20}
              y={PAD.top}
              width={40}
              height={innerH + PAD.bottom}
              fill="transparent"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "crosshair" }}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function RevenueChart() {
  const [period, setPeriod] = useState<Period>("6months");
  const data = periodData[period];

  const first = data.points[0].value;
  const last = data.points[data.points.length - 1].value;
  const growth = data.points.length >= 2 ? (((last - first) / first) * 100).toFixed(1) : null;
  const isUp = growth !== null && Number(growth) >= 0;

  return (
    <section className="panel revenue-chart-panel" aria-labelledby="rev-chart-title">
      <div className="rev-chart-header">
        <div>
          <p className="eyebrow">TOTAL REVENUE</p>
          <h2 id="rev-chart-title">Revenue trend</h2>
        </div>
        <div className="rev-chart-controls">
          {growth && (
            <span className={`rev-growth-badge ${isUp ? "positive" : "negative"}`}>
              {isUp ? "\u2191" : "\u2193"} {Math.abs(Number(growth))}% trend
            </span>
          )}
          <label htmlFor="revenue-period-select" className="sr-only">Select time period</label>
          <select
            id="revenue-period-select"
            className="rev-period-select"
            value={period}
            onChange={(e) => setPeriod(e.target.value as Period)}
            aria-label="Select time period for revenue chart"
          >
            <optgroup label="Rolling">
              <option value="monthly">This Month (weekly)</option>
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="9months">Last 9 Months</option>
            </optgroup>
            <optgroup label="Year-wise">
              <option value="year-2026">2026</option>
              <option value="year-2025">2025</option>
              <option value="year-2024">2024</option>
            </optgroup>
          </select>
        </div>
      </div>

      <div className="rev-summary-row">
        <div className="rev-summary-item">
          <span className="rev-summary-label">Total revenue</span>
          <strong className="rev-summary-value">{formatINRFull(data.total)}</strong>
        </div>
        <div className="rev-summary-item">
          <span className="rev-summary-label">Period</span>
          <strong className="rev-summary-value">{periodLabels[period]}</strong>
        </div>
        <div className="rev-summary-item">
          <span className="rev-summary-label">Interval</span>
          <strong className="rev-summary-value rev-summary-interval">{data.unit === "weekly" ? "Weekly" : "Monthly"}</strong>
        </div>
        <div className="rev-summary-item">
          <span className="rev-summary-label">Latest data point</span>
          <strong className="rev-summary-value">{formatINRFull(last)}</strong>
        </div>
      </div>

      <div className="rev-chart-area">
        <LineGraph points={data.points} key={period} />
      </div>

      <p className="rev-chart-note">
        Showing <strong>{data.unit}</strong> data points for <strong>{periodLabels[period]}</strong> &middot; Hover over dots to see exact values
      </p>
    </section>
  );
}
