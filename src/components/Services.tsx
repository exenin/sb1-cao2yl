import React from 'react';
import { Shield, Cloud, Rocket } from 'lucide-react';
import { useServices } from '../contexts/ServiceContext';
import { ServiceCategory } from '../types/pricing';
import ServiceCard from './services/ServiceCard';

export default function Services() {
  const { categories, isLoading } = useServices();

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse h-8 w-48 bg-gray-700 rounded mx-auto mb-4"></div>
            <div className="animate-pulse h-4 w-96 bg-gray-700 rounded mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Comprehensive cybersecurity and digital transformation solutions tailored to your needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category: ServiceCategory) => (
            <ServiceCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}