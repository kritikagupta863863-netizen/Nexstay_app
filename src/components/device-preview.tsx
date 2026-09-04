"use client";

import { useState } from "react";

type DeviceMode = "phone" | "tablet";

const devices: Record<DeviceMode, { label: string; width: number; height: number }> = {
  phone: { label: "iPhone 15 Pro", width: 393, height: 852 },
  tablet: { label: "iPad 11-inch", width: 820, height: 1180 }
};

export function DevicePreview() {
  const [mode, setMode] = useState<DeviceMode>("phone");
  const device = devices[mode];

  return (
    <main className="preview-page">
      <header className="preview-header">
        <div>
          <p className="preview-kicker">NEXSTAY / DEVICE PREVIEW</p>
          <h1>Live workspace preview</h1>
          <p className="preview-description">
            See how the owner dashboard feels on a real phone or tablet.
          </p>
        </div>
        <a className="preview-back" href="/">
          ← Back to dashboard
        </a>
      </header>

      <section className="preview-stage" aria-label="Responsive device preview">
        <div className="preview-toolbar">
          <div className="preview-address" aria-label="Preview address">
            <span className="preview-live-dot" aria-hidden="true" />
            <span>localhost:3000</span>
            <span className="preview-address-path">/</span>
            <span className="preview-live-label">LIVE</span>
          </div>
          <div className="device-toggle" role="group" aria-label="Choose preview device">
            {(Object.keys(devices) as DeviceMode[]).map((deviceMode) => (
              <button
                className={mode === deviceMode ? "device-toggle-button active" : "device-toggle-button"}
                key={deviceMode}
                type="button"
                aria-pressed={mode === deviceMode}
                onClick={() => setMode(deviceMode)}
              >
                <span aria-hidden="true">{deviceMode === "phone" ? "▯" : "▤"}</span>
                {devices[deviceMode].label}
              </button>
            ))}
          </div>
        </div>

        <div className="device-meta">
          <span>{device.label} viewport</span>
          <span className="device-meta-separator" aria-hidden="true">·</span>
          <span>{device.width} × {device.height}</span>
        </div>

        <div className={`device-frame device-frame-${mode}`}>
          <div className="device-speaker" aria-hidden="true" />
          <div className="device-screen">
            <iframe
              key={mode}
              title={`NexStay dashboard in ${device.label.toLowerCase()} view`}
              src="/"
            />
          </div>
          <div className="device-home-indicator" aria-hidden="true" />
        </div>
        <p className="preview-hint">
          This is a live view of <code>localhost:3000/</code> inside the selected device size.
        </p>
      </section>
    </main>
  );
}
