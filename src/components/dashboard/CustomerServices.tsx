import React, { useState } from 'react';
import { Shield, Cloud, Rocket, ArrowRight, Plus, X, Check } from 'lucide-react';
import { useServices } from '../../contexts/ServiceContext';
import { ServicePackage } from '../../types/pricing';

export default function CustomerServices() {
  const { 
    categories, 
    subscribedServices, 
    addService, 
    removeService, 
    isLoading 
  } = useServices();
  
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const getIcon = (categoryId: string) => {
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

  const handleAddService = async (categoryId: string, packageId: string) => {
    setProcessing(true);
    try {
      await addService(categoryId, packageId);
      setShowAddModal(false);
    } catch (error) {
      console.error('Failed to add service:', error);
    } finally {
      setProcessing(false);
    }
  };

  const handleRemoveService = async (packageId: string) => {
    if (window.confirm('Are you sure you want to remove this service?')) {
      try {
        await removeService(packageId);
      } catch (error) {
        console.error('Failed to remove service:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-700 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-700 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Your Services</h2>
        <button 
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </button>
      </div>

      {/* Subscribed Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subscribedServices.map((service) => (
          <div key={service.id} className="bg-gray-800 rounded-lg p-6">
            {React.createElement(getIcon(service.category), {
              className: "h-8 w-8 text-cyan-500 mb-4"
            })}
            <h3 className="text-xl font-semibold text-white mb-2">{service.name}</h3>
            <p className="text-gray-400 mb-4">{service.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-cyan-500">
                R{service.price.toLocaleString()}/{service.pricingModel}
              </span>
              <button
                onClick={() => handleRemoveService(service.id)}
                className="text-red-500 hover:text-red-400 p-2"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-white">Add New Service</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category.id} className="space-y-4">
                  <h4 className="text-lg font-medium text-white">{category.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {category.packages.map((pkg) => (
                      <div 
                        key={pkg.id}
                        className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-colors"
                      >
                        <h5 className="font-medium text-white mb-2">{pkg.name}</h5>
                        <p className="text-sm text-gray-400 mb-4">{pkg.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-cyan-500">
                            R{pkg.price.toLocaleString()}/{pkg.pricingModel}
                          </span>
                          <button
                            onClick={() => handleAddService(category.id, pkg.id)}
                            disabled={processing}
                            className="px-3 py-1 bg-cyan-500 text-black rounded hover:bg-cyan-400 transition-colors flex items-center"
                          >
                            {processing ? (
                              <span className="animate-spin">...</span>
                            ) : (
                              <>
                                <Plus className="h-4 w-4 mr-1" />
                                Add
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}