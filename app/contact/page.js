'use client';

import { Mail, Phone, MapPin, Instagram, Youtube, Github, Video, Send, ArrowUpRight, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};

const socialIconMap = { Github, Youtube, Video, Mail, Instagram, Globe };

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [data, setData] = useState(null);
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  const { contact = {}, social = [] } = data;

  const contactInfo = [
    { icon: Mail, label: 'Email', value: contact.email, href: contact.email ? `mailto:${contact.email}` : null },
    { icon: Phone, label: 'Phone', value: contact.phone, href: contact.phone ? `tel:${contact.phone.replace(/\s/g, '')}` : null },
    { icon: MapPin, label: 'Location', value: contact.location, href: null },
  ].filter(item => item.value);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setToast({ text: 'Please fill in all fields', type: 'error' });
      setTimeout(() => setToast(null), 4000);
      return;
    }
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await res.json();
      if (res.ok) {
        setToast({ text: 'Message sent successfully!', type: 'success' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setToast({ text: result.error || 'Failed to send message', type: 'error' });
      }
    } catch {
      setToast({ text: 'Something went wrong. Please try again.', type: 'error' });
    }
    setSending(false);
    setTimeout(() => setToast(null), 5000);
  };

  return (
    <div className="min-h-screen bg-white">
      <motion.div
        className="max-w-6xl mx-auto px-6 py-16 md:py-24"
        initial="initial"
        animate="animate"
        variants={stagger}
      >
        {/* Header */}
        <motion.div className="mb-16" variants={fadeInUp}>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Contact</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Let&apos;s Work Together
          </h1>
          <p className="text-lg text-slate-500 max-w-lg">
            Whether you have a project idea, collaboration proposal, or just want to say hi — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div className="lg:col-span-3" variants={fadeInUp}>
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-blue-600 transition-all text-sm shadow-md disabled:opacity-50"
              >
                {sending ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={14} /> Send Message
                  </>
                )}
              </button>

              {toast && (
                <div className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                  toast.type === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {toast.type === 'success' ? '✓' : '!'} {toast.text}
                </div>
              )}
            </form>
          </motion.div>

          {/* Sidebar Info */}
          <motion.div className="lg:col-span-2 space-y-8" variants={fadeInUp}>
            {/* Contact Details */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Reach Me At</h3>
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                      <item.icon size={17} className="text-slate-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-semibold text-slate-900 hover:text-blue-600 transition">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-5">Socials</h3>
              <div className="space-y-2">
                {social.filter(s => !s.url?.startsWith('mailto')).map((s) => {
                  const SIcon = socialIconMap[s.icon] || Globe;
                  return (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-100 transition-all group hover:bg-slate-50 hover:border-slate-200"
                    >
                      <SIcon size={18} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold">{s.platform}</p>
                        <p className="text-xs text-slate-400">{s.handle}</p>
                      </div>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
