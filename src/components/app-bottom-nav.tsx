"use client";

import Link from "next/link";
import { useState } from "react";

export type BottomNavTab = "home" | "rooms" | "tenants" | "finance" | "profile";

type AppBottomNavProps = {
  activeTab: BottomNavTab;
  propertyName?: string;
  propertyLocation?: string;
};

export function AppBottomNav({
  activeTab,
  propertyName = "Maple House",
  propertyLocation = "Indiranagar, Bengaluru"
}: AppBottomNavProps) {
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  return (
    <>
      <nav className="bottom-nav-bar" aria-label="Main bottom navigation">
        {/* 1. Home / Dashboard */}
        <Link
          href="/"
          className={`bottom-nav-item ${activeTab === "home" ? "selected" : "unselected"}`}
          aria-label="Home / Dashboard"
          title="Home / Dashboard"
        >
          <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />
          </svg>
        </Link>

        {/* 2. Rooms */}
        <Link
          href="/rooms"
          className={`bottom-nav-item ${activeTab === "rooms" ? "selected" : "unselected"}`}
          aria-label="Rooms"
          title="Rooms"
        >
          <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2 4v16" />
            <path d="M2 8h18a2 2 0 0 1 2 2v10" />
            <path d="M2 17h20" />
            <path d="M6 8v9" />
          </svg>
        </Link>

        {/* 3. Tenant */}
        <Link
          href="/tenants"
          className={`bottom-nav-item ${activeTab === "tenants" ? "selected" : "unselected"}`}
          aria-label="Tenant"
          title="Tenant"
        >
          <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </Link>

        {/* 4. Finance */}
        <Link
          href="/billing"
          className={`bottom-nav-item ${activeTab === "finance" ? "selected" : "unselected"}`}
          aria-label="Finance"
          title="Finance"
        >
          <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="6" y1="4" x2="18" y2="4" />
            <line x1="6" y1="8.5" x2="18" y2="8.5" />
            <path d="M6 4h7a4.5 4.5 0 0 1 0 9H6" />
            <path d="M11 13l6 8" />
          </svg>
        </Link>

        {/* 5. PG Profile */}
        <button
          type="button"
          className={`bottom-nav-item ${activeTab === "profile" || profileModalOpen ? "selected" : "unselected"}`}
          onClick={() => setProfileModalOpen(true)}
          aria-label="PG Profile"
          title="PG Profile"
        >
          <svg className="bottom-nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M3 21h18" />
            <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
            <path d="M9 9h1" />
            <path d="M9 13h1" />
            <path d="M9 17h1" />
            <path d="M14 9h1" />
            <path d="M14 13h1" />
            <path d="M14 17h1" />
          </svg>
        </button>
      </nav>

      {/* PG Profile Modal */}
      {profileModalOpen && (
        <div className="room-modal-backdrop" role="presentation" onClick={() => setProfileModalOpen(false)}>
          <section
            className="room-modal pg-profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pg-profile-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <p className="eyebrow">PROPERTY PROFILE</p>
                <h2 id="pg-profile-modal-title">{propertyName}</h2>
              </div>
              <button
                type="button"
                className="modal-close"
                aria-label="Close property profile"
                onClick={() => setProfileModalOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-meta">
              <span className="status status-occupied">Active Property</span>
              <span>{propertyLocation}</span>
            </div>

            <div className="pg-profile-grid">
              <div className="pg-profile-stat">
                <span>Total Capacity</span>
                <strong>22 Beds</strong>
              </div>
              <div className="pg-profile-stat">
                <span>Occupancy</span>
                <strong>18 / 22 (82%)</strong>
              </div>
              <div className="pg-profile-stat">
                <span>Notice Period</span>
                <strong>30 Days</strong>
              </div>
              <div className="pg-profile-stat">
                <span>Security Deposit</span>
                <strong>2 Months Rent</strong>
              </div>
            </div>

            <div className="pg-profile-section">
              <h3>Sharing Types &amp; Pricing</h3>
              <ul className="pg-feature-list">
                <li><span>Single Premium</span><strong>₹8,500 / mo</strong></li>
                <li><span>Double Sharing</span><strong>₹6,500 / mo</strong></li>
                <li><span>Triple Sharing</span><strong>₹5,200 / mo</strong></li>
              </ul>
            </div>

            <div className="pg-profile-section">
              <h3>Included Amenities</h3>
              <div className="pg-amenities-tags">
                <span className="amenity-pill">⚡ High-Speed Wi-Fi</span>
                <span className="amenity-pill">🍲 3 Meals Daily</span>
                <span className="amenity-pill">🧹 Daily Housekeeping</span>
                <span className="amenity-pill">📹 24x7 CCTV</span>
                <span className="amenity-pill">💧 RO Water</span>
                <span className="amenity-pill">🔋 Power Backup</span>
                <span className="amenity-pill">🧺 Washing Machine</span>
              </div>
            </div>

            <div className="pg-profile-section">
              <h3>On-Site Operations</h3>
              <p className="pg-manager-note">
                <strong>Property Caretaker:</strong> Ramesh Babu · <code>+91 98450 12345</code>
              </p>
            </div>

            <button
              type="button"
              className="primary-button modal-action"
              onClick={() => setProfileModalOpen(false)}
            >
              Done
            </button>
          </section>
        </div>
      )}
    </>
  );
}
