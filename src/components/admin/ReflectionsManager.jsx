import React from 'react';
import { Star } from 'lucide-react';

const ReflectionsManager = ({ testimonials, handleApproveTestimonial, handleDeleteTestimonial, text }) => {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
      {testimonials.map(t => (
        <div key={t.id} className="glass-obsidian animate-entrance" style={{ 
          borderRadius: '2px', padding: '30px', 
          border: '1px solid rgba(255,255,255,0.03)',
          background: 'hsl(var(--onyx-soft))'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[...Array(t.rating || 5)].map((_, i) => (
                <Star key={i} size={12} fill="hsl(var(--amber))" color="hsl(var(--amber))" />
              ))}
            </div>
            <span className="accent" style={{ fontSize: '0.6rem', fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em' }}>
              {new Date(t.created_at).toLocaleDateString()}
            </span>
          </div>
          
          <h4 className="serif" style={{ fontSize: '1.4rem', marginBottom: '20px', color: 'white' }}>
            {t.profiles?.full_name} {t.profiles?.surname}
          </h4>
          
          <div style={{ padding: '20px', marginBottom: '30px', borderRadius: '2px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)' }}>
            <p className="serif" style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{t.content}"
            </p>
          </div>
          
          {t.video_url && (
            <div style={{ padding: '15px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '2px', fontSize: '0.65rem', fontWeight: 700, marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="accent" style={{ letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)' }}>{text.videoAttached}</span>
              <a href={t.video_url} target="_blank" rel="noreferrer" className="accent" style={{ color: 'hsl(var(--amber))', textDecoration: 'none', fontWeight: 700 }}>
                {text.viewMedia}
              </a>
            </div>
          )}

          <div style={{ display: 'flex', gap: '15px' }}>
            <button 
              onClick={() => handleApproveTestimonial(t.id, !t.approved)} 
              className="btn-power sans" 
              style={{ flex: 1, justifyContent: 'center', background: t.approved ? 'rgba(255,255,255,0.05)' : 'hsl(var(--amber))', color: t.approved ? 'white' : 'black', fontWeight: 700, fontSize: '0.65rem', padding: '12px', border: t.approved ? '1px solid rgba(255,255,255,0.1)' : '1px solid hsl(var(--amber))' }}
            >
              {t.approved ? text.revoke : text.approve}
            </button>
            <button 
              onClick={() => handleDeleteTestimonial(t.id)} 
              className="btn-power-outline sans" 
              style={{ flex: 1, justifyContent: 'center', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', fontWeight: 700, fontSize: '0.65rem', padding: '12px' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#e57373'; e.currentTarget.style.color = '#e57373'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
            >
              {text.delete}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReflectionsManager;
