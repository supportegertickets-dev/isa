'use client';

import { Github, Youtube, Video, Zap, Music, Code, ArrowUpRight, Mail, Linkedin, Monitor, Server, Smartphone, Users, Award, Calendar, ChevronRight, ExternalLink, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
};

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

const skills = [
  { name: 'Next.js', level: 95 },
  { name: 'React', level: 90 },
  { name: 'Node.js', level: 88 },
  { name: 'MongoDB', level: 85 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'M-Pesa API', level: 82 },
  { name: 'PostgreSQL', level: 78 },
  { name: 'React Native', level: 75 },
];

const services = [
  {
    icon: Monitor,
    title: 'Web Applications',
    desc: 'High-performance, SEO-optimized web apps with Next.js and modern frameworks.',
    color: 'blue',
  },
  {
    icon: Server,
    title: 'Backend & APIs',
    desc: 'Scalable REST APIs, database design, and third-party integrations including M-Pesa.',
    color: 'violet',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    desc: 'Cross-platform mobile applications with React Native and Firebase.',
    color: 'cyan',
  },
];

const experience = [
  {
    role: 'Full-Stack Developer',
    org: 'Freelance & Projects',
    period: '2024 — Present',
    desc: 'Building production web applications including EgerTickets, payment integrations, and student platforms.',
    current: true,
  },
  {
    role: 'Executive Member',
    org: 'Egerton Engineering Student Association (EESA)',
    period: '2025 — Present',
    desc: 'Leading technical initiatives for engineering students, organizing events, and building digital tools.',
    current: true,
  },
  {
    role: 'First Year Representative',
    org: 'Cohort Leadership',
    period: '2025',
    desc: 'Represented 100+ engineering freshmen in departmental decision-making and academic affairs.',
    current: false,
  },
  {
    role: 'Content Creator',
    org: 'YouTube & TikTok',
    period: '2024 — Present',
    desc: 'Educating thousands through tech content on @Isa_Moma-003 and engineering tutorials.',
    current: true,
  },
];

const stats = [
  { value: '10+', label: 'Projects Shipped' },
  { value: '5K+', label: 'Content Reach' },
  { value: '2+', label: 'Years Coding' },
  { value: '3', label: 'Leadership Roles' },
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-slate-900">

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute top-20 -left-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 animate-float" />
        <div className="absolute bottom-0 -right-32 w-80 h-80 bg-violet-100 rounded-full blur-3xl opacity-30 animate-float-delayed" />

        <motion.div
          className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          {/* Status badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold mb-8 uppercase tracking-wider"
            variants={fadeInUp}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
            </span>
            Available for Work
          </motion.div>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-6"
            variants={fadeInUp}
          >
            I build digital
            <br />
            <span className="text-gradient">experiences</span> that
            <br />
            <span className="text-slate-400">matter.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-500 max-w-xl leading-relaxed mb-10"
            variants={fadeInUp}
          >
            Full-Stack Developer. Electrical Engineering student at Egerton University. 
            I turn ideas into polished, production-ready software.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4 mb-16"
            variants={fadeInUp}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-blue-600 transition-all shadow-lg shadow-slate-900/10 text-sm"
            >
              View My Work <ChevronRight size={15} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold border border-slate-200 hover:border-slate-400 transition-all text-sm"
            >
              Get In Touch
            </Link>
          </motion.div>

          {/* Social row */}
          <motion.div
            className="flex items-center gap-3"
            variants={fadeInUp}
          >
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wide mr-1">Follow</span>
            {[
              { href: 'https://github.com', icon: Github, label: 'GitHub' },
              { href: 'https://youtube.com/@Isa_Moma-003', icon: Youtube, label: 'YouTube', color: 'hover:text-red-600 hover:border-red-200 hover:bg-red-50' },
              { href: 'https://tiktok.com/@isa.moma', icon: Video, label: 'TikTok' },
              { href: 'mailto:isamoma003@gmail.com', icon: Mail, label: 'Email', color: 'hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto') ? undefined : '_blank'}
                rel={s.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className={`p-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all ${s.color || ''}`}
                aria-label={s.label}
              >
                <s.icon size={17} />
              </a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STATS BAR ===== */}
      <motion.section
        className="border-y border-slate-100 bg-slate-50/50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-50px' }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <motion.div key={s.label} className="text-center" variants={fadeInUp}>
              <div className="text-3xl md:text-4xl font-black text-slate-900">{s.value}</div>
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== WHAT I DO ===== */}
      <motion.section
        className="max-w-6xl mx-auto px-6 py-24"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.div className="mb-14" variants={fadeInUp}>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Services</p>
          <h2 className="text-3xl md:text-4xl font-black">What I Do</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const colorMap = {
              blue: 'bg-blue-50 text-blue-600 border-blue-100',
              violet: 'bg-violet-50 text-violet-600 border-violet-100',
              cyan: 'bg-cyan-50 text-cyan-600 border-cyan-100',
            };
            return (
              <motion.div
                key={i}
                className="p-7 rounded-2xl border border-slate-100 card-hover bg-white"
                variants={fadeInUp}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${colorMap[s.color]}`}>
                  <s.icon size={22} />
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ===== TECH STACK ===== */}
      <motion.section
        className="bg-slate-50/50 border-y border-slate-100"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div className="mb-14" variants={fadeInUp}>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Tech Stack</p>
            <h2 className="text-3xl md:text-4xl font-black">Tools I Work With</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
            {skills.map((s) => (
              <motion.div key={s.name} className="group" variants={fadeInUp}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700">{s.name}</span>
                  <span className="text-xs text-slate-400 font-medium">{s.level}%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-violet-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== FEATURED PROJECT ===== */}
      <motion.section
        className="max-w-6xl mx-auto px-6 py-24"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.div className="mb-10" variants={fadeInUp}>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Featured Work</p>
          <h2 className="text-3xl md:text-4xl font-black">Flagship Project</h2>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-slate-200 bg-white overflow-hidden card-hover glow-blue"
          variants={fadeInUp}
        >
          {/* Gradient header */}
          <div className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-700 p-8 md:p-10 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="relative">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                  <Sparkles size={11} /> Featured
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-400/20 text-green-100 text-xs font-bold rounded-full backdrop-blur-sm border border-green-400/30">
                  <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse inline-block" />
                  Production
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black">EgerTickets</h3>
              <p className="text-blue-100 font-medium mt-1">Egerton University Event Ticketing Platform</p>
            </div>
          </div>

          {/* Content body */}
          <div className="p-8 md:p-10">
            <p className="text-slate-600 leading-relaxed mb-7 max-w-2xl">
              Egerton University&apos;s official event discovery and booking platform. Students browse concerts, workshops, conferences, 
              and sports — with secure checkout, an AI assistant chatbot, real-time dashboards, and a full organizer portal.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {['Next.js', 'Tailwind CSS', 'Vercel', 'AI Chatbot', 'Authentication'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://egertickets.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all text-sm shadow-md"
              >
                Visit Live Site <ExternalLink size={14} />
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold border border-slate-200 hover:border-slate-400 transition-all text-sm"
              >
                All Projects <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* ===== EXPERIENCE TIMELINE ===== */}
      <motion.section
        className="bg-slate-50/50 border-y border-slate-100"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div className="mb-14" variants={fadeInUp}>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Background</p>
            <h2 className="text-3xl md:text-4xl font-black">Experience &amp; Leadership</h2>
          </motion.div>

          <div className="space-y-0 max-w-2xl">
            {experience.map((e, i) => (
              <motion.div
                key={i}
                className="relative pl-8 pb-10 last:pb-0 border-l-2 border-slate-200 last:border-transparent"
                variants={fadeInUp}
              >
                {/* Timeline dot */}
                <div className={`absolute -left-[9px] top-0.5 w-4 h-4 rounded-full border-2 ${
                  e.current
                    ? 'bg-blue-600 border-blue-600 shadow-md shadow-blue-200'
                    : 'bg-white border-slate-300'
                }`} />

                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h3 className="text-base font-bold text-slate-900">{e.role}</h3>
                  {e.current && (
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase">Current</span>
                  )}
                </div>
                <p className="text-sm font-medium text-blue-600 mb-1">{e.org}</p>
                <p className="text-xs text-slate-400 font-medium mb-2">{e.period}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{e.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ===== ABOUT / IDENTITIES ===== */}
      <motion.section
        className="max-w-6xl mx-auto px-6 py-24"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <motion.div className="mb-14" variants={fadeInUp}>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Beyond Code</p>
          <h2 className="text-3xl md:text-4xl font-black">Who I Am</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Code,
              title: 'The Developer',
              desc: 'Specializing in Next.js, Node.js, and MongoDB. Building payment integrations and platforms used by real users across Kenya.',
              gradient: 'from-blue-500 to-cyan-500',
              bg: 'bg-blue-50',
            },
            {
              icon: Music,
              title: 'The Performer',
              desc: 'Active member of Egerton Salsa Lite dance crew. The discipline of choreography translates directly into clean, structured code.',
              gradient: 'from-violet-500 to-pink-500',
              bg: 'bg-violet-50',
            },
            {
              icon: Video,
              title: 'The Creator',
              desc: 'Educating thousands through tech content on @Isa_Moma-003 and @isa_moma_004. Engineering education meets creative storytelling.',
              gradient: 'from-red-500 to-orange-500',
              bg: 'bg-red-50',
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="relative p-7 rounded-2xl border border-slate-100 bg-white card-hover group overflow-hidden"
              variants={fadeInUp}
            >
              <div className={`absolute inset-0 ${card.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-5 text-white`}>
                  <card.icon size={20} />
                </div>
                <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ===== CTA SECTION ===== */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 md:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Let&apos;s Build Something Great
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
              Got a project idea, need a developer, or want to collaborate? I&apos;m always open to new opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-blue-500 transition-all text-sm shadow-lg shadow-blue-600/20"
              >
                <Mail size={15} /> Get In Touch
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white transition-all text-sm"
              >
                <Github size={15} /> GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
