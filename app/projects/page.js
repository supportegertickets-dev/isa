import projectsData from '../projects.json';

export const metadata = { title: "Projects - Isaiah Maosa" };

export default function Projects() {
  return (
    <div className="max-w-4xl mx-auto p-12">
      <h1 className="text-4xl font-black mb-8">My Projects</h1>
      <div className="grid gap-6">
        {projectsData.map((proj, i) => (
          <div key={i} className="p-6 border border-slate-200 rounded-2xl hover:border-blue-600 transition">
            <h2 className="text-2xl font-bold">{proj.title}</h2>
            <p className="text-slate-600 mt-2">{proj.desc}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {proj.tech.map((tech, j) => (
                <span key={j} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded">
                  {tech}
                </span>
              ))}
            </div>
            {proj.link !== "#" && (
              <a href={proj.link} className="inline-block mt-4 text-blue-600 hover:underline">
                View Project →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
