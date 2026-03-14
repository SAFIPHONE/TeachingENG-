import React from 'react';
import { Shield, Globe, Zap, Target, Award } from 'lucide-react';

const Features = ({ text, sectionsRef }) => {
    return (
        <>
            <section id="method" ref={(el) => (sectionsRef.current[0] = el)} className="scroll-reveal" style={{ padding: '60px 0' }}>
                <div className="container">
                    <div className="method-grid" style={{ gap: '60px' }}>
                        <div className="method-info">
                            <span className="section-label accent" style={{ opacity: 0.6 }}>{text.methodTitle}</span>
                            <h2 className="serif" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '30px' }}>
                                {text.curriculumTitle.split(' ')[0]} <span className="liquid-gold-text serif-bold">{text.curriculumTitle.split(' ').slice(1).join(' ')}</span>
                            </h2>
                            <p className="method-desc sans" style={{ opacity: 0.8, lineHeight: 1.8 }}>
                                {text.curriculumSub}
                            </p>
                            <div className="header-divider" style={{ margin: '40px 0' }}></div>
                            <a href="#curriculum" className="btn-power-outline sans" style={{ fontSize: '0.75rem', fontWeight: 700 }}>{text.methodView}</a>
                        </div>
                        
                        <div className="method-cards">
                            <div className="feature-card" style={{ border: 'var(--border-subtle)', background: 'hsla(0,0%,100%,0.01)', padding: '50px' }}>
                                <Shield size={36} className="feature-icon" style={{ opacity: 0.8, marginBottom: '40px' }} />
                                <h3 className="serif-bold" style={{ fontSize: '1.6rem', marginBottom: '20px' }}>{text.methodAuthority}</h3>
                                <p className="sans" style={{ color: 'hsl(var(--text-secondary))', fontSize: '1rem', lineHeight: 1.7 }}>{text.methodAuthorityDesc}</p>
                            </div>
                            <div className="feature-card offset-card" style={{ border: 'var(--border-subtle)', background: 'hsla(0,0%,100%,0.01)', padding: '50px' }}>
                                <Globe size={36} className="feature-icon" style={{ opacity: 0.8, marginBottom: '40px' }} />
                                <h3 className="serif-bold" style={{ fontSize: '1.6rem', marginBottom: '20px' }}>{text.methodElegance}</h3>
                                <p className="sans" style={{ color: 'hsl(var(--text-secondary))', fontSize: '1rem', lineHeight: 1.7 }}>{text.methodEleganceDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="curriculum" ref={(el) => (sectionsRef.current[3] = el)} className="scroll-reveal" style={{ padding: '60px 0', background: 'hsla(var(--onyx-soft) / 0.5)' }}>
                <div className="container">
                    <div className="section-header centered" style={{ marginBottom: '60px' }}>
                        <span className="section-label accent" style={{ opacity: 0.6 }}>{text.curriculumAcademic}</span>
                        <h2 className="serif">{text.curriculumMastery.split(' ')[0]} <span className="liquid-gold-text serif-bold">{text.curriculumMastery.split(' ').slice(1).join(' ')}</span></h2>
                        <div className="header-divider" style={{ margin: '30px auto' }}></div>
                    </div>

                    <div className="curriculum-grid" style={{ gap: '40px' }}>
                        {text.curriculumItems.map((item, idx) => {
                            const icons = [Zap, Target, Award];
                            const Icon = icons[idx];
                            return (
                                <div key={idx} className="curriculum-item" style={{ padding: '60px', border: 'var(--border-subtle)', background: 'hsla(0,0%,100%,0.01)' }}>
                                    <Icon size={36} className="feature-icon" style={{ opacity: 0.8, marginBottom: '40px' }} />
                                    <h3 className="serif-bold" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{item.title}</h3>
                                    <p className="sans" style={{ color: 'hsl(var(--text-secondary))', lineHeight: 1.7 }}>{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Features;
