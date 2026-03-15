import React from 'react';
import { User, Camera, Plus } from 'lucide-react';

const SiteControl = ({ formData, setFormData, handleCoachAvatarUpload, text }) => {
  return (
    <div className="scroll-reveal visible" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
      <div className="glass-panel" style={{ padding: '50px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: 'var(--glass-border)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {formData.avatar_url ? (
              <img src={formData.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Coach" />
            ) : (
              <User size={40} style={{ opacity: 0.5, color: 'var(--neon-cyan)' }} />
            )}
            <label style={{ 
              position: 'absolute', bottom: '0', right: '0', width: '36px', height: '36px', 
              background: 'var(--neon-purple)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              borderRadius: '50%', boxShadow: '0 0 10px rgba(189,0,255,0.5)'
            }}>
              <Camera size={16} /> 
              <input type="file" hidden accept="image/*" onChange={handleCoachAvatarUpload} />
            </label>
          </div>
          <div>
            <h4 style={{ fontSize: '1.6rem', color: 'var(--text-main)', marginBottom: '5px' }}>{text.coachIdentity}</h4>
            <p className="font-heading" style={{ fontSize: '0.8rem', color: 'var(--neon-cyan)', fontWeight: 700, letterSpacing: '0.2em' }}>
              {text.biometrics}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <label className="input-label">
              {text.globalBio}
            </label>
            <textarea 
              className="input-glass" 
              value={formData.bio} 
              onChange={e => setFormData({...formData, bio: e.target.value})} 
              style={{ minHeight: '150px', resize: 'vertical' }} 
            />
          </div>
          <div className="grid-2" style={{ gap: '20px' }}>
            <div>
              <label className="input-label">
                {text.rateProtocol}
              </label>
              <input 
                className="input-glass" 
                value={formData.rates} 
                onChange={e => setFormData({...formData, rates: e.target.value})} 
              />
            </div>
            <div>
              <label className="input-label">
                {text.status}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 0' }}>
                <span className="font-heading" style={{ fontWeight: 700, fontSize: '0.85rem', color: formData.isBooked ? '#ff4444' : 'var(--neon-cyan)', letterSpacing: '0.1em' }}>
                  {formData.isBooked ? text.busy : text.active}
                </span>
                <input 
                  type="checkbox" 
                  checked={formData.isBooked} 
                  onChange={e => setFormData({...formData, isBooked: e.target.checked})} 
                  style={{ accentColor: 'var(--neon-cyan)', width: '20px', height: '20px', cursor: 'pointer' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h4 style={{ fontSize: '1.6rem', margin: 0 }}>{text.subjectReflections}</h4>
          <button style={{ color: 'var(--neon-cyan)', border: 'none', background: 'rgba(0, 242, 254, 0.1)', cursor: 'pointer', padding: '10px', borderRadius: '50%' }}>
            <Plus size={20} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {formData.testimonials && formData.testimonials.length > 0 ? (
            formData.testimonials.slice(0, 3).map(test => (
              <div key={test.id} style={{ padding: '20px', borderRadius: '8px', border: 'var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
                <p className="font-heading" style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--neon-cyan)', marginBottom: '10px', letterSpacing: '0.1em' }}>
                  { (test.profiles?.full_name || test.name || text.subject).toUpperCase() }
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: '1.6' }}>
                  "{test.content || test.text || '...'}"
                </p>
              </div>
            ))
          ) : (
            <p className="font-heading" style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', textAlign: 'center', letterSpacing: '0.2em', padding: '40px 0' }}>
              {text.noReflections.toUpperCase()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteControl;
