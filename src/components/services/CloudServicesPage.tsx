import React, { useState } from 'react';
import { Cloud, Check, ArrowRight, AlertCircle, Shield, Database } from 'lucide-react';

const features = [
  {
    icon: Cloud,
    title: 'Cloud Excellence',
    description: 'Expert cloud migration and optimization services'
  },
  {
    icon: Shield,
    title: 'Security First',
    description: 'Built-in security and compliance measures'
  },
  {
    icon: Database,
    title: 'Data Management',
    description: 'Efficient data handling and storage solutions'
  }
];

const packages = [
  {
    id: 'setup',
    name: 'Cloud Setup & Migration',
    price: 20000,
    features: [
      'Infrastructure Assessment',
      'Migration Strategy',
      'Basic Security Setup',
      'Performance Monitoring',
      'Cost Management'
    ],
    sop: [
      'Infrastructure analysis',
      'Migration planning',
      'Security configuration',
      'Data transfer',
      'Testing and validation'
    ],
    valueAdd: [
      'Reduced infrastructure costs',
      'Improved scalability',
      'Enhanced reliability',
      'Modern architecture',
      'Business continuity'
    ]
  },
  {
    id: 'optimization',
    name: 'Cloud Optimization',
    price: 30000,
    features: [
      'Performance Optimization',
      'Cost Optimization',
      'Advanced Monitoring',
      'Auto-scaling Setup',
      'Security Hardening'
    ],
    sop: [
      'Performance analysis',
      'Resource optimization',
      'Security enhancement',
      'Monitoring setup',
      'Cost analysis'
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
    id: 'compliance',
    name: 'Cloud Compliance & Security',
    price: 40000,
    features: [
      'Compliance Assessment',
      'Security Auditing',
      'Data Protection',
      'Access Control',
      'Incident Response'
    ],
    sop: [
      'Compliance review',
      'Security assessment',
      'Policy implementation',
      'Access management',
      'Monitoring setup'
    ],
    valueAdd: [
      'Regulatory compliance',
      'Risk mitigation',
      'Data protection',
      'Secure operations',
      'Peace of mind'
    ]
  }
];

export default function CloudServicesPage() {
  const [selectedPackage, setSelectedPackage] = useState(packages[1]);
  const [activeTab, setActiveTab] = useState<'features' | 'sop' | 'value'>('features');

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <Cloud className="h-16 w-16 text-cyan-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Cloud Services Solutions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Accelerate your cloud journey with our comprehensive cloud services.
              From migration to optimization and compliance, we've got you covered.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-700 rounded-lg">
                <feature.icon className="h-12 w-12 text-cyan-500 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Package Selection */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-6 rounded-lg transition-all duration-300 cursor-pointer ${
                selectedPackage.id === pkg.id
                  ? 'bg-cyan-500 transform scale-105'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              <h3 className={`text-xl font-semibold mb-4 ${
                selectedPackage.id === pkg.id ? 'text-black' : 'text-white'
              }`}>
                {pkg.name}
              </h3>
              <p className={`text-2xl font-bold mb-6 ${
                selectedPackage.id === pkg.id ? 'text-black' : 'text-cyan-500'
              }`}>
                R{pkg.price.toLocaleString()}/month
              </p>
              <button
                className={`w-full py-2 px-4 rounded-lg transition-colors ${
                  selectedPackage.id === pkg.id
                    ? 'bg-black text-white'
                    : 'bg-cyan-500 text-black hover:bg-cyan-400'
                }`}
              >
                Select Package
              </button>
            </div>
          ))}
        </div>

        {/* Package Details */}
        <div className="mt-16 bg-gray-800 rounded-lg p-8">
          <div className="flex space-x-4 mb-8">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'features'
                  ? 'bg-cyan-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'sop'
                  ? 'bg-cyan-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('sop')}
            >
              Implementation
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                activeTab === 'value'
                  ? 'bg-cyan-500 text-black'
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setActiveTab('value')}
            >
              Value Creation
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {selectedPackage.name}
              </h3>
              <ul className="space-y-4">
                {(activeTab === 'features' ? selectedPackage.features :
                  activeTab === 'sop' ? selectedPackage.sop :
                  selectedPackage.valueAdd).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-cyan-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-700 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <AlertCircle className="h-5 w-5 text-cyan-500 mr-2" />
                <h4 className="text-lg font-semibold text-white">Why Choose This Package?</h4>
              </div>
              <p className="text-gray-300 mb-6">
                This package is ideal for organizations seeking to {
                  selectedPackage.id === 'setup'
                    ? 'begin their cloud journey with a solid foundation'
                    : selectedPackage.id === 'optimization'
                    ? 'optimize their existing cloud infrastructure'
                    : 'ensure compliance and security in the cloud'
                }.
              </p>
              <button className="w-full py-3 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors flex items-center justify-center">
                Get Started
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}