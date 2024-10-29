import React, { useRef } from 'react';
import { Image, X } from 'lucide-react';
import { useBlog } from '../../../contexts/BlogContext';

interface EditorMetadataProps {
  excerpt: string;
  featuredImage?: string;
  categories: string[];
  tags: string[];
  onChange: (field: string, value: any) => void;
}

export default function EditorMetadata({
  excerpt,
  featuredImage,
  categories,
  tags,
  onChange
}: EditorMetadataProps) {
  const { categories: allCategories, tags: allTags, uploadImage } = useBlog();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
        onChange('featuredImage', imageUrl);
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Excerpt
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => onChange('excerpt', e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">
          Featured Image
        </label>
        <div className="flex items-center space-x-4">
          {featuredImage ? (
            <div className="relative">
              <img
                src={featuredImage}
                alt="Featured"
                className="h-32 w-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => onChange('featuredImage', undefined)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              <Image className="h-5 w-5 mr-2" />
              Add Featured Image
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Categories
          </label>
          <select
            multiple
            value={categories}
            onChange={(e) => onChange('categories', 
              Array.from(e.target.selectedOptions, option => option.value)
            )}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {allCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Tags
          </label>
          <select
            multiple
            value={tags}
            onChange={(e) => onChange('tags',
              Array.from(e.target.selectedOptions, option => option.value)
            )}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          >
            {allTags.map(tag => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}