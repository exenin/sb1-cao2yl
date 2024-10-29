```typescript
export type SecurityLevel = 'low' | 'medium' | 'high' | 'critical';
export type AlertStatus = 'active' | 'investigating' | 'resolved' | 'false_positive';
export type ComplianceStatus = 'compliant' | 'non_compliant' | 'partially_compliant' | 'not_applicable';

export interface SecurityMetric {
  id: string;
  name: string;
  value: number;
  trend: number;
  status: 'improving' | 'declining' | 'stable';
  category: string;
  description: string;
  recommendations: string[];
  lastUpdated: string;
}

export interface SecurityAlert {
  id: string;
  title: string;
  description: string;
  level: SecurityLevel;
  status: AlertStatus;
  source: string;
  timestamp: string;
  affectedSystems: string[];
  recommendations: string[];
  assignedTo?: string;
  resolvedAt?: string;
  resolution?: string;
}

export interface SecurityIncident {
  id: string;
  alertId?: string;
  title: string;
  description: string;
  level: SecurityLevel;
  status: 'open' | 'investigating' | 'contained' | 'resolved';
  detectedAt: string;
  resolvedAt?: string;
  affectedSystems: string[];
  timeline: {
    timestamp: string;
    action: string;
    performedBy: string;
  }[];
  rootCause?: string;
  resolution?: string;
  preventiveMeasures?: string[];
}

export interface ComplianceRequirement {
  id: string;
  framework: string;
  control: string;
  description: string;
  status: ComplianceStatus;
  evidence?: string[];
  lastAssessed: string;
  nextAssessment: string;
  assignedTo?: string;
  notes?: string;
}

export interface SecurityAsset {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance';
  criticality: SecurityLevel;
  location: string;
  owner: string;
  lastAssessment?: string;
  vulnerabilities: {
    high: number;
    medium: number;
    low: number;
  };
  patches: {
    installed: number;
    pending: number;
    failed: number;
  };
  compliance: {
    status: ComplianceStatus;
    frameworks: string[];
  };
}

export interface SecurityPolicy {
  id: string;
  title: string;
  description: string;
  version: string;
  status: 'draft' | 'active' | 'archived';
  category: string;
  applicableTo: string[];
  lastReviewed: string;
  nextReview: string;
  approvedBy?: string;
  approvedAt?: string;
  content: string;
}

export interface SecurityTraining {
  id: string;
  title: string;
  description: string;
  type: 'mandatory' | 'optional';
  status: 'active' | 'archived';
  duration: number;
  targetAudience: string[];
  completions: number;
  averageScore: number;
  lastUpdated: string;
  modules: {
    id: string;
    title: string;
    duration: number;
    order: number;
  }[];
}

export interface SecurityDashboardStats {
  activeAlerts: number;
  openIncidents: number;
  criticalVulnerabilities: number;
  patchCompliance: number;
  securityScore: number;
  riskLevel: SecurityLevel;
  complianceStatus: {
    compliant: number;
    nonCompliant: number;
    partial: number;
  };
  recentActivity: {
    timestamp: string;
    type: string;
    description: string;
  }[];
  topThreats: {
    name: string;
    count: number;
    trend: 'up' | 'down' | 'stable';
  }[];
}

export interface JiraTicket {
  id: string;
  key: string;
  summary: string;
  description: string;
  status: string;
  priority: string;
  assignee?: string;
  reporter: string;
  created: string;
  updated: string;
  dueDate?: string;
  labels: string[];
  linkedItems?: string[];
}

export interface AIRecommendation {
  id: string;
  context: string;
  recommendation: string;
  priority: SecurityLevel;
  impact: string;
  effort: 'low' | 'medium' | 'high';
  steps: string[];
  resources: string[];
  automatable: boolean;
}
```