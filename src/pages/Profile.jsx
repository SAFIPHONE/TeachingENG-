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
            wechatHelp: "WECHAT ID: Accessgut7878",
            terminate: "TERMINATE SESSION",
            studentPortal: "STUDENT PORTAL",
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
            placeholderReflections: "Describe your transformation within the system...",
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
            wechatHelp: "微信号: Accessgut7878",
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
            placeholderReflections: "描述您在系统中的蜕变...",
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
            const fileName = `profile-${user.id}-${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;
            
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
            await supabase.from('profiles').upsert({ id: user.id, avatar_url: publicUrl, updated_at: new Date() });
            alert(text.avatarInitialized);
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
            alert(text.systemSynchronized);
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
            alert(text.videoTransmissionComplete);
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
                approved: false,
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
            alert(text.reflectionsSubmitted);
            setTestimonial({ rating: 5, content: '', video_url: '' }); // Clear form
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
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '60px', height: '2px', background: 'var(--neon-cyan)', animation: 'pulse 2s infinite' }}></div>
            <p className="font-heading" style={{ marginTop: '40px', fontWeight: 700, letterSpacing: '0.4em', fontSize: '0.8rem', color: 'var(--neon-cyan)' }}>{text.decrypting}</p>
        </div>
    );

    // MODERATION GUARD
    if (profile.approved_status !== 'approved') {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div className="orb-container">
                    <div className="orb orb-1"></div>
                    <div className="orb orb-2"></div>
                </div>
                <div className="glass-panel" style={{ padding: '60px', maxWidth: '600px' }}>
                    <Shield size={50} color="var(--neon-purple)" style={{ marginBottom: '30px', filter: 'drop-shadow(0 0 10px rgba(189,0,255,0.5))' }} />
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
                        {text.accessPending.split(' ')[0]} <span className="gradient-text">{text.accessPending.split(' ').slice(1).join(' ')}</span>
                    </h2>
                    <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '40px' }}>
                        {text.reviewMsg}
                    </p>
                    <div className="glass-panel" style={{ padding: '20px', marginBottom: '40px', display: 'inline-block' }}>
                        <p className="font-heading" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--neon-cyan)', letterSpacing: '0.2em' }}>{text.wechatHelp}</p>
                    </div>
                    <div>
                        <button onClick={handleSignOut} className="font-heading" style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.2em', transition: 'color 0.3s' }} onMouseEnter={e => e.target.style.color='var(--neon-cyan)'} onMouseLeave={e => e.target.style.color='var(--text-muted)'}>
                            {text.terminate.toUpperCase()}
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', paddingBottom: '160px', position: 'relative', overflow: 'hidden' }}>
            <div className="orb-container">
                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
                <div className="orb orb-3"></div>
            </div>

            <nav className="container" style={{ padding: '40px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={handleSignOut} className="font-heading" style={{ background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '15px', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.3s', zIndex: 10 }} onMouseEnter={e => e.target.style.color = 'var(--neon-cyan)'} onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                    <LogOut size={16} /> {text.terminate.toUpperCase()}
                </button>
                <div className="logo-neo" style={{ fontSize: '1.5rem', zIndex: 10 }}>
                    Teaching<span>ENG</span>
                </div>
            </nav>

            <main className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div className="grid-2" style={{ gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '40px', alignItems: 'start' }}>
                    
                    {/* Sidebar */}
                    <div className="scroll-reveal visible" style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
                            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 30px' }}>
                                <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', border: 'var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                    {profile.avatar_url ? (
                                        <img src={profile.avatar_url} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    ) : (
                                        <User size={40} style={{ opacity: 0.5, color: 'var(--neon-cyan)' }} />
                                    )}
                                </div>
                                <label style={{ position: 'absolute', bottom: '0', right: '0', width: '36px', height: '36px', background: 'var(--neon-purple)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', borderRadius: '50%', boxShadow: '0 0 10px rgba(189,0,255,0.5)' }}>
                                    <Camera size={16} />
                                    <input type="file" hidden accept="image/*" onChange={handleAvatarUpload} disabled={saving} />
                                </label>
                            </div>
                            <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>{profile.full_name}</h3>
                            <p className="font-heading" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--neon-cyan)', letterSpacing: '0.2em' }}>
                                {profile.language_to_learn?.toUpperCase() || text.elite} {text.track}
                            </p>
                        </div>

                        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center' }}>
                            <MessageSquare size={30} color="var(--neon-cyan)" style={{ margin: '0 auto 20px', filter: 'drop-shadow(0 0 10px rgba(0,242,254,0.5))' }} />
                            <p className="font-heading" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', marginBottom: '10px', color: 'var(--text-muted)' }}>{text.priorityAssistance.toUpperCase()}</p>
                            <h4 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>{text.connectWechat}</h4>
                            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', marginBottom: '20px', border: 'var(--glass-border)' }}>
                                <p className="font-heading" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--neon-cyan)' }}>ID: Accessgut7878</p>
                            </div>
                            <div style={{ background: 'white', padding: '10px', borderRadius: '12px', display: 'inline-block' }}>
                                <img src="/assets/wechat-qr.jpeg" alt="WeChat QR Code" style={{ width: '150px', height: '150px', display: 'block' }} />
                            </div>
                        </div>
                    </div>

                    <div className="scroll-reveal visible">
                        {/* Main Settings */}
                        <div className="glass-panel" style={{ padding: '60px', marginBottom: '40px' }}>
                            <div style={{ marginBottom: '60px' }}>
                                <span className="font-heading" style={{ fontSize: '0.8rem', letterSpacing: '0.3em', color: 'var(--neon-purple)', display: 'block', marginBottom: '15px' }}>{text.configuration.toUpperCase()}</span>
                                <h2>
                                    {text.identityParams.split(' ')[0]} <span className="gradient-text">{text.identityParams.split(' ').slice(1).join(' ')}</span>
                                </h2>
                            </div>

                            <form onSubmit={updateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                <div className="grid-2" style={{ gap: '30px' }}>
                                    <div>
                                        <label className="input-label">{text.givenName.toUpperCase()}</label>
                                        <input className="input-glass" value={profile.full_name || ''} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} required />
                                    </div>
                                    <div>
                                        <label className="input-label">{text.surname.toUpperCase()}</label>
                                        <input className="input-glass" value={profile.surname || ''} onChange={(e) => setProfile({ ...profile, surname: e.target.value })} required />
                                    </div>
                                    <div>
                                        <label className="input-label">{text.age.toUpperCase()}</label>
                                        <input type="number" className="input-glass" value={profile.age || ''} onChange={(e) => setProfile({ ...profile, age: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="input-label">{text.location.toUpperCase()}</label>
                                        <input className="input-glass" value={profile.country || ''} onChange={(e) => setProfile({ ...profile, country: e.target.value })} />
                                    </div>
                                </div>

                                <div className="grid-2" style={{ gap: '30px' }}>
                                    <div>
                                        <label className="input-label">{text.targetSystem.toUpperCase()}</label>
                                        <select className="input-glass" value={profile.language_to_learn || ''} onChange={(e) => setProfile({ ...profile, language_to_learn: e.target.value })} required>
                                            <option value="">{text.selectProtocol}</option>
                                            <option value="English">{text.english}</option>
                                            <option value="French">{text.french}</option>
                                            <option value="Both">{text.bilingual}</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="input-label">{text.wechatId.toUpperCase()}</label>
                                        <input className="input-glass" value={profile.wechat_id || ''} onChange={(e) => setProfile({ ...profile, wechat_id: e.target.value })} required />
                                    </div>
                                </div>

                                <div style={{ marginTop: '20px', textAlign: 'right' }}>
                                    <button type="submit" disabled={saving} className="btn-neon" style={{ minWidth: '250px' }}>
                                        {saving ? text.synchronizing.toUpperCase() : text.updateSystem.toUpperCase()}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Subject Reflections */}
                        <div className="glass-panel" style={{ padding: '60px' }}>
                            <div style={{ marginBottom: '60px' }}>
                                <span className="font-heading" style={{ fontSize: '0.8rem', letterSpacing: '0.3em', color: 'var(--neon-cyan)', display: 'block', marginBottom: '15px' }}>{text.voiceSubject.toUpperCase()}</span>
                                <h2>
                                    {text.legacyReflections.split(' ')[0]} <span className="gradient-text">{text.legacyReflections.split(' ').slice(1).join(' ')}</span>
                                </h2>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                                <div>
                                    <label className="input-label">{text.satisfactionProtocol.toUpperCase()}</label>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button 
                                                key={star} 
                                                onClick={() => setTestimonial({ ...testimonial, rating: star })}
                                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: star <= testimonial.rating ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.1)', transition: 'transform 0.3s' }}
                                                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                                                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                                            >
                                                <Star size={32} fill={star <= testimonial.rating ? 'var(--neon-cyan)' : 'none'} style={{ filter: star <= testimonial.rating ? 'drop-shadow(0 0 5px rgba(0,242,254,0.5))' : 'none' }} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="input-label">{text.writtenTestimony.toUpperCase()}</label>
                                    <textarea 
                                        className="input-glass" 
                                        placeholder={text.placeholderReflections}
                                        style={{ minHeight: '150px', resize: 'vertical' }}
                                        value={testimonial.content}
                                        onChange={(e) => setTestimonial({ ...testimonial, content: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="input-label">{text.videoTrans.toUpperCase()}</label>
                                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                                        <label className="btn-glass" style={{ flex: 1, padding: '20px', textAlign: 'center', cursor: 'pointer', borderStyle: 'dashed' }}>
                                            {testimonial.video_url ? text.videoCaptured.toUpperCase() : text.uploadTestimony.toUpperCase()}
                                            <input type="file" hidden accept="video/*" onChange={handleVideoUpload} disabled={saving} />
                                        </label>
                                        {testimonial.video_url && (
                                            <div className="font-heading" style={{ color: 'var(--neon-cyan)', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Zap size={16} />
                                                {text.videoDeployed.toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <button onClick={submitTestimonial} disabled={saving} className="btn-neon" style={{ width: '100%', padding: '20px' }}>
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
