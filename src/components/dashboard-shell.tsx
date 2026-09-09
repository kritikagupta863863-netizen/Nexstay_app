import Link from "next/link";

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

const recentExpenses = [
  { label: "Electricity bill", meta: "Maple House · 2 Sep 2026", amount: "₹6,200" },
  { label: "Plumbing repair", meta: "Room 204 · 30 Aug 2026", amount: "₹1,450" },
  { label: "Staff salary", meta: "Housekeeping · 28 Aug 2026", amount: "₹18,000" }
];

// Only the top 3 open complaints are shown on the dashboard; the total
// open count matches the "Open complaints" metric card above.
const totalOpenComplaints = 4;
const openComplaints = [
  { title: "Leaking tap", meta: "Room 204 · Riya Shah", priority: "High", raised: "2 days ago" },
  { title: "AC not cooling", meta: "Room 301 · Michael Kim", priority: "High", raised: "1 day ago" },
  { title: "WiFi not working", meta: "Room 102 · Kabir Singh", priority: "Medium", raised: "3 days ago" }
];

function StatusChip({ status }: { status: string }) {
  return <span className={`status status-${status.toLowerCase()}`}>{status}</span>;
}

export function DashboardShell() {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <div className="brand"><span className="brand-mark">N</span><span>NexStay</span></div>
        <div className="property-switcher"><span className="eyebrow">PROPERTY</span><strong>Maple House</strong><span className="property-location">Indiranagar, Bengaluru</span></div>
        <nav>
          {navigation.map((item) => <Link className={item.active ? "nav-item active" : "nav-item"} href={item.href} key={item.label}><span aria-hidden="true">{item.icon}</span>{item.label}</Link>)}
        </nav>
        <div className="sidebar-footer"><a className="nav-item" href="#"><span aria-hidden="true">⚙</span>Settings</a><div className="owner-card"><span className="avatar">AK</span><span><strong>Arjun Kumar</strong><small>Owner account</small></span></div></div>
      </aside>

      <main className="main-content">
        <header className="page-header">
          <div><p className="eyebrow">SATURDAY, 5 SEPTEMBER 2026</p><h1>Good morning, Arjun</h1><p className="lede">Here&apos;s what needs your attention today.</p></div>
          <div className="header-actions"><button className="icon-button" aria-label="View notifications">♧<span className="notification-dot" /></button><button className="primary-button">+ Add tenant</button></div>
        </header>

        <section className="notice-banner" aria-label="Implementation status"><span aria-hidden="true">i</span><p><strong>Documentation-first preview.</strong> Live data, authentication, and database workflows will be connected in the next slice.</p></section>

        <section className="metrics" aria-label="Property summary">
          <Link className="metric-card metric-card-link" href="/rooms"><span className="metric-label">Occupancy</span><strong>82<span className="metric-unit">%</span></strong><span className="metric-trend positive">↑ 4.2% <em>vs last month</em></span></Link>
          <Link className="metric-card metric-card-link" href="/billing"><span className="metric-label">Monthly revenue</span><strong>₹1,84,500</strong><span className="metric-trend positive">↑ 8.6% <em>vs last month</em></span></Link>
          <Link className="metric-card metric-card-link" href="/billing#pending-invoices"><span className="metric-label">Pending rent</span><strong>₹24,000</strong><span className="metric-trend warning">6 invoices <em>need attention</em></span></Link>
          <Link className="metric-card metric-card-link" href="/tenants/complaints"><span className="metric-label">Open complaints</span><strong>4</strong><span className="metric-trend warning">2 high priority</span></Link>
        </section>

        <div className="dashboard-grid">
          <section className="panel bed-panel"><div className="section-heading"><div><p className="eyebrow">LIVE INVENTORY</p><h2>Rooms &amp; beds</h2></div><Link href="/rooms">View all <span aria-hidden="true">→</span></Link></div><div className="bed-summary"><span><i className="dot dot-occupied" /> 18 occupied</span><span><i className="dot dot-vacant" /> 4 vacant</span></div><div className="bed-grid">{beds.map(([room, status, occupant]) => <article className="bed-card" key={room}><div className="bed-card-top"><span className="mono">{room}</span><StatusChip status={status} /></div><strong>{occupant}</strong>{status === "Maintenance" && <small>Action required</small>}</article>)}</div></section>
          <section className="panel complaints-panel" aria-label="Open complaints"><div className="section-heading"><div><p className="eyebrow">TENANT ISSUES</p><h2>Open complaints</h2></div><span className="count-pill">{totalOpenComplaints}</span></div><ul className="complaint-list">{openComplaints.map((complaint) => <li key={complaint.title}><span className={`complaint-priority ${complaint.priority.toLowerCase()}`}>{complaint.priority}</span><div><strong>{complaint.title}</strong><p>{complaint.meta} · {complaint.raised}</p></div></li>)}</ul><Link className="see-all-link" href="/tenants/complaints">See all <span aria-hidden="true">→</span></Link></section>
        </div>

        <section className="panel expenses-panel"><div className="section-heading"><div><p className="eyebrow">SPENDING</p><h2>Recent expenses</h2></div><Link href="/billing#recent-expenses">See all <span aria-hidden="true">→</span></Link></div><ul className="expense-list">{recentExpenses.map((expense) => <li key={expense.label}><div><strong>{expense.label}</strong><p>{expense.meta}</p></div><span className="expense-amount">{expense.amount}</span></li>)}</ul></section>

        <section className="panel revenue-panel"><div className="section-heading"><div><p className="eyebrow">FINANCIAL OVERVIEW</p><h2>Revenue &amp; expenses</h2></div><span className="select-like">Last 6 months⌄</span></div><div className="chart" aria-label="Revenue and expenses for the last six months"><div className="chart-legend"><span><i className="legend-revenue" /> Revenue</span><span><i className="legend-expenses" /> Expenses</span></div><div className="bars">{[["Apr", 52, 31], ["May", 62, 38], ["Jun", 58, 34], ["Jul", 76, 42], ["Aug", 82, 48], ["Sep", 92, 44]].map(([month, revenue, expenses]) => <div className="bar-group" key={month}><div className="bar-stack"><span className="bar revenue" style={{ height: `${revenue}%` }} /><span className="bar expenses" style={{ height: `${expenses}%` }} /></div><small>{month}</small></div>)}</div></div></section>
        <p className="footer-note">Online-only owner workspace · English · INR · Asia/Kolkata</p>
      </main>
      <nav className="bottom-nav" aria-label="Mobile navigation">{navigation.slice(0, 4).map((item) => <Link className={item.label === "Overview" ? "active" : ""} href={item.href} key={item.label}><span aria-hidden="true">{item.icon}</span>{item.label}</Link>)}</nav>
    </div>
  );
}
