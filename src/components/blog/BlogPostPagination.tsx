import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BlogPostPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogPostPagination({
  currentPage,
  totalPages,
  onPageChange
}: BlogPostPaginationProps) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1); // Ellipsis
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(-1); // Ellipsis
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {getPageNumbers().map((pageNum, index) => (
        pageNum === -1 ? (
          <span key={`ellipsis-${index}`} className="text-gray-400">...</span>
        ) : (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-4 py-2 rounded-lg ${
              currentPage === pageNum
                ? 'bg-cyan-500 text-black'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            {pageNum}
          </button>
        )
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg bg-gray-800 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}