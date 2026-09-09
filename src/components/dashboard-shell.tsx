import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { AppBottomNav } from "@/components/app-bottom-nav";
import { RevenueChart } from "@/components/revenue-chart";
import { RoomOccupancyChart } from "@/components/room-occupancy-chart";
import { ComplaintsPanel } from "@/components/complaints-panel";
import { RecentExpensesPanel } from "@/components/recent-expenses-panel";
import { NexstayAIBanner } from "@/components/nexstay-ai-banner";

const navigation = [
  { label: "Overview", icon: "⌂", href: "/", active: true },
  { label: "Rooms & beds", icon: "▦", href: "/rooms", active: false },
  { label: "Tenants", icon: "♙", href: "/tenants" },
  { label: "Billing", icon: "₹", href: "/billing" },
  { label: "Complaints", icon: "!", href: "/tenants/complaints" }
];

const beds = [
  ["101-A", "Occupied", "Aarav Mehta"],
  ["101-B", "Occupied", "Riya Shah"],
  ["102-A", "Vacant", "Ready to assign"],
  ["102-B", "Vacant", "Ready to assign"],
  ["103-A", "Occupied", "Kabir Singh"],
  ["103-B", "Maintenance", "Fan replacement"]
];



function StatusChip({ status }: { status: string }) {
  return <span className={`status status-${status.toLowerCase()}`}>{status}</span>;
}

export function DashboardShell() {
  return (
    <div className="app-wrapper">
      <AppHeader activeNav="Overview" />
      <div className="app-shell">
        <aside className="sidebar" aria-label="Primary navigation">
          <nav>
            {navigation.map((item) => <Link className={item.active ? "nav-item active" : "nav-item"} href={item.href} key={item.label}><span aria-hidden="true">{item.icon}</span>{item.label}</Link>)}
          </nav>
          <div className="sidebar-footer"><a className="nav-item" href="#"><span aria-hidden="true">⚙</span>Settings</a><div className="owner-card"><span className="avatar">AK</span><span><strong>Arjun Kumar</strong><small>Super Admin</small></span></div></div>
        </aside>

        <main className="main-content">
          <header className="page-header">
            <div><p className="eyebrow">SATURDAY, 5 SEPTEMBER 2026</p><h1>Good morning, Arjun</h1><p className="lede">Here&apos;s what needs your attention today.</p></div>
            <div className="header-actions"><button className="primary-button">Collect Rent</button></div>
          </header>

        <section className="notice-banner" aria-label="Implementation status"><span aria-hidden="true">i</span><p><strong>Documentation-first preview.</strong> Live data, authentication, and database workflows will be connected in the next slice.</p></section>

        <section className="metrics" aria-label="Property summary">
          <Link className="metric-card metric-card-link" href="/rooms"><span className="metric-label">Occupancy</span><strong>82<span className="metric-unit">%</span></strong><span className="metric-trend positive">↑ 4.2% <em>vs last month</em></span></Link>
          <Link className="metric-card metric-card-link" href="/billing"><span className="metric-label">Monthly revenue</span><strong>₹1,84,500</strong><span className="metric-trend positive">↑ 8.6% <em>vs last month</em></span></Link>
          <Link className="metric-card metric-card-link" href="/billing#pending-invoices"><span className="metric-label">Pending rent</span><strong>₹24,000</strong><span className="metric-trend warning">6 invoices <em>need attention</em></span></Link>
          <Link className="metric-card metric-card-link" href="/billing#recent-expenses"><span className="metric-label">Monthly expense</span><strong>₹30,250</strong><span className="metric-trend warning">6 recorded <em>this month</em></span></Link>
        </section>

        <RevenueChart />

        <div className="dashboard-grid">
          <section className="panel bed-panel"><div className="section-heading"><div><p className="eyebrow">LIVE INVENTORY</p><h2>Rooms &amp; beds</h2></div><Link href="/rooms">View all <span aria-hidden="true">→</span></Link></div><RoomOccupancyChart /></section>
          <ComplaintsPanel />
        </div>

        <RecentExpensesPanel />

        <NexstayAIBanner />
        <p className="footer-note">Online-only owner workspace · English · INR · Asia/Kolkata</p>
      </main>
      <AppBottomNav activeTab="home" />
      </div>
    </div>
  );
}
