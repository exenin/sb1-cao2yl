import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServicePackage, ServiceCategory } from '../types/pricing';
import { serviceCategories as initialServices } from '../data/services';

interface ServiceContextType {
  categories: ServiceCategory[];
  subscribedServices: ServicePackage[];
  addService: (categoryId: string, packageId: string) => Promise<void>;
  removeService: (packageId: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [subscribedServices, setSubscribedServices] = useState<ServicePackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadServices = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        setCategories(initialServices);
        
        // Load initial subscribed services
        const mockSubscribed = initialServices[0].packages.slice(0, 2);
        setSubscribedServices(mockSubscribed);
      } catch (err) {
        setError('Failed to load services');
      } finally {
        setIsLoading(false);
      }
    };

    loadServices();
  }, []);

  const addService = async (categoryId: string, packageId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const category = categories.find(c => c.id === categoryId);
      const servicePackage = category?.packages.find(p => p.id === packageId);
      
      if (servicePackage) {
        setSubscribedServices(prev => [...prev, servicePackage]);
      }
    } catch (err) {
      setError('Failed to add service');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const removeService = async (packageId: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setSubscribedServices(prev => prev.filter(s => s.id !== packageId));
    } catch (err) {
      setError('Failed to remove service');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ServiceContext.Provider value={{
      categories,
      subscribedServices,
      addService,
      removeService,
      isLoading,
      error
    }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
}