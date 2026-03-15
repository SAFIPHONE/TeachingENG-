import React from 'react';
import { Shield, Globe, Zap, Target, Award } from 'lucide-react';

const Features = ({ text, sectionsRef }) => {
    return (
        <>
            <section id="method" ref={(el) => (sectionsRef.current[0] = el)} className="scroll-reveal visible" style={{ padding: '60px 0' }}>
                <div className="container">
                    <div className="grid-2" style={{ alignItems: 'center', gap: '40px' }}>
                        <div>
                            <span className="font-heading" style={{ color: 'var(--neon-purple)', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '15px', display: 'block' }}>
                                {text.methodTitle}
                            </span>
                            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '20px' }}>
                                {text.curriculumTitle.split(' ')[0]} <br/>
                                <span className="gradient-text">{text.curriculumTitle.split(' ').slice(1).join(' ')}</span>
                            </h2>
                            <p style={{ marginBottom: '30px', maxWidth: '500px', lineHeight: 1.8 }}>
                                {text.curriculumSub}
                            </p>
                            <a href="#contact" className="btn-glass" style={{ fontSize: '0.75rem' }}>{text.methodView}</a>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="glass-panel" style={{ padding: '40px' }}>
                                <Shield size={40} color="var(--neon-cyan)" style={{ marginBottom: '30px', filter: 'drop-shadow(0 0 10px rgba(0, 242, 254, 0.5))' }} />
                                <h3 style={{ fontSize: '1.6rem', marginBottom: '15px' }}>{text.methodAuthority}</h3>
                                <p style={{ fontSize: '1rem' }}>{text.methodAuthorityDesc}</p>
                            </div>
                            <div className="glass-panel" style={{ padding: '40px', transform: window.innerWidth > 900 ? 'translateX(-40px)' : 'none' }}>
                                <Globe size={40} color="var(--neon-purple)" style={{ marginBottom: '25px', filter: 'drop-shadow(0 0 10px rgba(189, 0, 255, 0.5))' }} />
                                <h3 style={{ fontSize: '1.6rem', marginBottom: '15px' }}>{text.methodElegance}</h3>
                                <p style={{ fontSize: '1rem' }}>{text.methodEleganceDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="curriculum" ref={(el) => (sectionsRef.current[3] = el)} className="scroll-reveal visible" style={{ padding: '60px 0', position: 'relative' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span className="font-heading" style={{ color: 'var(--neon-cyan)', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '15px', display: 'block' }}>
                            {text.curriculumAcademic}
                        </span>
                        <h2>
                            {text.curriculumMastery.split(' ')[0]} <span className="gradient-text">{text.curriculumMastery.split(' ').slice(1).join(' ')}</span>
                        </h2>
                    </div>

                    <div className="grid-3">
                        {text.curriculumItems.map((item, idx) => {
                            const icons = [Zap, Target, Award];
                            const Icon = icons[idx];
                            return (
                                <div key={idx} className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '25px' }}>
                                        <Icon size={32} color={idx === 1 ? 'var(--neon-purple)' : 'var(--neon-cyan)'} />
                                    </div>
                                    <h3 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>{item.title}</h3>
                                    <p style={{ fontSize: '1rem', lineHeight: 1.7 }}>{item.desc}</p>
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
