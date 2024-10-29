import { ServicePackage, ServiceCategory } from '../types/services';

// Mock data - replace with actual API calls
const MOCK_CATEGORIES: ServiceCategory[] = [
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Solutions',
    description: 'Comprehensive security assessments and protection',
    icon: 'Shield'
  },
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    description: 'Modern solutions for business evolution',
    icon: 'Rocket'
  },
  // Add more categories as needed
];

const MOCK_PACKAGES: ServicePackage[] = [
  {
    id: 'basic-security',
    name: 'Basic Security Package',
    description: 'Essential security features for small businesses',
    features: [
      '24/7 Monitoring',
      'Vulnerability Scanning',
      'Incident Response'
    ],
    price: {
      monthly: 499,
      hourly: 150,
      callout: 250,
      afterHours: 300
    },
    category: 'cybersecurity'
  },
  // Add more packages as needed
];

export const api = {
  getCategories: async (): Promise<ServiceCategory[]> => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => resolve(MOCK_CATEGORIES), 500);
    });
  },

  getPackages: async (): Promise<ServicePackage[]> => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => resolve(MOCK_PACKAGES), 500);
    });
  },

  createPackage: async (data: Omit<ServicePackage, 'id'>): Promise<ServicePackage> => {
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        const newPackage: ServicePackage = {
          id: `pkg_${Date.now()}`,
          ...data
        };
        MOCK_PACKAGES.push(newPackage);
        resolve(newPackage);
      }, 500);
    });
  },

  updatePackage: async (id: string, data: Partial<ServicePackage>): Promise<ServicePackage> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = MOCK_PACKAGES.findIndex(pkg => pkg.id === id);
        if (index === -1) {
          reject(new Error('Package not found'));
          return;
        }
        MOCK_PACKAGES[index] = { ...MOCK_PACKAGES[index], ...data };
        resolve(MOCK_PACKAGES[index]);
      }, 500);
    });
  },

  deletePackage: async (id: string): Promise<void> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = MOCK_PACKAGES.findIndex(pkg => pkg.id === id);
        if (index === -1) {
          reject(new Error('Package not found'));
          return;
        }
        MOCK_PACKAGES.splice(index, 1);
        resolve();
      }, 500);
    });
  }
};