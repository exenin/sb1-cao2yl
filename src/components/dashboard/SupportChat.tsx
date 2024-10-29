import React, { useEffect } from 'react';
import { useChat } from '../../contexts/ChatContext';
import ChatWindow from '../chat/ChatWindow';
import { MessageSquare } from 'lucide-react';

export default function SupportChat() {
  const { connect, startChat, currentSession, isLoading, error } = useChat();

  useEffect(() => {
    const initializeChat = async () => {
      try {
        await connect();
        if (!currentSession) {
          await startChat('Technical Support');
        }
      } catch (err) {
        console.error('Failed to initialize chat:', err);
      }
    };

    initializeChat();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-16rem)] text-gray-400">
        <MessageSquare className="h-12 w-12 mb-4" />
        <p className="text-lg mb-4">Failed to load chat</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="h-full min-h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Customer Support</h2>
        <p className="text-gray-400">Chat with our support team for assistance</p>
      </div>

      <div className="bg-gray-800 rounded-lg h-[calc(100vh-16rem)]">
        <ChatWindow />
      </div>
    </div>
  );
}