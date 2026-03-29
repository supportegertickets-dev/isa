'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const GRADIENTS = [
  { value: 'from-blue-500 to-cyan-500', bg: 'bg-blue-50', label: 'Blue → Cyan' },
  { value: 'from-violet-500 to-pink-500', bg: 'bg-violet-50', label: 'Violet → Pink' },
  { value: 'from-red-500 to-orange-500', bg: 'bg-red-50', label: 'Red → Orange' },
  { value: 'from-green-500 to-emerald-500', bg: 'bg-green-50', label: 'Green → Emerald' },
  { value: 'from-amber-500 to-yellow-500', bg: 'bg-amber-50', label: 'Amber → Yellow' },
  { value: 'from-pink-500 to-rose-500', bg: 'bg-pink-50', label: 'Pink → Rose' },
  { value: 'from-indigo-500 to-blue-500', bg: 'bg-indigo-50', label: 'Indigo → Blue' },
  { value: 'from-teal-500 to-cyan-500', bg: 'bg-teal-50', label: 'Teal → Cyan' },
  { value: 'from-fuchsia-500 to-purple-500', bg: 'bg-fuchsia-50', label: 'Fuchsia → Purple' },
  { value: 'from-sky-500 to-indigo-500', bg: 'bg-sky-50', label: 'Sky → Indigo' },
  { value: 'from-lime-500 to-green-500', bg: 'bg-lime-50', label: 'Lime → Green' },
  { value: 'from-orange-500 to-red-500', bg: 'bg-orange-50', label: 'Orange → Red' },
  { value: 'from-cyan-500 to-blue-500', bg: 'bg-cyan-50', label: 'Cyan → Blue' },
  { value: 'from-rose-500 to-pink-500', bg: 'bg-rose-50', label: 'Rose → Pink' },
  { value: 'from-emerald-500 to-teal-500', bg: 'bg-emerald-50', label: 'Emerald → Teal' },
  { value: 'from-purple-500 to-violet-500', bg: 'bg-purple-50', label: 'Purple → Violet' },
];

export default function GradientPicker({ label, value, onChange, bgValue, onBgChange }) {
  const [open, setOpen] = useState(false);

  const current = GRADIENTS.find(g => g.value === value);

  return (
    <div className="relative">
      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border border-slate-200 text-sm hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition bg-white"
      >
        <span className={`w-8 h-5 rounded-md shrink-0 bg-gradient-to-r ${value || 'from-slate-300 to-slate-400'}`} />
        <span className="flex-1 text-left text-slate-700 font-medium text-xs">{current?.label || 'Select gradient'}</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute z-50 mt-1.5 w-full bg-white rounded-xl border border-slate-200 shadow-lg p-2 space-y-1 max-h-56 overflow-y-auto">
            {GRADIENTS.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => {
                  onChange(g.value);
                  if (onBgChange) onBgChange(g.bg);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg transition hover:bg-slate-50 ${
                  value === g.value ? 'bg-blue-50 ring-1 ring-blue-200' : ''
                }`}
              >
                <span className={`w-10 h-6 rounded-md bg-gradient-to-r ${g.value}`} />
                <span className="text-xs font-medium text-slate-600">{g.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export { GRADIENTS };
