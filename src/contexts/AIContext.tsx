import React, { createContext, useContext, useState } from 'react';
import { mockAIResponses } from '../data/mockData';

interface AIContextType {
  analyzeMetric: (metricType: string, data: any) => Promise<{
    title: string;
    suggestions: string[];
  }>;
  getRecommendations: (context: string) => Promise<{
    suggestion: string;
    items: string[];
  }>;
  isLoading: boolean;
  error: string | null;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeMetric = async (metricType: string, data: any) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const analysis = mockAIResponses.metrics[metricType as keyof typeof mockAIResponses.metrics];
      if (!analysis) {
        throw new Error('Invalid metric type');
      }
      
      return analysis;
    } catch (err) {
      setError('Failed to analyze metric');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const getRecommendations = async (context: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const recommendation = mockAIResponses.recommendations.find(r => r.context === context);
      if (!recommendation) {
        throw new Error('No recommendations found for context');
      }
      
      return recommendation;
    } catch (err) {
      setError('Failed to get recommendations');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AIContext.Provider value={{
      analyzeMetric,
      getRecommendations,
      isLoading,
      error
    }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}