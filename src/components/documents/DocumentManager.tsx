import React, { useState } from 'react';
import { 
  Folder, File, Upload, Plus, Search, Filter, Star,
  Share2, Trash2, MoreVertical, ChevronRight
} from 'lucide-react';
import { useDocuments } from '../../contexts/DocumentContext';
import DocumentUploader from './DocumentUploader';
import FolderCreator from './FolderCreator';
import ShareModal from './ShareModal';
import { Document, Folder as FolderType } from '../../types/documents';

export default function DocumentManager() {
  const {
    documents,
    folders,
    currentFolder,
    selectedItems,
    isLoading,
    deleteItems,
    navigateToFolder,
    selectItems,
    searchDocuments
  } = useDocuments();

  const [searchTerm, setSearchTerm] = useState('');
  const [showUploader, setShowUploader] = useState(false);
  const [showFolderCreator, setShowFolderCreator] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query) {
      await searchDocuments(query);
    }
  };

  const getCurrentItems = () => {
    let items = [
      ...folders.filter(f => f.parentId === currentFolder?.id),
      ...documents.filter(d => d.folderId === currentFolder?.id)
    ];

    if (searchTerm) {
      items = items.filter(item => 
        'name' in item && item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      items = items.filter(item => 
        'type' in item && item.type === filterType
      );
    }

    return items;
  };

  const getBreadcrumbs = () => {
    if (!currentFolder) return [{ id: 'root', name: 'Documents' }];

    const breadcrumbs = [{ id: 'root', name: 'Documents' }];
    let current = currentFolder;
    
    while (current) {
      breadcrumbs.unshift(current);
      current = folders.find(f => f.id === current.parentId) || null;
    }

    return breadcrumbs;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Document Manager</h1>
          <div className="flex items-center space-x-2 text-gray-400">
            {getBreadcrumbs().map((item, index, array) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => navigateToFolder(item.id === 'root' ? null : item.id)}
                  className="hover:text-cyan-500 transition-colors"
                >
                  {item.name}
                </button>
                {index < array.length - 1 && (
                  <ChevronRight className="h-4 w-4" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowUploader(true)}
            className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors flex items-center"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </button>
          <button
            onClick={() => setShowFolderCreator(true)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Folder
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="assessment">Assessments</option>
              <option value="report">Reports</option>
              <option value="contract">Contracts</option>
              <option value="invoice">Invoices</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      {selectedItems.length > 0 && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg flex items-center justify-between">
          <span className="text-white">
            {selectedItems.length} item(s) selected
          </span>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => deleteItems(selectedItems)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Document Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {getCurrentItems().map((item) => {
          const isFolder = !('mimeType' in item);
          const isSelected = selectedItems.some(selected => selected.id === item.id);

          return (
            <div
              key={item.id}
              className={`p-4 bg-gray-800 rounded-lg cursor-pointer transition-all ${
                isSelected ? 'ring-2 ring-cyan-500' : 'hover:bg-gray-700'
              }`}
              onClick={() => {
                if (isFolder) {
                  navigateToFolder(item.id);
                } else {
                  selectItems([...selectedItems, item]);
                }
              }}
            >
              <div className="flex items-start justify-between">
                {isFolder ? (
                  <Folder className="h-10 w-10 text-cyan-500" />
                ) : (
                  <File className="h-10 w-10 text-gray-400" />
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle more options
                  }}
                  className="p-1 hover:bg-gray-600 rounded"
                >
                  <MoreVertical className="h-4 w-4 text-gray-400" />
                </button>
              </div>
              <h3 className="mt-2 text-sm font-medium text-white truncate">
                {item.name}
              </h3>
              {!isFolder && (
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </span>
                  {item.starred && (
                    <Star className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <DocumentUploader
        show={showUploader}
        onClose={() => setShowUploader(false)}
        currentFolderId={currentFolder?.id}
      />
      <FolderCreator
        show={showFolderCreator}
        onClose={() => setShowFolderCreator(false)}
        parentFolderId={currentFolder?.id}
      />
      <ShareModal
        show={showShareModal}
        onClose={() => setShowShareModal(false)}
        items={selectedItems.filter((item): item is Document => 'mimeType' in item)}
      />
    </div>
  );
}