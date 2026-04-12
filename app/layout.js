import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

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
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider>
        <AuthProvider>
        <Header />

        <main className="pt-16">{children}</main>

        <Footer />
        </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
