import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SecurityMetric,
  SecurityAlert,
  SecurityIncident,
  ComplianceRequirement,
  SecurityAsset,
  SecurityPolicy,
  SecurityTraining,
  SecurityDashboardStats,
  JiraTicket,
  AIRecommendation,
  SecurityLevel,
  AlertStatus,
  ComplianceStatus
} from '../types/security';
import { useAuth } from './AuthContext';

interface SecurityContextType {
  metrics: SecurityMetric[];
  alerts: SecurityAlert[];
  incidents: SecurityIncident[];
  compliance: ComplianceRequirement[];
  assets: SecurityAsset[];
  policies: SecurityPolicy[];
  training: SecurityTraining[];
  dashboardStats: SecurityDashboardStats;
  jiraTickets: JiraTicket[];
  recommendations: AIRecommendation[];
  isLoading: boolean;
  error: string | null;
  createAlert: (data: Omit<SecurityAlert, 'id' | 'timestamp'>) => Promise<SecurityAlert>;
  updateAlert: (id: string, data: Partial<SecurityAlert>) => Promise<SecurityAlert>;
  resolveAlert: (id: string, resolution: string) => Promise<SecurityAlert>;
  createIncident: (data: Omit<SecurityIncident, 'id' | 'detectedAt'>) => Promise<SecurityIncident>;
  updateIncident: (id: string, data: Partial<SecurityIncident>) => Promise<SecurityIncident>;
  resolveIncident: (id: string, resolution: string) => Promise<SecurityIncident>;
  assessCompliance: (id: string, status: ComplianceStatus) => Promise<ComplianceRequirement>;
  updateAsset: (id: string, data: Partial<SecurityAsset>) => Promise<SecurityAsset>;
  createPolicy: (data: Omit<SecurityPolicy, 'id'>) => Promise<SecurityPolicy>;
  approvePolicy: (id: string) => Promise<SecurityPolicy>;
  createTraining: (data: Omit<SecurityTraining, 'id'>) => Promise<SecurityTraining>;
  syncJiraTickets: () => Promise<void>;
  getAIRecommendations: (context: string) => Promise<AIRecommendation[]>;
  generateSecurityReport: (filters: any) => Promise<Blob>;
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

export function SecurityProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState<SecurityMetric[]>([]);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);
  const [incidents, setIncidents] = useState<SecurityIncident[]>([]);
  const [compliance, setCompliance] = useState<ComplianceRequirement[]>([]);
  const [assets, setAssets] = useState<SecurityAsset[]>([]);
  const [policies, setPolicies] = useState<SecurityPolicy[]>([]);
  const [training, setTraining] = useState<SecurityTraining[]>([]);
  const [jiraTickets, setJiraTickets] = useState<JiraTicket[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [dashboardStats, setDashboardStats] = useState<SecurityDashboardStats>({
    activeAlerts: 0,
    openIncidents: 0,
    criticalVulnerabilities: 0,
    patchCompliance: 0,
    securityScore: 0,
    riskLevel: 'medium',
    complianceStatus: {
      compliant: 0,
      nonCompliant: 0,
      partial: 0
    },
    recentActivity: [],
    topThreats: []
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API calls
        await Promise.all([
          new Promise(resolve => setTimeout(resolve, 1000))
        ]);

        // Calculate dashboard stats
        const newStats: SecurityDashboardStats = {
          activeAlerts: alerts.filter(a => a.status === 'active').length,
          openIncidents: incidents.filter(i => i.status === 'open').length,
          criticalVulnerabilities: assets.reduce(
            (sum, asset) => sum + asset.vulnerabilities.high,
            0
          ),
          patchCompliance: calculatePatchCompliance(assets),
          securityScore: calculateSecurityScore(),
          riskLevel: calculateRiskLevel(),
          complianceStatus: {
            compliant: compliance.filter(c => c.status === 'compliant').length,
            nonCompliant: compliance.filter(c => c.status === 'non_compliant').length,
            partial: compliance.filter(c => c.status === 'partially_compliant').length
          },
          recentActivity: generateRecentActivity(),
          topThreats: calculateTopThreats()
        };

        setDashboardStats(newStats);
      } catch (err) {
        setError('Failed to load security data');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [alerts, incidents, assets, compliance]);

  const createAlert = async (data: Omit<SecurityAlert, 'id' | 'timestamp'>): Promise<SecurityAlert> => {
    const newAlert: SecurityAlert = {
      ...data,
      id: `alert_${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setAlerts(prev => [...prev, newAlert]);
    return newAlert;
  };

  const updateAlert = async (id: string, data: Partial<SecurityAlert>): Promise<SecurityAlert> => {
    const updatedAlert = alerts.find(a => a.id === id);
    if (!updatedAlert) throw new Error('Alert not found');
    
    const newAlert = { ...updatedAlert, ...data };
    setAlerts(prev => prev.map(a => a.id === id ? newAlert : a));
    return newAlert;
  };

  const resolveAlert = async (id: string, resolution: string): Promise<SecurityAlert> => {
    return updateAlert(id, {
      status: 'resolved',
      resolution
    });
  };

  const createIncident = async (data: Omit<SecurityIncident, 'id' | 'detectedAt'>): Promise<SecurityIncident> => {
    const newIncident: SecurityIncident = {
      ...data,
      id: `incident_${Date.now()}`,
      detectedAt: new Date().toISOString()
    };
    setIncidents(prev => [...prev, newIncident]);
    return newIncident;
  };

  const updateIncident = async (id: string, data: Partial<SecurityIncident>): Promise<SecurityIncident> => {
    const updatedIncident = incidents.find(i => i.id === id);
    if (!updatedIncident) throw new Error('Incident not found');
    
    const newIncident = { ...updatedIncident, ...data };
    setIncidents(prev => prev.map(i => i.id === id ? newIncident : i));
    return newIncident;
  };

  const resolveIncident = async (id: string, resolution: string): Promise<SecurityIncident> => {
    return updateIncident(id, {
      status: 'resolved',
      resolution,
      resolvedAt: new Date().toISOString()
    });
  };

  const assessCompliance = async (id: string, status: ComplianceStatus): Promise<ComplianceRequirement> => {
    const requirement = compliance.find(c => c.id === id);
    if (!requirement) throw new Error('Compliance requirement not found');
    
    const updatedRequirement = {
      ...requirement,
      status,
      lastAssessed: new Date().toISOString()
    };
    
    setCompliance(prev => prev.map(c => c.id === id ? updatedRequirement : c));
    return updatedRequirement;
  };

  const updateAsset = async (id: string, data: Partial<SecurityAsset>): Promise<SecurityAsset> => {
    const asset = assets.find(a => a.id === id);
    if (!asset) throw new Error('Asset not found');
    
    const updatedAsset = { ...asset, ...data };
    setAssets(prev => prev.map(a => a.id === id ? updatedAsset : a));
    return updatedAsset;
  };

  const createPolicy = async (data: Omit<SecurityPolicy, 'id'>): Promise<SecurityPolicy> => {
    const newPolicy: SecurityPolicy = {
      ...data,
      id: `policy_${Date.now()}`
    };
    setPolicies(prev => [...prev, newPolicy]);
    return newPolicy;
  };

  const approvePolicy = async (id: string): Promise<SecurityPolicy> => {
    const policy = policies.find(p => p.id === id);
    if (!policy) throw new Error('Policy not found');
    
    const updatedPolicy = {
      ...policy,
      status: 'active',
      approvedBy: user?.id,
      approvedAt: new Date().toISOString()
    };
    
    setPolicies(prev => prev.map(p => p.id === id ? updatedPolicy : p));
    return updatedPolicy;
  };

  const createTraining = async (data: Omit<SecurityTraining, 'id'>): Promise<SecurityTraining> => {
    const newTraining: SecurityTraining = {
      ...data,
      id: `training_${Date.now()}`
    };
    setTraining(prev => [...prev, newTraining]);
    return newTraining;
  };

  const syncJiraTickets = async (): Promise<void> => {
    // Simulate API call to sync Jira tickets
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Update jiraTickets state with new data
  };

  const getAIRecommendations = async (context: string): Promise<AIRecommendation[]> => {
    // Simulate API call to get AI recommendations
    await new Promise(resolve => setTimeout(resolve, 1000));
    return recommendations;
  };

  const generateSecurityReport = async (filters: any): Promise<Blob> => {
    // Simulate report generation
    await new Promise(resolve => setTimeout(resolve, 1000));
    return new Blob(['Security Report'], { type: 'text/plain' });
  };

  return (
    <SecurityContext.Provider value={{
      metrics,
      alerts,
      incidents,
      compliance,
      assets,
      policies,
      training,
      dashboardStats,
      jiraTickets,
      recommendations,
      isLoading,
      error,
      createAlert,
      updateAlert,
      resolveAlert,
      createIncident,
      updateIncident,
      resolveIncident,
      assessCompliance,
      updateAsset,
      createPolicy,
      approvePolicy,
      createTraining,
      syncJiraTickets,
      getAIRecommendations,
      generateSecurityReport
    }}>
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}

// Helper functions
function calculatePatchCompliance(assets: SecurityAsset[]): number {
  if (assets.length === 0) return 100;
  
  const totalPatches = assets.reduce((sum, asset) => 
    sum + asset.patches.installed + asset.patches.pending + asset.patches.failed, 0);
  
  if (totalPatches === 0) return 100;
  
  const installedPatches = assets.reduce((sum, asset) => 
    sum + asset.patches.installed, 0);
  
  return Math.round((installedPatches / totalPatches) * 100);
}

function calculateSecurityScore(): number {
  // Implement security score calculation logic
  return 78;
}

function calculateRiskLevel(): SecurityLevel {
  // Implement risk level calculation logic
  return 'medium';
}

function generateRecentActivity(): { timestamp: string; type: string; description: string; }[] {
  // Implement recent activity generation logic
  return [];
}

function calculateTopThreats(): { name: string; count: number; trend: 'up' | 'down' | 'stable'; }[] {
  // Implement top threats calculation logic
  return [];
}