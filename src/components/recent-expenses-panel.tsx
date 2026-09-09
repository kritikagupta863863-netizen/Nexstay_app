"use client";

import Link from "next/link";
import { useState } from "react";

const totalExpenseThisMonth = "₹30,250";

const recentExpenses = [
  { label: "Electricity bill", meta: "Maple House · 2 Sep 2026", amount: "₹6,200", icon: "⚡" },
  { label: "Plumbing repair", meta: "Room 204 · 30 Aug 2026", amount: "₹1,450", icon: "🔧" },
  { label: "Staff salary", meta: "Housekeeping · 28 Aug 2026", amount: "₹18,000", icon: "👥" },
  { label: "Internet renewal", meta: "Airtel Fiber · 25 Aug 2026", amount: "₹2,100", icon: "🌐" },
  { label: "Pest control", meta: "Ground Floor · 22 Aug 2026", amount: "₹2,500", icon: "🐛" },
];

export function RecentExpensesPanel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      className="panel" 
      aria-label="Recent expenses"
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '22px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.75rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.05em', textTransform: 'uppercase' }}>SPENDING</p>
          <h2 style={{ margin: '4px 0 0', fontSize: '1.25rem', color: '#0f172a', letterSpacing: '-0.02em' }}>Recent expenses</h2>
        </div>
        <Link 
          href="/billing#recent-expenses" 
          aria-label="See all expenses"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: '#3b62d8',
            fontWeight: 600,
            fontSize: '0.85rem',
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#294db9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#3b62d8';
          }}
        >
          View all <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
        </Link>
      </div>

      <div style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', 
        borderRadius: '12px', 
        padding: '16px 20px', 
        marginBottom: '24px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <span style={{ color: '#475569', fontSize: '0.9rem', fontWeight: 500 }}>Total this month</span>
        <strong style={{ color: '#0f172a', fontSize: '1.5rem', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '-0.03em' }}>{totalExpenseThisMonth}</strong>
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {recentExpenses.map((expense, i) => {
          const isHovered = hoveredIndex === i;
          
          return (
            <li 
              key={expense.label}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px',
                borderRadius: '12px',
                background: isHovered ? '#f8fafc' : 'transparent',
                transition: 'background 0.2s ease',
                cursor: 'default'
              }}
            >
              <div style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '10px', 
                background: isHovered ? '#ffffff' : '#f1f5f9', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                fontSize: '1.2rem',
                boxShadow: isHovered ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                transition: 'all 0.2s ease'
              }}>
                {expense.icon}
              </div>
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', color: '#1e293b', fontSize: '0.9rem', marginBottom: '2px' }}>{expense.label}</strong>
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>{expense.meta}</span>
              </div>
              <strong style={{ 
                fontFamily: '"JetBrains Mono", monospace', 
                color: '#334155', 
                fontSize: '0.95rem' 
              }}>
                {expense.amount}
              </strong>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
