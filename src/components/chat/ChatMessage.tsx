import React from 'react';
import { Check, CheckCheck, Clock } from 'lucide-react';
import { ChatMessage as ChatMessageType, ChatParticipant } from '../../types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
  participant?: ChatParticipant;
}

export default function ChatMessage({ message, participant }: ChatMessageProps) {
  const getStatusIcon = () => {
    switch (message.status) {
      case 'sent':
        return <Check className="h-4 w-4" />;
      case 'delivered':
        return <CheckCheck className="h-4 w-4" />;
      case 'read':
        return <CheckCheck className="h-4 w-4 text-cyan-500" />;
      case 'failed':
        return <Clock className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex ${participant?.role === 'agent' ? 'justify-start' : 'justify-end'}`}>
      <div className="flex items-start max-w-[70%] space-x-2">
        {participant?.role === 'agent' && (
          <div className="flex-shrink-0">
            {participant.avatar ? (
              <img
                src={participant.avatar}
                alt={participant.name}
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <div className="h-8 w-8 rounded-full bg-cyan-500 flex items-center justify-center">
                <span className="text-black font-medium">
                  {participant.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        )}
        
        <div className={`flex flex-col ${participant?.role === 'agent' ? 'items-start' : 'items-end'}`}>
          {participant?.role === 'agent' && (
            <span className="text-sm text-gray-400 mb-1">{participant.name}</span>
          )}
          
          <div className={`rounded-lg p-3 ${
            participant?.role === 'agent'
              ? 'bg-gray-700 text-white'
              : 'bg-cyan-500 text-black'
          }`}>
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          </div>
          
          <div className="flex items-center mt-1 space-x-2">
            <span className="text-xs text-gray-400">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
            {getStatusIcon()}
          </div>
        </div>
      </div>
    </div>
  );
}