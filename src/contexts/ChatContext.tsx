import React, { createContext, useContext, useState } from 'react';
import { 
  ChatSession, 
  ChatMessage, 
  ChatParticipant,
  QuickResponse,
  MessageStatus 
} from '../types/chat';
import { mockChatSessions } from '../data/mockData';

interface ChatContextType {
  currentSession: ChatSession | null;
  participants: ChatParticipant[];
  quickResponses: QuickResponse[];
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  startChat: (subject: string) => Promise<void>;
  sendMessage: (content: string, attachments?: File[]) => Promise<void>;
  setTyping: (isTyping: boolean) => void;
  closeChat: (sessionId: string) => Promise<void>;
  exportTranscript: (sessionId: string) => Promise<Blob>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [currentSession, setCurrentSession] = useState<ChatSession | null>(null);
  const [participants, setParticipants] = useState<ChatParticipant[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quickResponses: QuickResponse[] = [
    {
      id: '1',
      title: 'Welcome',
      content: 'Hello! How can I assist you today?',
      tags: ['greeting'],
      createdBy: 'system',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  const connect = async () => {
    setIsLoading(true);
    try {
      // Simulate connection setup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Load mock session if exists
      const mockSession = mockChatSessions[0];
      if (mockSession) {
        setCurrentSession(mockSession);
        setParticipants([
          {
            id: 'agent_1',
            name: 'Support Agent',
            email: 'support@cyberallstars.com',
            role: 'agent',
            status: 'online',
            lastActive: new Date().toISOString()
          },
          {
            id: 'customer_1',
            name: 'John Smith',
            email: 'john@example.com',
            role: 'customer',
            status: 'online',
            lastActive: new Date().toISOString()
          }
        ]);
      }
    } catch (err) {
      setError('Failed to connect to chat service');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setCurrentSession(null);
    setParticipants([]);
  };

  const startChat = async (subject: string) => {
    setIsLoading(true);
    try {
      // Simulate chat session creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSession: ChatSession = {
        id: `chat_${Date.now()}`,
        customerId: 'customer_1',
        status: 'active',
        subject,
        startedAt: new Date().toISOString(),
        messages: [],
        lastMessageAt: new Date().toISOString(),
        unreadCount: 0
      };

      setCurrentSession(newSession);
    } catch (err) {
      setError('Failed to start chat session');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const sendMessage = async (content: string, attachments?: File[]) => {
    if (!currentSession) {
      throw new Error('No active chat session');
    }

    setIsLoading(true);
    try {
      // Simulate message sending
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newMessage: ChatMessage = {
        id: `msg_${Date.now()}`,
        chatId: currentSession.id,
        senderId: 'customer_1',
        content,
        timestamp: new Date().toISOString(),
        status: 'sent'
      };

      setCurrentSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          messages: [...prev.messages, newMessage],
          lastMessageAt: newMessage.timestamp
        };
      });

      // Simulate agent response
      setTimeout(() => {
        const agentResponse: ChatMessage = {
          id: `msg_${Date.now()}`,
          chatId: currentSession.id,
          senderId: 'agent_1',
          content: 'Thank you for your message. How can I help you today?',
          timestamp: new Date().toISOString(),
          status: 'sent'
        };

        setCurrentSession(prev => {
          if (!prev) return null;
          return {
            ...prev,
            messages: [...prev.messages, agentResponse],
            lastMessageAt: agentResponse.timestamp
          };
        });
      }, 1000);
    } catch (err) {
      setError('Failed to send message');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const setTyping = (isTyping: boolean) => {
    setParticipants(prev => 
      prev.map(p => p.role === 'customer' ? { ...p, typing: isTyping } : p)
    );
  };

  const closeChat = async (sessionId: string) => {
    setIsLoading(true);
    try {
      // Simulate closing chat session
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCurrentSession(prev => {
        if (!prev || prev.id !== sessionId) return prev;
        return {
          ...prev,
          status: 'closed',
          endedAt: new Date().toISOString()
        };
      });
    } catch (err) {
      setError('Failed to close chat session');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const exportTranscript = async (sessionId: string): Promise<Blob> => {
    if (!currentSession || currentSession.id !== sessionId) {
      throw new Error('Chat session not found');
    }

    // Generate transcript text
    const transcript = currentSession.messages
      .map(msg => {
        const sender = participants.find(p => p.id === msg.senderId);
        return `[${new Date(msg.timestamp).toLocaleString()}] ${sender?.name}: ${msg.content}`;
      })
      .join('\n');

    return new Blob([transcript], { type: 'text/plain' });
  };

  return (
    <ChatContext.Provider value={{
      currentSession,
      participants,
      quickResponses,
      isLoading,
      error,
      connect,
      disconnect,
      startChat,
      sendMessage,
      setTyping,
      closeChat,
      exportTranscript
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}