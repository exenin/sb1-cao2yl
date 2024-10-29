import { User } from './auth';

export type PostStatus = 'draft' | 'scheduled' | 'published' | 'archived';
export type PostVisibility = 'public' | 'private' | 'password-protected';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  author: {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
  };
  status: PostStatus;
  visibility: PostVisibility;
  password?: string;
  categories: string[];
  tags: string[];
  publishedAt?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  views: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  postCount: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
  postCount: number;
}

export interface BlogSettings {
  title: string;
  description: string;
  logo?: string;
  favicon?: string;
  postsPerPage: number;
  defaultCategory: string;
  dateFormat: string;
  timeFormat: string;
  headerScripts?: string;
  footerScripts?: string;
  socialLinks: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  seoSettings: {
    defaultTitle: string;
    titleSeparator: string;
    defaultDescription: string;
    defaultOgImage?: string;
    twitterUsername?: string;
  };
}

export interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  scheduledPosts: number;
  totalViews: number;
  popularPosts: BlogPost[];
  recentComments: Comment[];
  postsByCategory: Record<string, number>;
  postsByTag: Record<string, number>;
}