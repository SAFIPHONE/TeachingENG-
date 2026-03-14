import React from 'react';
import { User, Camera, Plus } from 'lucide-react';

const SiteControl = ({ formData, setFormData, handleCoachAvatarUpload, text }) => {
  return (
    <div className="animate-entrance" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
      <div className="glass-obsidian" style={{ padding: '40px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '40px' }}>
          <div style={{ position: 'relative', width: '100px', height: '100px', background: 'hsla(0,0%,100%,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
            {formData.avatar_url ? (
              <img src={formData.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Coach" />
            ) : (
              <User size={30} style={{ opacity: 0.1, margin: '35px' }} />
            )}
            <label style={{ 
              position: 'absolute', bottom: '-5px', right: '-5px', width: '28px', height: '28px', 
              background: 'hsl(var(--amber))', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
            }}>
              <Camera size={12} color="black" /> 
              <input type="file" hidden accept="image/*" onChange={handleCoachAvatarUpload} />
            </label>
          </div>
          <div>
            <h4 className="serif" style={{ fontSize: '1.4rem', color: 'white' }}>{text.coachIdentity}</h4>
            <p className="accent" style={{ fontSize: '0.65rem', color: 'hsl(var(--amber))', fontWeight: 700, letterSpacing: '0.2em' }}>
              {text.biometrics}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <label className="accent" style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '10px' }}>
              {text.globalBio}
            </label>
            <textarea 
              className="input-onyx sans" 
              value={formData.bio} 
              onChange={e => setFormData({...formData, bio: e.target.value})} 
              style={{ minHeight: '120px', width: '100%', padding: '15px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2px', color: 'white', lineHeight: '1.6', fontSize: '0.85rem' }} 
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label className="accent" style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '10px' }}>
                {text.rateProtocol}
              </label>
              <input 
                className="input-onyx sans" 
                value={formData.rates} 
                onChange={e => setFormData({...formData, rates: e.target.value})} 
                style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2px', color: 'white', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label className="accent" style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '10px' }}>
                {text.status}
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px 0' }}>
                <span className="sans" style={{ fontWeight: 700, fontSize: '0.75rem', color: formData.isBooked ? '#ff4444' : 'hsl(var(--amber))', letterSpacing: '0.1em' }}>
                  {formData.isBooked ? text.busy : text.active}
                </span>
                <input 
                  type="checkbox" 
                  checked={formData.isBooked} 
                  onChange={e => setFormData({...formData, isBooked: e.target.checked})} 
                  style={{ accentColor: 'hsl(var(--amber))', width: '16px', height: '16px', cursor: 'pointer' }} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-obsidian" style={{ padding: '40px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h4 className="serif" style={{ fontSize: '1.4rem', color: 'white' }}>{text.subjectReflections}</h4>
          <button style={{ color: 'hsl(var(--amber))', border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <Plus size={24} />
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {formData.testimonials && formData.testimonials.length > 0 ? (
            formData.testimonials.slice(0, 3).map(test => (
              <div key={test.id} style={{ padding: '20px', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.03)', background: 'rgba(255,255,255,0.01)' }}>
                <p className="accent" style={{ fontWeight: 700, fontSize: '0.65rem', color: 'hsl(var(--amber))', marginBottom: '10px', letterSpacing: '0.1em' }}>
                  { (test.profiles?.full_name || test.name || text.subject).toUpperCase() }
                </p>
                <p className="serif" style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', lineHeight: '1.4' }}>
                  "{test.content || test.text || '...'}"
                </p>
              </div>
            ))
          ) : (
            <p className="accent" style={{ fontSize: '0.7rem', opacity: 0.3, textAlign: 'center', letterSpacing: '0.3em' }}>
              {text.noReflections.toUpperCase()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SiteControl;
