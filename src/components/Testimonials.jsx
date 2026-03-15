import React, { useState } from 'react';
import { Star, User } from 'lucide-react';

const Testimonials = ({ text, testimonials, sectionsRef }) => {
    const [visibleCount, setVisibleCount] = useState(2);
    const showMore = visibleCount < testimonials.length;

    const t_extra = {
        EN: { more: "VIEW MORE", less: "VIEW LESS" },
        ZH: { more: "查看更多", less: "查看更少" }
    };

    const extra = t_extra[text.lang || 'EN'] || t_extra.EN;

    return (
        <section id="testimonials" ref={(el) => (sectionsRef.current[4] = el)} className="scroll-reveal" style={{ padding: '60px 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                    <span className="font-heading" style={{ color: 'var(--neon-blue)', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '15px', display: 'block' }}>
                        {text.reflectionsFeedback}
                    </span>
                    <h2>
                        {text.reflectionsTitle.split(' ')[0]} <span className="gradient-text">{text.reflectionsTitle.split(' ').slice(1).join(' ')}</span>
                    </h2>
                </div>

                <div className="grid-2" style={{ gap: '40px' }}>
                    {testimonials.length > 0 ? testimonials.slice(0, visibleCount).map((t, idx) => (
                        <div key={idx} className="glass-panel" style={{ padding: '50px', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ marginBottom: '30px', display: 'flex', gap: '8px' }}>
                                {[...Array(t.rating || 5)].map((_, i) => (
                                    <Star key={i} size={16} fill="var(--neon-cyan)" color="var(--neon-cyan)" style={{ filter: 'drop-shadow(0 0 5px rgba(0, 242, 254, 0.5))' }} />
                                ))}
                            </div>

                            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '30px', flex: 1, fontStyle: 'italic' }}>
                                "{t.content}"
                            </p>

                            {t.video_url && (
                                <div style={{ marginBottom: '30px', borderRadius: '12px', overflow: 'hidden', border: 'var(--glass-border)' }}>
                                    <video controls style={{ width: '100%', display: 'block' }}>
                                        <source src={t.video_url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            )}

                            <div style={{ marginTop: 'auto', paddingTop: '30px', borderTop: 'var(--glass-border)', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--neon-purple)', background: 'rgba(255,255,255,0.05)' }}>
                                    {t.profiles?.avatar_url ? (
                                        <img src={t.profiles.avatar_url} alt={t.profiles.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}>
                                            <User size={20} />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="font-heading" style={{ fontWeight: 800, fontSize: '0.9rem', letterSpacing: '0.1em', color: 'var(--text-main)', marginBottom: '5px' }}>
                                        {t.profiles?.full_name?.toUpperCase()} {t.profiles?.surname?.substring(0, 1)?.toUpperCase()}.
                                    </p>
                                    <p className="font-heading" style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', letterSpacing: '0.1em' }}>
                                        {t.profiles?.country?.toUpperCase() || 'ELITE SUBJECT'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="glass-panel" style={{ padding: '80px', textAlign: 'center', gridColumn: '1 / -1' }}>
                            <span className="font-heading" style={{ letterSpacing: '0.5em', fontSize: '0.8rem', opacity: 0.5 }}>AWAITING INCOMING TRANSMISSIONS...</span>
                        </div>
                    )}
                </div>

                {testimonials.length > 2 && (
                    <div style={{ marginTop: '60px', textAlign: 'center' }}>
                        <button 
                            onClick={() => setVisibleCount(showMore ? testimonials.length : 2)}
                            className="btn-glass"
                        >
                            {showMore ? extra.more : extra.less}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Testimonials;
