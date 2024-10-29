import { User, UserProfile, UserStatus } from '../types/user';
import { Invoice, InvoiceStatus } from '../types/invoice';
import { ServicePackage } from '../types/services';
import { ChatSession, ChatMessage } from '../types/chat';

// Mock Companies
export const mockCompanies = [
  {
    id: 'comp_1',
    name: 'TechCorp Solutions',
    registrationNumber: '2020/123456/07',
    vatNumber: '4530178294',
    address: '123 Innovation Drive, Sandton, Johannesburg, 2196',
    industry: 'Technology',
    size: '50-100',
    website: 'www.techcorp.co.za'
  },
  {
    id: 'comp_2',
    name: 'Global Logistics SA',
    registrationNumber: '2019/987654/07',
    vatNumber: '4890173265',
    address: '45 Transport Way, Cape Town, 8001',
    industry: 'Logistics',
    size: '100-250',
    website: 'www.globallogistics.co.za'
  },
  {
    id: 'comp_3',
    name: 'FinServ Holdings',
    registrationNumber: '2018/456789/07',
    vatNumber: '4670192834',
    address: '789 Financial District, Umhlanga, Durban, 4319',
    industry: 'Financial Services',
    size: '250-500',
    website: 'www.finserv.co.za'
  }
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: 'user_1',
    email: 'admin@cyberallstars.com',
    role: 'admin',
    permissions: ['all'],
    profile: {
      firstName: 'Admin',
      lastName: 'User',
      phone: '+27 71 489 0871',
      company: 'CyberAllStars',
      position: 'System Administrator',
      department: 'IT',
      location: 'Cape Town',
      timezone: 'Africa/Johannesburg',
      language: 'en'
    },
    status: {
      isActive: true,
      lastLogin: '2024-03-15T08:00:00Z',
      loginCount: 245,
      failedLoginAttempts: 0,
      isSuspended: false
    },
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2024-03-15T08:00:00Z',
    lastPasswordChange: '2024-02-01T00:00:00Z',
    requiresPasswordChange: false,
    twoFactorEnabled: true
  },
  {
    id: 'user_2',
    email: 'john.smith@techcorp.co.za',
    role: 'customer_company',
    permissions: ['view_services', 'manage_company_users', 'view_invoices'],
    profile: {
      firstName: 'John',
      lastName: 'Smith',
      phone: '+27 82 123 4567',
      company: 'TechCorp Solutions',
      position: 'IT Director',
      department: 'Information Technology',
      location: 'Johannesburg',
      timezone: 'Africa/Johannesburg',
      language: 'en'
    },
    status: {
      isActive: true,
      lastLogin: '2024-03-14T15:30:00Z',
      loginCount: 56,
      failedLoginAttempts: 0,
      isSuspended: false
    },
    createdAt: '2023-06-15T00:00:00Z',
    updatedAt: '2024-03-14T15:30:00Z',
    lastPasswordChange: '2024-01-15T00:00:00Z',
    requiresPasswordChange: false,
    twoFactorEnabled: true
  },
  {
    id: 'user_3',
    email: 'sarah.jones@globallogistics.co.za',
    role: 'customer_company',
    permissions: ['view_services', 'manage_company_users', 'view_invoices'],
    profile: {
      firstName: 'Sarah',
      lastName: 'Jones',
      phone: '+27 83 987 6543',
      company: 'Global Logistics SA',
      position: 'Security Manager',
      department: 'Security',
      location: 'Cape Town',
      timezone: 'Africa/Johannesburg',
      language: 'en'
    },
    status: {
      isActive: true,
      lastLogin: '2024-03-15T09:15:00Z',
      loginCount: 34,
      failedLoginAttempts: 0,
      isSuspended: false
    },
    createdAt: '2023-09-01T00:00:00Z',
    updatedAt: '2024-03-15T09:15:00Z',
    lastPasswordChange: '2024-02-28T00:00:00Z',
    requiresPasswordChange: false,
    twoFactorEnabled: true
  }
];

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: 'inv_1',
    number: 'INV-2024-001',
    issueDate: '2024-03-01T00:00:00Z',
    dueDate: '2024-03-31T00:00:00Z',
    customerId: 'comp_1',
    items: [
      {
        description: 'Advanced Security Package - March 2024',
        quantity: 1,
        unitPrice: 35000,
        total: 35000
      },
      {
        description: 'Additional Security Assessment',
        quantity: 1,
        unitPrice: 15000,
        total: 15000
      }
    ],
    subtotal: 50000,
    taxTotal: 7500,
    total: 57500,
    currency: 'ZAR',
    status: 'pending',
    terms: 'Net 30',
    notes: 'Thank you for your business',
    paymentMethod: 'bank_transfer',
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  },
  {
    id: 'inv_2',
    number: 'INV-2024-002',
    issueDate: '2024-02-01T00:00:00Z',
    dueDate: '2024-02-29T00:00:00Z',
    customerId: 'comp_2',
    items: [
      {
        description: 'Cloud Security Package - February 2024',
        quantity: 1,
        unitPrice: 40000,
        total: 40000
      }
    ],
    subtotal: 40000,
    taxTotal: 6000,
    total: 46000,
    currency: 'ZAR',
    status: 'paid',
    paidAt: '2024-02-15T00:00:00Z',
    terms: 'Net 30',
    notes: 'Thank you for your business',
    paymentMethod: 'credit_card',
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z'
  }
];

// Mock Chat Sessions
export const mockChatSessions: ChatSession[] = [
  {
    id: 'chat_1',
    customerId: 'user_2',
    agentId: 'user_1',
    status: 'active',
    subject: 'Security Package Inquiry',
    startedAt: '2024-03-15T10:00:00Z',
    rating: 5,
    messages: [
      {
        id: 'msg_1',
        chatId: 'chat_1',
        senderId: 'user_2',
        content: 'Hi, I need information about upgrading our security package.',
        timestamp: '2024-03-15T10:00:00Z',
        status: 'read'
      },
      {
        id: 'msg_2',
        chatId: 'chat_1',
        senderId: 'user_1',
        content: 'Hello! I\'d be happy to help you with that. Which specific aspects of security are you looking to enhance?',
        timestamp: '2024-03-15T10:01:00Z',
        status: 'read'
      }
    ],
    lastMessageAt: '2024-03-15T10:01:00Z',
    unreadCount: 0
  }
];

// AI Assistant Responses
export const mockAIResponses = {
  metrics: {
    revenue: {
      title: 'Revenue Analysis',
      suggestions: [
        'Monthly revenue has increased by 15% compared to last month',
        'Consider implementing volume discounts for long-term clients',
        'Opportunity to upsell security packages to existing clients'
      ]
    },
    security: {
      title: 'Security Metrics',
      suggestions: [
        'Recent increase in attempted breaches detected',
        'Recommend enabling additional security features',
        'Schedule security awareness training for team members'
      ]
    },
    performance: {
      title: 'System Performance',
      suggestions: [
        'Cloud resources operating at optimal levels',
        'Consider scaling up during peak usage hours',
        'Implement automated scaling policies'
      ]
    }
  },
  recommendations: [
    {
      context: 'security',
      suggestion: 'Based on your current security posture, consider implementing:',
      items: [
        'Enhanced endpoint protection',
        'Regular security audits',
        'Advanced threat monitoring'
      ]
    },
    {
      context: 'optimization',
      suggestion: 'To optimize your cloud infrastructure:',
      items: [
        'Implement auto-scaling policies',
        'Review resource allocation',
        'Enable cost optimization features'
      ]
    }
  ]
};

// Service Usage Data
export const mockServiceUsage = [
  {
    customerId: 'comp_1',
    services: [
      {
        id: 'advanced-security',
        usage: {
          scanCount: 156,
          alertsGenerated: 23,
          threatsBlocked: 89,
          lastScan: '2024-03-15T06:00:00Z'
        }
      }
    ]
  },
  {
    customerId: 'comp_2',
    services: [
      {
        id: 'cloud-compliance',
        usage: {
          resourcesMonitored: 45,
          complianceScore: 94,
          lastAudit: '2024-03-14T00:00:00Z'
        }
      }
    ]
  }
];

// Support Tickets
export const mockSupportTickets = [
  {
    id: 'ticket_1',
    customerId: 'comp_1',
    subject: 'Security Alert Configuration',
    description: 'Need assistance configuring security alert thresholds',
    priority: 'medium',
    status: 'open',
    createdAt: '2024-03-15T08:30:00Z',
    updatedAt: '2024-03-15T08:30:00Z',
    assignedTo: 'user_1'
  },
  {
    id: 'ticket_2',
    customerId: 'comp_2',
    subject: 'Cloud Resource Optimization',
    description: 'Request for cloud resource usage review and optimization',
    priority: 'low',
    status: 'in-progress',
    createdAt: '2024-03-14T15:45:00Z',
    updatedAt: '2024-03-15T09:00:00Z',
    assignedTo: 'user_1'
  }
];