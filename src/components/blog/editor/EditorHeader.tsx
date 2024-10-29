import React from 'react';

interface EditorHeaderProps {
  title: string;
  onChange: (value: string) => void;
}

export default function EditorHeader({ title, onChange }: EditorHeaderProps) {
  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Post Title"
        className="w-full px-4 py-2 text-2xl bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
    </div>
  );
}