import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { User, Camera, Award, Zap, ChevronLeft, Shield, MessageSquare, ExternalLink, Globe, Star, LogOut } from 'lucide-react';

const Profile = ({ language, toggleLanguage }) => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState({
        full_name: '', surname: '', age: '', country: '', language_to_learn: '', wechat_id: '', avatar_url: ''
    });
    const [testimonial, setTestimonial] = useState({ rating: 5, content: '', video_url: '' });
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();

    const t = {
        EN: {
            decrypting: "DECRYPTING PORTAL...",
            accessPending: "ACCESS PENDING",
            reviewMsg: "YOUR SUBJECT CLEARANCE IS CURRENTLY UNDER REVIEW BY THE CORE PROTOCOL. PLEASE COORDINATE VIA WECHAT FOR FINAL NEGOTIATION.",
            wechatHelp: "WECHAT ID: TeachingENG_Coach",
            terminate: "TERMINATE SESSION",
            studentPortal: "STUDENTPORTAL",
            priorityAssistance: "PRIORITY ASSISTANCE",
            connectWechat: "CONNECT ON WECHAT",
            memberClass: "MEMBER CLASS",
            innerCircle: "INNER CIRCLE v4",
            configuration: "CONFIGURATION",
            identityParams: "Identity Parameters",
            givenName: "GIVEN NAME",
            surname: "SURNAME",
            age: "CHRONOLOGICAL AGE",
            location: "GEOGRAPHICAL LOCATION",
            targetSystem: "TARGET SYSTEM",
            wechatId: "WECHAT PRIORITY ID",
            updateSystem: "UPDATE SYSTEM",
            synchronizing: "SYNCHRONIZING...",
            voiceSubject: "VOICE OF THE SUBJECT",
            legacyReflections: "Legacy Reflections",
            satisfactionProtocol: "SATISFACTION PROTOCOL",
            writtenTestimony: "WRITTEN TESTIMONY",
            videoTrans: "VIDEO TRANSMISSION (MAX 50MB)",
            uploadTestimony: "UPLOAD TESTIMONY",
            videoCaptured: "VIDEO CAPTURED",
            videoDeployed: "VIDEO DEPLOYED",
            finalizeReflections: "FINALIZE REFLECTIONS",
            transmitting: "TRANSMITTING...",
            placeholderReflections: "Describe your transformation within the Royal Onyx system...",
            selectProtocol: "Select Protocol",
            english: "English Dominance",
            french: "French Elegance",
            bilingual: "Bilingual Mastery",
            elite: "ELITE",
            track: "TRACK",
            avatarInitialized: "AVATAR INITIALIZED.",
            systemSynchronized: "SYSTEM SYNCHRONIZED.",
            videoTransmissionComplete: "VIDEO TRANSMISSION COMPLETE.",
            reflectionsSubmitted: "REFLECTIONS SUBMITTED TO CORE. PENDING APPROVAL."
        },
        ZH: {
            decrypting: "解码门户中...",
            accessPending: "访问审批中",
            reviewMsg: "您的学员权限正由核心协议审核中。请通过微信进行最终协商。",
            wechatHelp: "微信号: TeachingENG_Coach",
            terminate: "终止会话",
            studentPortal: "学员门户",
            priorityAssistance: "优先协助",
            connectWechat: "微信联系",
            memberClass: "会员等级",
            innerCircle: "核心圈子 v4",
            configuration: "系统配置",
            identityParams: "身份参数",
            givenName: "名",
            surname: "姓",
            age: "年龄",
            location: "地理位置",
            targetSystem: "目标系统课程",
            wechatId: "微信优先 ID",
            updateSystem: "更新系统",
            synchronizing: "同步中...",
            voiceSubject: "学员心声",
            legacyReflections: "传承感悟",
            satisfactionProtocol: "满意度协议",
            writtenTestimony: "文字感言",
            videoTrans: "视频传输 (最大 50MB)",
            uploadTestimony: "上传感言视频",
            videoCaptured: "视频已捕获",
            videoDeployed: "视频已部署",
            finalizeReflections: "提交最终感悟",
            transmitting: "传输中...",
            placeholderReflections: "描述您在皇家奥尼克斯系统中的蜕变...",
            selectProtocol: "选择课程协议",
            english: "英语主宰",
            french: "法式优雅",
            bilingual: "双语精修",
            elite: "精英",
            track: "赛道",
            avatarInitialized: "头像初始化成功。",
            systemSynchronized: "系统同步成功。",
            videoTransmissionComplete: "视频传输完成。",
            reflectionsSubmitted: "感悟已提交至核心。等待审核中。"
        }
    };

    const text = t[language] || t['EN'];

    useEffect(() => {
        getProfile();
    }, []);

    const getProfile = async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { navigate('/auth'); return; }

            let { data, error, status } = await supabase
                .from('profiles').select('*').eq('id', user.id).single();

            if (error && status !== 406) throw error;
            if (data) setProfile(data);
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarUpload = async (e) => {
        try {
            setSaving(true);
            const file = e.target.files[0];
            if (!file) return;

            const { data: { user } } = await supabase.auth.getUser();
            // Simplify file name to avoid nested bucket folders
            const fileName = `profile-${user.id}-${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;
            
            // Explicit error handling for Storage Bucket & RLS
            const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file);
            
            if (uploadError) {
                if (uploadError.message?.includes('not found')) {
                    alert('CRITICAL: STORAGE BUCKET "avatars" NOT FOUND. Please create it in Supabase Storage.');
                } else if (uploadError.message?.includes('row-level security policy')) {
                    alert('SECURITY BLOCK: RLS Policy missing. Please enable "Insert" access for authenticated users on the "avatars" bucket.');
                } else {
                    alert(`UPLOAD FAILED: ${uploadError.message}`);
                }
                return;
            }

            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
            
            setProfile(prev => ({ ...prev, avatar_url: publicUrl }));
            
            // Sync with DB
            await supabase.from('profiles').upsert({ id: user.id, avatar_url: publicUrl, updated_at: new Date() });
            alert('AVATAR INITIALIZED.');
        } catch (error) {
            console.error('Error:', error.message);
            alert(`SYSTEM ERROR: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            const { data: { user } } = await supabase.auth.getUser();
            const { error } = await supabase.from('profiles').upsert({ id: user.id, ...profile, updated_at: new Date() });
            if (error) throw error;
            alert('SYSTEM SYNCHRONIZED.');
        } catch (error) {
            alert(error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleVideoUpload = async (e) => {
        try {
            setSaving(true);
            const file = e.target.files[0];
            if (!file) return;

            // Basic validation
            if (file.size > 50 * 1024 * 1024) throw new Error('VIDEO EXCEEDS 50MB LIMIT.');

            const { data: { user } } = await supabase.auth.getUser();
            const fileName = `testimonial-${user.id}-${Date.now()}.${file.name.split('.').pop()}`;
            
            const { error: uploadError } = await supabase.storage.from('media').upload(fileName, file);
            
            if (uploadError) {
                if (uploadError.message?.includes('not found')) {
                    alert('CRITICAL: STORAGE BUCKET "media" NOT FOUND. Please create it in Supabase.');
                } else {
                    alert(`VIDEO UPLOAD FAILED: ${uploadError.message}`);
                }
                return;
            }

            const { data: { publicUrl } } = supabase.storage.from('media').getPublicUrl(fileName);
            setTestimonial(prev => ({ ...prev, video_url: publicUrl }));
            alert('VIDEO TRANSMISSION COMPLETE.');
        } catch (error) {
            alert(`SYSTEM ERROR: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const submitTestimonial = async () => {
        try {
            setSaving(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!testimonial.content && !testimonial.video_url) throw new Error('REFLECTIONS OR VIDEO REQUIRED.');

            const { error } = await supabase.from('testimonials').upsert({
                profile_id: user.id,
                rating: testimonial.rating,
                content: testimonial.content,
                video_url: testimonial.video_url,
                approved: false, // Default to false for moderation
                updated_at: new Date()
            });

            if (error) {
                if (error.message?.includes('does not exist')) {
                    alert('CRITICAL: "testimonials" table missing. Please run SQL setup in Supabase.');
                } else {
                    throw error;
                }
                return;
            }
            alert('REFLECTIONS SUBMITTED TO CORE. PENDING APPROVAL.');
        } catch (error) {
            alert(`SUBMISSION ERROR: ${error.message}`);
        } finally {
            setSaving(false);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    if (loading) return (
        <div className="page-onyx-center" style={{ flexDirection: 'column', background: 'hsl(var(--onyx))' }}>
            <div style={{ width: '60px', height: '1px', background: 'hsl(var(--amber))', animation: 'pulse 2s infinite' }}></div>
            <p className="accent" style={{ marginTop: '40px', fontWeight: 900, letterSpacing: '0.6em', fontSize: '0.6rem', color: 'hsl(var(--amber))' }}>{text.decrypting}</p>
        </div>
    );

    // MODERATION GUARD
    if (profile.approved_status !== 'approved') {
        return (
            <div className="page-onyx-center" style={{ flexDirection: 'column', textAlign: 'center', padding: '80px 20px', background: 'hsl(var(--onyx))', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ padding: '40px', borderRadius: '2px', border: 'var(--border-subtle)', marginBottom: '50px', background: 'hsla(0,0%,100%,0.02)' }}>
                    <Shield size={50} style={{ color: 'hsl(var(--amber))', opacity: 0.8 }} />
                </div>
                <h2 className="serif" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '20px' }}>
                    {text.accessPending.split(' ')[0]} <span className="liquid-gold-text serif-bold">{text.accessPending.split(' ').slice(1).join(' ')}</span>
                </h2>
                <div className="header-divider" style={{ margin: '0 auto 40px' }}></div>
                <p className="sans" style={{ fontSize: '1rem', color: 'hsl(var(--text-secondary))', maxWidth: '600px', lineHeight: 1.8, opacity: 0.8 }}>
                    {text.reviewMsg}
                </p>
                <div style={{ marginTop: '60px', padding: '30px 40px', border: 'var(--border-accent)', background: 'hsla(var(--amber) / 0.02)', borderRadius: '2px' }}>
                    <p className="accent" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'hsl(var(--amber))', letterSpacing: '0.3em' }}>{text.wechatHelp}</p>
                </div>
                <button onClick={handleSignOut} className="sans" style={{ marginTop: '80px', background: 'transparent', border: 'none', color: 'hsl(var(--text-muted))', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.3em' }}>
                    {text.terminate.toUpperCase()}
                </button>
            </div>
        );
    }

    return (
        <div className="royal-onyx-version" style={{ minHeight: '100vh', background: 'hsl(var(--onyx))', paddingBottom: '160px' }}>
            <nav className="container" style={{ padding: '60px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={handleSignOut} style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color = 'white'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
                    <LogOut size={16} /> {text.terminate.toUpperCase()}
                </button>
                <div className="logo-power serif" style={{ fontSize: '1.4rem' }}>
                    STUDENT<span>{text.studentPortal.replace('STUDENT', '')}</span>
                </div>
            </nav>

            <main className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 350px) 1fr', gap: '60px', alignItems: 'start' }}>
                    
                    {/* Sidebar: Profile Summary & WECHAT CONTACT */}
                    <div className="animate-entrance" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div style={{ padding: '50px', borderRadius: '4px', border: 'var(--border-subtle)', background: 'hsla(0,0%,100%,0.01)', textAlign: 'center' }}>
                            <div style={{ position: 'relative', width: '140px', height: '140px', margin: '0 auto 40px' }}>
                                <div style={{ width: '100%', height: '100%', background: 'hsl(var(--onyx))', border: 'var(--border-subtle)', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                    {profile.avatar_url ? (
                                        <img src={profile.avatar_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <User size={50} style={{ opacity: 0.1 }} />
                                    )}
                                </div>
                                <label style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '40px', height: '40px', background: 'hsl(var(--amber))', color: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '2px' }}>
                                    <Camera size={18} />
                                    <input type="file" hidden accept="image/*" onChange={handleAvatarUpload} disabled={saving} />
                                </label>
                            </div>
                            <h3 className="serif-bold" style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{profile.full_name}</h3>
                            <p className="accent" style={{ fontSize: '0.7rem', fontWeight: 800, color: 'hsl(var(--amber))', letterSpacing: '0.3em' }}>
                                {profile.language_to_learn?.toUpperCase() || text.elite} {text.track}
                            </p>
                        </div>

                        <div style={{ padding: '40px', borderRadius: '4px', border: 'var(--border-accent)', background: 'hsla(var(--amber) / 0.01)', textAlign: 'center' }}>
                            <MessageSquare size={30} style={{ margin: '0 auto 25px', color: 'hsl(var(--amber))', opacity: 0.8 }} />
                            <p className="accent" style={{ fontSize: '0.65rem', letterSpacing: '0.3em', marginBottom: '10px', color: 'hsl(var(--text-muted))' }}>{text.priorityAssistance.toUpperCase()}</p>
                            <h4 className="serif-bold" style={{ fontSize: '1.4rem', marginBottom: '20px' }}>{text.connectWechat}</h4>
                            <div style={{ padding: '12px', border: '1px solid hsla(var(--amber) / 0.1)', borderRadius: '2px' }}>
                                <p className="sans" style={{ fontSize: '0.85rem', fontWeight: 800, color: 'hsl(var(--amber))' }}>ID: TeachingENG_Coach</p>
                            </div>
                        </div>

                        <div style={{ padding: '30px', borderRadius: '4px', display: 'flex', gap: '20px', alignItems: 'center', border: 'var(--border-subtle)', background: 'hsla(0,0%,100%,0.01)' }}>
                            <div style={{ width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'var(--border-subtle)', borderRadius: '2px' }}>
                                <Award size={20} style={{ color: 'hsl(var(--amber))', opacity: 0.8 }} />
                            </div>
                            <div>
                                <p className="accent" style={{ fontSize: '0.6rem', color: 'hsl(var(--text-muted))', letterSpacing: '0.2em', marginBottom: '2px' }}>{text.memberClass.toUpperCase()}</p>
                                <p className="serif-bold" style={{ fontSize: '1rem' }}>{text.innerCircle.toUpperCase()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="animate-entrance" style={{ animationDelay: '0.2s' }}>
                        {/* Main Settings */}
                        <div style={{ padding: '80px', borderRadius: '4px', border: 'var(--border-subtle)', background: 'hsla(0,0%,100%,0.01)' }}>
                            <div style={{ marginBottom: '80px' }}>
                                <span className="accent" style={{ fontSize: '0.8rem', letterSpacing: '0.4em', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '20px' }}>{text.configuration.toUpperCase()}</span>
                                <h2 className="serif" style={{ fontSize: '3rem' }}>{text.identityParams.split(' ')[0]} <span className="liquid-gold-text serif-bold">{text.identityParams.split(' ').slice(1).join(' ')}</span></h2>
                                <div className="header-divider" style={{ margin: '30px 0 0 0' }}></div>
                            </div>

                            <form onSubmit={updateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
                                    <div className="form-group">
                                        <label className="accent" style={{ fontSize: '0.65rem', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '12px', letterSpacing: '0.2em' }}>{text.givenName.toUpperCase()}</label>
                                        <input className="input-onyx sans" value={profile.full_name || ''} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} required style={{ background: 'transparent', borderBottom: '1px solid hsla(0,0%,100%,0.1)', padding: '10px 0' }} />
                                    </div>
                                    <div className="form-group">
                                        <label className="accent" style={{ fontSize: '0.65rem', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '12px', letterSpacing: '0.2em' }}>{text.surname.toUpperCase()}</label>
                                        <input className="input-onyx sans" value={profile.surname || ''} onChange={(e) => setProfile({ ...profile, surname: e.target.value })} required style={{ background: 'transparent', borderBottom: '1px solid hsla(0,0%,100%,0.1)', padding: '10px 0' }} />
                                    </div>
                                    <div className="form-group">
                                        <label className="accent" style={{ fontSize: '0.65rem', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '12px', letterSpacing: '0.2em' }}>{text.age.toUpperCase()}</label>
                                        <input type="number" className="input-onyx sans" value={profile.age || ''} onChange={(e) => setProfile({ ...profile, age: e.target.value })} style={{ background: 'transparent', borderBottom: '1px solid hsla(0,0%,100%,0.1)', padding: '10px 0' }} />
                                    </div>
                                    <div className="form-group">
                                        <label className="accent" style={{ fontSize: '0.65rem', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '12px', letterSpacing: '0.2em' }}>{text.location.toUpperCase()}</label>
                                        <input className="input-onyx sans" value={profile.country || ''} onChange={(e) => setProfile({ ...profile, country: e.target.value })} style={{ background: 'transparent', borderBottom: '1px solid hsla(0,0%,100%,0.1)', padding: '10px 0' }} />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
                                    <div className="form-group">
                                        <label className="accent" style={{ fontSize: '0.65rem', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '12px', letterSpacing: '0.2em' }}>{text.targetSystem.toUpperCase()}</label>
                                        <select className="input-onyx sans" value={profile.language_to_learn || ''} onChange={(e) => setProfile({ ...profile, language_to_learn: e.target.value })} required style={{ background: 'transparent', borderBottom: '1px solid hsla(0,0%,100%,0.1)', padding: '10px 0' }}>
                                            <option value="">{text.selectProtocol}</option>
                                            <option value="English">{text.english}</option>
                                            <option value="French">{text.french}</option>
                                            <option value="Both">{text.bilingual}</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="accent" style={{ fontSize: '0.65rem', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '12px', letterSpacing: '0.2em' }}>{text.wechatId.toUpperCase()}</label>
                                        <input className="input-onyx sans" value={profile.wechat_id || ''} onChange={(e) => setProfile({ ...profile, wechat_id: e.target.value })} required style={{ background: 'transparent', borderBottom: '1px solid hsla(0,0%,100%,0.1)', padding: '10px 0' }} />
                                    </div>
                                </div>

                                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                                    <button type="submit" disabled={saving} className="btn-power sans" style={{ minWidth: '320px', justifyContent: 'center', fontWeight: 800 }}>
                                        {saving ? text.synchronizing.toUpperCase() : text.updateSystem.toUpperCase()}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Subject Reflections */}
                        <div style={{ padding: '80px', marginTop: '60px', borderRadius: '4px', border: 'var(--border-subtle)', background: 'hsla(0,0%,100%,0.01)' }}>
                            <div style={{ marginBottom: '80px' }}>
                                <span className="accent" style={{ fontSize: '0.8rem', letterSpacing: '0.4em', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '20px' }}>{text.voiceSubject.toUpperCase()}</span>
                                <h2 className="serif" style={{ fontSize: '3rem' }}>{text.legacyReflections.split(' ')[0]} <span className="liquid-gold-text serif-bold">{text.legacyReflections.split(' ').slice(1).join(' ')}</span></h2>
                                <div className="header-divider" style={{ margin: '30px 0 0 0' }}></div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '60px' }}>
                                <div>
                                    <label className="accent" style={{ fontSize: '0.65rem', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '25px', letterSpacing: '0.2em' }}>{text.satisfactionProtocol.toUpperCase()}</label>
                                    <div style={{ display: 'flex', gap: '20px' }}>
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button 
                                                key={star} 
                                                onClick={() => setTestimonial({ ...testimonial, rating: star })}
                                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: star <= testimonial.rating ? 'hsl(var(--amber))' : 'hsla(0,0%,100%,0.05)', transition: 'transform 0.3s' }}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                <Star size={32} fill={star <= testimonial.rating ? 'hsl(var(--amber))' : 'none'} style={{ opacity: 0.8 }} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="accent" style={{ fontSize: '0.65rem', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '20px', letterSpacing: '0.2em' }}>{text.writtenTestimony.toUpperCase()}</label>
                                    <textarea 
                                        className="input-onyx sans" 
                                        placeholder={text.placeholderReflections}
                                        style={{ minHeight: '180px', lineHeight: 1.8, background: 'transparent', borderBottom: '1px solid hsla(0,0%,100%,0.1)', padding: '10px 0' }}
                                        value={testimonial.content}
                                        onChange={(e) => setTestimonial({ ...testimonial, content: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="accent" style={{ fontSize: '0.65rem', color: 'hsl(var(--text-muted))', display: 'block', marginBottom: '20px', letterSpacing: '0.2em' }}>{text.videoTrans.toUpperCase()}</label>
                                    <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                                        <label className="btn-power-outline sans" style={{ flex: 1, padding: '20px', textAlign: 'center', cursor: 'pointer', borderStyle: 'dashed', background: 'hsla(0,0%,100%,0.01)', fontWeight: 800 }}>
                                            {testimonial.video_url ? text.videoCaptured.toUpperCase() : text.uploadTestimony.toUpperCase()}
                                            <input type="file" hidden accept="video/*" onChange={handleVideoUpload} disabled={saving} />
                                        </label>
                                        {testimonial.video_url && (
                                            <div style={{ color: 'hsl(var(--amber))', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.1em' }} className="accent">
                                                <Zap size={14} style={{ marginRight: '10px' }} />
                                                {text.videoDeployed.toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button onClick={submitTestimonial} disabled={saving} className="btn-power sans" style={{ width: '100%', justifyContent: 'center', padding: '25px', fontWeight: 800, fontSize: '0.9rem' }}>
                                    {saving ? text.transmitting.toUpperCase() : text.finalizeReflections.toUpperCase()}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Profile;
