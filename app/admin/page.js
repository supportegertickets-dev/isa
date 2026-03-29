'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { LogOut, Save, Plus, Trash2, Check, AlertCircle, GripVertical } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';
import ColorPicker from '../components/ColorPicker';
import IconPicker from '../components/IconPicker';
import GradientPicker from '../components/GradientPicker';

const tabs = [
  { id: 'hero', label: 'Hero' },
  { id: 'stats', label: 'Stats' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'about', label: 'About' },
  { id: 'social', label: 'Social' },
  { id: 'contact', label: 'Contact' },
  { id: 'featured', label: 'Featured' },
  { id: 'projects', label: 'Projects' },
];

function Field({ label, value, onChange, type = 'text', placeholder = '', className = '' }) {
  if (type === 'textarea') {
    return (
      <div className={className}>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-none"
        />
      </div>
    );
  }
  if (type === 'checkbox') {
    return (
      <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="text-sm font-medium text-slate-700">{label}</span>
      </label>
    );
  }
  if (type === 'number') {
    return (
      <div className={className}>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
        <input
          type="number"
          value={value ?? 0}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          min="0"
          max="100"
          className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
        />
      </div>
    );
  }
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
      />
    </div>
  );
}

export default function Admin() {
  const { isAuthenticated, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('hero');
  const [portfolio, setPortfolio] = useState(null);
  const [projects, setProjects] = useState(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) router.push('/login');
  }, [authLoading, isAuthenticated, router]);

  useEffect(() => {
    if (isAuthenticated) {
      Promise.all([
        fetch('/api/portfolio').then(r => r.json()),
        fetch('/api/projects').then(r => r.json()),
      ]).then(([p, pr]) => {
        setPortfolio(p);
        setProjects(pr);
      });
    }
  }, [isAuthenticated]);

  const showToast = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  const updateHero = (field, value) => {
    setPortfolio(prev => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
  };

  const updateContact = (field, value) => {
    setPortfolio(prev => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
  };

  const updateFeatured = (field, value) => {
    setPortfolio(prev => ({ ...prev, featuredProject: { ...prev.featuredProject, [field]: value } }));
  };

  const updateListItem = (section, index, field, value) => {
    setPortfolio(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }));
  };

  const addListItem = (section, template) => {
    setPortfolio(prev => ({ ...prev, [section]: [...prev[section], template] }));
  };

  const removeListItem = (section, index) => {
    setPortfolio(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
  };

  const updateProject = (index, field, value) => {
    setProjects(prev => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  };

  const addProject = () => {
    setProjects(prev => [...prev, {
      title: 'New Project', subtitle: '', desc: '', tech: [],
      link: '#', image: '', featured: false, status: '', category: '',
    }]);
  };

  const removeProject = (index) => {
    setProjects(prev => prev.filter((_, i) => i !== index));
  };

  const savePortfolio = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/portfolio', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(portfolio),
      });
      showToast(res.ok ? 'Portfolio saved!' : 'Failed to save', res.ok ? 'success' : 'error');
    } catch {
      showToast('Failed to save', 'error');
    }
    setSaving(false);
  };

  const saveProjects = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projects),
      });
      showToast(res.ok ? 'Projects saved!' : 'Failed to save', res.ok ? 'success' : 'error');
    } catch {
      showToast('Failed to save', 'error');
    }
    setSaving(false);
  };

  if (authLoading || !portfolio || !projects) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400 text-sm">
          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          Loading admin panel...
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );

  const handleSave = activeTab === 'projects' ? saveProjects : savePortfolio;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-20 right-6 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-in ${
          toast.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {toast.type === 'success' ? <Check size={15} /> : <AlertCircle size={15} />}
          {toast.text}
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black">Admin Dashboard</h1>
            <p className="text-xs text-slate-400">Edit your portfolio content</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
            >
              {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Save size={14} />} {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => { logout(); router.push('/'); }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto pb-0 -mb-px scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* HERO */}
        {activeTab === 'hero' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
            <h2 className="text-lg font-bold">Hero Section</h2>
            <Field label="Status Badge" value={portfolio.hero.badge} onChange={v => updateHero('badge', v)} placeholder="Available for Work" />
            <div className="grid sm:grid-cols-3 gap-4">
              <Field label="Title Line 1" value={portfolio.hero.titleLine1} onChange={v => updateHero('titleLine1', v)} />
              <Field label="Title Highlight" value={portfolio.hero.titleHighlight} onChange={v => updateHero('titleHighlight', v)} />
              <Field label="Title End" value={portfolio.hero.titleEnd} onChange={v => updateHero('titleEnd', v)} />
            </div>
            <Field label="Subtitle" type="textarea" value={portfolio.hero.subtitle} onChange={v => updateHero('subtitle', v)} />
            <ImageUpload label="Profile Image" value={portfolio.hero.profileImage} onChange={v => updateHero('profileImage', v)} />
          </div>
        )}

        {/* STATS */}
        {activeTab === 'stats' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Stats</h2>
              <button onClick={() => addListItem('stats', { value: '0', label: 'New Stat' })} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">
                <Plus size={13} /> Add
              </button>
            </div>
            {portfolio.stats.map((stat, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-end gap-4">
                <Field label="Value" value={stat.value} onChange={v => updateListItem('stats', i, 'value', v)} className="flex-1" />
                <Field label="Label" value={stat.label} onChange={v => updateListItem('stats', i, 'label', v)} className="flex-1" />
                <button onClick={() => removeListItem('stats', i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition mb-0.5">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* SERVICES */}
        {activeTab === 'services' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Services</h2>
              <button onClick={() => addListItem('services', { title: 'New Service', desc: '', icon: 'Code', color: 'blue' })} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">
                <Plus size={13} /> Add
              </button>
            </div>
            {portfolio.services.map((service, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-600">{service.title || `Service ${i + 1}`}</span>
                  <button onClick={() => removeListItem('services', i)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Title" value={service.title} onChange={v => updateListItem('services', i, 'title', v)} />
                  <div className="grid grid-cols-2 gap-3">
                    <IconPicker label="Icon" value={service.icon} onChange={v => updateListItem('services', i, 'icon', v)} />
                    <ColorPicker label="Color" value={service.color} onChange={v => updateListItem('services', i, 'color', v)} />
                  </div>
                </div>
                <Field label="Description" type="textarea" value={service.desc} onChange={v => updateListItem('services', i, 'desc', v)} />
              </div>
            ))}
          </div>
        )}

        {/* SKILLS */}
        {activeTab === 'skills' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Skills</h2>
              <button onClick={() => addListItem('skills', { name: 'New Skill', level: 50 })} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">
                <Plus size={13} /> Add
              </button>
            </div>
            {portfolio.skills.map((skill, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 flex items-end gap-4">
                <Field label="Skill Name" value={skill.name} onChange={v => updateListItem('skills', i, 'name', v)} className="flex-1" />
                <Field label="Level (%)" type="number" value={skill.level} onChange={v => updateListItem('skills', i, 'level', v)} className="w-28" />
                <button onClick={() => removeListItem('skills', i)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition mb-0.5">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* EXPERIENCE */}
        {activeTab === 'experience' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Experience</h2>
              <button onClick={() => addListItem('experience', { role: 'New Role', org: '', period: '', desc: '', current: false })} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">
                <Plus size={13} /> Add
              </button>
            </div>
            {portfolio.experience.map((exp, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-600">{exp.role || `Entry ${i + 1}`}</span>
                  <button onClick={() => removeListItem('experience', i)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Role" value={exp.role} onChange={v => updateListItem('experience', i, 'role', v)} />
                  <Field label="Organization" value={exp.org} onChange={v => updateListItem('experience', i, 'org', v)} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4 items-end">
                  <Field label="Period" value={exp.period} onChange={v => updateListItem('experience', i, 'period', v)} placeholder="2024 — Present" />
                  <Field label="Current Role" type="checkbox" value={exp.current} onChange={v => updateListItem('experience', i, 'current', v)} />
                </div>
                <Field label="Description" type="textarea" value={exp.desc} onChange={v => updateListItem('experience', i, 'desc', v)} />
              </div>
            ))}
          </div>
        )}

        {/* ABOUT */}
        {activeTab === 'about' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">About Cards</h2>
              <button onClick={() => addListItem('about', { title: 'New Card', desc: '', icon: 'Code', gradient: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50' })} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">
                <Plus size={13} /> Add
              </button>
            </div>
            {portfolio.about.map((card, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-600">{card.title || `Card ${i + 1}`}</span>
                  <button onClick={() => removeListItem('about', i)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={14} />
                  </button>
                </div>
                <Field label="Title" value={card.title} onChange={v => updateListItem('about', i, 'title', v)} />
                <Field label="Description" type="textarea" value={card.desc} onChange={v => updateListItem('about', i, 'desc', v)} />
                <div className="grid sm:grid-cols-2 gap-3">
                  <IconPicker label="Icon" value={card.icon} onChange={v => updateListItem('about', i, 'icon', v)} />
                  <GradientPicker
                    label="Gradient & Background"
                    value={card.gradient}
                    onChange={v => updateListItem('about', i, 'gradient', v)}
                    bgValue={card.bg}
                    onBgChange={v => updateListItem('about', i, 'bg', v)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SOCIAL */}
        {activeTab === 'social' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Social Links</h2>
              <button onClick={() => addListItem('social', { platform: 'New Platform', icon: 'Globe', handle: '', url: '' })} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">
                <Plus size={13} /> Add
              </button>
            </div>
            {(portfolio.social || []).map((link, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-600">{link.platform || `Link ${i + 1}`}</span>
                  <button onClick={() => removeListItem('social', i)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Platform Name" value={link.platform} onChange={v => updateListItem('social', i, 'platform', v)} placeholder="GitHub" />
                  <IconPicker label="Icon" value={link.icon} onChange={v => updateListItem('social', i, 'icon', v)} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Handle / Display" value={link.handle} onChange={v => updateListItem('social', i, 'handle', v)} placeholder="@username" />
                  <Field label="URL" value={link.url} onChange={v => updateListItem('social', i, 'url', v)} placeholder="https://..." />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CONTACT */}
        {activeTab === 'contact' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
            <h2 className="text-lg font-bold">Contact Information</h2>
            <Field label="Email" value={portfolio.contact?.email} onChange={v => updateContact('email', v)} placeholder="your@email.com" />
            <Field label="Phone" value={portfolio.contact?.phone} onChange={v => updateContact('phone', v)} placeholder="+254 xxx xxx xxx" />
            <Field label="Location" value={portfolio.contact?.location} onChange={v => updateContact('location', v)} placeholder="City, Country" />
          </div>
        )}

        {/* FEATURED PROJECT */}
        {activeTab === 'featured' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
            <h2 className="text-lg font-bold">Featured Project (Homepage)</h2>
            <p className="text-xs text-slate-400">This is the spotlight project shown on your homepage hero area.</p>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Title" value={portfolio.featuredProject?.title} onChange={v => updateFeatured('title', v)} placeholder="Project Name" />
              <Field label="Subtitle" value={portfolio.featuredProject?.subtitle} onChange={v => updateFeatured('subtitle', v)} placeholder="Short tagline" />
            </div>
            <Field label="Description" type="textarea" value={portfolio.featuredProject?.description} onChange={v => updateFeatured('description', v)} />
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Live Link" value={portfolio.featuredProject?.link} onChange={v => updateFeatured('link', v)} placeholder="https://..." />
              <Field label="Status Badge" value={portfolio.featuredProject?.status} onChange={v => updateFeatured('status', v)} placeholder="Production" />
            </div>
            <Field label="Technologies (comma-separated)" value={Array.isArray(portfolio.featuredProject?.tech) ? portfolio.featuredProject.tech.join(', ') : ''} onChange={v => updateFeatured('tech', v.split(',').map(t => t.trim()).filter(Boolean))} />
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === 'projects' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Projects</h2>
              <button onClick={addProject} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-100 transition">
                <Plus size={13} /> Add
              </button>
            </div>
            {projects.map((proj, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-600">{proj.title || `Project ${i + 1}`}</span>
                    {proj.featured && <span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full uppercase">Featured</span>}
                    {proj.status === 'Live' && <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded-full uppercase">Live</span>}
                  </div>
                  <button onClick={() => removeProject(i)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={14} />
                  </button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Title" value={proj.title} onChange={v => updateProject(i, 'title', v)} />
                  <Field label="Subtitle" value={proj.subtitle} onChange={v => updateProject(i, 'subtitle', v)} />
                </div>
                <Field label="Description" type="textarea" value={proj.desc} onChange={v => updateProject(i, 'desc', v)} />
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Link" value={proj.link} onChange={v => updateProject(i, 'link', v)} placeholder="https://..." />
                  <Field label="Technologies (comma-separated)" value={Array.isArray(proj.tech) ? proj.tech.join(', ') : ''} onChange={v => updateProject(i, 'tech', v.split(',').map(t => t.trim()).filter(Boolean))} />
                </div>
                <div className="grid sm:grid-cols-3 gap-4 items-end">
                  <Field label="Category" value={proj.category} onChange={v => updateProject(i, 'category', v)} placeholder="Platform" />
                  <Field label="Status" value={proj.status} onChange={v => updateProject(i, 'status', v)} placeholder="Live" />
                  <Field label="Featured" type="checkbox" value={proj.featured} onChange={v => updateProject(i, 'featured', v)} />
                </div>
                <ImageUpload label="Project Image" value={proj.image} onChange={v => updateProject(i, 'image', v)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
