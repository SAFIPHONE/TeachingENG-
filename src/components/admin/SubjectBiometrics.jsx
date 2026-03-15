import React from 'react';
import { X, User } from 'lucide-react';

const SubjectBiometrics = ({ selectedUser, setSelectedUser, handleUpdateUserStatus, text }) => {
  if (!selectedUser) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', backdropFilter: 'blur(20px)' }}>
      <div className="glass-panel scroll-reveal visible" style={{ width: '100%', maxWidth: '700px', padding: '60px', position: 'relative' }}>
        <button onClick={() => setSelectedUser(null)} style={{ position: 'absolute', top: '30px', right: '30px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={e => e.currentTarget.style.color = 'var(--neon-cyan)'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>
          <X size={28} />
        </button>
        
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center', marginBottom: '50px' }}>
          <div style={{ width: '120px', height: '120px', borderRadius: '16px', overflow: 'hidden', border: '2px solid var(--neon-cyan)', background: 'rgba(255,255,255,0.05)', boxShadow: '0 0 20px rgba(0,242,254,0.2)' }}>
             {selectedUser.avatar_url ? (
               <img src={selectedUser.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Subject" />
             ) : (
               <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <User size={50} style={{ opacity: 0.5, color: 'var(--neon-cyan)' }} />
               </div>
             )}
          </div>
          <div>
            <h3 style={{ fontSize: '2.2rem', marginBottom: '10px', color: 'var(--text-main)' }}>{selectedUser.full_name} {selectedUser.surname}</h3>
            <p className="font-heading" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--neon-purple)', letterSpacing: '0.2em' }}>
              {text.biometricsDetail}: {selectedUser.id.substring(0,8).toUpperCase()}
            </p>
          </div>
        </div>

        <div className="grid-2" style={{ gap: '30px' }}>
          <div>
            <label className="input-label">{text.commProtocol}</label>
            <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)' }}>{selectedUser.language_to_learn || 'N/A'}</p>
          </div>
          <div>
            <label className="input-label">{text.wechatId}</label>
            <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)' }}>{selectedUser.wechat_id || 'NOT LINKED'}</p>
          </div>
          <div>
            <label className="input-label">{text.geoOrigin}</label>
            <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)' }}>{selectedUser.country || 'UNKNOWN'}</p>
          </div>
          <div>
            <label className="input-label">{text.chronoAge}</label>
            <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)' }}>{selectedUser.age || 'SECRET'}</p>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label className="input-label">{text.connectEmail}</label>
            <p style={{ fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-main)' }}>{selectedUser.email || 'NO_RECORD'}</p>
          </div>
        </div>

        <div style={{ marginTop: '50px', display: 'flex', gap: '20px' }}>
          <button 
            onClick={() => handleUpdateUserStatus(selectedUser.id, 'approved')} 
            className="btn-neon" 
            style={{ flex: 1, padding: '20px' }}
          >
            {selectedUser.approved_status === 'approved' ? text.alreadyEnabled : text.enableAccess}
          </button>
          <button 
            onClick={() => handleUpdateUserStatus(selectedUser.id, 'rejected')} 
            className="btn-glass" 
            style={{ flex: 1, padding: '20px', color: '#ff4444', borderColor: 'rgba(255,68,68,0.3)' }}
          >
            {text.blockSubject}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectBiometrics;
