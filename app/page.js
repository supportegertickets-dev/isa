'use client';

import { Github, Youtube, Video, Zap, Music, Code, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      <main className="max-w-5xl mx-auto px-6 pt-16 pb-20">
        {/* Hero Section */}
        <motion.section
          className="mb-24"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-6 uppercase tracking-wider"
            variants={fadeInUp}
          >
            <Zap size={14} /> Electrical Engineering @ Egerton
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6"
            variants={fadeInUp}
          >
            Building systems with <span className="text-blue-600">code</span> and <span className="text-slate-400 underline decoration-2 underline-offset-8">rhythm.</span>
          </motion.h1>
          <motion.p
            className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-10"
            variants={fadeInUp}
          >
            Full-Stack Developer, EESA Executive, and Salsa Dancer. I bridge the gap between technical precision and creative storytelling.
          </motion.p>
          <motion.div
            className="flex flex-wrap gap-4"
            variants={fadeInUp}
          >
            <a href="/projects" className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition shadow-lg shadow-blue-200">
              View My Work
            </a>
            <div className="flex items-center gap-3">
              <a href="https://github.com" className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 transition">
                <Github size={20} />
              </a>
              <a href="https://youtube.com/@Isa_Moma-003" className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 transition text-red-600">
                <Youtube size={20} />
              </a>
              <a href="https://tiktok.com/@isa.moma" className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 transition">
                <Video size={20} />
              </a>
            </div>
          </motion.div>
        </motion.section>

        {/* About / Stats Grid */}
        <motion.section
          id="about"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.div
            className="p-6 bg-slate-50 rounded-3xl border border-slate-100"
            variants={fadeInUp}
          >
            <Code className="text-blue-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">The Developer</h3>
            <p className="text-sm text-slate-600">Specializing in Next.js, Node.js, and MongoDB. Integrating M-Pesa APIs for Kenyan solutions.</p>
          </motion.div>
          <motion.div
            className="p-6 bg-slate-50 rounded-3xl border border-slate-100"
            variants={fadeInUp}
          >
            <Music className="text-purple-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">The Performer</h3>
            <p className="text-sm text-slate-600">Active member of Egerton Salsa Lite. Discipline and coordination translated to clean code.</p>
          </motion.div>
          <motion.div
            className="p-6 bg-slate-50 rounded-3xl border border-slate-100"
            variants={fadeInUp}
          >
            <Video className="text-red-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">The Creator</h3>
            <p className="text-sm text-slate-600">Educating via @isamoma003 & @isa_moma_004. Reaching thousands through engineering & tech content.</p>
          </motion.div>
        </motion.section>

        {/* Featured Project */}
        <motion.section
          className="mb-24 py-12 border-t border-slate-100"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.p
            className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4"
            variants={fadeInUp}
          >
            Featured Project
          </motion.p>
          <motion.div
            className="rounded-3xl border-2 border-blue-600 bg-gradient-to-br from-blue-50 to-white p-8 relative overflow-hidden"
            variants={fadeInUp}
          >
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-25 pointer-events-none" />
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                <Zap size={11} /> Live
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                Production
              </span>
            </div>
            <h3 className="text-3xl font-black mb-1 relative">EgerTickets</h3>
            <p className="text-blue-600 font-semibold mb-3">Egerton University Event Ticketing Platform</p>
            <p className="text-slate-600 leading-relaxed max-w-2xl mb-6 text-sm">
              Egerton University&apos;s official event discovery and ticketing platform. Browse concerts, workshops, conferences, and sports events — with secure checkout, an AI assistant, and a full organizer portal.
            </p>
            <div className="flex flex-wrap gap-2 mb-7">
              {['Next.js', 'Tailwind CSS', 'Vercel', 'AI Chatbot'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white border border-blue-200 text-blue-700 text-xs font-semibold rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://egertickets.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-full font-semibold hover:bg-blue-600 transition text-sm shadow-md shadow-blue-100"
              >
                Visit Site <ArrowUpRight size={14} />
              </a>
              <a
                href="/projects"
                className="inline-flex items-center gap-2 px-7 py-3 rounded-full font-semibold border border-slate-200 hover:border-blue-600 hover:text-blue-600 transition text-sm"
              >
                All Projects →
              </a>
            </div>
          </motion.div>
        </motion.section>

        {/* Leadership Section */}
        <motion.section
          className="mb-24 py-12 border-t border-slate-100"
          initial="initial"
          animate="animate"
          variants={stagger}
        >
          <motion.h2
            className="text-3xl font-bold mb-10"
            variants={fadeInUp}
          >
            Leadership & Impact
          </motion.h2>
          <div className="space-y-8">
            <motion.div
              className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-50 pb-6"
              variants={fadeInUp}
            >
              <div>
                <h4 className="font-bold text-xl">Executive Member</h4>
                <p className="text-slate-500 italic">Egerton Engineering Student Association (EESA)</p>
              </div>
              <span className="text-blue-600 font-medium">Present</span>
            </motion.div>
            <motion.div
              className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-50 pb-6"
              variants={fadeInUp}
            >
              <div>
                <h4 className="font-bold text-xl">First Year Representative</h4>
                <p className="text-slate-500 italic">Cohort Leadership</p>
              </div>
              <span className="text-blue-600 font-medium">2026</span>
            </motion.div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
