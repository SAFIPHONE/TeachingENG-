import React from 'react';
import { X, User } from 'lucide-react';

const SubjectBiometrics = ({ selectedUser, setSelectedUser, handleUpdateUserStatus, text }) => {
  if (!selectedUser) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.85)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', backdropFilter: 'blur(10px)' }}>
      <div className="glass-obsidian animate-entrance" style={{ width: '100%', maxWidth: '680px', padding: '50px', position: 'relative', borderRadius: '2px', border: '1px solid rgba(255,255,255,0.05)', background: 'hsl(var(--onyx-soft))' }}>
        <button onClick={() => setSelectedUser(null)} style={{ position: 'absolute', top: '25px', right: '25px', background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}>
          <X size={24} />
        </button>
        
        <div style={{ display: 'flex', gap: '35px', alignItems: 'center', marginBottom: '45px' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
             {selectedUser.avatar_url ? (
               <img src={selectedUser.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Subject" />
             ) : (
               <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <User size={40} style={{ opacity: 0.1 }} />
               </div>
             )}
          </div>
          <div>
            <h3 className="serif" style={{ fontSize: '2rem', marginBottom: '5px', color: 'white' }}>{selectedUser.full_name} {selectedUser.surname}</h3>
            <p className="accent" style={{ fontSize: '0.65rem', fontWeight: 700, color: 'hsl(var(--amber))', letterSpacing: '0.2em' }}>
              {text.biometricsDetail}: {selectedUser.id.substring(0,8).toUpperCase()}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          <div>
            <label className="accent" style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '10px' }}>{text.commProtocol}</label>
            <p className="sans" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'white' }}>{selectedUser.language_to_learn || 'N/A'}</p>
          </div>
          <div>
            <label className="accent" style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '10px' }}>{text.wechatId}</label>
            <p className="sans" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'white' }}>{selectedUser.wechat_id || 'NOT LINKED'}</p>
          </div>
          <div>
            <label className="accent" style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '10px' }}>{text.geoOrigin}</label>
            <p className="sans" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'white' }}>{selectedUser.country || 'UNKNOWN'}</p>
          </div>
          <div>
            <label className="accent" style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '10px' }}>{text.chronoAge}</label>
            <p className="sans" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'white' }}>{selectedUser.age || 'SECRET'}</p>
          </div>
          <div style={{ gridColumn: 'span 2' }}>
            <label className="accent" style={{ fontSize: '0.6rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: '10px' }}>{text.connectEmail}</label>
            <p className="sans" style={{ fontWeight: 600, fontSize: '0.95rem', color: 'white' }}>{selectedUser.email || 'NO_RECORD'}</p>
          </div>
        </div>

        <div style={{ marginTop: '50px', display: 'flex', gap: '15px' }}>
          <button 
            onClick={() => handleUpdateUserStatus(selectedUser.id, 'approved')} 
            className="btn-power sans" 
            style={{ flex: 1, justifyContent: 'center', background: selectedUser.approved_status === 'approved' ? 'rgba(255,255,255,0.05)' : '#81c784', color: selectedUser.approved_status === 'approved' ? 'white' : 'black', fontWeight: 700, padding: '15px', border: selectedUser.approved_status === 'approved' ? '1px solid rgba(255,255,255,0.1)' : '1px solid #81c784' }}
          >
            {selectedUser.approved_status === 'approved' ? text.alreadyEnabled : text.enableAccess}
          </button>
          <button 
            onClick={() => handleUpdateUserStatus(selectedUser.id, 'rejected')} 
            className="btn-power-outline sans" 
            style={{ flex: 1, justifyContent: 'center', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)', fontWeight: 700, padding: '15px' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#e57373'; e.currentTarget.style.color = '#e57373'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.3)'; }}
          >
            {text.blockSubject}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubjectBiometrics;
