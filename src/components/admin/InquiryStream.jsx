import React from 'react';
import { Target } from 'lucide-react';

const InquiryStream = ({ leads, handleDeleteLead, text }) => {
  return (
    <div className="scroll-reveal visible" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
      {leads.length > 0 ? leads.map(lead => (
        <div key={lead.id} className="glass-panel" style={{ padding: '40px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '12px', border: 'var(--glass-border)', background: 'rgba(255,255,255,0.05)' }}>
              <Target size={20} color="var(--neon-purple)" style={{ filter: 'drop-shadow(0 0 10px rgba(189,0,255,0.5))' }} />
            </div>
            <span className="font-heading" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-subtle)', letterSpacing: '0.1em' }}>
              {new Date(lead.created_at).toLocaleDateString()}
            </span>
          </div>
          
          <h4 style={{ fontSize: '1.6rem', marginBottom: '5px', color: 'var(--text-main)' }}>{lead.name}</h4>
          <p className="font-heading" style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', fontWeight: 700, marginBottom: '20px', letterSpacing: '0.1em' }}>
            {lead.email}
          </p>
          
          <div style={{ padding: '20px', marginBottom: '30px', borderRadius: '8px', background: 'rgba(255,255,255,0.02)', border: 'var(--glass-border)' }}>
            <p style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{lead.message}"
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '20px' }}>
            <a href={`mailto:${lead.email}`} className="btn-neon" style={{ flex: 1, textDecoration: 'none', justifyContent: 'center', fontSize: '0.8rem', padding: '15px' }}>
              {text.respond}
            </a>
            <button 
              onClick={() => handleDeleteLead(lead.id)} 
              className="btn-glass" 
              style={{ flex: 1, justifyContent: 'center', fontSize: '0.8rem', padding: '15px', color: '#ff4444', borderColor: 'rgba(255,68,68,0.3)' }}
            >
              {text.delete}
            </button>
          </div>
        </div>
      )) : (
        <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '150px 0', opacity: 0.5 }}>
          <p className="font-heading" style={{ fontWeight: 700, letterSpacing: '0.4em', fontSize: '1rem' }}>{text.noInquiries.toUpperCase()}</p>
        </div>
      )}
    </div>
  );
};

export default InquiryStream;
