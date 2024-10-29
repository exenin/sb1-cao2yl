import React from 'react';
import { Shield, Cloud, Rocket, LucideIcon } from 'lucide-react';
import { ServiceCategory } from '../../types/pricing';

interface ServiceCardProps {
  category: ServiceCategory;
}

export default function ServiceCard({ category }: ServiceCardProps) {
  const getIcon = (categoryId: string): LucideIcon => {
    switch (categoryId) {
      case 'cybersecurity':
        return Shield;
      case 'cloud-services':
        return Cloud;
      case 'digital-transformation':
        return Rocket;
      default:
        return Shield;
    }
  };

  const Icon = getIcon(category.id);

  return (
    <div className="p-6 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors group cursor-pointer">
      <Icon className="h-12 w-12 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
      <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
      <p className="text-gray-400">{category.description}</p>
      <div className="mt-4 text-cyan-500 group-hover:translate-x-2 transition-transform">
        Learn more →
      </div>
    </div>
  );
}