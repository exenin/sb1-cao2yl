import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  BlogPost, 
  BlogCategory, 
  BlogTag, 
  BlogSettings, 
  BlogStats,
  PostStatus,
  PostVisibility 
} from '../types/blog';
import { useAuth } from './AuthContext';

interface BlogContextType {
  posts: BlogPost[];
  categories: BlogCategory[];
  tags: BlogTag[];
  settings: BlogSettings;
  stats: BlogStats;
  selectedPost: BlogPost | null;
  isLoading: boolean;
  error: string | null;
  createPost: (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => Promise<BlogPost>;
  updatePost: (id: string, data: Partial<BlogPost>) => Promise<BlogPost>;
  deletePost: (id: string) => Promise<void>;
  publishPost: (id: string) => Promise<BlogPost>;
  schedulePost: (id: string, scheduledAt: string) => Promise<BlogPost>;
  createCategory: (data: Omit<BlogCategory, 'id' | 'postCount'>) => Promise<BlogCategory>;
  updateCategory: (id: string, data: Partial<BlogCategory>) => Promise<BlogCategory>;
  deleteCategory: (id: string) => Promise<void>;
  createTag: (data: Omit<BlogTag, 'id' | 'postCount'>) => Promise<BlogTag>;
  updateTag: (id: string, data: Partial<BlogTag>) => Promise<BlogTag>;
  deleteTag: (id: string) => Promise<void>;
  updateSettings: (data: Partial<BlogSettings>) => Promise<BlogSettings>;
  uploadImage: (file: File) => Promise<string>;
  generateSlug: (title: string) => string;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

const mockPosts: BlogPost[] = [
  {
    id: 'post_1',
    title: 'The Future of Cybersecurity in 2024',
    slug: 'future-of-cybersecurity-2024',
    content: '# The Future of Cybersecurity\n\nAs we move into 2024...',
    excerpt: 'Explore emerging trends and technologies shaping the cybersecurity landscape.',
    author: {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      role: 'admin',
      permissions: ['all']
    },
    status: 'published',
    visibility: 'public',
    categories: ['cybersecurity', 'technology'],
    tags: ['security', 'trends', '2024'],
    publishedAt: '2024-03-15T10:00:00Z',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    views: 150
  }
];

const mockCategories: BlogCategory[] = [
  {
    id: 'cat_1',
    name: 'Cybersecurity',
    slug: 'cybersecurity',
    description: 'Articles about cybersecurity trends and best practices',
    postCount: 1
  }
];

const mockTags: BlogTag[] = [
  {
    id: 'tag_1',
    name: 'security',
    slug: 'security',
    postCount: 1
  }
];

const mockSettings: BlogSettings = {
  title: 'CyberAllStars Blog',
  description: 'Latest insights on cybersecurity and digital transformation',
  postsPerPage: 10,
  defaultCategory: 'cat_1',
  dateFormat: 'MMMM DD, YYYY',
  timeFormat: 'HH:mm',
  socialLinks: {},
  seoSettings: {
    defaultTitle: 'CyberAllStars Blog',
    titleSeparator: '|',
    defaultDescription: 'Latest insights on cybersecurity and digital transformation'
  }
};

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [categories, setCategories] = useState<BlogCategory[]>(mockCategories);
  const [tags, setTags] = useState<BlogTag[]>(mockTags);
  const [settings, setSettings] = useState<BlogSettings>(mockSettings);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState<BlogStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    scheduledPosts: 0,
    totalViews: 0,
    popularPosts: [],
    recentComments: [],
    postsByCategory: {},
    postsByTag: {}
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API calls
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, 1000))
        ]);

        // Calculate stats
        const newStats: BlogStats = {
          totalPosts: posts.length,
          publishedPosts: posts.filter(p => p.status === 'published').length,
          draftPosts: posts.filter(p => p.status === 'draft').length,
          scheduledPosts: posts.filter(p => p.status === 'scheduled').length,
          totalViews: posts.reduce((sum, post) => sum + post.views, 0),
          popularPosts: [...posts].sort((a, b) => b.views - a.views).slice(0, 5),
          recentComments: [],
          postsByCategory: categories.reduce((acc, cat) => ({
            ...acc,
            [cat.id]: posts.filter(p => p.categories.includes(cat.id)).length
          }), {}),
          postsByTag: tags.reduce((acc, tag) => ({
            ...acc,
            [tag.id]: posts.filter(p => p.tags.includes(tag.id)).length
          }), {})
        };

        setStats(newStats);
      } catch (err) {
        setError('Failed to load blog data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [posts, categories, tags]);

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const createPost = async (data: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'views'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newPost: BlogPost = {
        id: `post_${Date.now()}`,
        ...data,
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setPosts(prev => [...prev, newPost]);
      return newPost;
    } catch (err) {
      setError('Failed to create post');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePost = async (id: string, data: Partial<BlogPost>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedPost = {
        ...posts.find(p => p.id === id)!,
        ...data,
        updatedAt: new Date().toISOString()
      };

      setPosts(prev => prev.map(p => p.id === id ? updatedPost : p));
      return updatedPost;
    } catch (err) {
      setError('Failed to update post');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete post');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const publishPost = async (id: string) => {
    return updatePost(id, {
      status: 'published',
      publishedAt: new Date().toISOString()
    });
  };

  const schedulePost = async (id: string, scheduledAt: string) => {
    return updatePost(id, {
      status: 'scheduled',
      scheduledAt
    });
  };

  const createCategory = async (data: Omit<BlogCategory, 'id' | 'postCount'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newCategory: BlogCategory = {
        id: `cat_${Date.now()}`,
        ...data,
        postCount: 0
      };

      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err) {
      setError('Failed to create category');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCategory = async (id: string, data: Partial<BlogCategory>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedCategory = {
        ...categories.find(c => c.id === id)!,
        ...data
      };

      setCategories(prev => prev.map(c => c.id === id ? updatedCategory : c));
      return updatedCategory;
    } catch (err) {
      setError('Failed to update category');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCategories(prev => prev.filter(c => c.id !== id));
    } catch (err) {
      setError('Failed to delete category');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const createTag = async (data: Omit<BlogTag, 'id' | 'postCount'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newTag: BlogTag = {
        id: `tag_${Date.now()}`,
        ...data,
        postCount: 0
      };

      setTags(prev => [...prev, newTag]);
      return newTag;
    } catch (err) {
      setError('Failed to create tag');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTag = async (id: string, data: Partial<BlogTag>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedTag = {
        ...tags.find(t => t.id === id)!,
        ...data
      };

      setTags(prev => prev.map(t => t.id === id ? updatedTag : t));
      return updatedTag;
    } catch (err) {
      setError('Failed to update tag');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTag = async (id: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTags(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete tag');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSettings = async (data: Partial<BlogSettings>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedSettings = {
        ...settings,
        ...data
      };

      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      setError('Failed to update settings');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    setIsLoading(true);
    try {
      // Simulate image upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      return URL.createObjectURL(file); // In production, this would be a real URL
    } catch (err) {
      setError('Failed to upload image');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BlogContext.Provider value={{
      posts,
      categories,
      tags,
      settings,
      stats,
      selectedPost,
      isLoading,
      error,
      createPost,
      updatePost,
      deletePost,
      publishPost,
      schedulePost,
      createCategory,
      updateCategory,
      deleteCategory,
      createTag,
      updateTag,
      deleteTag,
      updateSettings,
      uploadImage,
      generateSlug
    }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
}