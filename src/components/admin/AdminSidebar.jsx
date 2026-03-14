import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Users, Mail, Star, ExternalLink } from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab, text }) => {
  const menuItems = [
    { id: 'site', label: text.navSystem, icon: Layout },
    { id: 'users', label: text.navRegistry, icon: Users },
    { id: 'leads', label: text.navInquiry, icon: Mail },
    { id: 'testimonials', label: text.navReflections, icon: Star }
  ];

  return (
    <aside className="glass-obsidian" style={{ 
      width: '280px', 
      borderRight: '1px solid rgba(255,255,255,0.03)', 
      display: 'flex', 
      flexDirection: 'column', 
      padding: '40px 30px',
      position: 'sticky',
      top: 0,
      height: '100vh',
      background: 'hsl(var(--onyx-soft))'
    }}>
      <div style={{ marginBottom: '60px' }}>
        <div className="logo-power serif" style={{ fontSize: '1.2rem', letterSpacing: '0.1em' }}>
          Teaching<span>ENG</span>
        </div>
        <div style={{ height: '4px', width: '20px', background: 'hsl(var(--amber))', marginTop: '10px' }}></div>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map(tab => (
          <button 
            key={tab.id} 
            onClick={() => setActiveTab(tab.id)} 
            className="sans"
            style={{
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px', 
              padding: '16px 20px', 
              border: 'none', 
              background: activeTab === tab.id ? 'hsla(var(--amber) / 0.05)' : 'transparent',
              color: activeTab === tab.id ? 'hsl(var(--amber))' : 'rgba(255,255,255,0.3)', 
              borderRadius: '2px', 
              cursor: 'pointer', 
              transition: 'var(--transition-power)', 
              textAlign: 'left', 
              fontWeight: 700, 
              fontSize: '0.65rem', 
              letterSpacing: '0.15em',
              borderLeft: activeTab === tab.id ? '2px solid hsl(var(--amber))' : '2px solid transparent'
            }}
          >
            <tab.icon size={16} /> {tab.label.toUpperCase()}
          </button>
        ))}
        
        <div style={{ margin: '30px 0', height: '1px', background: 'rgba(255,255,255,0.03)' }}></div>
        
        <Link to="/" className="sans" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px', 
          padding: '16px 20px', 
          color: 'rgba(255,255,255,0.3)', 
          textDecoration: 'none', 
          fontWeight: 700, 
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          transition: 'color 0.3s'
        }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}>
          <ExternalLink size={16} /> {text.exitCore.toUpperCase()}
        </Link>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
