import React from 'react';
import { X, Download } from 'lucide-react';
import { ChatSession } from '../../types/chat';
import { useChat } from '../../contexts/ChatContext';

interface ChatHeaderProps {
  session: ChatSession;
}

export default function ChatHeader({ session }: ChatHeaderProps) {
  const { closeChat, exportTranscript } = useChat();

  const handleExport = async () => {
    try {
      const transcript = await exportTranscript(session.id);
      const url = URL.createObjectURL(transcript);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-transcript-${session.id}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export transcript:', error);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      <div>
        <h3 className="text-lg font-semibold text-white">
          {session.subject || 'Support Chat'}
        </h3>
        <p className="text-sm text-gray-400">
          Started {new Date(session.startedAt).toLocaleString()}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={handleExport}
          className="p-2 hover:bg-gray-700 rounded-lg"
          title="Export Chat"
        >
          <Download className="h-5 w-5 text-gray-400" />
        </button>
        <button
          onClick={() => closeChat(session.id)}
          className="p-2 hover:bg-gray-700 rounded-lg"
          title="Close Chat"
        >
          <X className="h-5 w-5 text-gray-400" />
        </button>
      </div>
    </div>
  );
}