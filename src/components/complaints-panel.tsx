"use client";

import Link from "next/link";
import { useState } from "react";

const totalOpenComplaints = 4;
const lastResolved = "2 hours ago";

const openComplaints = [
  { title: "Leaking tap", meta: "Room 204 · Riya Shah", priority: "High", raised: "2 days ago" },
  { title: "AC not cooling", meta: "Room 301 · Michael Kim", priority: "High", raised: "1 day ago" },
  { title: "WiFi not working", meta: "Room 102 · Kabir Singh", priority: "Medium", raised: "3 days ago" },
];

export function ComplaintsPanel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section 
      className="panel" 
      aria-label="Open complaints"
      style={{
        background: 'linear-gradient(145deg, #fff1f2 0%, #ffe4e6 100%)',
        border: '1px solid #fecdd3',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Alarming accent glow */}
      <div style={{ position: 'absolute', top: -50, right: -50, width: 150, height: 150, background: '#f43f5e', filter: 'blur(80px)', opacity: 0.3, pointerEvents: 'none' }} />

      <div className="section-heading" style={{ marginBottom: '16px', position: 'relative', zIndex: 1 }}>
        <div>
          <p className="eyebrow" style={{ color: '#e11d48', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#e11d48', animation: 'pulse 2s infinite' }} />
            URGENT ATTENTION
          </p>
          <h2 style={{ color: '#881337', letterSpacing: '-0.02em', margin: '4px 0 0' }}>Open Complaints</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <span style={{ 
            background: '#e11d48', 
            color: 'white', 
            fontSize: '1.25rem', 
            fontWeight: 800, 
            padding: '4px 14px', 
            borderRadius: '12px',
            boxShadow: '0 4px 10px rgba(225, 29, 72, 0.4)'
          }}>
            {totalOpenComplaints}
          </span>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '8px', padding: '10px 14px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.8)' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#9f1239', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}>
          <span>Pending Issues</span>
          <span style={{ opacity: 0.8 }}>Last resolved: {lastResolved}</span>
        </p>
      </div>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', flex: 1, zIndex: 1 }}>
        {openComplaints.map((complaint, i) => {
          const isHigh = complaint.priority === 'High';
          const isHovered = hoveredIndex === i;
          
          return (
            <li 
              key={complaint.title}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                background: '#ffffff',
                padding: '14px 16px',
                borderRadius: '12px',
                borderLeft: `4px solid ${isHigh ? '#e11d48' : '#fb923c'}`,
                boxShadow: isHovered ? '0 6px 16px -4px rgba(0,0,0,0.08)' : '0 2px 4px rgba(0,0,0,0.02)',
                transform: isHovered ? 'translateX(4px)' : 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <strong style={{ color: '#0f172a', fontSize: '0.9rem' }}>{complaint.title}</strong>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    fontWeight: 700, 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.04em',
                    padding: '3px 8px',
                    borderRadius: '99px',
                    background: isHigh ? '#ffe4e6' : '#ffedd5',
                    color: isHigh ? '#e11d48' : '#ea580c'
                  }}>
                    {complaint.priority}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', display: 'flex', justifyContent: 'space-between' }}>
                  <span>{complaint.meta}</span>
                  <span style={{ color: isHigh ? '#e11d48' : '#8492a6', fontWeight: isHigh ? 600 : 400 }}>{complaint.raised}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <Link 
        href="/tenants/complaints" 
        style={{
          marginTop: '24px',
          display: 'block',
          width: '100%',
          textAlign: 'center',
          background: '#e11d48',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '10px',
          fontWeight: 700,
          fontSize: '0.9rem',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)',
          transition: 'transform 0.15s ease, box-shadow 0.15s ease',
          zIndex: 1
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(225, 29, 72, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(225, 29, 72, 0.3)';
        }}
      >
        Click to View All
      </Link>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(225, 29, 72, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(225, 29, 72, 0); }
          100% { box-shadow: 0 0 0 0 rgba(225, 29, 72, 0); }
        }
      `}} />
    </section>
  );
}
