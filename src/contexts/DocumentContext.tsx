import React, { createContext, useContext, useState, useEffect } from 'react';
import { Document, Folder, DocumentStats, DocumentType } from '../types/documents';
import { useAuth } from './AuthContext';

interface DocumentContextType {
  documents: Document[];
  folders: Folder[];
  stats: DocumentStats;
  currentFolder: Folder | null;
  selectedItems: (Document | Folder)[];
  isLoading: boolean;
  error: string | null;
  createFolder: (name: string, parentId?: string) => Promise<void>;
  uploadDocument: (file: File, folderId?: string) => Promise<void>;
  deleteItems: (items: (Document | Folder)[]) => Promise<void>;
  moveItems: (items: (Document | Folder)[], targetFolderId: string) => Promise<void>;
  shareItems: (items: Document[], users: string[]) => Promise<void>;
  starDocument: (documentId: string) => Promise<void>;
  updateDocument: (documentId: string, data: Partial<Document>) => Promise<void>;
  searchDocuments: (query: string) => Promise<(Document | Folder)[]>;
  navigateToFolder: (folderId: string | null) => void;
  selectItems: (items: (Document | Folder)[]) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

const mockDocuments: Document[] = [
  {
    id: 'doc1',
    name: 'Security Assessment 2024.pdf',
    type: 'assessment',
    size: 2500000,
    mimeType: 'application/pdf',
    path: '/assessments/security-2024.pdf',
    folderId: 'folder1',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    createdBy: 'user1',
    tags: ['security', '2024', 'assessment'],
    starred: false,
    shared: false
  }
];

const mockFolders: Folder[] = [
  {
    id: 'folder1',
    name: 'Assessments',
    parentId: null,
    path: '/assessments',
    createdAt: '2024-03-15T10:00:00Z',
    updatedAt: '2024-03-15T10:00:00Z',
    createdBy: 'user1'
  }
];

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [folders, setFolders] = useState<Folder[]>(mockFolders);
  const [currentFolder, setCurrentFolder] = useState<Folder | null>(null);
  const [selectedItems, setSelectedItems] = useState<(Document | Folder)[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [stats, setStats] = useState<DocumentStats>({
    totalDocuments: 0,
    totalSize: 0,
    documentsPerType: {
      assessment: 0,
      report: 0,
      contract: 0,
      invoice: 0,
      other: 0
    },
    recentlyModified: []
  });

  useEffect(() => {
    const loadDocuments = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Update stats
        const newStats: DocumentStats = {
          totalDocuments: documents.length,
          totalSize: documents.reduce((acc, doc) => acc + doc.size, 0),
          documentsPerType: documents.reduce((acc, doc) => {
            acc[doc.type as DocumentType]++;
            return acc;
          }, {
            assessment: 0,
            report: 0,
            contract: 0,
            invoice: 0,
            other: 0
          }),
          recentlyModified: documents.sort((a, b) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          ).slice(0, 5)
        };
        
        setStats(newStats);
      } catch (err) {
        setError('Failed to load documents');
      } finally {
        setIsLoading(false);
      }
    };

    loadDocuments();
  }, [documents]);

  const createFolder = async (name: string, parentId?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newFolder: Folder = {
        id: `folder${folders.length + 1}`,
        name,
        parentId: parentId || null,
        path: parentId ? `${folders.find(f => f.id === parentId)?.path}/${name}` : `/${name}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: user?.id || ''
      };

      setFolders(prev => [...prev, newFolder]);
    } catch (err) {
      setError('Failed to create folder');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadDocument = async (file: File, folderId?: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newDocument: Document = {
        id: `doc${documents.length + 1}`,
        name: file.name,
        type: 'other',
        size: file.size,
        mimeType: file.type,
        path: folderId ? `${folders.find(f => f.id === folderId)?.path}/${file.name}` : `/${file.name}`,
        folderId: folderId || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: user?.id || '',
        tags: [],
        starred: false,
        shared: false
      };

      setDocuments(prev => [...prev, newDocument]);
    } catch (err) {
      setError('Failed to upload document');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteItems = async (items: (Document | Folder)[]) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const documentIds = new Set(items.filter(item => 'mimeType' in item).map(item => item.id));
      const folderIds = new Set(items.filter(item => !('mimeType' in item)).map(item => item.id));

      setDocuments(prev => prev.filter(doc => !documentIds.has(doc.id)));
      setFolders(prev => prev.filter(folder => !folderIds.has(folder.id)));
      setSelectedItems([]);
    } catch (err) {
      setError('Failed to delete items');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const moveItems = async (items: (Document | Folder)[], targetFolderId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const targetFolder = folders.find(f => f.id === targetFolderId);
      if (!targetFolder) throw new Error('Target folder not found');

      setDocuments(prev => prev.map(doc => {
        if (items.some(item => 'mimeType' in item && item.id === doc.id)) {
          return {
            ...doc,
            folderId: targetFolderId,
            path: `${targetFolder.path}/${doc.name}`,
            updatedAt: new Date().toISOString()
          };
        }
        return doc;
      }));

      setFolders(prev => prev.map(folder => {
        if (items.some(item => !('mimeType' in item) && item.id === folder.id)) {
          return {
            ...folder,
            parentId: targetFolderId,
            path: `${targetFolder.path}/${folder.name}`,
            updatedAt: new Date().toISOString()
          };
        }
        return folder;
      }));

      setSelectedItems([]);
    } catch (err) {
      setError('Failed to move items');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const shareItems = async (items: Document[], users: string[]) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDocuments(prev => prev.map(doc => {
        if (items.some(item => item.id === doc.id)) {
          return {
            ...doc,
            shared: true,
            sharedWith: users,
            updatedAt: new Date().toISOString()
          };
        }
        return doc;
      }));
    } catch (err) {
      setError('Failed to share items');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const starDocument = async (documentId: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDocuments(prev => prev.map(doc => {
        if (doc.id === documentId) {
          return {
            ...doc,
            starred: !doc.starred,
            updatedAt: new Date().toISOString()
          };
        }
        return doc;
      }));
    } catch (err) {
      setError('Failed to star document');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateDocument = async (documentId: string, data: Partial<Document>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setDocuments(prev => prev.map(doc => {
        if (doc.id === documentId) {
          return {
            ...doc,
            ...data,
            updatedAt: new Date().toISOString()
          };
        }
        return doc;
      }));
    } catch (err) {
      setError('Failed to update document');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const searchDocuments = async (query: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const searchResults = [
        ...documents.filter(doc => 
          doc.name.toLowerCase().includes(query.toLowerCase()) ||
          doc.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        ),
        ...folders.filter(folder => 
          folder.name.toLowerCase().includes(query.toLowerCase())
        )
      ];

      return searchResults;
    } catch (err) {
      setError('Failed to search documents');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToFolder = (folderId: string | null) => {
    const folder = folderId ? folders.find(f => f.id === folderId) : null;
    setCurrentFolder(folder);
  };

  const selectItems = (items: (Document | Folder)[]) => {
    setSelectedItems(items);
  };

  return (
    <DocumentContext.Provider value={{
      documents,
      folders,
      stats,
      currentFolder,
      selectedItems,
      isLoading,
      error,
      createFolder,
      uploadDocument,
      deleteItems,
      moveItems,
      shareItems,
      starDocument,
      updateDocument,
      searchDocuments,
      navigateToFolder,
      selectItems
    }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
}