'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

const ICON_NAMES = [
  'Monitor', 'Server', 'Smartphone', 'Code', 'Music', 'Video',
  'Users', 'Award', 'Calendar', 'Zap', 'Mail', 'Globe',
  'Database', 'Shield', 'Cpu', 'Wifi', 'Cloud', 'Terminal',
  'Layout', 'Layers', 'Box', 'Palette', 'Pen', 'Camera',
  'Headphones', 'Gamepad2', 'Rocket', 'Star', 'Heart', 'Briefcase',
  'GraduationCap', 'BookOpen', 'FileCode', 'GitBranch', 'Settings', 'Wrench',
  'TrendingUp', 'BarChart3', 'PieChart', 'Activity', 'Target', 'Flame',
  'Lightbulb', 'MessageSquare', 'Share2', 'Link', 'Eye', 'Search',
];

export default function IconPicker({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const CurrentIcon = LucideIcons[value] || LucideIcons.Code;
  const filtered = search
    ? ICON_NAMES.filter(n => n.toLowerCase().includes(search.toLowerCase()))
    : ICON_NAMES;

  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-slate-200 text-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white"
      >
        <span className="w-5 h-5 shrink-0 flex items-center justify-center text-slate-600">
          <CurrentIcon size={16} />
        </span>
        <span className="flex-1 text-left text-slate-700 font-medium">{value || 'Select icon'}</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setOpen(false); setSearch(''); }} />
          <div className="absolute z-50 mt-1.5 w-full bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
            <div className="p-2 border-b border-slate-100">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search icons..."
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:border-blue-400"
                autoFocus
              />
            </div>
            <div className="p-2 grid grid-cols-6 gap-1 max-h-48 overflow-y-auto">
              {filtered.map((name) => {
                const Icon = LucideIcons[name];
                if (!Icon) return null;
                return (
                  <button
                    key={name}
                    type="button"
                    title={name}
                    onClick={() => { onChange(name); setOpen(false); setSearch(''); }}
                    className={`w-full aspect-square rounded-lg flex items-center justify-center transition-all hover:bg-blue-50 hover:text-blue-600 ${
                      value === name ? 'bg-blue-100 text-blue-600 ring-1 ring-blue-300' : 'text-slate-500'
                    }`}
                  >
                    <Icon size={18} />
                  </button>
                );
              })}
              {filtered.length === 0 && (
                <p className="col-span-6 text-center text-xs text-slate-400 py-3">No icons found</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export { ICON_NAMES };
