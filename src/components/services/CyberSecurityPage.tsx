import React, { useState } from 'react';
import { Shield, Check, ArrowRight, AlertCircle, Lock, Activity } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Comprehensive Protection',
    description: 'End-to-end security solutions tailored to your business needs'
  },
  {
    icon: Activity,
    title: '24/7 Monitoring',
    description: 'Round-the-clock surveillance and threat detection'
  },
  {
    icon: Lock,
    title: 'Data Security',
    description: 'Advanced encryption and access control measures'
  }
];

const packages = [
  {
    id: 'basic',
    name: 'Basic Security Package',
    price: 25000,
    features: [
      'Cyber Risk Assessment',
      'Vulnerability Assessment',
      'Penetration Testing (Light)',
      'Basic Threat Monitoring',
      'Security Awareness Training'
    ],
    sop: [
      'Initial security assessment',
      'Vulnerability scanning',
      'Basic penetration testing',
      'Security policy review',
      'Employee training sessions'
    ],
    valueAdd: [
      'Understand your security posture',
      'Identify critical vulnerabilities',
      'Meet basic compliance requirements',
      'Reduce risk of breaches',
      'Build security awareness'
    ]
  },
  {
    id: 'advanced',
    name: 'Advanced Security Package',
    price: 35000,
    features: [
      'All Basic Package Features',
      'Virtual CISO Services',
      'Container Security',
      'Full Penetration Testing',
      'Advanced Threat Detection',
      'Incident Response Planning'
    ],
    sop: [
      'Comprehensive security assessment',
      'Advanced vulnerability management',
      'Full-scale penetration testing',
      'Security architecture review',
      'Incident response planning',
      'Regular security meetings'
    ],
    valueAdd: [
      'Strategic security guidance',
      'Proactive threat prevention',
      'Enhanced compliance readiness',
      'Reduced incident response time',
      'Improved security maturity'
    ]
  },
  {
    id: 'premium',
    name: 'Premium Security Package',
    price: 50000,
    features: [
      'All Advanced Package Features',
      'Custom Security Policies',
      'Real-time Threat Intelligence',
      '24/7 SOC Services',
      'Advanced EDR Solutions',
      'Security Automation'
    ],
    sop: [
      'Enterprise security assessment',
      'Custom policy development',
      'Continuous monitoring',
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
];

export default function CyberSecurityPage() {
  const [selectedPackage, setSelectedPackage] = useState(packages[1]);
  const [activeTab, setActiveTab] = useState<'features' | 'sop' | 'value'>('features');

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <Shield className="h-16 w-16 text-cyan-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Enterprise Cybersecurity Solutions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Protect your business with our comprehensive cybersecurity solutions.
              From threat detection to incident response, we've got you covered.
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
                This package is ideal for businesses looking to {activeTab === 'features' 
                  ? 'establish a robust security foundation'
                  : activeTab === 'sop'
                  ? 'implement enterprise-grade security measures'
                  : 'create lasting security value'
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