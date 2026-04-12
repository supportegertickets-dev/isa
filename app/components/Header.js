'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Settings, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
  const { theme, toggleTheme, mounted } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-700/60 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-black">
            IM
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            Isaiah Maosa
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 rounded-full transition-all ${
                pathname === item.href
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <span className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-2" />
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          {isAuthenticated ? (
            <Link
              href="/admin"
              className="px-4 py-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all inline-flex items-center gap-1.5"
            >
              <Settings size={13} /> Admin
            </Link>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-full opacity-0 hover:opacity-100 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 transition-all duration-300"
            >
              Login
            </Link>
          )}
          <a
            href="https://youtube.com/@Isa_Moma-003"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-all"
          >
            YouTube
          </a>
          <a
            href="/contact"
            className="ml-2 inline-flex items-center gap-1.5 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-all shadow-md shadow-blue-200/50 dark:shadow-blue-900/30"
          >
            Hire Me <ArrowUpRight size={13} />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          <button
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 shadow-lg">
          <nav className="max-w-6xl mx-auto px-6 py-6 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 rounded-xl transition-all text-base font-medium ${
                  pathname === item.href
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://youtube.com/@Isa_Moma-003"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600 transition text-base font-medium"
              onClick={() => setIsOpen(false)}
            >
              YouTube
            </a>
            <Link
              href={isAuthenticated ? '/admin' : '/login'}
              className={`px-4 py-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-600 transition text-base font-medium ${
                isAuthenticated ? 'text-slate-700 dark:text-slate-300' : 'text-slate-300 dark:text-slate-600 hover:text-blue-600'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {isAuthenticated ? 'Admin' : '...'}
            </Link>
            <a
              href="/contact"
              className="mt-2 flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
              onClick={() => setIsOpen(false)}
            >
              Hire Me <ArrowUpRight size={14} />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}