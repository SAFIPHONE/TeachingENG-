import React from 'react';
import { ShieldAlert } from 'lucide-react';

const ContactForm = ({ text, contactForm, handleFormChange, handleContactSubmit, isSubmitting, submitStatus, sectionsRef }) => {
    return (
        <section id="contact" ref={(el) => (sectionsRef.current[2] = el)} className="scroll-reveal" style={{ padding: '60px 0' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <span className="font-heading" style={{ color: 'var(--neon-purple)', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '15px', display: 'block' }}>
                        SECURE CHANNEL
                    </span>
                    <h2>
                        {text.contactTitle.split(' ')[0]} <span className="gradient-text">{text.contactTitle.split(' ').slice(1).join(' ')}</span>
                    </h2>
                </div>
                
                <form onSubmit={handleContactSubmit} className="glass-panel" style={{ padding: '60px' }}>
                    <div className="grid-2" style={{ gap: '30px', marginBottom: '30px' }}>
                        <div>
                            <label className="input-label">{text.contactName}</label>
                            <input 
                                type="text" 
                                name="name" 
                                className="input-glass"
                                value={contactForm.name} 
                                onChange={handleFormChange} 
                                required 
                            />
                        </div>
                        <div>
                            <label className="input-label">{text.contactEmail}</label>
                            <input 
                                type="email" 
                                name="email" 
                                className="input-glass"
                                value={contactForm.email} 
                                onChange={handleFormChange} 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div style={{ marginBottom: '40px' }}>
                        <label className="input-label">{text.contactMessage}</label>
                        <textarea 
                            name="message" 
                            className="input-glass"
                            style={{ minHeight: '120px', resize: 'vertical' }}
                            value={contactForm.message} 
                            onChange={handleFormChange} 
                            required 
                        />
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                        <button type="submit" className="btn-neon" disabled={isSubmitting} style={{ minWidth: '250px' }}>
                            {isSubmitting ? text.contactProcessing.toUpperCase() : text.contactCTA.toUpperCase()}
                        </button>
                        
                        {submitStatus && (
                            <div className="font-heading" style={{ marginTop: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontSize: '0.8rem', letterSpacing: '0.1em', color: submitStatus.includes('SUCCESS') ? 'var(--neon-cyan)' : '#ff4444' }}>
                                <ShieldAlert size={16} />
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
