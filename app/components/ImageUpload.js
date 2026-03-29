'use client';

import { useState, useRef } from 'react';
import { Upload, X, AlertCircle } from 'lucide-react';

export default function ImageUpload({ value, onChange, label }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  const isConfigured = !!cloudName && !!uploadPreset;

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!isConfigured) {
      setError('Cloudinary not configured. Update .env.local with your cloud name and upload preset.');
      return;
    }

    setError('');
    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await res.json();

      if (data.secure_url) {
        onChange(data.secure_url);
      } else {
        setError(data.error?.message || 'Upload failed');
      }
    } catch {
      setError('Upload failed. Check your Cloudinary configuration.');
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  return (
    <div>
      {label && (
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{label}</label>
      )}

      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
          <img src={value} alt="" className="w-full h-48 object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition"
          >
            <X size={14} />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute bottom-2 right-2 px-3 py-1.5 bg-white text-slate-700 rounded-lg text-xs font-semibold shadow-md hover:bg-slate-50 transition"
          >
            Replace
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-36 rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:bg-blue-50/50 transition text-slate-400 disabled:opacity-50"
        >
          {uploading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <span className="text-sm text-blue-600 font-medium">Uploading...</span>
            </div>
          ) : (
            <>
              <Upload size={22} />
              <span className="text-sm font-medium">Click to upload image</span>
              {!isConfigured && (
                <span className="text-xs text-amber-500">Cloudinary not configured</span>
              )}
            </>
          )}
        </button>
      )}

      {error && (
        <div className="mt-2 flex items-center gap-1.5 text-xs text-red-500">
          <AlertCircle size={12} />
          {error}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleUpload}
      />
    </div>
  );
}
