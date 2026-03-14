import React from 'react';

const ContactForm = ({ text, contactForm, handleFormChange, handleContactSubmit, isSubmitting, submitStatus, sectionsRef }) => {
    return (
        <section id="contact" ref={(el) => (sectionsRef.current[2] = el)} className="scroll-reveal" style={{ padding: '60px 0', borderTop: 'var(--border-subtle)' }}>
            <div className="container" style={{ maxWidth: '900px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span className="section-label accent" style={{ opacity: 0.6 }}>SECURE CHANNEL</span>
                    <h2 className="serif">{text.contactTitle.split(' ')[0]} <span className="liquid-gold-text serif-bold">{text.contactTitle.split(' ').slice(1).join(' ')}</span></h2>
                    <div className="header-divider" style={{ margin: '30px auto' }}></div>
                </div>
                
                <form onSubmit={handleContactSubmit} className="contact-form" style={{ padding: '40px', borderRadius: '4px', border: 'var(--border-subtle)', background: 'hsla(0,0%,100%,0.01)' }}>
                    <div className="form-row" style={{ gap: '40px' }}>
                        <div className="form-group">
                            <label className="accent" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '15px' }}>{text.contactName}</label>
                            <input 
                                type="text" 
                                name="name" 
                                placeholder="IDENTIFIER" 
                                className="input-onyx sans" 
                                style={{ background: 'transparent', borderBottom: '1px solid hsla(0,0%,100%,0.1)', padding: '15px 0' }}
                                value={contactForm.name} 
                                onChange={handleFormChange} 
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label className="accent" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '15px' }}>{text.contactEmail}</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="ENCRYPTION EMAIL" 
                                className="input-onyx sans" 
                                style={{ background: 'transparent', borderBottom: '1px solid hsla(0,0%,100%,0.1)', padding: '15px 0' }}
                                value={contactForm.email} 
                                onChange={handleFormChange} 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="form-group full-width" style={{ marginTop: '40px' }}>
                        <label className="accent" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '15px' }}>{text.contactMessage}</label>
                        <textarea 
                            name="message" 
                            placeholder="PROTOCOL MESSAGE" 
                            className="input-onyx sans" 
                            style={{ minHeight: '150px', background: 'transparent', borderBottom: '1px solid hsla(0,0%,100%,0.1)', padding: '15px 0' }} 
                            value={contactForm.message} 
                            onChange={handleFormChange} 
                            required 
                        />
                    </div>
                    
                    <div style={{ marginTop: '60px', textAlign: 'center' }}>
                        <button type="submit" className="btn-power sans" disabled={isSubmitting} style={{ fontWeight: 800, minWidth: '320px', justifyContent: 'center' }}>
                            {isSubmitting ? text.contactProcessing.toUpperCase() : text.contactCTA.toUpperCase()}
                        </button>
                        {submitStatus && (
                            <div className="accent" style={{ marginTop: '30px', fontSize: '0.75rem', letterSpacing: '0.1em', color: submitStatus.includes('SUCCESS') ? 'hsl(var(--amber))' : '#ff4444', opacity: 0.8 }}>
                                <Zap size={14} style={{ marginRight: '10px' }} />
                                {submitStatus === 'AUTHENTICATED. WE WILL REACH OUT.' ? text.contactStatusAuth : text.contactStatusError}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ContactForm;
