import React from 'react';
import { User } from 'lucide-react';

const Registry = ({ profiles, handleUpdateUserStatus, setSelectedUser, text }) => {
  return (
    <div className="glass-obsidian animate-entrance" style={{ maxWidth: 'none', padding: 0, borderRadius: '4px', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <th className="accent" style={{ padding: '20px 25px', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>{text.subject}</th>
            <th className="accent" style={{ padding: '20px 25px', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>{text.status}</th>
            <th className="accent" style={{ padding: '20px 25px', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>{text.protocol}</th>
            <th className="accent" style={{ padding: '20px 25px', textAlign: 'right', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)' }}>{text.commands}</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map(p => (
            <tr key={p.id} style={{ borderBottom: 'rgba(255,255,255,0.02) 1px solid', transition: 'background 0.3s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.01)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              <td style={{ padding: '20px 25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '2px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
                    {p.avatar_url ? (
                      <img src={p.avatar_url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={p.full_name} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)' }}>
                        <User size={14} style={{ opacity: 0.2 }} />
                      </div>
                    )}
                  </div>
                  <span className="serif" style={{ fontWeight: 600, fontSize: '0.85rem', color: 'white' }}>{p.full_name} {p.surname}</span>
                </div>
              </td>
              <td style={{ padding: '20px 25px' }}>
                <span className="accent" style={{ 
                  fontSize: '0.55rem', fontWeight: 700, padding: '4px 10px', borderRadius: '1px',
                  background: p.approved_status === 'approved' ? 'hsla(120, 60%, 50%, 0.05)' : p.approved_status === 'rejected' ? 'hsla(0, 60%, 50%, 0.05)' : 'rgba(255,255,255,0.03)',
                  color: p.approved_status === 'approved' ? '#81c784' : p.approved_status === 'rejected' ? '#e57373' : 'rgba(255,255,255,0.4)',
                  border: p.approved_status === 'approved' ? '1px solid hsla(120, 60%, 50%, 0.1)' : p.approved_status === 'rejected' ? '1px solid hsla(0, 60%, 50%, 0.1)' : '1px solid rgba(255,255,255,0.05)',
                  textTransform: 'uppercase', letterSpacing: '0.1em'
                }}>
                  {p.approved_status === 'approved' ? text.alreadyEnabled : (p.approved_status === 'rejected' ? text.block : text.pending)}
                </span>
              </td>
              <td className="accent" style={{ padding: '20px 25px', color: 'hsl(var(--amber))', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.1em' }}>
                {p.language_to_learn?.toUpperCase()}
              </td>
              <td style={{ padding: '20px 25px', textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button onClick={() => setSelectedUser(p)} className="btn-power-outline sans" style={{ padding: '8px 15px', fontSize: '0.6rem', fontWeight: 700 }}>{text.data.toUpperCase()}</button>
                  {p.approved_status !== 'approved' && (
                    <button onClick={() => handleUpdateUserStatus(p.id, 'approved')} className="btn-power sans" style={{ padding: '8px 15px', fontSize: '0.6rem', background: '#81c784', border: '1px solid #81c784', color: 'black', fontWeight: 700 }}>{text.enable.toUpperCase()}</button>
                  )}
                  {p.approved_status !== 'rejected' && (
                    <button onClick={() => handleUpdateUserStatus(p.id, 'rejected')} className="btn-power-outline sans" style={{ padding: '8px 15px', fontSize: '0.6rem', borderColor: 'hsla(0, 60%, 50%, 0.2)', color: '#e57373', fontWeight: 700 }}>{text.block.toUpperCase()}</button>
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
