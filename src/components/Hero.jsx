import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';

const Hero = ({ text, content }) => {
    return (
        <header className="hero-neo">
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ opacity: 0, animation: 'fadeUp 1s forwards' }}>
                    <div className="font-heading" style={{ fontSize: '0.8rem', letterSpacing: '0.5em', marginBottom: '15px', color: 'var(--neon-cyan)', opacity: 0.8, textTransform: 'uppercase' }}>
                        {text.heroHook}
                    </div>

                    <div className="glass-panel" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '10px 20px', borderRadius: '100px', marginBottom: '30px', border: 'var(--glass-border)' }}>
                        <Zap size={16} color={content?.isBooked ? '#ff4444' : 'var(--neon-cyan)'} />
                        <span className="font-heading" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                            {content?.isBooked ? text.statusBusy : text.statusOpen}
                        </span>
                    </div>
                    
                    <h1 style={{ letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '20px' }}>
                        {text.heroTitle} <br />
                        <span className="gradient-text">{text.heroTitleAlt}</span>
                    </h1>
                    
                    <p className="hero-subtitle" style={{ marginBottom: '30px' }}>
                        {text.heroSub}
                    </p>

                    <div className="font-heading" style={{ fontSize: '0.7rem', letterSpacing: '0.3em', marginBottom: '30px', color: 'var(--text-subtle)' }}>
                        {text.heroTrust}
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                        <a href="#contact" className="btn-neon">{text.heroCTA}</a>
                        <a href="#curriculum" className="btn-glass" style={{ gap: '10px' }}>
                            {text.heroExplore} <ArrowRight size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Hero;
