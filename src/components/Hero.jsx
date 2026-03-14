import React from 'react';
import { ExternalLink, ArrowRight } from 'lucide-react';

const Hero = ({ text, content }) => {
    return (
        <header className="hero-power" style={{ padding: '60px 0' }}>
            <div className="hero-bg-media">
                <img src="/assets/hero.png" alt="Background" />
            </div>
            
            <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
                <div style={{ opacity: 0, animation: 'fadeInUp 1s forwards' }}>
                    <div className="accent" style={{ fontSize: '0.65rem', letterSpacing: '0.5em', marginBottom: '15px', opacity: 0.4, fontWeight: 900 }}>
                        {text.heroHook}
                    </div>

                    <div className="status-badge" style={{ border: 'var(--border-subtle)', background: 'hsla(0,0%,100%,0.02)', marginBottom: '30px' }}>
                        <span className={`status-dot ${content?.isBooked ? 'booked' : 'open'}`}></span>
                        <span className="status-text accent" style={{ color: 'hsl(var(--text-muted))' }}>{content?.isBooked ? text.statusBusy : text.statusOpen}</span>
                    </div>
                    
                    <h1 className="hero-title" style={{ marginBottom: '30px' }}>
                        <span className="title-main liquid-gold-text serif-bold" style={{ letterSpacing: '-0.02em' }}>{text.heroTitle}</span>
                        <span className="title-accent">{text.heroTitleAlt}</span>
                    </h1>
                    
                    <p className="hero-subtitle sans" style={{ color: 'hsl(var(--text-secondary))', opacity: 0.8, marginBottom: '40px' }}>
                        {text.heroSub}
                    </p>

                    <div className="accent" style={{ fontSize: '0.6rem', letterSpacing: '0.3em', marginBottom: '30px', opacity: 0.3, fontWeight: 800 }}>
                        {text.heroTrust}
                    </div>
                    
                    <div className="hero-actions">
                        <a href="#contact" className="btn-power sans">{text.heroCTA}</a>
                        <a href="#method" className="btn-power-outline sans" style={{ gap: '15px' }}>
                            {text.heroExplore} <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
