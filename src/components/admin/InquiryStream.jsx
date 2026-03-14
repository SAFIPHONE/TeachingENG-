import React from 'react';
import { Target } from 'lucide-react';

const InquiryStream = ({ leads, handleDeleteLead, text }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
      {leads.length > 0 ? leads.map(lead => (
        <div key={lead.id} className="glass-obsidian animate-entrance" style={{ borderRadius: '2px', padding: '30px', position: 'relative', border: '1px solid rgba(255,255,255,0.03)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
            <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '1px', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
              <Target size={16} color="hsl(var(--amber))" />
            </div>
            <span className="accent" style={{ fontSize: '0.6rem', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
              {new Date(lead.created_at).toLocaleDateString()}
            </span>
          </div>
          
          <h4 className="serif" style={{ fontSize: '1.4rem', marginBottom: '5px', color: 'white' }}>{lead.name}</h4>
          <p className="accent" style={{ fontSize: '0.65rem', color: 'hsl(var(--amber))', fontWeight: 700, marginBottom: '20px', letterSpacing: '0.1em' }}>
            {lead.email}
          </p>
          
          <div style={{ padding: '20px', marginBottom: '30px', borderRadius: '2px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)' }}>
            <p className="sans" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{lead.message}"
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href={`mailto:${lead.email}`} className="btn-power sans" style={{ flex: 1, justifyContent: 'center', textDecoration: 'none', fontWeight: 700, fontSize: '0.65rem', padding: '12px' }}>
              {text.respond}
            </a>
            <button 
              onClick={() => handleDeleteLead(lead.id)} 
              className="btn-power-outline sans" 
              style={{ flex: 1, justifyContent: 'center', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', fontWeight: 700, fontSize: '0.65rem', padding: '12px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#e57373'; e.currentTarget.style.color = '#e57373'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
            >
              {text.delete}
            </button>
          </div>
        </div>
      )) : (
        <div style={{ gridColumn: 'span 2', textAlign: 'center', padding: '150px', opacity: 0.2 }}>
          <p className="accent" style={{ fontWeight: 900, letterSpacing: '0.8em', fontSize: '0.8rem' }}>{text.noInquiries.toUpperCase()}</p>
        </div>
      )}
    </div>
  );
};

export default InquiryStream;
