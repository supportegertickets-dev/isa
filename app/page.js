import Link from 'next/link';
import { Github, Youtube, Video, Zap, Music, Code } from 'lucide-react';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tight">ISAIAH MAOSA</span>
          <div className="flex gap-6 text-sm font-medium">
            <a href="#about" className="hover:text-blue-600 transition">About</a>
            <a href="#projects" className="hover:text-blue-600 transition">Projects</a>
            <Link href="https://youtube.com/@isamoma003" className="hover:text-red-600 transition">YouTube</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20">
        {/* Hero Section */}
        <section className="mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-6 uppercase tracking-wider">
            <Zap size={14} /> Electrical Engineering @ Egerton
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Building systems with <span className="text-blue-600">code</span> and <span className="text-slate-400 underline decoration-2 underline-offset-8">rhythm.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-10">
            Full-Stack Developer, EESA Executive, and Salsa Dancer. I bridge the gap between technical precision and creative storytelling.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-600 transition shadow-lg shadow-blue-200">
              View My Work
            </a>
            <div className="flex items-center gap-3">
              <a href="https://github.com" className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 transition"><Github size={20}/></a>
              <a href="https://youtube.com/@isamoma003" className="p-3 border border-slate-200 rounded-full hover:bg-slate-50 transition text-red-600"><Youtube size={20}/></a>
            </div>
          </div>
        </section>

        {/* About / Stats Grid */}
        <section id="about" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <Code className="text-blue-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">The Developer</h3>
            <p className="text-sm text-slate-600">Specializing in Next.js, Node.js, and MongoDB. Integrating M-Pesa APIs for Kenyan solutions.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <Music className="text-purple-600 mb-4" />
            <h3 className="font-bold text-lg mb-2">The Performer</h3>
            <p className="text-sm text-slate-600">Active member of Egerton Salsa Lite. Discipline and coordination translated to clean code.</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
            <Video className="text-red-500 mb-4" />
            <h3 className="font-bold text-lg mb-2">The Creator</h3>
            <p className="text-sm text-slate-600">Educating via @isamoma003 & @isa_moma_004. Reaching thousands through engineering & tech content.</p>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="mb-24 py-12 border-t border-slate-100">
          <h2 className="text-3xl font-bold mb-10">Leadership & Impact</h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-50 pb-6">
              <div>
                <h4 className="font-bold text-xl">Executive Member</h4>
                <p className="text-slate-500 italic">Egerton Engineering Student Association (EESA)</p>
              </div>
              <span className="text-blue-600 font-medium">Present</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-50 pb-6">
              <div>
                <h4 className="font-bold text-xl">First Year Representative</h4>
                <p className="text-slate-500 italic">Cohort Leadership</p>
              </div>
              <span className="text-blue-600 font-medium">2026</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-slate-50 py-12 border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-slate-500 font-medium">Built with Next.js & Deployed on Vercel</p>
          <p className="text-slate-400 text-sm mt-2">© 2026 Isaiah Maosa</p>
        </div>
      </footer>
    </div>
  );
}