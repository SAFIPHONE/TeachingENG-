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
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span className="section-label accent" style={{ opacity: 0.6 }}>{text.reflectionsFeedback}</span>
                    <h2 className="serif">{text.reflectionsTitle.split(' ')[0]} <span className="liquid-gold-text serif-bold">{text.reflectionsTitle.split(' ').slice(1).join(' ')}</span></h2>
                    <div className="header-divider" style={{ margin: '30px auto' }}></div>
                </div>

                <div className={`testimonials-grid ${testimonials.length === 0 ? 'empty' : ''}`}>
                    {testimonials.length > 0 ? testimonials.slice(0, visibleCount).map((t, idx) => (
                        <div key={idx} className="testimonial-card">
                            <div className="rating-stars" style={{ marginBottom: '30px', display: 'flex', gap: '8px' }}>
                                {[...Array(t.rating || 5)].map((_, i) => (
                                    <Star key={i} size={14} fill="hsl(var(--amber))" color="hsl(var(--amber))" style={{ opacity: 0.6 }} />
                                ))}
                            </div>

                            <p className="testimonial-content">
                                "{t.content}"
                            </p>

                            {t.video_url && (
                                <div className="testimonial-video-container">
                                    <video controls style={{ width: '100%', display: 'block' }}>
                                        <source src={t.video_url} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                    <div className="video-overlay"></div>
                                </div>
                            )}

                            <div className="testimonial-author" style={{ marginTop: 'auto', paddingTop: '40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div className="author-avatar" style={{ border: 'var(--border-accent)', width: '44px', height: '44px', overflow: 'hidden', borderRadius: '4px', background: 'hsla(0,0%,100%,0.05)' }}>
                                    {t.profiles?.avatar_url ? (
                                        <img src={t.profiles.avatar_url} alt={t.profiles.full_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2 }}>
                                            <User size={18} />
                                        </div>
                                    )}
                                </div>
                                <div className="author-info">
                                    <p className="author-name accent" style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.2em', color: 'hsl(var(--amber))' }}>
                                        {t.profiles?.full_name?.toUpperCase()} {t.profiles?.surname?.substring(0, 1)?.toUpperCase()}.
                                    </p>
                                    <p className="author-country accent" style={{ fontSize: '0.65rem', color: 'hsl(var(--text-muted))', letterSpacing: '0.1em' }}>
                                        {t.profiles?.country?.toUpperCase() || 'ELITE SUBJECT'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="awaiting-transmissions" style={{ padding: '120px', textAlign: 'center', border: 'var(--border-subtle)', background: 'hsla(0,0%,100%,0.01)', gridColumn: 'span 2' }}>
                            <span className="accent" style={{ letterSpacing: '0.5em', fontSize: '0.75rem', opacity: 0.3 }}>AWAITING INCOMING TRANSMISSIONS...</span>
                        </div>
                    )}
                </div>

                {testimonials.length > 2 && (
                    <div style={{ marginTop: '80px', textAlign: 'center' }}>
                        <button 
                            onClick={() => setVisibleCount(showMore ? testimonials.length : 2)}
                            className="serif liquid-gold-text"
                            style={{ background: 'transparent', border: 'none', borderBottom: '1px solid hsla(var(--amber) / 0.3)', cursor: 'pointer', fontSize: '1.4rem', padding: '0 15px 5px' }}
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
