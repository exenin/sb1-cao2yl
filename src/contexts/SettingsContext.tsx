import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  avatar?: string;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  language: string;
  timezone: string;
}

interface CompanyDetails {
  name: string;
  address: string;
  registrationNumber: string;
  vatNumber?: string;
  industry: string;
}

interface NotificationPreferences {
  email: {
    security: boolean;
    updates: boolean;
    marketing: boolean;
    billing: boolean;
  };
  push: {
    security: boolean;
    updates: boolean;
    billing: boolean;
  };
  alerts: {
    loginAttempts: boolean;
    serviceStatus: boolean;
    billingAlerts: boolean;
  };
}

interface CommunicationPreferences {
  preferredLanguage: string;
  timezone: string;
  contactMethod: 'email' | 'phone' | 'both';
  marketingConsent: boolean;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  loginHistory: Array<{
    date: string;
    ip: string;
    location: string;
    device: string;
  }>;
}

interface SettingsContextType {
  profile: UserProfile;
  company: CompanyDetails;
  notifications: NotificationPreferences;
  communication: CommunicationPreferences;
  security: SecuritySettings;
  isLoading: boolean;
  error: string | null;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  updateCompany: (data: Partial<CompanyDetails>) => Promise<void>;
  updateNotifications: (data: Partial<NotificationPreferences>) => Promise<void>;
  updateCommunication: (data: Partial<CommunicationPreferences>) => Promise<void>;
  updateSecurity: (data: Partial<SecuritySettings>) => Promise<void>;
  uploadAvatar: (file: File) => Promise<void>;
  enableTwoFactor: () => Promise<void>;
  disableTwoFactor: () => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const mockProfile: UserProfile = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+27 123 456 789',
  bio: 'IT Security Professional',
  language: 'en',
  timezone: 'Africa/Johannesburg'
};

const mockCompany: CompanyDetails = {
  name: 'Tech Corp',
  address: '123 Business Park, Johannesburg',
  registrationNumber: 'REG123456',
  vatNumber: 'VAT789012',
  industry: 'Technology'
};

const mockNotifications: NotificationPreferences = {
  email: {
    security: true,
    updates: true,
    marketing: false,
    billing: true
  },
  push: {
    security: true,
    updates: false,
    billing: true
  },
  alerts: {
    loginAttempts: true,
    serviceStatus: true,
    billingAlerts: true
  }
};

const mockCommunication: CommunicationPreferences = {
  preferredLanguage: 'en',
  timezone: 'Africa/Johannesburg',
  contactMethod: 'email',
  marketingConsent: false
};

const mockSecurity: SecuritySettings = {
  twoFactorEnabled: false,
  lastPasswordChange: '2024-03-01',
  loginHistory: [
    {
      date: '2024-03-15T10:30:00',
      ip: '192.168.1.1',
      location: 'Johannesburg, SA',
      device: 'Chrome on Windows'
    }
  ]
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [company, setCompany] = useState<CompanyDetails>(mockCompany);
  const [notifications, setNotifications] = useState<NotificationPreferences>(mockNotifications);
  const [communication, setCommunication] = useState<CommunicationPreferences>(mockCommunication);
  const [security, setSecurity] = useState<SecuritySettings>(mockSecurity);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (data: Partial<UserProfile>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(prev => ({ ...prev, ...data }));
    } catch (err) {
      setError('Failed to update profile');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCompany = async (data: Partial<CompanyDetails>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCompany(prev => ({ ...prev, ...data }));
    } catch (err) {
      setError('Failed to update company details');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateNotifications = async (data: Partial<NotificationPreferences>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setNotifications(prev => ({ ...prev, ...data }));
    } catch (err) {
      setError('Failed to update notification preferences');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateCommunication = async (data: Partial<CommunicationPreferences>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCommunication(prev => ({ ...prev, ...data }));
    } catch (err) {
      setError('Failed to update communication preferences');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateSecurity = async (data: Partial<SecuritySettings>) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSecurity(prev => ({ ...prev, ...data }));
    } catch (err) {
      setError('Failed to update security settings');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAvatar = async (file: File) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    } catch (err) {
      setError('Failed to upload avatar');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const enableTwoFactor = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSecurity(prev => ({ ...prev, twoFactorEnabled: true }));
    } catch (err) {
      setError('Failed to enable two-factor authentication');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const disableTwoFactor = async () => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSecurity(prev => ({ ...prev, twoFactorEnabled: false }));
    } catch (err) {
      setError('Failed to disable two-factor authentication');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (oldPassword: string, newPassword: string) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSecurity(prev => ({
        ...prev,
        lastPasswordChange: new Date().toISOString()
      }));
    } catch (err) {
      setError('Failed to change password');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SettingsContext.Provider value={{
      profile,
      company,
      notifications,
      communication,
      security,
      isLoading,
      error,
      updateProfile,
      updateCompany,
      updateNotifications,
      updateCommunication,
      updateSecurity,
      uploadAvatar,
      enableTwoFactor,
      disableTwoFactor,
      changePassword
    }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}