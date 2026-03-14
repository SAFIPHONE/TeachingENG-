import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminPanel from './pages/AdminPanel';
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import { supabase } from './supabase';

function App() {
    const [language, setLanguage] = useState('EN'); // 'EN' or 'ZH'
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [content, setContent] = useState({
        full_name: "TEACHINGENG COACH",
        bio: "",
        experience: "",
        rates: "",
        isBooked: false,
        testimonials: []
    });

    useEffect(() => {
        // Check current session
        const initAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(session?.user ?? null);
            } catch (err) {
                console.error('Auth initialization error:', err);
            }
        };

        initAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        fetchData();

        return () => {
            if (subscription) subscription.unsubscribe();
        };
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch profile
            const { data: profileData, error: profileError } = await supabase
                .from('coach_profile')
                .select('*')
                .single();

            if (profileError && profileError.code !== 'PGRST116') {
                console.warn('Profile fetch error:', profileError.message);
            }

            // Fetch testimonials
            const { data: testimonialsData, error: testimonialsError } = await supabase
                .from('testimonials')
                .select('*')
                .eq('approved', true) // Only approved ones
                .order('created_at', { ascending: false });

            if (testimonialsError && testimonialsError.code !== 'PGRST116') {
                console.warn('Testimonials fetch error:', testimonialsError.message);
            }

            if (profileData) {
                setContent({
                    full_name: profileData.full_name || "COACH",
                    bio: profileData.bio || "",
                    experience: profileData.experience || "",
                    philosophy: profileData.philosophy || "",
                    rates: profileData.rates || "",
                    isBooked: !!profileData.is_booked,
                    testimonials: testimonialsData || []
                });
            }
        } catch (err) {
            console.error('Unexpected error fetching data:', err);
            setError('System connection error. Please refresh.');
        } finally {
            setLoading(false);
        }
    };

    const toggleLanguage = () => {
        setLanguage(prev => (prev === 'EN' ? 'ZH' : 'EN'));
    };

    if (loading) {
        return (
            <div className="loading-screen">
                <div className="loader"></div>
                <style>{`
          .loading-screen {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #050505;
          }
          .loader {
            width: 40px;
            height: 40px;
            border: 2px solid rgba(255,191,0,0.1);
            border-top: 2px solid #ffbf00;
            border-radius: 50%;
            animation: spin 1s cubic-bezier(0.19, 1, 0.22, 1) infinite;
          }
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-screen" style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#050505', color: '#ff4444', textAlign: 'center' }}>
                <h2 style={{ marginBottom: '20px' }}>SYSTEM OFFLINE</h2>
                <p style={{ opacity: 0.6 }}>{error}</p>
                <button onClick={() => window.location.reload()} style={{ marginTop: '30px', padding: '10px 20px', background: '#ffbf00', color: '#050505', border: 'none', cursor: 'pointer', fontWeight: 900 }}>REBOOT SYSTEM</button>
            </div>
        );
    }

    const AdminGuard = ({ children }) => {
        const adminEmails = ['admin@teachingeng.com', 'teachingeng.com@gmail.com'];
        const isAdmin = user?.email && adminEmails.includes(user.email.toLowerCase());
        if (!user || !isAdmin) {
            return <Navigate to="/" replace />;
        }
        return children;
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage language={language} toggleLanguage={toggleLanguage} content={content} user={user} />} />
                <Route path="/auth" element={<Auth language={language} toggleLanguage={toggleLanguage} />} />
                <Route path="/profile" element={<Profile language={language} toggleLanguage={toggleLanguage} />} />
                <Route 
                    path="/admin-panel" 
                    element={
                        <AdminGuard>
                            <AdminPanel content={content} setContent={setContent} refreshData={fetchData} user={user} language={language} toggleLanguage={toggleLanguage} />
                        </AdminGuard>
                    } 
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
