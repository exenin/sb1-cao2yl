import { User } from './auth';

export type MessageStatus = 'sent' | 'delivered' | 'read' | 'failed';
export type ChatStatus = 'active' | 'closed' | 'pending';
export type UserStatus = 'online' | 'offline' | 'away';

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: MessageStatus;
  attachments?: ChatAttachment[];
  replyTo?: string;
  edited?: boolean;
  editedAt?: string;
}

export interface ChatAttachment {
  id: string;
  name: string;
  type: string;
  url: string;
  size: number;
  uploadedAt: string;
}

export interface ChatSession {
  id: string;
  customerId: string;
  agentId?: string;
  status: ChatStatus;
  subject?: string;
  startedAt: string;
  endedAt?: string;
  rating?: number;
  feedback?: string;
  tags?: string[];
  messages: ChatMessage[];
  lastMessageAt: string;
  unreadCount: number;
}

export interface QuickResponse {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface ChatParticipant {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'customer' | 'agent' | 'admin';
  status: UserStatus;
  lastActive: string;
  typing?: boolean;
}

export interface ChatStats {
  totalChats: number;
  activeChats: number;
  averageResponseTime: number;
  averageRating: number;
  messagesPerChat: number;
  resolutionRate: number;
}