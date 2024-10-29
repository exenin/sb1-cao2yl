import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

interface AIAssistantProps {
  show: boolean;
  onClose: () => void;
  context: any;
}

export default function AIAssistant({ show, onClose, context }: AIAssistantProps) {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant',
      content: `I can help you analyze the ${context?.title || 'selected metric'}. What would you like to know?`
    }
  ]);
  const [input, setInput] = useState('');

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: input }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Here's my analysis of the ${context?.title}: [AI response would be generated based on context and user input]`
      }]);
    }, 1000);

    setInput('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-gray-800 shadow-lg flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-cyan-500" />
            <h3 className="font-semibold text-white">AI Assistant</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === 'assistant'
                    ? 'bg-gray-700 text-white'
                    : 'bg-cyan-500 text-black'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about this metric..."
              className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              type="submit"
              className="p-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}