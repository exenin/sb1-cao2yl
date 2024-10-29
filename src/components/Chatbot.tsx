import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: input, isBot: false }]);
    
    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Thanks for your message! One of our team members will get back to you soon.",
        isBot: true
      }]);
    }, 1000);

    setInput("");
  };

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 p-4 bg-cyan-500 text-white rounded-full shadow-lg hover:bg-cyan-600 transition-colors duration-300 z-50 ${isOpen ? 'hidden' : ''}`}
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col z-50">
          {/* Header */}
          <div className="p-4 bg-cyan-500 text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">CyberAllStars Chat</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-200 transition-colors duration-300"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-cyan-500 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-2 border rounded-md focus:outline-none focus:border-cyan-500"
              />
              <button
                type="submit"
                className="p-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-colors duration-300"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}