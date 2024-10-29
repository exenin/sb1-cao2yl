import React, { createContext, useContext, useState } from 'react';

interface ConfigContextType {
  forumEndpoint: string;
  setForumEndpoint: (url: string) => void;
  apiEndpoint: string;
  setApiEndpoint: (url: string) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

// In Vite, environment variables are exposed through import.meta.env
const DEFAULT_FORUM_ENDPOINT = import.meta.env.VITE_FORUM_ENDPOINT || 'https://api.cyberallstars.com/forum';
const DEFAULT_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'https://api.cyberallstars.com/v1';

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [forumEndpoint, setForumEndpoint] = useState(DEFAULT_FORUM_ENDPOINT);
  const [apiEndpoint, setApiEndpoint] = useState(DEFAULT_API_ENDPOINT);

  return (
    <ConfigContext.Provider value={{
      forumEndpoint,
      setForumEndpoint,
      apiEndpoint,
      setApiEndpoint
    }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}