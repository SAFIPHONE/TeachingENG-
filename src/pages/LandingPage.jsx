import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Instagram, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';

// Components
import Hero from '../components/Hero';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';

const LandingPage = ({ language, toggleLanguage, content, user }) => {
    const sectionsRef = useRef([]);
    const [scrolled, setScrolled] = useState(false);
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) entry.target.classList.add('visible');
            });
        }, { threshold: 0.1 });

        sectionsRef.current.forEach((section) => {
            if (section) observer.observe(section);
        });

        // Fetch Approved Testimonials
        const fetchTestimonials = async () => {
            try {
                const { data, error } = await supabase
                    .from('testimonials')
                    .select('*, profiles(full_name, surname, avatar_url, country)')
                    .eq('approved', true)
                    .order('created_at', { ascending: false })
                    .limit(3);
                
                if (error) {
                    console.warn('Testimonials table or relationship missing. Please run SQL setup.');
                    return;
                }
                if (data) setTestimonials(data);
            } catch (err) {
                console.error('Failed to fetch testimonials:', err);
            }
        };
        fetchTestimonials();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const handleFormChange = (e) => setContactForm({ ...contactForm, [e.target.name]: e.target.value });

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { error } = await supabase.from('leads').insert([{ ...contactForm, created_at: new Date().toISOString() }]);
            if (error) throw error;
            setSubmitStatus('AUTHENTICATED. WE WILL REACH OUT.');
            setContactForm({ name: '', email: '', message: '' });
        } catch (error) {
            setSubmitStatus('SUBMISSION ERROR.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitStatus(''), 5000);
        }
    };

    const t = {
        EN: {
            heroHook: "BEYOND FLUENCY. TOWARDS AUTHORITY.",
            heroTitle: "Linguistic",
            heroTitleAlt: "Presence.",
            heroSub: "The definitive standard in English and French coaching for elite executives and global visionaries. Command every room with absolute precision.",
            heroTrust: "TRANSFORMING VOICES AT THE HIGHEST LEVELS",
            heroCTA: "JOIN THE ELITE",
            heroExplore: "EXPLORE METHOD",
            navDashboard: "STUDENT PORTAL",
            navLogin: "SIGN IN TO PORTAL",
            curriculumTitle: "The Architecture of Power",
            curriculumSub: "Traditional learning is obsolete. We build cognitive frameworks for linguistic authority.",
            curriculumAcademic: "ACADEMIC INTEL",
            curriculumMastery: "MASTERY MODULES",
            curriculumItems: [
                { title: "Verbal Precision", desc: "Eliminate linguistic noise. Communicate with surgical accuracy." },
                { title: "Phonetic Command", desc: "Master the acoustics of authority. Speak with absolute resonance." },
                { title: "Cultural Nuance", desc: "Decrypt the hidden protocols of elite international discourse." }
            ],
            aboutTitle: "THE VISIONARY",
            aboutCurator: "CURATOR IDENTITY",
            aboutBioDefault: "Designing the future of linguistic performance through cognitive integration.",
            aboutLead: "CHIEF PERFORMANCE COACH",
            contactTitle: "SECURE CONSULTATION",
            contactSub: "ESTABLISH DIRECT LINK",
            contactName: "IDENTIFIER / FULL NAME",
            contactEmail: "ENCRYPTION EMAIL",
            contactMessage: "PROTOCOL / MESSAGE",
            contactCTA: "TRANSMIT INQUIRY",
            contactProcessing: "TRANSMITTING...",
            contactStatusAuth: "TRANSMISSION SUCCESS. WE WILL REACH OUT.",
            contactStatusError: "PROTOCOL FAILURE. RETRY LATER.",
            reflectionsTitle: "Elite Reflections",
            reflectionsFeedback: "SUBJECT FEEDBACK",
            statusOpen: "SYSTEMS ACTIVE",
            statusBusy: "AT CAPACITY",
            methodTitle: "THE PROTOCOL",
            methodView: "VIEW ARCHITECTURE",
            methodAuthority: "Strategic Authority",
            methodAuthorityDesc: "Linguistic tools designed for high-stakes negotiation.",
            methodElegance: "Technical Elegance",
            methodEleganceDesc: "Phonetic refinement for a sophisticated global presence.",
            footerSocial: "SOCIAL CHANNELS",
            footerRights: "© 2026 TEACHINGENG / ARCHITECTURAL LINGUISTICS",
            footerNav: "INTELLIGENCE",
            footerSupport: "DIRECT LINK",
            footerLegal: "LEGAL PROTOCOLS"
        },
        ZH: {
            heroHook: "不仅仅是流利。更是权威。",
            heroTitle: "言语的",
            heroTitleAlt: "主宰气场",
            heroSub: "专为顶尖高管与全球愿景领袖设计的英法双语精英辅导。以绝对的精准度，掌控每一个关键时刻。",
            heroTrust: "在全球最高层级重塑语言的力量",
            heroCTA: "加入精英行列",
            heroExplore: "探索教学法",
            navDashboard: "学员门户",
            navLogin: "登录入口",
            curriculumTitle: "权力的架构",
            curriculumSub: "传统学习已过时。我们为建立语言权威性构建认知框架。",
            curriculumAcademic: "学术情报",
            curriculumMastery: "核心模块",
            curriculumItems: [
                { title: "言语精准度", desc: "消除语言噪音。以手术般的精确度进行沟通。" },
                { title: "语音掌控力", desc: "掌控权威的声音美学。发出的每一个音节都带有共鸣。" },
                { title: "文化洞察力", desc: "破解全球精英话语体系中的隐藏协议。" }
            ],
            aboutTitle: "愿景领航者",
            aboutCurator: "馆长身份",
            aboutBioDefault: "通过认知整合设计语言表现的未来。",
            aboutLead: "首席绩效教练",
            contactTitle: "预约私人咨询",
            contactSub: "建立直接联系",
            contactName: "姓名 / 身份标识",
            contactEmail: "加密电子邮箱",
            contactMessage: "咨询内容 / 信息",
            contactCTA: "提交咨询申请",
            contactProcessing: "正在发送...",
            contactStatusAuth: "系统已认证。我们会尽快与您联系。",
            contactStatusError: "提交错误。请稍后再试。",
            reflectionsTitle: "精英反馈",
            reflectionsFeedback: "学员评估",
            statusOpen: "系统开放中",
            statusBusy: "名额已满",
            methodTitle: "核心协议",
            methodView: "查看架构",
            methodAuthority: "战略权威",
            methodAuthorityDesc: "专为高风险谈判设计的语言工具。",
            methodElegance: "卓越美感",
            methodEleganceDesc: "旨在提升全球精致形象的语音细化。",
            footerSocial: "社交渠道",
            footerRights: "© 2026 教研科技 / 架构语言学",
            footerNav: "智能导师",
            footerSupport: "直接联系",
            footerLegal: "法律条款"
        }
    };

    const text = t[language] || t['EN'];

    return (
        <div className="royal-onyx-version">
            {/* Power Navigation */}
            <nav className={`nav-power ${scrolled ? 'scrolled' : ''}`}>
                <div className="container nav-content">
                    <Link to="/" className="logo-power">Teaching<span>ENG</span></Link>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                        <button onClick={toggleLanguage} style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '0.2em', cursor: 'pointer' }}>
                            {language === 'EN' ? 'ZH' : 'EN'}
                        </button>
                        
                        {user ? (
                            <div style={{ display: 'flex', gap: '15px' }}>
                                {user?.email && ['admin@teachingeng.com', 'teachingeng.com@gmail.com'].includes(user.email.toLowerCase()) && (
                                    <Link to="/admin-panel" className="btn-power" style={{ padding: '10px 20px', fontSize: '0.7rem' }}>ADMIN PANEL</Link>
                                )}
                                <Link to="/profile" className="btn-power-outline" style={{ padding: '10px 20px', fontSize: '0.7rem' }}>{text.navDashboard}</Link>
                            </div>
                        ) : (
                            <Link to="/auth" className="btn-power" style={{ padding: '10px 25px', fontSize: '0.7rem' }}>{text.navLogin}</Link>
                        )}
                    </div>
                </div>
            </nav>

            <Hero text={text} content={content} />

            <Features text={text} sectionsRef={sectionsRef} />

            {/* Visionary Section */}
            <section ref={(el) => (sectionsRef.current[1] = el)} className="scroll-reveal" style={{ padding: '60px 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '100px', alignItems: 'center' }}>
                    <div>
                         <span className="section-label" style={{ color: 'var(--text-muted)' }}>{text.aboutCurator}</span>
                         <h2 className="serif">{text.aboutTitle}</h2>
                         <p style={{ fontSize: '1.8rem', fontStyle: 'italic', marginBottom: '40px' }}>
                            "{content?.bio || text.aboutBioDefault}"
                         </p>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                            <div style={{ width: '60px', height: '1px', background: 'var(--amber)' }}></div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.2em' }}>{text.aboutLead}</span>
                         </div>
                    </div>
                    
                    <div style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-30px', left: '-30px', width: '100%', height: '100%', border: '1px solid var(--amber)', zIndex: 0 }}></div>
                        <img src="/assets/gallery1.png" alt="Coach" style={{ width: '100%', position: 'relative', zIndex: 1, filter: 'grayscale(1)' }} />
                    </div>
                </div>
            </section>

            <Testimonials text={text} testimonials={testimonials} sectionsRef={sectionsRef} />

            <ContactForm 
                text={text} 
                contactForm={contactForm} 
                handleFormChange={handleFormChange} 
                handleContactSubmit={handleContactSubmit} 
                isSubmitting={isSubmitting} 
                submitStatus={submitStatus} 
                sectionsRef={sectionsRef} 
            />

            {/* Power Footer */}
            <footer style={{ padding: '60px 0 30px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'hsla(0,0%,0%,0.2)' }}>
                <div className="container footer-grid">
                    <div>
                        <div className="logo-power" style={{ fontSize: '1.5rem', marginBottom: '30px' }}>Teaching<span>ENG</span></div>
                        <p style={{ fontSize: '0.85rem', opacity: 0.5, maxWidth: '300px', lineHeight: 2 }}>
                            {text.heroSub.split('.')[0]}.
                        </p>
                    </div>

                    <div>
                        <h4 className="accent" style={{ fontSize: '0.7rem', letterSpacing: '0.3em', marginBottom: '30px', opacity: 0.4 }}>{text.footerNav}</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <li><a href="#method" className="accent" style={{ color: 'white', textDecoration: 'none', fontSize: '0.8rem', opacity: 0.7 }}>{text.methodTitle}</a></li>
                            <li><a href="#testimonials" className="accent" style={{ color: 'white', textDecoration: 'none', fontSize: '0.8rem', opacity: 0.7 }}>{text.reflectionsTitle}</a></li>
                            <li><a href="#contact" className="accent" style={{ color: 'white', textDecoration: 'none', fontSize: '0.8rem', opacity: 0.7 }}>{text.contactTitle}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="accent" style={{ fontSize: '0.7rem', letterSpacing: '0.3em', marginBottom: '30px', opacity: 0.4 }}>{text.footerSupport}</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <li><Link to="/auth" className="accent" style={{ color: 'var(--amber)', textDecoration: 'none', fontSize: '0.8rem' }}>{text.navLogin}</Link></li>
                            <li className="accent" style={{ fontSize: '0.8rem', opacity: 0.5 }}>TeachingENG.com@gmail.com</li>
                        </ul>
                    </div>
                </div>

                <div className="container" style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.65rem', opacity: 0.3, fontWeight: 800, letterSpacing: '0.1em' }}>{text.footerRights}</p>
                    <div className="accent" style={{ fontSize: '0.65rem', opacity: 0.3, letterSpacing: '0.2em' }}>{text.footerLegal}</div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
