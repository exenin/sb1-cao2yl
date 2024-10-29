import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import ChatWindow from './ChatWindow';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { connect, disconnect } = useChat();

  const handleToggle = async () => {
    if (!isOpen) {
      await connect();
    } else {
      disconnect();
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={handleToggle}
        className={`fixed bottom-4 right-4 p-4 rounded-full shadow-lg z-50 transition-colors ${
          isOpen ? 'bg-gray-600 hover:bg-gray-500' : 'bg-cyan-500 hover:bg-cyan-400'
        }`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageSquare className="h-6 w-6 text-black" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-96 h-[600px] bg-gray-800 rounded-lg shadow-xl z-50">
          <ChatWindow />
        </div>
      )}
    </>
  );
}