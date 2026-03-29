import projectsData from '../projects.json';
import { ExternalLink, Zap, ArrowUpRight } from 'lucide-react';

export const metadata = { title: "Projects - Isaiah Maosa" };

export default function Projects() {
  const featured = projectsData.filter((p) => p.featured);
  const others = projectsData.filter((p) => !p.featured);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-2">My Projects</h1>
      <p className="text-slate-500 mb-12 text-lg">Real-world software I&apos;ve built and shipped.</p>

      {/* Featured Projects */}
      {featured.map((proj, i) => (
        <div
          key={i}
          className="mb-12 p-8 rounded-3xl border-2 border-blue-600 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden"
        >
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 opacity-30 pointer-events-none" />

          <div className="flex flex-wrap items-center gap-3 mb-5 relative">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
              <Zap size={11} /> Featured
            </span>
            {proj.status === 'Live' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
                Live
              </span>
            )}
          </div>

          <h2 className="text-4xl font-black mb-1 relative">{proj.title}</h2>
          {proj.subtitle && (
            <p className="text-blue-600 font-semibold text-base mb-4">{proj.subtitle}</p>
          )}
          <p className="text-slate-600 leading-relaxed mb-7 max-w-2xl text-base relative">
            {proj.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-8 relative">
            {proj.tech.map((tech, j) => (
              <span
                key={j}
                className="px-3 py-1 bg-white border border-blue-200 text-blue-700 text-xs font-semibold rounded-full shadow-sm"
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
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-7 py-3 rounded-full font-semibold hover:bg-blue-600 transition text-sm shadow-lg shadow-blue-100 relative"
            >
              Visit Live Site <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      ))}

      {/* Other Projects */}
      {others.length > 0 && (
        <>
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">
            More Projects
          </h2>
          <div className="grid gap-5">
            {others.map((proj, i) => (
              <div
                key={i}
                className="p-6 border border-slate-200 rounded-2xl hover:border-blue-600 hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold group-hover:text-blue-600 transition">
                      {proj.title}
                    </h3>
                    {proj.subtitle && (
                      <p className="text-slate-400 text-sm font-medium mb-1">{proj.subtitle}</p>
                    )}
                    <p className="text-slate-600 mt-2 text-sm leading-relaxed">{proj.desc}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {proj.tech.map((tech, j) => (
                        <span
                          key={j}
                          className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  {proj.link && proj.link !== '#' && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 p-2 border border-slate-200 rounded-xl hover:border-blue-600 hover:text-blue-600 transition"
                      aria-label={`Visit ${proj.title}`}
                    >
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
