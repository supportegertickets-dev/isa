'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const COLORS = [
  { name: 'blue', swatch: 'bg-blue-500', label: 'Blue' },
  { name: 'violet', swatch: 'bg-violet-500', label: 'Violet' },
  { name: 'cyan', swatch: 'bg-cyan-500', label: 'Cyan' },
  { name: 'green', swatch: 'bg-green-500', label: 'Green' },
  { name: 'red', swatch: 'bg-red-500', label: 'Red' },
  { name: 'orange', swatch: 'bg-orange-500', label: 'Orange' },
  { name: 'pink', swatch: 'bg-pink-500', label: 'Pink' },
  { name: 'amber', swatch: 'bg-amber-500', label: 'Amber' },
  { name: 'teal', swatch: 'bg-teal-500', label: 'Teal' },
  { name: 'indigo', swatch: 'bg-indigo-500', label: 'Indigo' },
  { name: 'emerald', swatch: 'bg-emerald-500', label: 'Emerald' },
  { name: 'rose', swatch: 'bg-rose-500', label: 'Rose' },
  { name: 'sky', swatch: 'bg-sky-500', label: 'Sky' },
  { name: 'lime', swatch: 'bg-lime-500', label: 'Lime' },
  { name: 'fuchsia', swatch: 'bg-fuchsia-500', label: 'Fuchsia' },
  { name: 'yellow', swatch: 'bg-yellow-500', label: 'Yellow' },
  { name: 'slate', swatch: 'bg-slate-500', label: 'Slate' },
  { name: 'purple', swatch: 'bg-purple-500', label: 'Purple' },
];

const SWATCHES_MAP = Object.fromEntries(COLORS.map(c => [c.name, c.swatch]));

export default function ColorPicker({ label, value, onChange }) {
  const [open, setOpen] = useState(false);

  const current = COLORS.find(c => c.name === value);

  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-slate-200 text-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white"
      >
        <span className={`w-5 h-5 rounded-md shrink-0 ${current?.swatch || 'bg-slate-200'}`} />
        <span className="flex-1 text-left text-slate-700 font-medium">{current?.label || value || 'Select color'}</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 mt-1.5 w-full bg-white rounded-xl border border-slate-200 shadow-lg p-2 grid grid-cols-6 gap-1.5 max-h-48 overflow-y-auto">
            {COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                title={c.label}
                onClick={() => { onChange(c.name); setOpen(false); }}
                className={`w-full aspect-square rounded-lg transition-all hover:scale-110 ${c.swatch} ${
                  value === c.name ? 'ring-2 ring-offset-2 ring-slate-900 scale-110' : ''
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export { COLORS };
