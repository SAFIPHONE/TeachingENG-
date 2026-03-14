import React from 'react';

const DashboardHeader = ({ title, operations, saveStatus, onSave, saving, text }) => {
  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
      <div>
        <span className="accent" style={{ 
          fontSize: '0.65rem', 
          fontWeight: 700, 
          color: 'hsl(var(--amber))', 
          letterSpacing: '0.3em', 
          display: 'block', 
          marginBottom: '10px',
          textTransform: 'uppercase'
        }}>
          {operations}
        </span>
        <h1 className="serif" style={{ fontSize: '2.2rem', margin: 0, color: 'white' }}>{title}</h1>
      </div>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {saveStatus && (
          <span className="accent" style={{ 
            fontSize: '0.7rem', 
            fontWeight: 700, 
            color: 'hsl(var(--amber))',
            letterSpacing: '0.1em'
          }}>
            {saveStatus}
          </span>
        )}
        <button 
          onClick={onSave} 
          className="btn-power sans" 
          disabled={saving}
          style={{ padding: '12px 30px', fontWeight: 700, fontSize: '0.75rem' }}
        >
          {saving ? text.syncing : text.initDeploy}
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
