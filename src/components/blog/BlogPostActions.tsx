import React from 'react';
import { 
  Edit2, Trash2, Eye, Share2, Star, 
  Calendar, Lock, Globe 
} from 'lucide-react';
import { BlogPost } from '../../types/blog';

interface BlogPostActionsProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (postId: string) => void;
  onShare?: (post: BlogPost) => void;
  onStar?: (postId: string) => void;
}

export default function BlogPostActions({
  post,
  onEdit,
  onDelete,
  onShare,
  onStar
}: BlogPostActionsProps) {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onEdit(post)}
        className="p-2 hover:bg-gray-600 rounded-lg"
        title="Edit Post"
      >
        <Edit2 className="h-4 w-4 text-gray-400" />
      </button>

      {onShare && (
        <button
          onClick={() => onShare(post)}
          className="p-2 hover:bg-gray-600 rounded-lg"
          title="Share Post"
        >
          <Share2 className="h-4 w-4 text-gray-400" />
        </button>
      )}

      {onStar && (
        <button
          onClick={() => onStar(post.id)}
          className="p-2 hover:bg-gray-600 rounded-lg"
          title={post.starred ? 'Remove from Starred' : 'Star Post'}
        >
          <Star className={`h-4 w-4 ${post.starred ? 'text-yellow-500' : 'text-gray-400'}`} />
        </button>
      )}

      <button
        onClick={() => onDelete(post.id)}
        className="p-2 hover:bg-gray-600 rounded-lg"
        title="Delete Post"
      >
        <Trash2 className="h-4 w-4 text-red-400" />
      </button>
    </div>
  );
}