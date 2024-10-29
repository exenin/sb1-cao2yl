import React, { useState } from 'react';
import { useBlog } from '../../contexts/BlogContext';
import { BlogPost } from '../../types/blog';
import { usePermissions } from '../../hooks/usePermissions';
import BlogPostFilters from './BlogPostFilters';
import BlogPostTable from './BlogPostTable';
import BlogPostPagination from './BlogPostPagination';
import BlogPostSort from './BlogPostSort';

interface BlogPostListProps {
  onEdit: (post: BlogPost) => void;
}

export default function BlogPostList({ onEdit }: BlogPostListProps) {
  const { posts, deletePost, isLoading } = useBlog();
  const { hasPermission } = usePermissions();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof BlogPost>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const canEditPosts = hasPermission('blog:edit');
  const canDeletePosts = hasPermission('blog:delete');

  const filteredPosts = posts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || post.categories.includes(categoryFilter);
    const matchesTag = tagFilter === 'all' || post.tags.includes(tagFilter);
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesCategory && matchesTag && matchesStatus;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (aValue instanceof Date && bValue instanceof Date) {
      return sortDirection === 'asc'
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }
    
    return 0;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const handleDelete = async (postId: string) => {
    if (!canDeletePosts) return;
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(postId);
        if (currentPosts.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    }
  };

  const handleSort = (field: keyof BlogPost) => {
    if (field === sortField) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-700 rounded w-1/4"></div>
        <div className="h-64 bg-gray-700 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <BlogPostFilters
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        tagFilter={tagFilter}
        statusFilter={statusFilter}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategoryFilter}
        onTagChange={setTagFilter}
        onStatusChange={setStatusFilter}
      />

      <BlogPostSort
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      <BlogPostTable
        posts={currentPosts}
        onEdit={canEditPosts ? onEdit : undefined}
        onDelete={canDeletePosts ? handleDelete : undefined}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      <BlogPostPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}