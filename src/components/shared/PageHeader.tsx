import React from 'react';
import Breadcrumbs from './Breadcrumbs';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export default function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-8">
      <Breadcrumbs />
      <div className="flex justify-between items-center mt-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          {description && (
            <p className="mt-1 text-gray-400">{description}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}