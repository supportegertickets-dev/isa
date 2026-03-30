'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/portfolio')
      .then(r => r.json())
      .then(setData);
  }, []);

  const footer = data?.footer || {};
  const social = data?.social || [];
  const contact = data?.contact || {};

  const brandName = footer.brandName || 'Isaiah Maosa';
  const tagline = footer.tagline || '';
  const quickLinks = footer.quickLinks || [];
  const copyright = footer.copyright || `© ${new Date().getFullYear()} ${brandName}`;
  const bottomNote = footer.bottomNote || '';

  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white text-xs font-black">
                {brandName.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <span className="font-bold text-lg tracking-tight">{brandName}</span>
            </div>
            {tagline && (
              <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{tagline}</p>
            )}
          </div>

          {/* Quick Links */}
          {quickLinks.length > 0 && (
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Links</p>
              <nav className="flex flex-col gap-2.5">
                {quickLinks.map((link, i) => (
                  link.external ? (
                    <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-blue-600 transition font-medium">
                      {link.label}
                    </a>
                  ) : (
                    <Link key={i} href={link.url} className="text-sm text-slate-600 hover:text-blue-600 transition font-medium">
                      {link.label}
                    </Link>
                  )
                ))}
              </nav>
            </div>
          )}

          {/* Connect */}
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Connect</p>
            <nav className="flex flex-col gap-2.5">
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="text-sm text-slate-600 hover:text-blue-600 transition font-medium">{contact.email}</a>
              )}
              {social.map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 hover:text-blue-600 transition font-medium">
                  {s.platform} ↗
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">{copyright}</p>
          {bottomNote && <p className="text-xs text-slate-400">{bottomNote}</p>}
        </div>
      </div>
    </footer>
  );
}
