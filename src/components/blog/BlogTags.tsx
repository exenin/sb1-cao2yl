import React from 'react';
import { Plus, Edit2, Trash2, Tag } from 'lucide-react';
import { useBlog } from '../../contexts/BlogContext';

export default function BlogTags() {
  const { 
    tags, 
    createTag, 
    updateTag, 
    deleteTag,
    isLoading 
  } = useBlog();

  const [newTag, setNewTag] = React.useState('');
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [editValue, setEditValue] = React.useState('');

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    try {
      await createTag({
        name: newTag,
        slug: newTag.toLowerCase().replace(/\s+/g, '-')
      });
      setNewTag('');
    } catch (error) {
      console.error('Failed to create tag:', error);
    }
  };

  const handleUpdate = async (id: string) => {
    if (!editValue.trim()) return;

    try {
      await updateTag(id, {
        name: editValue,
        slug: editValue.toLowerCase().replace(/\s+/g, '-')
      });
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update tag:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      try {
        await deleteTag(id);
      } catch (error) {
        console.error('Failed to delete tag:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-700 rounded w-1/4"></div>
        <div className="space-y-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-12 bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreate} className="flex gap-4">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="New tag name"
          className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button
          type="submit"
          disabled={!newTag.trim()}
          className="flex items-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Tag
        </button>
      </form>

      <div className="space-y-2">
        {tags.map(tag => (
          <div
            key={tag.id}
            className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
          >
            {editingId === tag.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => handleUpdate(tag.id)}
                onKeyPress={(e) => e.key === 'Enter' && handleUpdate(tag.id)}
                className="flex-1 px-3 py-1 bg-gray-600 border border-gray-500 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                autoFocus
              />
            ) : (
              <div className="flex items-center">
                <Tag className="h-4 w-4 text-cyan-500 mr-2" />
                <div>
                  <p className="text-white font-medium">{tag.name}</p>
                  <p className="text-sm text-gray-400">{tag.postCount} posts</p>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  setEditingId(tag.id);
                  setEditValue(tag.name);
                }}
                className="p-2 hover:bg-gray-600 rounded-lg"
              >
                <Edit2 className="h-4 w-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleDelete(tag.id)}
                className="p-2 hover:bg-gray-600 rounded-lg"
              >
                <Trash2 className="h-4 w-4 text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}