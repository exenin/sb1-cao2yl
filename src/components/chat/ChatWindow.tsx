import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import ChatMessage from './ChatMessage';
import ChatHeader from './ChatHeader';

export default function ChatWindow() {
  const {
    currentSession,
    participants,
    sendMessage,
    setTyping,
    isLoading
  } = useChat();

  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentSession?.messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await sendMessage(message);
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    setTyping(true);
    
    // Debounce typing indicator
    const timeout = setTimeout(() => setTyping(false), 1000);
    return () => clearTimeout(timeout);
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      try {
        await sendMessage('', Array.from(e.target.files));
        e.target.value = '';
      } catch (error) {
        console.error('Failed to upload file:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!currentSession) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-400">
        <p>No active chat session</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-800 rounded-lg overflow-hidden">
      <ChatHeader session={currentSession} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {currentSession.messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            participant={participants.find(p => p.id === message.senderId)}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
        <div className="flex items-end space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={handleTyping}
              placeholder="Type your message..."
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              rows={1}
              style={{ minHeight: '42px', maxHeight: '120px' }}
            />
            <div className="absolute right-2 bottom-2 flex items-center space-x-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-1 hover:bg-gray-600 rounded-full"
              >
                <Paperclip className="h-4 w-4 text-gray-400" />
              </button>
              <button
                type="button"
                className="p-1 hover:bg-gray-600 rounded-full"
              >
                <Smile className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
          <button
            type="submit"
            disabled={!message.trim()}
            className="p-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          multiple
          onChange={handleFileSelect}
        />
      </form>
    </div>
  );
}