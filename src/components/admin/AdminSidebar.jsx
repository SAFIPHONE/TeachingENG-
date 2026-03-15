import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Users, Mail, Star, ExternalLink } from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, text }) => {
  const menuItems = [
    { id: 'site', label: text.navSystem, icon: Layout },
    { id: 'registry', label: text.navRegistry, icon: Users },
    { id: 'inquiry', label: text.navInquiry, icon: Mail },
    { id: 'reflections', label: text.navReflections, icon: Star }
  ];

  return (
    <aside className="glass-panel" style={{ 
      width: '280px', 
      borderRight: 'var(--glass-border)', 
      display: 'flex', 
      flexDirection: 'column', 
      padding: '40px 30px',
      position: 'sticky',
      top: 0,
      height: '100vh',
      borderRadius: '0',
      zIndex: 20
    }}>
      <div style={{ marginBottom: '60px' }}>
        <div className="logo-neo" style={{ fontSize: '1.4rem' }}>
          Teaching<span>ENG</span>
        </div>
        <div style={{ height: '2px', width: '30px', background: 'var(--neon-cyan)', marginTop: '10px' }}></div>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {menuItems.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            className="font-heading"
            style={{
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px', 
              padding: '16px 20px', 
              border: 'none', 
              background: activeTab === tab.id ? 'rgba(0, 242, 254, 0.1)' : 'transparent',
              color: activeTab === tab.id ? 'var(--neon-cyan)' : 'var(--text-muted)', 
              borderRadius: '8px', 
              cursor: 'pointer', 
              transition: 'all 0.3s', 
              textAlign: 'left', 
              fontWeight: 700, 
              fontSize: '0.8rem', 
              letterSpacing: '0.1em',
              borderLeft: activeTab === tab.id ? '3px solid var(--neon-cyan)' : '3px solid transparent'
            }}
          >
            <tab.icon size={18} /> {tab.label.toUpperCase()}
          </button>
        ))}
        
        <div style={{ margin: '30px 0', height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
        
        <Link to="/" className="font-heading" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px', 
          padding: '16px 20px', 
          color: 'var(--text-muted)', 
          textDecoration: 'none', 
          fontWeight: 700, 
          fontSize: '0.8rem',
          letterSpacing: '0.1em',
          transition: 'color 0.3s'
        }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
          <ExternalLink size={18} /> {text.exitCore.toUpperCase()}
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
