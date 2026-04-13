'use client';

import { useState, useEffect, useRef } from 'react';
import { Github, Youtube, Video, Zap, Music, Code, ArrowUpRight, Mail, Linkedin, Monitor, Server, Smartphone, Users, Award, Calendar, ChevronRight, ExternalLink, Sparkles, Globe, Database, Shield, Cpu, Wifi, Cloud, Terminal, Layout, Layers, Box, Palette, Pen, Camera, Headphones, Gamepad2, Rocket, Star, Heart, Briefcase, GraduationCap, BookOpen, FileCode, GitBranch, Settings, Wrench, TrendingUp, BarChart3, PieChart, Activity, Target, Flame, Lightbulb, MessageSquare, Share2, Link, Eye, Search } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring, useScroll, AnimatePresence } from 'framer-motion';
import LinkComponent from 'next/link';
import Image from 'next/image';

const iconMap = {
  Monitor, Server, Smartphone, Code, Music, Video, Users, Award, Calendar, Zap, Mail, Globe,
  Database, Shield, Cpu, Wifi, Cloud, Terminal, Layout, Layers, Box, Palette, Pen, Camera,
  Headphones, Gamepad2, Rocket, Star, Heart, Briefcase, GraduationCap, BookOpen, FileCode,
  GitBranch, Settings, Wrench, TrendingUp, BarChart3, PieChart, Activity, Target, Flame,
  Lightbulb, MessageSquare, Share2, Link, Eye, Search,
};

// Easing curve: expressive cubic
const ease = [0.22, 1, 0.36, 1];

const fadeInUp = {
  initial: { opacity: 0, y: 50, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.65, ease }
};

const fadeInLeft = {
  initial: { opacity: 0, x: -50, filter: 'blur(8px)' },
  animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
  transition: { duration: 0.65, ease }
};

const fadeIn = {
  initial: { opacity: 0, filter: 'blur(6px)' },
  animate: { opacity: 1, filter: 'blur(0px)' },
  transition: { duration: 0.6, ease }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    }
  }
};

// ─── StatCounter ───────────────────────────────────────────────────────────
function StatCounter({ value, label }) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const raw = String(value ?? '');
  const numeric = parseInt(raw);
  const suffix = isNaN(numeric) ? '' : raw.replace(/^\D*\d+/, '');
  const prefix = isNaN(numeric) ? '' : raw.replace(/\d+.*$/, '');

  useEffect(() => {
    if (!triggered || isNaN(numeric)) return;
    const steps = 50;
    const duration = 1600;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.round(numeric * eased));
      if (step >= steps) { setCount(numeric); clearInterval(timer); }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [triggered, numeric]);

  return (
    <motion.div
      className="text-center"
      variants={fadeInUp}
      onViewportEnter={() => setTriggered(true)}
    >
      <div className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tabular-nums">
        {isNaN(numeric) ? value : `${prefix}${count}${suffix}`}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider mt-1">{label}</div>
    </motion.div>
  );
}

// ─── PhotoCard ─────────────────────────────────────────────────────────────
function PhotoCard({ hero }) {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 30 });

  const onMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
      style={{ rotateX, rotateY, perspective: 900 }}
      className="relative select-none"
    >
      {/* Pulsing glow */}
      <motion.div
        className="absolute -inset-6 rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400 opacity-15 blur-2xl"
        animate={{ scale: [1, 1.14, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Photo */}
      <div className="relative p-[3px] rounded-full bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-400 shadow-2xl shadow-blue-500/30 dark:shadow-blue-500/15 z-10">
        {hero.profileImage ? (
          <Image
            src={hero.profileImage}
            alt={hero.titleLine1 || 'Profile photo'}
            width={320}
            height={320}
            className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full object-cover object-top"
            priority
          />
        ) : (
          <div className="w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center">
            <span className="text-white text-5xl font-black select-none">
              {(hero.titleLine1 || 'P').split(' ').map(w => w[0]).join('').slice(0, 2)}
            </span>
          </div>
        )}
      </div>
      {/* Chip: Open to work */}
      <motion.div
        className="absolute -bottom-3 -right-3 z-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
        </span>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">Open to work</span>
      </motion.div>
      {/* Chip: Full-Stack Dev */}
      <motion.div
        className="absolute -top-1 -left-8 z-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <span className="text-base">⚡</span>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">Full-Stack Dev</span>
      </motion.div>
      {/* Chip: Projects */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 -right-10 z-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2 shadow-xl flex items-center gap-2"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <span className="text-base">🚀</span>
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">5+ Projects</span>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  const [data, setData] = useState(null);
  const { scrollYProgress } = useScroll();
  const scrollScaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-10 h-10 border-2 border-slate-200 dark:border-slate-700 border-t-blue-600 rounded-full animate-spin" />
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-widest">Loading</p>
        </motion.div>
      </div>
    );
  }

  const { hero = {}, stats = {}, services = [], skills = [], experience = [], about = {}, social = [], contact = {}, featuredProject = {} } = data;

  const socialIconMap = { Github, Youtube, Video, Mail, Linkedin, Instagram: Globe, Globe };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-violet-500 to-cyan-400 z-[200] origin-left"
        style={{ scaleX: scrollScaleX }}
      />

      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-grid opacity-50" />
        <motion.div
          className="absolute top-20 -left-32 w-96 h-96 bg-blue-100 dark:bg-blue-900/30 rounded-full blur-3xl opacity-40"
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 -right-32 w-80 h-80 bg-violet-100 dark:bg-violet-900/30 rounded-full blur-3xl opacity-30"
          animate={{ x: [0, -25, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-100 dark:bg-cyan-900/20 rounded-full blur-3xl opacity-20 pointer-events-none"
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.35, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <motion.div
          className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 md:pt-32 md:pb-28"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-16 lg:gap-24">

            {/* ── Left: text content ── */}
            <div className="flex-1 min-w-0">
              {/* Status badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-800 text-blue-700 dark:text-blue-400 text-xs font-bold mb-8 uppercase tracking-wider"
                variants={fadeInUp}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600" />
                </span>
                {hero.badge}
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6"
                variants={fadeInUp}
              >
                {hero.titleLine1}
                <br />
                <span className="text-gradient">{hero.titleHighlight}</span> that
                <br />
                <span className="text-slate-400 dark:text-slate-500">{hero.titleEnd}</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed mb-10"
                variants={fadeInUp}
              >
                {hero.subtitle}
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-4 mb-16"
                variants={fadeInUp}
              >
                <LinkComponent
                  href="/projects"
                  className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3.5 rounded-full font-semibold hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all shadow-lg shadow-slate-900/10 dark:shadow-none text-sm"
                >
                  View My Work <ChevronRight size={15} />
                </LinkComponent>
                <LinkComponent
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all text-sm"
                >
                  Get In Touch
                </LinkComponent>
              </motion.div>

              {/* Social row */}
              <motion.div
                className="flex items-center gap-3"
                variants={fadeInUp}
              >
                <span className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase tracking-wide mr-1">Follow</span>
                {social.map((s, idx) => {
                  const SIcon = socialIconMap[s.icon] || iconMap[s.icon] || Globe;
                  return (
                    <motion.a
                      key={s.platform}
                      href={s.url}
                      target={s.url?.startsWith('mailto') ? undefined : '_blank'}
                      rel={s.url?.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      className="p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      aria-label={s.platform}
                      whileHover={{ y: -3, scale: 1.08 }}
                      whileTap={{ scale: 0.93 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + idx * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <SIcon size={17} />
                    </motion.a>
                  );
                })}
              </motion.div>
            </div>

            {/* ── Right: profile photo ── */}
            <motion.div
              className="flex-shrink-0 flex justify-center md:justify-end mb-16 md:mb-0"
              variants={{ initial: { opacity: 0, x: 60, filter: 'blur(12px)' }, animate: { opacity: 1, x: 0, filter: 'blur(0px)' } }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <PhotoCard hero={hero} />
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ===== STATS BAR ===== */}
      <motion.section
        className="border-y border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-50px' }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {Array.isArray(stats) && stats.map((s) => (
            <StatCounter key={s.label} value={s.value} label={s.label} />
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
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Expertise</p>
          <h2 className="text-3xl md:text-4xl font-black">What I Do</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const IconComponent = iconMap[s.icon] || Code;
            const colorMap = {
              blue: 'bg-blue-50 text-blue-600 border-blue-100',
              violet: 'bg-violet-50 text-violet-600 border-violet-100',
              cyan: 'bg-cyan-50 text-cyan-600 border-cyan-100',
              green: 'bg-green-50 text-green-600 border-green-100',
              red: 'bg-red-50 text-red-600 border-red-100',
              orange: 'bg-orange-50 text-orange-600 border-orange-100',
              pink: 'bg-pink-50 text-pink-600 border-pink-100',
              amber: 'bg-amber-50 text-amber-600 border-amber-100',
              teal: 'bg-teal-50 text-teal-600 border-teal-100',
              indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
              emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
              rose: 'bg-rose-50 text-rose-600 border-rose-100',
              sky: 'bg-sky-50 text-sky-600 border-sky-100',
              lime: 'bg-lime-50 text-lime-600 border-lime-100',
              fuchsia: 'bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100',
              yellow: 'bg-yellow-50 text-yellow-600 border-yellow-100',
              slate: 'bg-slate-100 text-slate-600 border-slate-200',
              purple: 'bg-purple-50 text-purple-600 border-purple-100',
            };
            return (
              <motion.div
                key={i}
                className="p-7 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-default"
                variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: '0 24px 60px -10px rgba(37,99,235,0.16)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${colorMap[s.color] || colorMap.slate}`}
                  whileHover={{ scale: 1.2, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                >
                  <IconComponent size={22} />
                </motion.div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{s.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ===== TECH STACK ===== */}
      <motion.section
        className="bg-slate-50/50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div className="mb-14" variants={fadeInUp}>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Tech Stack</p>
            <h2 className="text-3xl md:text-4xl font-black">Tools I Work With</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-5 max-w-2xl">
            {skills.map((s) => (
              <motion.div key={s.name} className="group" variants={fadeInUp}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{s.name}</span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">{s.level}%</span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 to-violet-500 rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      initial={{ x: '-100%' }}
                      whileInView={{ x: '200%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 1.5, ease: 'easeInOut' }}
                    />
                  </motion.div>
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
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Featured Work</p>
          <h2 className="text-3xl md:text-4xl font-black">Flagship Project</h2>
        </motion.div>

        <motion.div
          className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden card-hover glow-blue"
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
                {featuredProject.status && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-400/20 text-green-100 text-xs font-bold rounded-full backdrop-blur-sm border border-green-400/30">
                    <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse inline-block" />
                    {featuredProject.status}
                  </span>
                )}
              </div>
              <h3 className="text-3xl md:text-4xl font-black">{featuredProject.title}</h3>
              <p className="text-blue-100 font-medium mt-1">{featuredProject.subtitle}</p>
            </div>
          </div>

          {/* Content body */}
          <div className="p-8 md:p-10">
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-7 max-w-2xl">
              {featuredProject.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {(featuredProject.tech || []).map((tech) => (
                <span key={tech} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              {featuredProject.link && (
                <a
                  href={featuredProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-7 py-3 rounded-full font-semibold hover:bg-blue-600 dark:hover:bg-blue-400 dark:hover:text-white transition-all text-sm shadow-md"
                >
                  Visit Live Site <ExternalLink size={14} />
                </a>
              )}
              <LinkComponent
                href="/projects"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold border border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500 transition-all text-sm"
              >
                All Projects <ChevronRight size={14} />
              </LinkComponent>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* ===== EXPERIENCE TIMELINE ===== */}
      <motion.section
        className="bg-slate-50/50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: '-80px' }}
        variants={stagger}
      >
        <div className="max-w-6xl mx-auto px-6 py-24">
          <motion.div className="mb-14" variants={fadeInUp}>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Background</p>
            <h2 className="text-3xl md:text-4xl font-black">Experience &amp; Leadership</h2>
          </motion.div>

          <div className="space-y-0 max-w-2xl">
            {experience.map((e, i) => (
              <motion.div
                key={i}
                className="relative pl-8 pb-10 last:pb-0 border-l-2 border-slate-200 dark:border-slate-700 last:border-transparent"
                initial={{ opacity: 0, x: -30, filter: 'blur(6px)' }}
                whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Timeline dot */}
                <div className={`absolute -left-[9px] top-0.5 w-4 h-4 rounded-full border-2 ${
                  e.current
                    ? 'bg-blue-600 border-blue-600 shadow-md shadow-blue-200 dark:shadow-blue-900'
                    : 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600'
                }`} />

                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">{e.role}</h3>
                  {e.current && (
                    <span className="px-2 py-0.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-[10px] font-bold rounded-full uppercase">Current</span>
                  )}
                </div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">{e.org}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-2">{e.period}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{e.desc}</p>
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
          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-3">Beyond Code</p>
          <h2 className="text-3xl md:text-4xl font-black">Who I Am</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {about.map((card, i) => {
            const IconComponent = iconMap[card.icon] || Code;
            return (
              <motion.div
                key={i}
                className="relative p-7 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 cursor-default group overflow-hidden"
                variants={fadeInUp}
                whileHover={{ y: -8, boxShadow: '0 24px 60px -10px rgba(37,99,235,0.16)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className={`absolute inset-0 ${card.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center mb-5 text-white`}>
                    <IconComponent size={20} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ===== CTA SECTION ===== */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <motion.div
          className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 md:p-16 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/15 rounded-full blur-3xl"
            animate={{ x: [0, 40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-48 h-48 bg-violet-600/15 rounded-full blur-3xl"
            animate={{ x: [0, -30, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Let&apos;s Build Something Great
            </h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
              Got a project idea, need a developer, or want to collaborate? I&apos;m always open to new opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <LinkComponent
                href="/contact"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-blue-500 transition-all text-sm shadow-lg shadow-blue-600/20"
              >
                <Mail size={15} /> Get In Touch
              </LinkComponent>
              {social.find(s => s.icon === 'Github') && (
                <a
                  href={social.find(s => s.icon === 'Github').url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-semibold border border-slate-600 text-slate-300 hover:border-slate-400 hover:text-white transition-all text-sm"
                >
                  <Github size={15} /> GitHub
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
