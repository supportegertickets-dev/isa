import './globals.css';
import Header from './components/Header';

export const metadata = {
  title: 'Isaiah Maosa - Engineering & Code',
  description: 'Portfolio of Isaiah Maosa - Full-stack developer, electrical engineering student, and community leader.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 selection:bg-blue-100">
        <Header />

        <main className="pt-20">{children}</main>

        <footer className="bg-slate-50 py-12 border-t border-slate-100 mt-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-slate-500 font-medium">Built with Next.js &amp; Tailwind CSS</p>
            <p className="text-slate-400 text-sm mt-2">© 2026 Isaiah Maosa</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
