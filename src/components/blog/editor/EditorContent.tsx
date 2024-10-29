import React from 'react';

interface EditorContentProps {
  content: string;
  onChange: (value: string) => void;
}

export default function EditorContent({ content, onChange }: EditorContentProps) {
  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write your post content here..."
        className="w-full h-96 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        required
      />
    </div>
  );
}