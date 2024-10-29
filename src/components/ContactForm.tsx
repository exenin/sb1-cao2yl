import React, { useState } from 'react';
import { Send, Shield, Cloud, Rocket, Code, Building, Lock } from 'lucide-react';

interface ServiceRequirement {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

const serviceRequirements: ServiceRequirement[] = [
  {
    id: 'cybersecurity',
    label: 'Cybersecurity Solutions',
    icon: Shield,
    description: 'Security assessments, penetration testing, and security monitoring'
  },
  {
    id: 'cloud',
    label: 'Cloud Services',
    icon: Cloud,
    description: 'Cloud migration, optimization, and management'
  },
  {
    id: 'digital-transformation',
    label: 'Digital Transformation',
    icon: Rocket,
    description: 'Business process automation and digital strategy'
  },
  {
    id: 'development',
    label: 'Technical Solutions',
    icon: Code,
    description: 'Custom software development and DevOps services'
  },
  {
    id: 'compliance',
    label: 'Compliance & Governance',
    icon: Building,
    description: 'Regulatory compliance and risk management'
  },
  {
    id: 'managed-security',
    label: 'Managed Security',
    icon: Lock,
    description: '24/7 security operations and incident response'
  }
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    budget: '',
    timeframe: 'flexible',
    requirements: [] as string[]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          phone: '',
          message: '',
          budget: '',
          timeframe: 'flexible',
          requirements: []
        });
      }, 5000);
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleRequirement = (id: string) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.includes(id)
        ? prev.requirements.filter(r => r !== id)
        : [...prev.requirements, id]
    }));
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-full mb-6">
              <Send className="h-8 w-8 text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Thank You!</h3>
            <p className="text-gray-400">
              We've received your message and will get back to you within 24 hours.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to secure your digital future? Get in touch with our team of experts.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-400">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-400">
                  Company
                </label>
                <input
                  type="text"
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-400">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
            </div>

            {/* Service Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-4">
                What services are you interested in? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceRequirements.map((requirement) => {
                  const Icon = requirement.icon;
                  return (
                    <div
                      key={requirement.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        formData.requirements.includes(requirement.id)
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                      onClick={() => toggleRequirement(requirement.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                          <Icon className={`h-5 w-5 ${
                            formData.requirements.includes(requirement.id)
                              ? 'text-cyan-500'
                              : 'text-gray-400'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">
                            {requirement.label}
                          </h4>
                          <p className="text-xs text-gray-400 mt-1">
                            {requirement.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Budget and Timeframe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="budget" className="block text-sm font-medium text-gray-400">
                  Estimated Monthly Budget (ZAR)
                </label>
                <select
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500"
                >
                  <option value="">Select a range</option>
                  <option value="10000-25000">R10,000 - R25,000</option>
                  <option value="25000-50000">R25,000 - R50,000</option>
                  <option value="50000-100000">R50,000 - R100,000</option>
                  <option value="100000+">R100,000+</option>
                </select>
              </div>
              <div>
                <label htmlFor="timeframe" className="block text-sm font-medium text-gray-400">
                  Implementation Timeframe
                </label>
                <select
                  id="timeframe"
                  value={formData.timeframe}
                  onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500"
                >
                  <option value="urgent">Urgent (ASAP)</option>
                  <option value="1month">Within 1 month</option>
                  <option value="3months">Within 3 months</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-400">
                Additional Details *
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="mt-1 block w-full rounded-md bg-gray-800 border-gray-700 text-white focus:border-cyan-500 focus:ring-cyan-500"
                required
                placeholder="Tell us about your project, requirements, or any specific challenges..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting || formData.requirements.length === 0}
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-cyan-500 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black mr-2" />
                    Sending...
                  </div>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}