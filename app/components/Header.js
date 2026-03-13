'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">
          ISAIAH MAOSA
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-blue-600 transition ${
                pathname === item.href ? 'text-blue-600 font-semibold' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://youtube.com/@Isa_Moma-003"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-red-600 transition"
          >
            YouTube
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <nav className="max-w-5xl mx-auto px-6 py-4 flex flex-col gap-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-blue-600 transition ${
                  pathname === item.href ? 'text-blue-600 font-semibold' : ''
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
              className="hover:text-red-600 transition"
              onClick={() => setIsOpen(false)}
            >
              YouTube
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}