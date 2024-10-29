import React, { useState } from 'react';
import { Rocket, Check, ArrowRight, AlertCircle, Code, Cloud } from 'lucide-react';

const features = [
  {
    icon: Code,
    title: 'Modern Development',
    description: 'State-of-the-art development practices and technologies'
  },
  {
    icon: Cloud,
    title: 'Cloud Integration',
    description: 'Seamless cloud infrastructure and deployment'
  },
  {
    icon: Rocket,
    title: 'Digital Innovation',
    description: 'Cutting-edge digital solutions for business growth'
  }
];

const packages = [
  {
    id: 'startup',
    name: 'Startup Accelerator Package',
    price: 30000,
    features: [
      'Digital Strategy Development',
      'Secure Application Design',
      'Cloud Infrastructure Setup',
      'Basic Analytics Integration',
      'Security Best Practices'
    ],
    sop: [
      'Initial requirements gathering',
      'Architecture planning',
      'Development sprints',
      'Security implementation',
      'Deployment strategy'
    ],
    valueAdd: [
      'Rapid market entry',
      'Scalable architecture',
      'Security by design',
      'Future-proof technology',
      'Competitive advantage'
    ]
  },
  {
    id: 'enterprise',
    name: 'Enterprise Growth Package',
    price: 60000,
    features: [
      'All Startup Package Features',
      'Full Cloud Migration',
      'Process Automation',
      'CI/CD Implementation',
      'Advanced Analytics',
      'Custom Security Controls'
    ],
    sop: [
      'Enterprise assessment',
      'Migration planning',
      'Process optimization',
      'Security hardening',
      'Team training',
      'Continuous improvement'
    ],
    valueAdd: [
      'Operational efficiency',
      'Cost optimization',
      'Enhanced security',
      'Data-driven insights',
      'Digital leadership'
    ]
  }
];

export default function DigitalTransformationPage() {
  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [activeTab, setActiveTab] = useState<'features' | 'sop' | 'value'>('features');

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative">
          <div className="text-center">
            <Rocket className="h-16 w-16 text-cyan-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Digital Transformation Solutions
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transform your business with cutting-edge digital solutions.
              From startup acceleration to enterprise growth, we'll help you succeed.
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                This package is perfect for businesses looking to {
                  selectedPackage.id === 'startup'
                    ? 'accelerate their digital journey with modern solutions'
                    : 'transform their enterprise with cutting-edge technology'
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