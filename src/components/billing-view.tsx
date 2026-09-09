"use client";

import Link from "next/link";

const pendingInvoices = [
  { tenant: "Riya Shah", room: "103-B", amount: "₹4,000", due: "Overdue · 3 days", status: "Overdue" },
  { tenant: "Kabir Singh", room: "103-A", amount: "₹4,000", due: "Overdue · 1 day", status: "Overdue" },
  { tenant: "Dev Patel", room: "201-A", amount: "₹4,000", due: "Due today", status: "Due soon" },
  { tenant: "Priya Sharma", room: "201-B", amount: "₹4,000", due: "Due tomorrow", status: "Due soon" },
  { tenant: "Sara Rodrigues", room: "B-204", amount: "₹4,000", due: "Due in 3 days", status: "Due soon" },
  { tenant: "Michael Kim", room: "C-301", amount: "₹4,000", due: "Due in 5 days", status: "Due soon" },
];

const recentExpenses = [
  { date: "2 Sep 2026", category: "Utilities", description: "Electricity bill · Maple House", amount: "₹6,200" },
  { date: "30 Aug 2026", category: "Maintenance", description: "Plumbing repair · Room 204", amount: "₹1,450" },
  { date: "28 Aug 2026", category: "Staff", description: "Housekeeping salary", amount: "₹18,000" },
  { date: "26 Aug 2026", category: "Utilities", description: "Internet bill · Maple House", amount: "₹1,200" },
  { date: "22 Aug 2026", category: "Maintenance", description: "Pest control", amount: "₹2,500" },
  { date: "20 Aug 2026", category: "Utilities", description: "Water tanker delivery", amount: "₹900" },
];

function InvoiceStatusChip({ status }: { status: string }) {
  return <span className={`status status-${status.toLowerCase().replace(" ", "-")}`}>{status}</span>;
}

export function BillingView() {
  return (
    <div className="rooms-shell">
      <header className="rooms-topbar">
        <Link className="rooms-brand" href="/" aria-label="Back to dashboard"><span className="brand-mark">N</span><span>NexStay</span></Link>
        <div className="rooms-property"><span className="eyebrow">PROPERTY</span><strong>Maple House</strong><span>Indiranagar, Bengaluru</span></div>
        <div className="rooms-top-actions"><button className="icon-button" aria-label="View notifications">♧</button><Link className="rooms-back" href="/">Dashboard</Link></div>
      </header>
      <main className="rooms-content">
        <header className="rooms-heading"><div><p className="eyebrow">MAPLE HOUSE / FINANCE</p><h1>Billing &amp; finance</h1><p className="lede">Track revenue, pending rent, and property expenses in one place.</p></div></header>

        <section className="notice-banner" aria-label="Preview data notice"><span aria-hidden="true">i</span><p><strong>Preview data.</strong> This finance workspace shows representative figures; live invoicing and payment collection will connect in a later slice.</p></section>

        <section className="rooms-metrics" aria-label="Finance summary">
          <Metric label="Monthly revenue" value="₹1,84,500" detail="↑ 8.6% vs last month" tone="green" />
          <Metric label="Collected this month" value="₹1,60,500" detail="87% of billed rent" tone="blue" />
          <Metric label="Pending rent" value="₹24,000" detail="6 invoices need attention" tone="rose" />
          <Metric label="Expenses this month" value="₹30,250" detail="6 recorded expenses" />
        </section>

        <section className="rooms-table-panel" id="pending-invoices" aria-labelledby="pending-invoices-heading">
          <div className="table-heading"><div><p className="eyebrow">PENDING RENT</p><h2 id="pending-invoices-heading">{pendingInvoices.length} invoices need attention</h2></div><span className="table-note">Preview data · updates will appear in a later slice</span></div>
          <div className="rooms-table-wrap"><table className="rooms-table"><thead><tr><th>Tenant</th><th>Room</th><th>Amount</th><th>Due</th><th>Status</th></tr></thead><tbody>{pendingInvoices.map((invoice) => <tr key={`${invoice.tenant}-${invoice.room}`}><td data-label="Tenant"><strong>{invoice.tenant}</strong></td><td data-label="Room"><span className="mono">{invoice.room}</span></td><td data-label="Amount">{invoice.amount}</td><td data-label="Due">{invoice.due}</td><td data-label="Status"><InvoiceStatusChip status={invoice.status} /></td></tr>)}</tbody></table></div>
        </section>

        <section className="rooms-table-panel" id="recent-expenses" aria-labelledby="recent-expenses-heading">
          <div className="table-heading"><div><p className="eyebrow">SPENDING</p><h2 id="recent-expenses-heading">Recent expenses</h2></div><span className="table-note">Preview data · updates will appear in a later slice</span></div>
          <div className="rooms-table-wrap"><table className="rooms-table"><thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th></tr></thead><tbody>{recentExpenses.map((expense) => <tr key={expense.description}><td data-label="Date">{expense.date}</td><td data-label="Category">{expense.category}</td><td data-label="Description">{expense.description}</td><td data-label="Amount">{expense.amount}</td></tr>)}</tbody></table></div>
        </section>
      </main>
      <nav className="bottom-nav rooms-bottom-nav" aria-label="Mobile navigation"><Link href="/">⌂<span>Dashboard</span></Link><Link href="/rooms">▦<span>Rooms</span></Link><Link href="/tenants">♙<span>Tenants</span></Link><Link className="active" href="/billing">₹<span>Finance</span></Link></nav>
    </div>
  );
}

function Metric({ label, value, detail, tone }: { label: string; value: string; detail: string; tone?: "blue" | "green" | "rose" }) {
  return (
    <article className={tone ? `room-metric ${tone}` : "room-metric"}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  );
}
