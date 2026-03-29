import './globals.css';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';

export const metadata = {
  title: 'Isaiah Maosa — Full-Stack Developer & Engineer',
  description: 'Portfolio of Isaiah Maosa — Full-stack developer, electrical engineering student at Egerton University, EESA executive, and content creator building production software in Kenya.',
  keywords: ['Isaiah Maosa', 'Full-Stack Developer', 'Kenya', 'Egerton University', 'Next.js', 'React', 'EgerTickets'],
  openGraph: {
    title: 'Isaiah Maosa — Full-Stack Developer & Engineer',
    description: 'I build digital experiences that matter. Full-stack developer, electrical engineering student, and community leader.',
    url: 'https://isamoma.vercel.app',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <AuthProvider>
        <Header />

        <main className="pt-16">{children}</main>

        <footer className="border-t border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-3 gap-10 mb-12">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-black">
                    IM
                  </div>
                  <span className="font-bold text-lg tracking-tight">Isaiah Maosa</span>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                  Full-Stack Developer &amp; Electrical Engineering student building production software from Egerton University, Kenya.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Links</p>
                <nav className="flex flex-col gap-2.5">
                  <a href="/" className="text-sm text-slate-600 hover:text-blue-600 transition font-medium">Home</a>
                  <a href="/projects" className="text-sm text-slate-600 hover:text-blue-600 transition font-medium">Projects</a>
                  <a href="/contact" className="text-sm text-slate-600 hover:text-blue-600 transition font-medium">Contact</a>
                  <a href="https://egertickets.vercel.app" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-blue-600 transition font-medium">EgerTickets ↗</a>
                </nav>
              </div>

              {/* Socials */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Connect</p>
                <nav className="flex flex-col gap-2.5">
                  <a href="mailto:isamoma003@gmail.com" className="text-sm text-slate-600 hover:text-blue-600 transition font-medium">isamoma003@gmail.com</a>
                  <a href="https://youtube.com/@Isa_Moma-003" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-red-600 transition font-medium">YouTube ↗</a>
                  <a href="https://tiktok.com/@isa.moma" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-slate-900 transition font-medium">TikTok ↗</a>
                  <a href="https://instagram.com/isa_moma_" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-pink-600 transition font-medium">Instagram ↗</a>
                </nav>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400">© 2026 Isaiah Maosa. All rights reserved.</p>
              <p className="text-xs text-slate-400">Built with Next.js &amp; Tailwind CSS</p>
            </div>
          </div>
        </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
