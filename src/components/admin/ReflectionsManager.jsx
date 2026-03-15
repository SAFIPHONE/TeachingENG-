import React from 'react';
import { Star } from 'lucide-react';

const ReflectionsManager = ({ testimonials, handleApproveTestimonial, handleDeleteTestimonial, text }) => {
  return (
    <div className="scroll-reveal visible" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px' }}>
      {testimonials.map(t => (
        <div key={t.id} className="glass-panel" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            <div style={{ display: 'flex', gap: '5px' }}>
              {[...Array(t.rating || 5)].map((_, i) => (
                <Star key={i} size={16} fill="var(--neon-cyan)" color="var(--neon-cyan)" style={{ filter: 'drop-shadow(0 0 5px rgba(0,242,254,0.5))' }} />
              ))}
            </div>
            <span className="font-heading" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-subtle)', letterSpacing: '0.1em' }}>
              {new Date(t.created_at).toLocaleDateString()}
            </span>
          </div>
          
          <h4 style={{ fontSize: '1.6rem', marginBottom: '20px', color: 'var(--text-main)' }}>
            {t.profiles?.full_name} {t.profiles?.surname}
          </h4>
          
          <div style={{ padding: '25px', marginBottom: '30px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: 'var(--glass-border)' }}>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
              "{t.content}"
            </p>
          </div>
          
          {t.video_url && (
            <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: 'var(--glass-border)', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 600, marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="font-heading" style={{ letterSpacing: '0.1em', color: 'var(--text-subtle)' }}>{text.videoAttached}</span>
              <a href={t.video_url} target="_blank" rel="noreferrer" className="font-heading" style={{ color: 'var(--neon-cyan)', textDecoration: 'none', fontWeight: 700 }}>
                {text.viewMedia}
              </a>
            </div>
          )}

          <div style={{ display: 'flex', gap: '20px' }}>
            <button 
              onClick={() => handleApproveTestimonial(t.id, !t.approved)} 
              className={t.approved ? "btn-glass" : "btn-neon"} 
              style={{ flex: 1, padding: '15px', fontSize: '0.8rem' }}
            >
              {t.approved ? text.revoke : text.approve}
            </button>
            <button 
              onClick={() => handleDeleteTestimonial(t.id)} 
              className="btn-glass" 
              style={{ flex: 1, padding: '15px', fontSize: '0.8rem', color: '#ff4444', borderColor: 'rgba(255,68,68,0.3)' }}
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
