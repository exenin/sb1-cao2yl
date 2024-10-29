import React, { useState, useRef } from 'react';
import { Upload, X, File } from 'lucide-react';
import { useDocuments } from '../../contexts/DocumentContext';

interface DocumentUploaderProps {
  show: boolean;
  onClose: () => void;
  currentFolderId?: string | null;
}

export default function DocumentUploader({ show, onClose, currentFolderId }: DocumentUploaderProps) {
  const { uploadDocument } = useDocuments();
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!show) return null;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      for (const file of files) {
        await uploadDocument(file, currentFolderId || undefined);
      }
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-white">Upload Documents</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-cyan-500 transition-colors"
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">
            Drag and drop files here, or{' '}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-cyan-500 hover:text-cyan-400"
            >
              browse
            </button>
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-700 rounded-lg"
              >
                <div className="flex items-center">
                  <File className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-white truncate">{file.name}</span>
                </div>
                <button
                  onClick={() => setFiles(prev => prev.filter((_, i) => i !== index))}
                  className="p-1 hover:bg-gray-600 rounded"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>
    </div>
  );
}