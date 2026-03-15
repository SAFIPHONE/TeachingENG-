import React, { useEffect, useRef, useState } from 'react';
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
                    console.warn('Testimonials list failed. Ensure db is correct.');
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
            heroHook: "EXCLUSIVE WECHAT ENGLISH TUTORING FOR CHINESE WOMEN",
            heroTitle: "Direct Access to",
            heroTitleAlt: "Fluency.",
            heroSub: "We teach Chinese professional women spoken English directly through 1-on-1 WeChat sessions. Affordable, convenient, and highly effective. Very limited capacity.",
            heroTrust: "REDEFINING CONVENIENT LANGUAGE MASTERY",
            heroCTA: "ADD US ON WECHAT",
            heroExplore: "WHY WECHAT?",
            navDashboard: "STUDENT PORTAL",
            navLogin: "SIGN IN",
            curriculumTitle: "The WeChat",
            curriculumSub: "Skip the complex apps. Learn English where you already spend your time. Professional tutoring delivered straight to your WeChat.",
            curriculumAcademic: "OUR APPROACH",
            curriculumMastery: "METHOD ADVANTAGES",
            curriculumItems: [
                { title: "Direct WeChat Coaching", desc: "No separate apps required. Enjoy 1-on-1 text, voice, and video coaching directly inside WeChat." },
                { title: "Affordable Pricing", desc: "We cut the overhead of massive platforms to offer you premium native English instruction at highly affordable rates." },
                { title: "Tailored for Chinese Women", desc: "A curriculum specifically designed around the professional and personal goals of modern Chinese women." }
            ],
            aboutTitle: "ABOUT THE PROGRAM",
            aboutCurator: "WHO WE ARE",
            aboutBioDefault: "We are currently focusing entirely on teaching English to Chinese women. Our goal is to empower you with native-level fluency in the most convenient way possible.",
            aboutLead: "ENGLISH COACHING TEAM",
            contactTitle: "SECURE YOUR SPOT",
            contactSub: "APPLY FOR WECHAT TUTORING",
            contactName: "FULL NAME",
            contactEmail: "EMAIL ADDRESS",
            contactMessage: "PLEASE INCLUDE YOUR WECHAT ID",
            contactCTA: "SUBMIT APPLICATION",
            contactProcessing: "SUBMITTING...",
            contactStatusAuth: "RECEIVED. WE WILL ADD YOU ON WECHAT SHORTLY.",
            contactStatusError: "ERROR. PLEASE TRY AGAIN.",
            reflectionsTitle: "Student Success",
            reflectionsFeedback: "REVIEWS",
            statusOpen: "REGISTRATION OPEN - SPOTS AVAILABLE",
            statusBusy: "SYSTEM LOCKED - CAPACITY REACHED",
            methodTitle: "WHY IT WORKS",
            methodView: "CONTACT FOR PRICING",
            methodAuthority: "Ultimate Convenience",
            methodAuthorityDesc: "Just open WeChat and start learning. Perfect for busy professionals.",
            methodElegance: "Voice & Text Asynchrony",
            methodEleganceDesc: "Practice speaking and listening through WeChat voice notes at your own pace.",
            footerSocial: "CONNECT",
            footerRights: "© 2026 TEACHINGENG / WECHAT ENGLISH",
            footerNav: "NAVIGATION",
            footerSupport: "CONTACT",
            footerLegal: "LEGAL"
        },
        ZH: {
            heroHook: "专为中国女性设计的微信英语辅导",
            heroTitle: "直达",
            heroTitleAlt: "流利英语",
            heroSub: "我们通过微信一对一直接教授中国职场女性英语口语。价格实惠，方便快捷，高效实用。名额非常有限。",
            heroTrust: "重新定义便捷的语言学习体验",
            heroCTA: "添加我们的微信",
            heroExplore: "为什么选择微信？",
            navDashboard: "学员门户",
            navLogin: "登录",
            curriculumTitle: "微信",
            curriculumSub: "抛弃复杂的软件。在您最常用的应用里学英语。专业的英语辅导直接通过微信发送给您。",
            curriculumAcademic: "我们的方法",
            curriculumMastery: "核心优势",
            curriculumItems: [
                { title: "微信直接辅导", desc: "无需下载额外软件。直接在微信内进行一对一文字、语音和视频辅导。" },
                { title: "实惠的价格", desc: "我们省去了大型平台的管理费用，为您提供价格极其亲民的优质母语英语指导。" },
                { title: "专为中国女性量身定制", desc: "课程专门围绕现代中国女性的职业和个人目标设计。" }
            ],
            aboutTitle: "关于课程",
            aboutCurator: "我们是谁",
            aboutBioDefault: "我们目前完全专注于向中国女性教授英语。我们的目标是以最便捷的方式帮助您达到母语般的流利程度。",
            aboutLead: "英语教练团队",
            contactTitle: "锁定您的名额",
            contactSub: "申请微信辅导",
            contactName: "姓名",
            contactEmail: "电子邮件地址",
            contactMessage: "请在此处留下您的微信号，以便我们添加您",
            contactCTA: "提交申请",
            contactProcessing: "正在提交...",
            contactStatusAuth: "已收到。我们将很快在微信上添加您。",
            contactStatusError: "错误。请重试。",
            reflectionsTitle: "学员成功案例",
            reflectionsFeedback: "评价反馈",
            statusOpen: "报名开放中 - 尚有名额",
            statusBusy: "系统已锁定 - 名额已满",
            methodTitle: "高效原理",
            methodView: "联系获取报价",
            methodAuthority: "极致便利",
            methodAuthorityDesc: "打开微信即可开始学习。非常适合忙碌的职场人士。",
            methodElegance: "语音和文字异步交流",
            methodEleganceDesc: "按照您自己的节奏，通过微信语音和消息练习口语和听力。",
            footerSocial: "联系我们",
            footerRights: "© 2026 教研科技 / 微信英语",
            footerNav: "网站导航",
            footerSupport: "客户支持",
            footerLegal: "法律条款"
        }
    };

    const text = t[language] || t['EN'];

    return (
        <div>
            {/* Animated Background Orbs */}
            <div className="orb-container">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>

            {/* Neon Navigation */}
            <nav className={`nav-neo ${scrolled ? 'scrolled' : ''}`}>
                <div className="container nav-content">
                    <Link to="/" className="logo-neo">Teaching<span>ENG</span></Link>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                        <button onClick={toggleLanguage} className="font-heading" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.1em', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='var(--text-muted)'}>
                            {language === 'EN' ? 'ZH' : 'EN'}
                        </button>
                        
                        {user ? (
                            <div style={{ display: 'flex', gap: '15px' }}>
                                {user?.email && ['admin@teachingeng.com', 'teachingeng.com@gmail.com'].includes(user.email.toLowerCase()) && (
                                    <Link to="/admin-panel" className="btn-glass" style={{ padding: '8px 20px', fontSize: '0.75rem' }}>ADMIN</Link>
                                )}
                                <Link to="/profile" className="btn-neon" style={{ padding: '8px 20px', fontSize: '0.75rem' }}>{text.navDashboard}</Link>
                            </div>
                        ) : (
                            <Link to="/auth" className="btn-glass" style={{ padding: '8px 25px', fontSize: '0.75rem' }}>{text.navLogin}</Link>
                        )}
                    </div>
                </div>
            </nav>

            <div style={{ paddingTop: '100px' }}>
                <div className="scroll-reveal visible">
                    <Hero text={text} content={content} />
                </div>

                <div className="scroll-reveal visible" ref={(el) => (sectionsRef.current[0] = el)}>
                <Features text={text} sectionsRef={sectionsRef} />
            </div>

            {/* Visionary Section */}
            <section ref={(el) => (sectionsRef.current[1] = el)} className="scroll-reveal visible" style={{ padding: '60px 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1.2fr)', gap: '40px', alignItems: 'center' }}>
                    <div style={{ order: window.innerWidth > 900 ? 1 : 2 }}>
                         <span className="font-heading" style={{ color: 'var(--neon-purple)', fontSize: '0.8rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '20px', display: 'block' }}>
                             {text.aboutCurator}
                         </span>
                         <h2 style={{ marginBottom: '40px' }}>{text.aboutTitle}</h2>
                         <div className="glass-panel" style={{ padding: '40px', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '-10px', left: '-10px', fontSize: '4rem', color: 'var(--neon-cyan)', opacity: 0.3, fontFamily: 'var(--font-heading)', lineHeight: 1 }}>"</div>
                            <p style={{ fontSize: '1.4rem', fontStyle: 'italic', marginBottom: '30px', color: 'var(--text-main)', position: 'relative', zIndex: 1 }}>
                                {content?.bio || text.aboutBioDefault}
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: '40px', height: '2px', background: 'var(--neon-purple)' }}></div>
                                <span className="font-heading" style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', letterSpacing: '0.1em' }}>{text.aboutLead}</span>
                            </div>
                         </div>
                    </div>
                    
                    <div style={{ position: 'relative', order: window.innerWidth > 900 ? 2 : 1 }}>
                        <div style={{ position: 'absolute', top: '20px', right: '-20px', width: '100%', height: '100%', border: '2px solid var(--neon-cyan)', borderRadius: '16px', zIndex: 0 }}></div>
                        <img src="/assets/gallery1.png" alt="Coach" style={{ width: '100%', border: 'var(--glass-border)', borderRadius: '16px', position: 'relative', zIndex: 1, filter: 'contrast(1.2)' }} />
                    </div>
                </div>
            </section>

            <div className="scroll-reveal visible" ref={(el) => (sectionsRef.current[2] = el)}>
                <Testimonials text={text} testimonials={testimonials} sectionsRef={sectionsRef} />
            </div>

            <div className="scroll-reveal visible" ref={(el) => (sectionsRef.current[3] = el)}>
                <ContactForm 
                    text={text} 
                    contactForm={contactForm} 
                    handleFormChange={handleFormChange} 
                    handleContactSubmit={handleContactSubmit} 
                    isSubmitting={isSubmitting} 
                    submitStatus={submitStatus} 
                    sectionsRef={sectionsRef} 
                />
            </div>

            {/* Neon Footer */}
            <footer style={{ padding: '60px 0 30px', borderTop: 'var(--glass-border)', marginTop: '40px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', bottom: '-50%', left: '50%', transform: 'translateX(-50%)', width: '60vw', height: '60vw', background: 'var(--neon-blue)', filter: 'blur(150px)', opacity: 0.1, zIndex: -1 }}></div>
                <div className="container grid-3" style={{ gap: '40px' }}>
                    <div>
                        <div className="logo-neo" style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Teaching<span>ENG</span></div>
                        <p style={{ fontSize: '0.9rem', maxWidth: '300px', lineHeight: 2 }}>
                            {text.heroSub.split('.')[0]}.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-heading" style={{ fontSize: '0.8rem', letterSpacing: '0.3em', marginBottom: '25px', color: 'var(--neon-purple)', textTransform: 'uppercase' }}>{text.footerNav}</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <li><a href="#method" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color='var(--neon-cyan)'} onMouseLeave={e => e.target.style.color='var(--text-muted)'}>{text.methodTitle}</a></li>
                            <li><a href="#testimonials" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color='var(--neon-cyan)'} onMouseLeave={e => e.target.style.color='var(--text-muted)'}>{text.reflectionsTitle}</a></li>
                            <li><a href="#contact" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color='var(--neon-cyan)'} onMouseLeave={e => e.target.style.color='var(--text-muted)'}>{text.contactTitle}</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading" style={{ fontSize: '0.8rem', letterSpacing: '0.3em', marginBottom: '25px', color: 'var(--neon-cyan)', textTransform: 'uppercase' }}>{text.footerSupport}</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <li><Link to="/auth" style={{ color: 'var(--neon-cyan)', textDecoration: 'none', fontSize: '0.9rem' }}>{text.navLogin}</Link></li>
                            <li style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>TeachingENG.com@gmail.com</li>
                        </ul>
                    </div>
                </div>

                <div className="container" style={{ marginTop: '50px', paddingTop: '30px', borderTop: 'var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p className="font-heading" style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', letterSpacing: '0.1em' }}>{text.footerRights}</p>
                    <div className="font-heading" style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', letterSpacing: '0.1em' }}>{text.footerLegal}</div>
                </div>
            </footer>
            </div>
        </div>
    );
};

export default LandingPage;
