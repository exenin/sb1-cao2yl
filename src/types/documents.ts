import { User } from './auth';

export type DocumentType = 'assessment' | 'report' | 'contract' | 'invoice' | 'other';

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  mimeType: string;
  path: string;
  folderId: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  tags: string[];
  starred: boolean;
  shared: boolean;
  sharedWith?: string[];
}

export interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  path: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface DocumentPermissions {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canShare: boolean;
}

export interface DocumentStats {
  totalDocuments: number;
  totalSize: number;
  documentsPerType: Record<DocumentType, number>;
  recentlyModified: Document[];
}