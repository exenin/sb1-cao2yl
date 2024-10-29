import React from 'react';
import { FolderOpen } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  icon?: React.ElementType;
}

export default function EmptyState({ 
  title, 
  description, 
  action,
  icon: Icon = FolderOpen 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <Icon className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}