"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type PGProperty = {
  id: string;
  name: string;
  location: string;
  type: string;
  bedsTotal: number;
  bedsOccupied: number;
  status: "Active" | "Maintenance";
};

export const ownerProperties: PGProperty[] = [
  {
    id: "prop-maple",
    name: "Maple House",
    location: "Indiranagar, Bengaluru",
    type: "Co-ed Premium PG",
    bedsTotal: 22,
    bedsOccupied: 18,
    status: "Active"
  },
  {
    id: "prop-silver",
    name: "Silver Oak PG",
    location: "Koramangala 4th Block, Bengaluru",
    type: "Boys Executive PG",
    bedsTotal: 34,
    bedsOccupied: 31,
    status: "Active"
  },
  {
    id: "prop-gulmohar",
    name: "Gulmohar Heights",
    location: "HSR Layout Sector 2, Bengaluru",
    type: "Girls Luxury PG",
    bedsTotal: 28,
    bedsOccupied: 24,
    status: "Active"
  }
];

type AppHeaderProps = {
  activeNav?: string;
  onSelectProperty?: (property: PGProperty) => void;
};

export function AppHeader({ onSelectProperty }: AppHeaderProps) {
  const [selectedProperty, setSelectedProperty] = useState<PGProperty>(ownerProperties[0]);
  const [pgDropdownOpen, setPgDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiQueryLog, setAiQueryLog] = useState<string[]>([]);

  const pgRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pgRef.current && !pgRef.current.contains(event.target as Node)) {
        setPgDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPgDropdownOpen(false);
        setNotificationsOpen(false);
        setProfileOpen(false);
        setAiDrawerOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelectProperty = (property: PGProperty) => {
    setSelectedProperty(property);
    setPgDropdownOpen(false);
    if (onSelectProperty) {
      onSelectProperty(property);
    }
  };

  const handleAiAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    setAiQueryLog((prev) => [aiPrompt.trim(), ...prev]);
    setAiPrompt("");
  };

  const occupancyPercent = Math.round((selectedProperty.bedsOccupied / selectedProperty.bedsTotal) * 100);

  return (
    <>
      <header className="app-top-header" aria-label="Main application header">
        {/* Left: PG Switcher */}
        <div className="app-header-left">
          {/* PG Switcher Dropdown */}
          <div className="pg-switcher-container" ref={pgRef}>
            <button
              type="button"
              className={`pg-switcher-btn ${pgDropdownOpen ? "open" : ""}`}
              onClick={() => setPgDropdownOpen(!pgDropdownOpen)}
              aria-haspopup="true"
              aria-expanded={pgDropdownOpen}
              aria-label={`Current PG: ${selectedProperty.name}. Click to switch between your properties`}
            >
              <span className="pg-icon-circle" aria-hidden="true">🏛</span>
              <div className="pg-details">
                <div className="pg-title-row">
                  <span className="pg-name">{selectedProperty.name}</span>
                  <span className="pg-badge">{selectedProperty.bedsOccupied}/{selectedProperty.bedsTotal} Beds</span>
                </div>
                <span className="pg-location">{selectedProperty.location}</span>
              </div>
              <span className="pg-chevron" aria-hidden="true">{pgDropdownOpen ? "▴" : "▾"}</span>
            </button>

            {pgDropdownOpen && (
              <div className="pg-dropdown-menu" role="menu" aria-label="Your PG properties">
                <div className="pg-dropdown-header">
                  <div>
                    <strong>Your PG Properties</strong>
                    <p>Single-owner portfolio (3 registered PGs)</p>
                  </div>
                  <span className="owner-badge">Owner</span>
                </div>

                <div className="pg-dropdown-list">
                  {ownerProperties.map((pg) => {
                    const isSelected = pg.id === selectedProperty.id;
                    const occ = Math.round((pg.bedsOccupied / pg.bedsTotal) * 100);
                    return (
                      <button
                        key={pg.id}
                        type="button"
                        className={`pg-option-card ${isSelected ? "selected" : ""}`}
                        role="menuitem"
                        onClick={() => handleSelectProperty(pg)}
                      >
                        <div className="pg-option-radio">
                          <span className={`radio-indicator ${isSelected ? "checked" : ""}`} />
                        </div>
                        <div className="pg-option-content">
                          <div className="pg-option-title-row">
                            <strong>{pg.name}</strong>
                            <span className={`pg-status-pill ${pg.status.toLowerCase()}`}>
                              {pg.status}
                            </span>
                          </div>
                          <span className="pg-option-location">{pg.location}</span>
                          <div className="pg-option-stats">
                            <span className="stat-item">
                              <span className="mono">{pg.bedsOccupied}</span>/{pg.bedsTotal} beds
                            </span>
                            <span className="stat-item">
                              <span className="mono">{occ}%</span> occupancy
                            </span>
                            <span className="stat-item type-tag">{pg.type}</span>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="pg-dropdown-footer">
                  <button
                    type="button"
                    className="add-property-btn"
                    onClick={() => {
                      setPgDropdownOpen(false);
                      alert("Opening Multi-Property Onboarding Wizard: Add a new PG to your portfolio.");
                    }}
                  >
                    <span>+</span> Register new PG property
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Assistant, Notifications & Super Admin / Owner Profile */}
        <div className="app-header-right">
          {/* AI Assistant Button */}
          <button
            type="button"
            className="ai-assistant-btn"
            onClick={() => setAiDrawerOpen(true)}
            aria-label="Open NexStay AI Assistant"
            title="NexStay AI Operational Copilot"
          >
            <span className="ai-sparkle" aria-hidden="true">✦</span>
            <span className="ai-btn-text">NexStay AI</span>
            <span className="ai-pulse-dot" aria-hidden="true" />
          </button>

          {/* Notifications Trigger */}
          <div className="header-popover-wrap" ref={notifRef}>
            <button
              type="button"
              className={`header-icon-btn ${notificationsOpen ? "active" : ""}`}
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              aria-label="View notifications. 3 unread items"
              aria-haspopup="true"
              aria-expanded={notificationsOpen}
            >
              <span className="bell-symbol" aria-hidden="true">🔔</span>
              <span className="notification-badge" aria-hidden="true">3</span>
            </button>

            {notificationsOpen && (
              <div className="header-dropdown notifications-dropdown" role="dialog" aria-label="Notifications">
                <div className="dropdown-header">
                  <div>
                    <strong>Notifications</strong>
                    <span className="badge-count">3 unread</span>
                  </div>
                  <button
                    type="button"
                    className="text-action-btn"
                    onClick={() => setNotificationsOpen(false)}
                  >
                    Mark all read
                  </button>
                </div>

                <ul className="notification-list">
                  <li className="notification-item unread">
                    <span className="notif-pip green" aria-hidden="true">₹</span>
                    <div className="notif-text">
                      <p><strong>Riya Shah</strong> paid ₹4,000 rent for <strong>Room 103-B</strong> via UPI</p>
                      <time>12 mins ago</time>
                    </div>
                  </li>
                  <li className="notification-item unread">
                    <span className="notif-pip rose" aria-hidden="true">!</span>
                    <div className="notif-text">
                      <p><strong>High priority complaint:</strong> AC not cooling in <strong>Room 301</strong> (Michael Kim)</p>
                      <time>1 hour ago</time>
                    </div>
                  </li>
                  <li className="notification-item unread">
                    <span className="notif-pip amber" aria-hidden="true">⏱</span>
                    <div className="notif-text">
                      <p><strong>Rent overdue alert:</strong> 6 invoices pending for {selectedProperty.name}</p>
                      <time>3 hours ago</time>
                    </div>
                  </li>
                  <li className="notification-item">
                    <span className="notif-pip blue" aria-hidden="true">⚙</span>
                    <div className="notif-text">
                      <p>Monthly automated billing run successfully generated for September 2026</p>
                      <time>Yesterday</time>
                    </div>
                  </li>
                </ul>

                <div className="dropdown-footer">
                  <Link href="/billing#pending-invoices" onClick={() => setNotificationsOpen(false)}>
                    Review all pending dues →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <span className="header-divider compact" aria-hidden="true" />

          {/* Profile & Super Admin / Owner Icon */}
          <div className="header-popover-wrap" ref={profileRef}>
            <button
              type="button"
              className={`profile-trigger-btn ${profileOpen ? "active" : ""}`}
              onClick={() => setProfileOpen(!profileOpen)}
              aria-label="Super Admin & Owner account menu for Arjun Kumar"
              aria-haspopup="true"
              aria-expanded={profileOpen}
            >
              <span className="profile-avatar">
                AK
                <span className="online-indicator" aria-label="Online status" />
              </span>
              <div className="profile-btn-info">
                <span className="profile-name">Arjun Kumar</span>
                <span className="profile-role-pill">Super Admin</span>
              </div>
              <span className="profile-chevron" aria-hidden="true">{profileOpen ? "▴" : "▾"}</span>
            </button>

            {profileOpen && (
              <div className="header-dropdown profile-dropdown" role="menu" aria-label="User account menu">
                <div className="profile-dropdown-user">
                  <span className="profile-avatar large">AK</span>
                  <div>
                    <strong>Arjun Kumar</strong>
                    <span className="user-email">arjun.kumar@nexstay.in</span>
                    <span className="user-role-tag">Super Admin &amp; Owner</span>
                  </div>
                </div>

                <div className="profile-portfolio-summary">
                  <div className="summary-col">
                    <small>OWNED PGS</small>
                    <strong>3 Properties</strong>
                  </div>
                  <div className="summary-col">
                    <small>TOTAL CAPACITY</small>
                    <strong className="mono">84 Beds</strong>
                  </div>
                </div>

                <div className="profile-menu-links">
                  <a
                    href="#settings"
                    className="menu-link"
                    role="menuitem"
                    onClick={(e) => {
                      e.preventDefault();
                      setProfileOpen(false);
                      alert("Settings: Configure property details, owner profile, notifications, and account preferences.");
                    }}
                  >
                    <span aria-hidden="true">⚙</span>
                    <span>Settings</span>
                  </a>
                </div>

                <div className="profile-menu-footer">
                  <button
                    type="button"
                    className="sign-out-btn"
                    onClick={() => {
                      setProfileOpen(false);
                      alert("Session logout requested. Protected routes will reject unauthorized access.");
                    }}
                  >
                    <span>🚪</span> Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* AI Copilot Side Drawer */}
      {aiDrawerOpen && (
        <div className="ai-drawer-backdrop" role="presentation" onClick={() => setAiDrawerOpen(false)}>
          <aside
            className="ai-drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-drawer-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ai-drawer-header">
              <div className="ai-title-wrap">
                <span className="ai-badge-icon" aria-hidden="true">✦</span>
                <div>
                  <h2 id="ai-drawer-title">NexStay Copilot</h2>
                  <p>AI operational assistant for <strong>{selectedProperty.name}</strong></p>
                </div>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setAiDrawerOpen(false)}
                aria-label="Close AI Assistant"
              >
                ×
              </button>
            </div>

            <div className="ai-drawer-body">
              <section className="ai-status-card">
                <div className="ai-status-top">
                  <span className="ai-tag">DAILY EXECUTIVE BRIEF</span>
                  <span className="mono">{occupancyPercent}% Occupied</span>
                </div>
                <h3>Today&apos;s Focus for {selectedProperty.name}</h3>
                <ul className="ai-insights-list">
                  <li>
                    <strong>Occupancy:</strong> {selectedProperty.bedsOccupied} out of {selectedProperty.bedsTotal} beds filled. 4 vacant beds available for immediate booking.
                  </li>
                  <li>
                    <strong>Collections:</strong> ₹24,000 pending across 6 tenant invoices. Default due date (5th) has passed.
                  </li>
                  <li>
                    <strong>Maintenance:</strong> 2 high priority tickets (Room 204 leaking tap, Room 301 AC).
                  </li>
                </ul>
              </section>

              <div className="ai-quick-actions">
                <p className="eyebrow">ONE-CLICK OPERATIONAL ACTIONS</p>
                <button
                  type="button"
                  className="ai-suggestion-chip"
                  onClick={() => setAiPrompt("Draft WhatsApp rent payment reminder for overdue tenants in " + selectedProperty.name)}
                >
                  💬 Draft WhatsApp reminder for overdue tenants
                </button>
                <button
                  type="button"
                  className="ai-suggestion-chip"
                  onClick={() => setAiPrompt("Summarize utility expenses and compare with last month")}
                >
                  📊 Analyze utility &amp; electricity expenses
                </button>
                <button
                  type="button"
                  className="ai-suggestion-chip"
                  onClick={() => setAiPrompt("Show bed availability for incoming move-ins this Friday")}
                >
                  🛏 Check vacant beds for upcoming move-ins
                </button>
              </div>

              {aiQueryLog.length > 0 && (
                <div className="ai-conversation-log">
                  <p className="eyebrow">RECENT QUERIES</p>
                  {aiQueryLog.map((q, idx) => (
                    <div key={idx} className="ai-query-bubble">
                      <p className="ai-user-query"><strong>You:</strong> {q}</p>
                      <div className="ai-response-box">
                        <span className="ai-sparkle-inline">✦</span>
                        <p>
                          Analyzed records for <strong>{selectedProperty.name}</strong>:
                          Drafted reminder ready. In accordance with the SMS/Notification policy,
                          announcements and direct automated dispatches remain staged until provider delivery is configured.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <form className="ai-drawer-footer" onSubmit={handleAiAsk}>
              <div className="ai-input-wrap">
                <input
                  type="text"
                  placeholder={`Ask anything about ${selectedProperty.name}...`}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  aria-label="Ask NexStay Copilot"
                />
                <button type="submit" className="ai-send-btn" aria-label="Send query">
                  ➤
                </button>
              </div>
              <small className="ai-disclaimer">
                NexStay AI complies with tenant privacy &amp; operational boundaries.
              </small>
            </form>
          </aside>
        </div>
      )}
    </>
  );
}
