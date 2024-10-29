import { ServiceCategory } from '../types/pricing';

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'cybersecurity',
    name: 'Cybersecurity Solutions',
    description: 'Comprehensive security solutions for modern businesses',
    packages: [
      {
        id: 'basic-security',
        name: 'Basic Security Package',
        description: 'Essential security features for small businesses',
        category: 'cybersecurity',
        pricingModel: 'monthly',
        price: 25000,
        currency: 'ZAR',
        features: [
          'Cyber Risk Assessment',
          'Vulnerability Assessment',
          'Penetration Testing (Light)',
          'Basic Threat Monitoring',
          'Security Awareness Training'
        ],
        sop: [
          'Conduct a Cyber Risk Assessment to identify vulnerabilities',
          'Perform a Vulnerability Assessment to highlight weaknesses',
          'Execute Penetration Testing (Light) to simulate attacks',
          'Security policy review',
          'Employee training sessions'
        ],
        valueAdd: [
          'Provides a foundational understanding of current security posture',
          'Enhances preparedness against potential cyber threats',
          'Meet basic compliance requirements',
          'Reduce risk of breaches',
          'Build security awareness'
        ]
      },
      {
        id: 'advanced-security',
        name: 'Advanced Security Package',
        description: 'Comprehensive security for growing organizations',
        category: 'cybersecurity',
        pricingModel: 'monthly',
        price: 35000,
        currency: 'ZAR',
        features: [
          'All Basic Package Features',
          'Virtual CISO Services',
          'Container Security Assessment',
          'Full Penetration Testing',
          'Advanced Threat Detection',
          'Incident Response Planning'
        ],
        sop: [
          'Include all services from the Basic Package',
          'Offer Virtual CISO Services for strategic oversight',
          'Conduct Container Security assessments',
          'Perform Full Penetration Testing',
          'Security architecture review',
          'Regular security meetings'
        ],
        valueAdd: [
          'Strengthens security strategy with ongoing expert guidance',
          'Comprehensive testing helps identify critical vulnerabilities',
          'Enhanced compliance readiness',
          'Reduced incident response time',
          'Improved security maturity'
        ]
      },
      {
        id: 'premium-security',
        name: 'Premium Security Package',
        description: 'Enterprise-grade security solutions',
        category: 'cybersecurity',
        pricingModel: 'monthly',
        price: 50000,
        currency: 'ZAR',
        features: [
          'All Advanced Package Features',
          'Custom Security Policies',
          'Real-time Threat Intelligence',
          '24/7 SOC Services',
          'Advanced EDR Solutions',
          'Security Automation'
        ],
        sop: [
          'Incorporate all items from the Advanced Package',
          'Develop Custom Security Policies',
          'Implement Continuous Security Monitoring',
          'Threat hunting',
          'Automated response setup',
          'Regular board reporting'
        ],
        valueAdd: [
          'Enterprise-grade security',
          'Customized security strategy',
          'Minimized breach impact',
          'Regulatory compliance',
          'Competitive advantage'
        ]
      }
    ]
  },
  {
    id: 'digital-transformation',
    name: 'Digital Transformation',
    description: 'Modern solutions for business evolution',
    packages: [
      {
        id: 'startup-accelerator',
        name: 'Startup Accelerator Package',
        description: 'Digital transformation solutions for startups',
        category: 'digital-transformation',
        pricingModel: 'monthly',
        price: 30000,
        currency: 'ZAR',
        features: [
          'Digital Strategy Development',
          'Secure Application Design',
          'Cloud Infrastructure Setup',
          'Basic Analytics Integration',
          'Security Best Practices'
        ],
        sop: [
          'Develop a comprehensive digital strategy',
          'Securely design and develop applications',
          'Set up cloud infrastructure',
          'Implement analytics tracking',
          'Security best practices integration'
        ],
        valueAdd: [
          'Provides startups with a clear roadmap for digital growth',
          'Embeds security from the start',
          'Scalable architecture',
          'Future-proof technology',
          'Competitive advantage'
        ]
      },
      {
        id: 'enterprise-growth',
        name: 'Enterprise Growth Package',
        description: 'Comprehensive digital transformation for enterprises',
        category: 'digital-transformation',
        pricingModel: 'monthly',
        price: 60000,
        currency: 'ZAR',
        features: [
          'All Startup Package Features',
          'Full Cloud Migration',
          'Process Automation',
          'CI/CD Implementation',
          'Advanced Analytics',
          'Custom Security Controls'
        ],
        sop: [
          'Include all items from Startup Package',
          'Execute Full Cloud Migration',
          'Implement Digital Process Automation',
          'Set up CI/CD Pipelines',
          'Advanced analytics implementation',
          'Custom security controls setup'
        ],
        valueAdd: [
          'Enhances scalability through cloud adoption',
          'Streamlined processes reduce time to market',
          'Improved operational efficiency',
          'Data-driven insights',
          'Digital leadership'
        ]
      }
    ]
  },
  {
    id: 'cloud-services',
    name: 'Cloud Services',
    description: 'Comprehensive cloud solutions and management',
    packages: [
      {
        id: 'cloud-setup',
        name: 'Cloud Setup & Migration',
        description: 'Complete cloud migration and setup services',
        category: 'cloud-services',
        pricingModel: 'monthly',
        price: 20000,
        currency: 'ZAR',
        features: [
          'Infrastructure Assessment',
          'Migration Strategy',
          'Basic Security Setup',
          'Performance Monitoring',
          'Cost Management'
        ],
        sop: [
          'Assess current IT infrastructure',
          'Define migration strategy',
          'Execute cloud migration',
          'Establish initial security',
          'Set up monitoring'
        ],
        valueAdd: [
          'Smooth transition to cloud',
          'Minimal disruptions',
          'Initial security setup',
          'Cost optimization',
          'Performance baseline'
        ]
      },
      {
        id: 'cloud-optimization',
        name: 'Cloud Optimization',
        description: 'Ongoing cloud optimization and security',
        category: 'cloud-services',
        pricingModel: 'monthly',
        price: 30000,
        currency: 'ZAR',
        features: [
          'Performance Optimization',
          'Cost Optimization',
          'Advanced Monitoring',
          'Auto-scaling Setup',
          'Security Hardening'
        ],
        sop: [
          'Ongoing infrastructure optimization',
          'Implement threat monitoring',
          'Access control setup',
          'Cost optimization',
          'Performance tuning'
        ],
        valueAdd: [
          'Improved performance',
          'Cost efficiency',
          'Better resource utilization',
          'Enhanced security',
          'Operational excellence'
        ]
      },
      {
        id: 'cloud-compliance',
        name: 'Cloud Compliance & Security',
        description: 'Cloud security and compliance management',
        category: 'cloud-services',
        pricingModel: 'monthly',
        price: 40000,
        currency: 'ZAR',
        features: [
          'Compliance Assessment',
          'Security Auditing',
          'Data Protection',
          'Access Control',
          'Incident Response'
        ],
        sop: [
          'Conduct compliance audits',
          'Implement security measures',
          'Set up data protection',
          'Access management',
          'Incident response planning'
        ],
        valueAdd: [
          'Regulatory compliance',
          'Risk mitigation',
          'Data protection',
          'Secure operations',
          'Peace of mind'
        ]
      }
    ]
  },
  {
    id: 'technical-solutions',
    name: 'Technical Solutions',
    description: 'Full-stack development and DevOps services',
    packages: [
      {
        id: 'fullstack-dev',
        name: 'Full-Stack Development',
        description: 'Comprehensive development services',
        category: 'technical-solutions',
        pricingModel: 'monthly',
        price: 28000,
        currency: 'ZAR',
        rates: {
          standard: 1200,
          afterHours: 1800,
          weekend: 2400,
          callOut: 2500
        },
        features: [
          'Front-end Development',
          'Back-end Development',
          'DevOps Pipeline Setup',
          'Security Integration',
          'Code Reviews'
        ],
        sop: [
          'Requirements gathering',
          'Architecture planning',
          'Development sprints',
          'Security implementation',
          'Deployment strategy'
        ],
        valueAdd: [
          'Secure applications',
          'Modern architecture',
          'Scalable solutions',
          'Best practices',
          'Maintainable code'
        ]
      }
    ]
  }
];