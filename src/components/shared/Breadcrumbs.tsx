import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = paths.map((path, index) => {
    const url = `/${paths.slice(0, index + 1).join('/')}`;
    const label = path.charAt(0).toUpperCase() + path.slice(1);
    
    return {
      label: label.replace(/-/g, ' '),
      url
    };
  });

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-400">
      <Link to="/" className="hover:text-cyan-500">
        Home
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <React.Fragment key={crumb.url}>
          <ChevronRight className="h-4 w-4" />
          <Link
            to={crumb.url}
            className={index === breadcrumbs.length - 1 
              ? 'text-white' 
              : 'hover:text-cyan-500'
            }
          >
            {crumb.label}
          </Link>
        </React.Fragment>
      ))}
    </div>
  );
}