import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

// Modular Components
import AdminSidebar from '../components/admin/AdminSidebar';
import DashboardHeader from '../components/admin/DashboardHeader';
import SiteControl from '../components/admin/SiteControl';
import Registry from '../components/admin/Registry';
import InquiryStream from '../components/admin/InquiryStream';
import ReflectionsManager from '../components/admin/ReflectionsManager';
import SubjectBiometrics from '../components/admin/SubjectBiometrics';

const AdminPanel = ({ content, refreshData, language }) => {
  const [activeTab, setActiveTab] = useState('site');
  const [profiles, setProfiles] = useState([]);
  const [leads, setLeads] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({ ...content });
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const t = {
    EN: {
        powerCenter: "ADMIN PORTAL",
        rootProtocol: "SYSTEM INTELLIGENCE",
        navSystem: "SITE CONTENT",
        navRegistry: "USER REGISTRY",
        navInquiry: "CLIENT INQUIRIES",
        navReflections: "TESTIMONIALS",
        exitCore: "EXIT ADMIN",
        operations: "MANAGEMENT CENTER",
        commandCenter: "System Overview",
        syncing: "SAVING...",
        initDeploy: "SAVE CHANGES",
        coachIdentity: "Profile Branding",
        biometrics: "COACH BIOGRAPHY",
        globalBio: "PROFESSIONAL BIO",
        rateProtocol: "SERVICE RATES",
        status: "AVAILABILITY",
        busy: "BOOKED",
        active: "AVAILABLE",
        subjectReflections: "Client Feedback",
        noReflections: "NO TESTIMONIALS FOUND",
        subject: "USER",
        protocol: "PROTOCOL",
        commands: "ACTIONS",
        pending: "PENDING",
        data: "DETAILS",
        enable: "APPROVE",
        block: "SUSPEND",
        respond: "CONTACT",
        delete: "REMOVE",
        noInquiries: "NO ACTIVE INQUIRIES",
        videoAttached: "MEDIA ATTACHED",
        viewMedia: "REVIEW MEDIA",
        revoke: "REVOKE",
        approve: "PUBLISH",
        biometricsDetail: "User Details",
        commProtocol: "CONNECTION LINKS",
        wechatId: "WECHAT ID",
        geoOrigin: "LOCATION",
        chronoAge: "JOIN DATE",
        connectEmail: "EMAIL ADDR",
        alreadyEnabled: "APPROVED",
        enableAccess: "APPROVE USER",
        blockSubject: "SUSPEND USER",
        terminateInquiry: "REMOVE INQUIRY RECORD?",
        coachSynced: "PROFILE CHANGES SYNCED.",
        syncingCore: "SAVING CHANGES...",
        systemUpdated: "CHANGES SAVED.",
        syncError: "SYSTEM ERROR."
    },
    ZH: {
        powerCenter: "管理后台",
        rootProtocol: "系统智能管理",
        navSystem: "页面内容",
        navRegistry: "学员库",
        navInquiry: "咨询管理",
        navReflections: "学员评价",
        exitCore: "登出系统",
        operations: "运营中心",
        commandCenter: "系统概览",
        syncing: "保存中...",
        initDeploy: "保存更改",
        coachIdentity: "教练品牌信息",
        biometrics: "专业资历",
        globalBio: "职业简介",
        rateProtocol: "服务资费",
        status: "课时状态",
        busy: "约满",
        active: "可约",
        subjectReflections: "学员反馈",
        noReflections: "暂无评价",
        subject: "用户",
        protocol: "课程",
        commands: "操作",
        pending: "待定",
        data: "详情",
        enable: "通过",
        block: "禁用",
        respond: "联络",
        delete: "移除",
        noInquiries: "暂无有效咨询",
        videoAttached: "已附媒体",
        viewMedia: "查看媒体",
        revoke: "驳回",
        approve: "发布",
        biometricsDetail: "用户详情",
        commProtocol: "联络方式",
        wechatId: "微信号",
        geoOrigin: "所在地",
        chronoAge: "加入日期",
        connectEmail: "邮箱地址",
        alreadyEnabled: "已通过",
        enableAccess: "准许访问",
        blockSubject: "禁用用户",
        terminateInquiry: "移除该咨询记录？",
        coachSynced: "信息同步成功。",
        syncingCore: "同步中...",
        systemUpdated: "系统已更新。",
        syncError: "系统错误。"
    }
  };

  const text = t[language] || t['EN'];

  useEffect(() => {
    setFormData({ ...content });
  }, [content]);

  useEffect(() => {
    if (activeTab === 'users') fetchProfiles();
    else if (activeTab === 'leads') fetchLeads();
    else if (activeTab === 'testimonials') fetchTestimonials();
  }, [activeTab]);

  const fetchProfiles = async () => {
    const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
    setProfiles(data || []);
  };

  const handleUpdateUserStatus = async (id, status) => {
    const { error } = await supabase.from('profiles').update({ approved_status: status }).eq('id', id);
    if (!error) {
      fetchProfiles();
      if (selectedUser?.id === id) setSelectedUser(prev => ({ ...prev, approved_status: status }));
    }
  };

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setLeads(data || []);
    } catch (err) {
      console.error('Leads fetch error:', err);
      setSaveStatus('LEADS_SYNC_ERROR');
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm(text.terminateInquiry)) return;
    const { error } = await supabase.from('leads').delete().eq('id', id);
    if (!error) fetchLeads();
  };

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase.from('testimonials').select('*, profiles(full_name, surname)').order('created_at', { ascending: false });
      if (error) return;
      setTestimonials(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveTestimonial = async (id, status) => {
    const { error } = await supabase.from('testimonials').update({ approved: status }).eq('id', id);
    if (!error) fetchTestimonials();
  };

  const handleDeleteTestimonial = async (id) => {
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) fetchTestimonials();
  };

  const handleCoachAvatarUpload = async (e) => {
    try {
      setSaving(true);
      const file = e.target.files[0];
      if (!file) return;
      const fileName = `coach-${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage.from('avatars').upload(fileName, file);
      
      if (uploadError) {
          alert(`SYSTEM ERROR: ${uploadError.message}`);
          return;
      }

      const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(fileName);
      setFormData(prev => ({ ...prev, avatar_url: publicUrl }));
      alert(text.coachSynced);
    } catch (error) { 
        console.error(error); 
    } finally { 
        setSaving(false); 
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveStatus(text.syncingCore);

      const payload = {
        full_name: formData.full_name || 'TeachingENG Coach',
        bio: formData.bio,
        philosophy: formData.philosophy,
        rates: formData.rates,
        is_booked: formData.isBooked,
        avatar_url: formData.avatar_url,
        updated_at: new Date()
      };

      const { data: existing } = await supabase.from('coach_profile').select('id').limit(1).single();
      
      let error;
      if (existing?.id) {
          const { error: updateError } = await supabase.from('coach_profile').update(payload).eq('id', existing.id);
          error = updateError;
      } else {
          const { error: insertError } = await supabase.from('coach_profile').insert([payload]);
          error = insertError;
      }

      if (error) {
          setSaveStatus('SYNC ERROR.');
          return;
      }

      setSaveStatus(text.systemUpdated);
      await refreshData();
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (e) { 
        setSaveStatus('SYNC ERROR.'); 
    } finally { 
        setSaving(false); 
    }
  };

  return (
    <div className="royal-onyx-version" style={{ display: 'flex', minHeight: '100vh', background: 'hsl(var(--onyx))' }}>
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} text={text} />

      <main style={{ flex: 1, padding: '60px 80px', position: 'relative' }}>
          <DashboardHeader 
            title={activeTab === 'site' ? text.commandCenter : text[`nav${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`]} 
            operations={text.operations} 
            saveStatus={saveStatus} 
            onSave={handleSave} 
            saving={saving}
            text={text}
          />

          {activeTab === 'site' && (
            <SiteControl 
              formData={formData} 
              setFormData={setFormData} 
              handleCoachAvatarUpload={handleCoachAvatarUpload} 
              text={text} 
            />
          )}
          
          {activeTab === 'users' && (
            <Registry 
              profiles={profiles} 
              handleUpdateUserStatus={handleUpdateUserStatus} 
              setSelectedUser={setSelectedUser} 
              text={text} 
            />
          )}

          {activeTab === 'leads' && (
            <InquiryStream 
              leads={leads} 
              handleDeleteLead={handleDeleteLead} 
              text={text} 
            />
          )}

          {activeTab === 'testimonials' && (
            <ReflectionsManager 
              testimonials={testimonials} 
              handleApproveTestimonial={handleApproveTestimonial} 
              handleDeleteTestimonial={handleDeleteTestimonial} 
              text={text} 
            />
          )}
       </main>

       <SubjectBiometrics 
          selectedUser={selectedUser} 
          setSelectedUser={setSelectedUser} 
          handleUpdateUserStatus={handleUpdateUserStatus} 
          text={text} 
       />
    </div>
  );
};

export default AdminPanel;
