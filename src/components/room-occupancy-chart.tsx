"use client";

import { useState } from "react";
import { getRooms } from "@/lib/data";

export function RoomOccupancyChart() {
  const rooms = getRooms();
  
  // Calculate stats dynamically
  const data = ["Single Premium", "Double Sharing", "Triple Sharing"].map(type => {
    const typeRooms = rooms.filter(r => r.type === type);
    const total = typeRooms.reduce((sum, r) => sum + r.capacity, 0);
    const occupied = typeRooms.reduce((sum, r) => sum + r.occupied, 0);
    const available = total - occupied;
    
    return {
      label: type.split(" ")[0], // "Single", "Double", "Triple"
      occupied,
      available,
      total
    };
  });
  const maxTotal = Math.max(...data.map((d) => d.total));
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', position: 'relative' }}>
      
      {/* Background gridlines for premium feel */}
      <div style={{ position: 'absolute', top: '30px', left: '5%', right: '5%', height: '220px', zIndex: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none', opacity: 0.5 }}>
         <div style={{ borderBottom: '1px dashed #cbd5e1', width: '100%' }}></div>
         <div style={{ borderBottom: '1px dashed #cbd5e1', width: '100%' }}></div>
         <div style={{ borderBottom: '1px dashed #cbd5e1', width: '100%' }}></div>
         <div style={{ borderBottom: '1px dashed #cbd5e1', width: '100%' }}></div>
      </div>

      <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'flex-end', height: '220px', marginBottom: '28px', zIndex: 1 }}>
        {data.map((item, index) => {
          const heightPct = (item.total / maxTotal) * 100;
          const occPct = (item.occupied / item.total) * 100;
          const availPct = (item.available / item.total) * 100;
          const isHovered = hoveredIndex === index;

          return (
            <div 
              key={item.label} 
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '28%', maxWidth: '90px', height: '100%', cursor: 'pointer' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div 
                style={{ 
                  height: `${heightPct}%`, 
                  width: '100%', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  borderRadius: '12px', 
                  overflow: 'hidden',
                  boxShadow: isHovered ? '0 12px 28px -6px rgba(37, 99, 235, 0.4)' : '0 4px 12px -2px rgba(0, 0, 0, 0.08)',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid rgba(255,255,255,0.8)'
                }}
              >
                <div style={{ 
                  height: `${availPct}%`, 
                  background: 'linear-gradient(180deg, #dbeafe 0%, #bfdbfe 100%)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#1e40af', 
                  fontWeight: 700, 
                  fontSize: '1.05rem',
                  textShadow: '0 1px 2px rgba(255,255,255,0.6)'
                }}>
                  {item.available > 0 ? item.available : ''}
                </div>
                <div style={{ 
                  height: `${occPct}%`, 
                  background: 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  color: '#ffffff', 
                  fontWeight: 700, 
                  fontSize: '1.05rem',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)'
                }}>
                  {item.occupied > 0 ? item.occupied : ''}
                </div>
              </div>
              <span style={{ 
                marginTop: '16px', 
                fontSize: '0.95rem', 
                color: isHovered ? '#0f172a' : '#64748b', 
                fontWeight: isHovered ? 700 : 500,
                fontFamily: '"Inter", sans-serif',
                transition: 'color 0.2s ease'
              }}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
      
      <div style={{ display: 'flex', gap: '32px', fontSize: '0.9rem', color: '#475569', fontWeight: 600, fontFamily: '"Inter", sans-serif', padding: '12px 28px', backgroundColor: '#f8fafc', borderRadius: '99px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', boxShadow: '0 2px 6px rgba(37,99,235,0.4)' }} />
          Occupied
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: 'linear-gradient(135deg, #dbeafe, #bfdbfe)', boxShadow: '0 2px 6px rgba(147,197,253,0.5)' }} />
          Available
        </div>
      </div>
    </div>
  );
}
