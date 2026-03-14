import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { ChevronLeft, ShieldCheck, User, Globe, MessageSquare, Zap } from 'lucide-react';

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
    const navigate = useNavigate();

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
            bilingual: "BILINGUAL"
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
            bilingual: "双语精修"
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
                        email: authData.user.email, // Ensure email is saved for admin visibility
                        full_name: fullName,
                        surname: surname,
                        language_to_learn: languageToLearn,
                        wechat_id: wechatId,
                        approved_status: 'pending', // New field for approval workflow
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
        <div className="royal-onyx-version" style={{ minHeight: '100vh', background: 'hsl(var(--onyx))', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
            <nav style={{ position: 'fixed', top: '60px', left: '60px', zIndex: 100 }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.75rem', fontWeight: 900, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3em', textDecoration: 'none', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
                    <ChevronLeft size={16} /> {text.return.toUpperCase()}
                </Link>
            </nav>

            <main className="animate-entrance" style={{ width: '100%', maxWidth: '650px' }}>
                <div style={{ padding: '40px 60px', borderRadius: '4px', border: 'var(--border-subtle)', background: 'hsla(0,0%,100%,0.01)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 30px', borderRadius: '2px', border: 'var(--border-subtle)', background: 'hsla(0,0%,100%,0.02)' }}>
                            <ShieldCheck size={28} style={{ color: 'hsl(var(--amber))', opacity: 0.8 }} />
                        </div>
                        <span className="accent" style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.4em', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '15px' }}>
                            {isLogin ? text.identity : text.portal}
                        </span>
                        <h2 className="serif" style={{ fontSize: '3rem' }}>
                            {isLogin ? text.access.split(' ')[0] : text.join.split(' ')[0]} <span className="liquid-gold-text serif-bold">{isLogin ? text.access.split(' ').slice(1).join(' ') : text.join.split(' ').slice(1).join(' ')}</span>
                        </h2>
                        <div className="header-divider" style={{ margin: '30px auto 0' }}></div>
                    </div>

                    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {!isLogin && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                <div className="form-group">
                                    <label className="accent" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '12px' }}>{text.givenName}</label>
                                    <input type="text" className="input-onyx sans" placeholder="ALEX" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={{ borderBottom: '1px solid hsla(0,0%,100%,0.1)', background: 'transparent' }} />
                                </div>
                                <div className="form-group">
                                    <label className="accent" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '12px' }}>{text.surname}</label>
                                    <input type="text" className="input-onyx sans" placeholder="SMITH" value={surname} onChange={(e) => setSurname(e.target.value)} required style={{ borderBottom: '1px solid hsla(0,0%,100%,0.1)', background: 'transparent' }} />
                                </div>
                            </div>
                        )}

                        {!isLogin && (
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                                <div className="form-group">
                                    <label className="accent" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '12px' }}>{text.protocol}</label>
                                    <select 
                                        className="input-onyx sans" 
                                        value={languageToLearn} 
                                        onChange={(e) => setLanguageToLearn(e.target.value)} 
                                        required 
                                        style={{ 
                                            borderBottom: '1px solid hsla(0,0%,100%,0.1)', 
                                            background: 'hsl(var(--onyx-soft))',
                                            color: 'white',
                                            width: '100%',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="" style={{ background: 'hsl(var(--onyx-soft))', color: 'white' }}>{text.select}</option>
                                        <option value="English" style={{ background: 'hsl(var(--onyx-soft))', color: 'white' }}>{text.english}</option>
                                        <option value="French" style={{ background: 'hsl(var(--onyx-soft))', color: 'white' }}>{text.french}</option>
                                        <option value="Both" style={{ background: 'hsl(var(--onyx-soft))', color: 'white' }}>{text.bilingual}</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="accent" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '12px' }}>{text.wechat}</label>
                                    <input type="text" className="input-onyx sans" placeholder="WECHAT_USER" value={wechatId} onChange={(e) => setWechatId(e.target.value)} required style={{ borderBottom: '1px solid hsla(0,0%,100%,0.1)', background: 'transparent' }} />
                                </div>
                            </div>
                        )}

                        <div className="form-group">
                            <label className="accent" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '12px' }}>{text.email}</label>
                            <input
                                type="email"
                                className="input-onyx sans"
                                placeholder="name@vision.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{ borderBottom: '1px solid hsla(0,0%,100%,0.1)', background: 'transparent' }}
                            />
                        </div>

                        <div className="form-group">
                            <label className="accent" style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '12px' }}>{text.password}</label>
                            <input
                                type="password"
                                className="input-onyx sans"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{ borderBottom: '1px solid hsla(0,0%,100%,0.1)', background: 'transparent' }}
                            />
                        </div>

                        {error && (
                            <div className="accent" style={{ padding: '20px', color: '#ff4444', fontSize: '0.75rem', fontWeight: 800, border: '1px solid rgba(255,0,0,0.1)', textAlign: 'center', letterSpacing: '0.1em', background: 'hsla(0,100%,50%,0.02)' }}>
                                <Zap size={14} style={{ marginRight: '10px' }} />
                                {error}
                            </div>
                        )}

                        <button type="submit" disabled={loading} className="btn-power sans" style={{ width: '100%', justifyContent: 'center', marginTop: '20px', padding: '25px', fontSize: '0.9rem', fontWeight: 800 }}>
                            {loading ? text.processing.toUpperCase() : (isLogin ? text.enter.toUpperCase() : text.init.toUpperCase())}
                        </button>
                    </form>

                    <div style={{ marginTop: '40px', textAlign: 'center' }}>
                        <p className="accent" style={{ fontSize: '0.75rem', color: 'hsl(var(--text-muted))', marginBottom: '15px', fontWeight: 600, letterSpacing: '0.1em' }}>
                            {isLogin ? text.newSubject : text.alreadyVerified}
                        </p>
                        <button 
                            onClick={() => setIsLogin(!isLogin)} 
                            className="serif" 
                            style={{ 
                                fontSize: '0.9rem', 
                                border: 'none', 
                                background: 'transparent', 
                                cursor: 'pointer', 
                                color: 'hsl(var(--amber))',
                                letterSpacing: '0.1em',
                                textTransform: 'uppercase',
                                fontWeight: 600,
                                borderBottom: '1px solid hsla(var(--amber) / 0.2)', 
                                padding: '0 0 5px',
                                transition: 'var(--transition-power)'
                            }}
                            onMouseEnter={e => e.target.style.borderBottomColor = 'hsl(var(--amber))'}
                            onMouseLeave={e => e.target.style.borderBottomColor = 'hsla(var(--amber) / 0.2)'}
                        >
                            {isLogin ? text.createProfile : text.signIn}
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Auth;
