import React from 'react';
import { User, ShieldAlert, ShieldCheck } from 'lucide-react';

const Registry = ({ profiles, handleUpdateUserStatus, setSelectedUser, text }) => {
  return (
    <div className="glass-panel scroll-reveal visible" style={{ maxWidth: 'none', padding: 0, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: 'var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
            <th className="font-heading" style={{ padding: '20px 25px', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>{text.subject}</th>
            <th className="font-heading" style={{ padding: '20px 25px', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>{text.status}</th>
            <th className="font-heading" style={{ padding: '20px 25px', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>{text.protocol}</th>
            <th className="font-heading" style={{ padding: '20px 25px', textAlign: 'right', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-subtle)' }}>{text.commands}</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(p => (
            <tr key={p.id} style={{ borderBottom: 'var(--glass-border)', transition: 'background 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <td style={{ padding: '20px 25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', overflow: 'hidden', border: 'var(--glass-border)', background: 'rgba(255,255,255,0.05)' }}>
                    {p.avatar_url ? (
                      <img src={p.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={p.full_name} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={18} style={{ opacity: 0.5, color: 'var(--neon-cyan)' }} />
                      </div>
                    )}
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-main)' }}>{p.full_name} {p.surname}</span>
                </div>
              </td>
              <td style={{ padding: '20px 25px' }}>
                <span className="font-heading" style={{ 
                  display: 'inline-flex', alignItems: 'center', gap: '5px',
                  fontSize: '0.7rem', fontWeight: 700, padding: '6px 12px', borderRadius: '4px',
                  background: p.approved_status === 'approved' ? 'rgba(0, 242, 254, 0.1)' : p.approved_status === 'rejected' ? 'rgba(255, 68, 68, 0.1)' : 'rgba(255,255,255,0.05)',
                  color: p.approved_status === 'approved' ? 'var(--neon-cyan)' : p.approved_status === 'rejected' ? '#ff4444' : 'var(--text-muted)',
                  border: p.approved_status === 'approved' ? '1px solid rgba(0, 242, 254, 0.3)' : p.approved_status === 'rejected' ? '1px solid rgba(255, 68, 68, 0.3)' : 'var(--glass-border)',
                  textTransform: 'uppercase', letterSpacing: '0.1em'
                }}>
                  {p.approved_status === 'approved' ? <ShieldCheck size={14} /> : (p.approved_status === 'rejected' ? <ShieldAlert size={14} /> : null)}
                  {p.approved_status === 'approved' ? text.alreadyEnabled : (p.approved_status === 'rejected' ? text.block : text.pending)}
                </span>
              </td>
              <td className="font-heading" style={{ padding: '20px 25px', color: 'var(--neon-purple)', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                {p.language_to_learn?.toUpperCase()}
              </td>
              <td style={{ padding: '20px 25px', textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button onClick={() => setSelectedUser(p)} className="btn-glass" style={{ padding: '8px 15px', fontSize: '0.7rem' }}>{text.data.toUpperCase()}</button>
                  {p.approved_status !== 'approved' && (
                    <button onClick={() => handleUpdateUserStatus(p.id, 'approved')} className="btn-neon" style={{ padding: '8px 15px', fontSize: '0.7rem' }}>{text.enable.toUpperCase()}</button>
                  )}
                  {p.approved_status !== 'rejected' && (
                    <button onClick={() => handleUpdateUserStatus(p.id, 'rejected')} className="btn-glass" style={{ padding: '8px 15px', fontSize: '0.7rem', color: '#ff4444', borderColor: 'rgba(255,68,68,0.3)' }}>{text.block.toUpperCase()}</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Registry;
