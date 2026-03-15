import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { ChevronLeft, ShieldCheck, Zap } from 'lucide-react';

const Auth = ({ language, toggleLanguage }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // Additional Registration Fields
    const [fullName, setFullName] = useState('');
    const [surname, setSurname] = useState('');
    const [languageToLearn, setLanguageToLearn] = useState('');
    const [wechatId, setWechatId] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const t = {
        EN: {
            return: "RETURN",
            identity: "IDENTITY VERIFICATION",
            portal: "PORTAL INITIALIZATION",
            access: "Access Portal.",
            join: "Join the Elite.",
            givenName: "GIVEN NAME",
            surname: "SURNAME",
            protocol: "TARGET PROTOCOL",
            select: "SELECT...",
            wechat: "WECHAT ID",
            email: "SECURE EMAIL",
            password: "ACCESS CODE",
            enter: "ENTER SYSTEM",
            init: "INITIALIZE ACCOUNT",
            processing: "PROCESSING...",
            newSubject: "NEW SUBJECT?",
            alreadyVerified: "ALREADY VERIFIED?",
            createProfile: "Create Your Profile",
            signIn: "Sign In to Portal",
            verificationInitiated: "VERIFICATION PROTOCOL INITIATED. CHECK EMAIL.",
            english: "ENGLISH",
            french: "FRENCH",
            bilingual: "BILINGUAL",
            navDashboard: "STUDENT PORTAL",
            navLogin: "SIGN IN",
            heroSub: "We teach Chinese professional women spoken English directly through 1-on-1 WeChat sessions. Affordable, convenient, and highly effective. Very limited capacity.",
            methodTitle: "WHY IT WORKS",
            reflectionsTitle: "Student Success",
            contactTitle: "SECURE YOUR SPOT",
            footerNav: "NAVIGATION",
            footerSupport: "CONTACT",
            footerRights: "© 2026 TEACHINGENG / WECHAT ENGLISH",
            footerLegal: "LEGAL"
        },
        ZH: {
            return: "返回主页",
            identity: "身份验证",
            portal: "系统初始化",
            access: "进入门户",
            join: "加入精英行列",
            givenName: "名",
            surname: "姓",
            protocol: "目标课程",
            select: "请选择...",
            wechat: "微信号",
            email: "安全邮箱",
            password: "访问密码",
            enter: "进入系统",
            init: "初始化账户",
            processing: "处理中...",
            newSubject: "新成员？",
            alreadyVerified: "已有账户？",
            createProfile: "创建您的档案",
            signIn: "登录门户",
            verificationInitiated: "验证程序已启动。请检查您的邮箱。",
            english: "英语课程",
            french: "法语课程",
            bilingual: "双语精修",
            navDashboard: "学员门户",
            navLogin: "登录",
            heroSub: "我们通过微信一对一直接教授中国职场女性英语口语。价格实惠，方便快捷，高效实用。名额非常有限。",
            methodTitle: "高效原理",
            reflectionsTitle: "学员成功案例",
            contactTitle: "锁定您的名额",
            footerNav: "网站导航",
            footerSupport: "客户支持",
            footerRights: "© 2026 教研科技 / 微信英语",
            footerLegal: "法律条款"
        }
    };

    const text = t[language] || t['EN'];

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (isLogin) {
                const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
                if (loginError) throw loginError;
                
                const isAdmin = ['ADMIN@TEACHINGENG.COM', 'TEACHINGENG.COM@GMAIL.COM'].includes(email.trim().toUpperCase());
                if (isAdmin) {
                    navigate('/admin-panel');
                } else {
                    navigate('/profile');
                }
            } else {
                // 1. Sign Up User
                const { data: authData, error: signUpError } = await supabase.auth.signUp({ 
                    email, 
                    password 
                });
                
                if (signUpError) throw signUpError;

                // 2. Insert Profile Data if Auth was successful
                if (authData?.user) {
                    const { error: profileError } = await supabase.from('profiles').upsert({
                        id: authData.user.id,
                        email: authData.user.email,
                        full_name: fullName,
                        surname: surname,
                        language_to_learn: languageToLearn,
                        wechat_id: wechatId,
                        approved_status: 'pending',
                        updated_at: new Date()
                    });
                    
                    if (profileError) throw profileError;
                }

                alert(text.verificationInitiated);
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.message.toUpperCase());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', position: 'relative', overflow: 'hidden' }}>
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
                        <Link to="/" className="font-heading" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                            <ChevronLeft size={16} /> {text.return}
                        </Link>
                        <button onClick={toggleLanguage} className="font-heading" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '0.1em', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color='white'} onMouseLeave={e => e.target.style.color='var(--text-muted)'}>
                            {language === 'EN' ? 'ZH' : 'EN'}
                        </button>
                    </div>
                </div>
            </nav>

            <main className="scroll-reveal visible" style={{ width: '100%', maxWidth: '600px', marginTop: '100px', zIndex: 10 }}>
                <div className="glass-panel" style={{ padding: '60px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <div style={{ width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: 'var(--glass-border)' }}>
                            <ShieldCheck size={30} color="var(--neon-purple)" style={{ filter: 'drop-shadow(0 0 10px rgba(189,0,255,0.5))' }} />
                        </div>
                        <span className="font-heading" style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.3em', color: 'var(--neon-cyan)', display: 'block', marginBottom: '15px' }}>
                            {isLogin ? text.identity : text.portal}
                        </span>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0' }}>
                            {isLogin ? text.access.split(' ')[0] : text.join.split(' ')[0]} <span className="gradient-text">{isLogin ? text.access.split(' ').slice(1).join(' ') : text.join.split(' ').slice(1).join(' ')}</span>
                        </h2>
                    </div>

                    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {!isLogin && (
                            <div className="grid-2" style={{ gap: '20px' }}>
                                <div>
                                    <label className="input-label">{text.givenName}</label>
                                    <input type="text" className="input-glass" placeholder="ALEX" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                                </div>
                                <div>
                                    <label className="input-label">{text.surname}</label>
                                    <input type="text" className="input-glass" placeholder="SMITH" value={surname} onChange={(e) => setSurname(e.target.value)} required />
                                </div>
                            </div>
                        )}

                        {!isLogin && (
                            <div className="grid-2" style={{ gap: '20px' }}>
                                <div>
                                    <label className="input-label">{text.protocol}</label>
                                    <select 
                                        className="input-glass" 
                                        value={languageToLearn} 
                                        onChange={(e) => setLanguageToLearn(e.target.value)} 
                                        required 
                                    >
                                        <option value="">{text.select}</option>
                                        <option value="English">{text.english}</option>
                                        <option value="French">{text.french}</option>
                                        <option value="Both">{text.bilingual}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="input-label">{text.wechat}</label>
                                    <input type="text" className="input-glass" placeholder="WECHAT_USER" value={wechatId} onChange={(e) => setWechatId(e.target.value)} required />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="input-label">{text.email}</label>
                            <input
                                type="email"
                                className="input-glass"
                                placeholder="name@vision.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="input-label">{text.password}</label>
                            <input
                                type="password"
                                className="input-glass"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="font-heading" style={{ padding: '15px', color: '#ff4444', fontSize: '0.8rem', fontWeight: 600, border: '1px solid rgba(255,0,0,0.2)', textAlign: 'center', letterSpacing: '0.1em', background: 'rgba(255,0,0,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                <Zap size={16} />
                                {error}
                            </div>
                        )}

                        <button type="submit" disabled={loading} className="btn-neon" style={{ width: '100%', marginTop: '10px', padding: '20px' }}>
                            {loading ? text.processing.toUpperCase() : (isLogin ? text.enter.toUpperCase() : text.init.toUpperCase())}
                        </button>
                    </form>

                    <div style={{ marginTop: '40px', textAlign: 'center' }}>
                        <p className="font-heading" style={{ fontSize: '0.8rem', color: 'var(--text-subtle)', marginBottom: '15px', letterSpacing: '0.1em' }}>
                            {isLogin ? text.newSubject : text.alreadyVerified}
                        </p>
                        <button 
                            onClick={() => setIsLogin(!isLogin)} 
                            className="font-heading" 
                            style={{ 
                                fontSize: '0.9rem', 
                                border: 'none', 
                                background: 'transparent', 
                                cursor: 'pointer', 
                                color: 'var(--neon-purple)',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                transition: 'var(--transition-snap)'
                            }}
                            onMouseEnter={e => e.target.style.color = 'var(--neon-cyan)'}
                            onMouseLeave={e => e.target.style.color = 'var(--neon-purple)'}
                        >
                            {isLogin ? text.createProfile : text.signIn}
                        </button>
                    </div>
                </div>
            </main>

            {/* Neon Footer */}
            <footer style={{ width: '100%', padding: '60px 0 30px', borderTop: 'var(--glass-border)', marginTop: '80px', position: 'relative', overflow: 'hidden', zIndex: 10 }}>
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
                            <li><Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color='var(--neon-cyan)'} onMouseLeave={e => e.target.style.color='var(--text-muted)'}>{text.methodTitle}</Link></li>
                            <li><Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color='var(--neon-cyan)'} onMouseLeave={e => e.target.style.color='var(--text-muted)'}>{text.reflectionsTitle}</Link></li>
                            <li><Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color='var(--neon-cyan)'} onMouseLeave={e => e.target.style.color='var(--text-muted)'}>{text.contactTitle}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading" style={{ fontSize: '0.8rem', letterSpacing: '0.3em', marginBottom: '25px', color: 'var(--neon-cyan)', textTransform: 'uppercase' }}>{text.footerSupport}</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
    );
};

export default Auth;
