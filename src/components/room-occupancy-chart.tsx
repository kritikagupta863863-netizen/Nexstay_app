"use client";

import { useState } from "react";

type RoomType = {
  label: string;
  shortLabel: string;
  occupied: number;
  vacant: number;
  maintenance: number;
  rent: string;
  color: string;
};

const roomTypes: RoomType[] = [
  {
    label: "Single Premium",
    shortLabel: "Single",
    occupied: 4,
    vacant: 1,
    maintenance: 0,
    rent: "₹8,500 / mo",
    color: "#3b62d8",
  },
  {
    label: "Double Sharing",
    shortLabel: "Double",
    occupied: 8,
    vacant: 2,
    maintenance: 0,
    rent: "₹6,500 / mo",
    color: "#0ea5e9",
  },
  {
    label: "Triple Sharing",
    shortLabel: "Triple",
    occupied: 6,
    vacant: 1,
    maintenance: 2,
    rent: "₹5,200 / mo",
    color: "#8b5cf6",
  },
];

type TooltipState = { type: RoomType; x: number; y: number } | null;

export function RoomOccupancyChart() {
  const [tooltip, setTooltip] = useState<TooltipState>(null);

  return (
    <div className="room-occ-chart-wrap" aria-label="Room occupancy by type">
      {/* Legend */}
      <div className="room-occ-legend">
        <span className="room-occ-legend-item">
          <span className="room-occ-dot occupied" />
          Occupied
        </span>
        <span className="room-occ-legend-item">
          <span className="room-occ-dot vacant" />
          Vacant
        </span>
        <span className="room-occ-legend-item">
          <span className="room-occ-dot maintenance" />
          Maintenance
        </span>
      </div>

      {/* Bar chart area */}
      <div className="room-occ-bars-outer">
        {roomTypes.map((rt) => {
          const total = rt.occupied + rt.vacant + rt.maintenance;
          const occPct = (rt.occupied / total) * 100;
          const vacPct = (rt.vacant / total) * 100;
          const mntPct = (rt.maintenance / total) * 100;
          const occRate = Math.round((rt.occupied / total) * 100);

          return (
            <div
              key={rt.label}
              className="room-occ-group"
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTooltip({ type: rt, x: rect.left + rect.width / 2, y: rect.top });
              }}
              onMouseLeave={() => setTooltip(null)}
              tabIndex={0}
              aria-label={`${rt.label}: ${rt.occupied} occupied, ${rt.vacant} vacant${rt.maintenance ? `, ${rt.maintenance} in maintenance` : ""}`}
            >
              {/* Stacked bar */}
              <div className="room-occ-bar-container">
                <div className="room-occ-bar-track">
                  {rt.occupied > 0 && (
                    <div
                      className="room-occ-bar-segment seg-occupied"
                      style={{
                        height: `${occPct}%`,
                        background: rt.color,
                      }}
                      title={`Occupied: ${rt.occupied}`}
                    />
                  )}
                  {rt.vacant > 0 && (
                    <div
                      className="room-occ-bar-segment seg-vacant"
                      style={{ height: `${vacPct}%` }}
                      title={`Vacant: ${rt.vacant}`}
                    />
                  )}
                  {rt.maintenance > 0 && (
                    <div
                      className="room-occ-bar-segment seg-maintenance"
                      style={{ height: `${mntPct}%` }}
                      title={`Maintenance: ${rt.maintenance}`}
                    />
                  )}
                </div>

                {/* Occupancy rate pill on the bar */}
                <div
                  className="room-occ-rate-pill"
                  style={{ background: rt.color }}
                  aria-hidden="true"
                >
                  {occRate}%
                </div>
              </div>

              {/* X-axis label */}
              <div className="room-occ-label">
                <span
                  className="room-occ-type-dot"
                  style={{ background: rt.color }}
                />
                {rt.shortLabel}
              </div>

              {/* Count below label */}
              <div className="room-occ-count">
                {rt.occupied}/{total} beds
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail breakdown row */}
      <div className="room-occ-breakdown">
        {roomTypes.map((rt) => {
          const total = rt.occupied + rt.vacant + rt.maintenance;
          return (
            <div key={rt.label} className="room-occ-breakdown-card">
              <div
                className="room-occ-breakdown-header"
                style={{ borderLeftColor: rt.color }}
              >
                <span className="room-occ-breakdown-name">{rt.label}</span>
                <span className="room-occ-breakdown-rent">{rt.rent}</span>
              </div>
              <div className="room-occ-breakdown-stats">
                <div className="room-occ-stat">
                  <span className="room-occ-stat-dot" style={{ background: rt.color }} />
                  <span>Occupied</span>
                  <strong>{rt.occupied}</strong>
                </div>
                <div className="room-occ-stat">
                  <span className="room-occ-stat-dot vacant" />
                  <span>Vacant</span>
                  <strong>{rt.vacant}</strong>
                </div>
                {rt.maintenance > 0 && (
                  <div className="room-occ-stat">
                    <span className="room-occ-stat-dot maintenance" />
                    <span>Maintenance</span>
                    <strong>{rt.maintenance}</strong>
                  </div>
                )}
                <div className="room-occ-stat total">
                  <span>Total beds</span>
                  <strong>{total}</strong>
                </div>
              </div>

              {/* Progress bar */}
              <div className="room-occ-mini-bar" aria-hidden="true">
                <div
                  className="room-occ-mini-filled"
                  style={{
                    width: `${(rt.occupied / total) * 100}%`,
                    background: rt.color,
                  }}
                />
              </div>
              <div className="room-occ-mini-label">
                <span style={{ color: rt.color }}>
                  {Math.round((rt.occupied / total) * 100)}% occupied
                </span>
                <span>{total - rt.occupied} available</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
