"use client";

export function NexstayAIBanner() {
  return (
    <section 
      className="panel ai-banner"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '24px'
      }}
    >
      {/* Decorative background glow */}
      <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '200px', height: '200px', background: '#3b82f6', filter: 'blur(100px)', opacity: 0.4, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '250px', height: '250px', background: '#8b5cf6', filter: 'blur(120px)', opacity: 0.3, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <span style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            fontSize: '1.2rem'
          }}>
            ✨
          </span>
          <h2 style={{ margin: 0, fontSize: '1.5rem', letterSpacing: '-0.02em', fontWeight: 700 }}>Meet NexStay AI</h2>
        </div>
        <p style={{ margin: 0, fontSize: '1rem', color: '#94a3b8', lineHeight: 1.5 }}>
          Skip the spreadsheets. Just ask NexStay AI for insights, occupancy trends, or revenue forecasts, and get instant answers without digging through data.
        </p>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <button 
          style={{
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            border: 'none',
            padding: '14px 28px',
            borderRadius: '12px',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.95rem',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            flexShrink: 0,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'none';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(59, 130, 246, 0.4)';
          }}
        >
          Ask NexStay AI
          <span aria-hidden="true" style={{ fontSize: '1.2rem' }}>→</span>
        </button>
      </div>
      
      {/* Responsive adjustments handled via inline media queries wasn't trivial, so we rely on flex-wrap in a real stylesheet or just keep it simple. */}
      {/* Responsive adjustments for flex-direction */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .ai-banner {
            flex-direction: column;
            align-items: flex-start !important;
          }
        }
      `}} />
    </section>
  );
}
