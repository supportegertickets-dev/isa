'use client';

import { useState, useEffect } from 'react';
import { ExternalLink, Zap, ArrowUpRight, Sparkles, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4 }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.08 } }
};

export default function Projects() {
  const [projectsData, setProjectsData] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(setProjectsData);
  }, []);

  if (!projectsData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  const featured = projectsData.filter((p) => p.featured);
  const others = projectsData.filter((p) => !p.featured);

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
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Portfolio</p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">My Projects</h1>
          <p className="text-lg text-slate-500 max-w-lg">
            Production software I&apos;ve designed, built, and shipped. From university platforms to fintech integrations.
          </p>
        </motion.div>

        {/* Featured Projects */}
        {featured.map((proj, i) => (
          <motion.div
            key={i}
            className="mb-16 rounded-3xl border border-slate-200 bg-white overflow-hidden card-hover glow-blue"
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
                  {proj.status === 'Live' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-400/20 text-green-100 text-xs font-bold rounded-full backdrop-blur-sm border border-green-400/30">
                      <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse inline-block" />
                      Live
                    </span>
                  )}
                  {proj.category && (
                    <span className="px-3 py-1 bg-white/10 text-white/80 text-xs font-medium rounded-full">
                      {proj.category}
                    </span>
                  )}
                </div>
                <h2 className="text-3xl md:text-4xl font-black">{proj.title}</h2>
                {proj.subtitle && (
                  <p className="text-blue-100 font-medium mt-1">{proj.subtitle}</p>
                )}
              </div>
            </div>

            {/* Content body */}
            <div className="p-8 md:p-10">
              {proj.image && (
                <div className="rounded-xl overflow-hidden border border-slate-100 mb-7">
                  <img src={proj.image} alt={proj.title} className="w-full h-56 md:h-72 object-cover" />
                </div>
              )}
              <p className="text-slate-600 leading-relaxed mb-7 max-w-2xl">
                {proj.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {proj.tech.map((tech, j) => (
                  <span
                    key={j}
                    className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {proj.link && proj.link !== '#' && (
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all text-sm shadow-md"
                >
                  Visit Live Site <ExternalLink size={14} />
                </a>
              )}
            </div>
          </motion.div>
        ))}

        {/* Other Projects */}
        {others.length > 0 && (
          <>
            <motion.h2
              className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8 mt-4"
              variants={fadeInUp}
            >
              More Projects
            </motion.h2>
            <div className="grid md:grid-cols-2 gap-5">
              {others.map((proj, i) => (
                <motion.div
                  key={i}
                  className="p-7 rounded-2xl border border-slate-100 bg-white card-hover group"
                  variants={fadeInUp}
                >
                  {proj.image && (
                    <div className="rounded-xl overflow-hidden border border-slate-100 mb-5 -mx-2 -mt-2">
                      <img src={proj.image} alt={proj.title} className="w-full h-40 object-cover" />
                    </div>
                  )}
                  <div className="flex items-center gap-3 mb-4">
                    {proj.category && (
                      <span className="px-2.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        {proj.category}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-blue-600 transition mb-1">
                    {proj.title}
                  </h3>
                  {proj.subtitle && (
                    <p className="text-slate-400 text-sm font-medium mb-3">{proj.subtitle}</p>
                  )}
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{proj.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {proj.tech.map((tech, j) => (
                      <span
                        key={j}
                        className="px-2.5 py-1 bg-slate-50 text-slate-600 text-xs font-medium rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {proj.link && proj.link !== '#' && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition"
                    >
                      View Project <ArrowUpRight size={13} />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </>
        )}

        {/* CTA */}
        <motion.div
          className="mt-20 rounded-2xl bg-slate-50 border border-slate-100 p-8 md:p-10 text-center"
          variants={fadeInUp}
        >
          <h3 className="text-xl font-bold mb-2">Interested in working together?</h3>
          <p className="text-slate-500 text-sm mb-6">I&apos;m always open to new projects and collaborations.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-full font-semibold hover:bg-blue-600 transition-all text-sm shadow-md"
          >
            Get In Touch <ChevronRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
