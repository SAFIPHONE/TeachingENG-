import React from 'react';

const DashboardHeader = ({ title, operations, saveStatus, onSave, saving, text }) => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
      <div>
        <span className="font-heading" style={{ 
          fontSize: '0.8rem', 
          fontWeight: 700, 
          color: 'var(--neon-purple)', 
          letterSpacing: '0.3em', 
          display: 'block', 
          marginBottom: '15px',
          textTransform: 'uppercase'
        }}>
          {operations}
        </span>
        <h1 style={{ fontSize: '2.5rem', margin: 0 }}>{(title || '').split(' ')[0]} <span className="gradient-text">{(title || '').split(' ').slice(1).join(' ')}</span></h1>
      </div>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
        {saveStatus && (
          <span className="font-heading" style={{ 
            fontSize: '0.8rem', 
            fontWeight: 700, 
            color: 'var(--neon-cyan)',
            letterSpacing: '0.1em'
          }}>
            {saveStatus}
          </span>
        )}
        <button 
          onClick={onSave} 
          className="btn-neon" 
          disabled={saving}
          style={{ padding: '15px 30px', fontWeight: 700, fontSize: '0.85rem' }}
        >
          {saving ? text.syncing : text.initDeploy}
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
