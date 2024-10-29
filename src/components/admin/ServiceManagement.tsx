import React, { useState } from 'react';
import { Plus, Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { serviceCategories } from '../../data/services';
import { ServicePackage } from '../../types/pricing';

export default function ServiceManagement() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedPackage, setExpandedPackage] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const togglePackage = (packageId: string) => {
    setExpandedPackage(expandedPackage === packageId ? null : packageId);
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-ZA', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Service Management</h2>
        <button className="flex items-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </button>
      </div>

      <div className="space-y-6">
        {serviceCategories.map((category) => (
          <div key={category.id} className="bg-gray-700 rounded-lg overflow-hidden">
            <div
              className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-600"
              onClick={() => toggleCategory(category.id)}
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <p className="text-gray-400 text-sm">{category.description}</p>
              </div>
              {expandedCategory === category.id ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>

            {expandedCategory === category.id && (
              <div className="p-4 border-t border-gray-600">
                <div className="mb-4">
                  <button className="flex items-center px-3 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 transition-colors text-sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Package
                  </button>
                </div>

                <div className="space-y-4">
                  {category.packages.map((pkg) => (
                    <div key={pkg.id} className="bg-gray-800 rounded-lg">
                      <div
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-700"
                        onClick={() => togglePackage(pkg.id)}
                      >
                        <div>
                          <h4 className="font-medium text-white">{pkg.name}</h4>
                          <p className="text-cyan-500">
                            {formatCurrency(pkg.price, pkg.currency)}/{pkg.pricingModel}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-gray-600 rounded-lg">
                            <Edit2 className="h-4 w-4 text-gray-400" />
                          </button>
                          <button className="p-2 hover:bg-gray-600 rounded-lg">
                            <Trash2 className="h-4 w-4 text-red-400" />
                          </button>
                        </div>
                      </div>

                      {expandedPackage === pkg.id && (
                        <div className="p-4 border-t border-gray-700">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-sm font-medium text-gray-400 mb-2">Features</h5>
                              <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {pkg.features.map((feature, index) => (
                                  <li key={index}>{feature}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-gray-400 mb-2">SOP</h5>
                              <ul className="list-disc list-inside text-gray-300 space-y-1">
                                {pkg.sop.map((item, index) => (
                                  <li key={index}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {pkg.rates && (
                            <div className="mt-4">
                              <h5 className="text-sm font-medium text-gray-400 mb-2">Rates</h5>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-gray-700 p-3 rounded-lg">
                                  <p className="text-sm text-gray-400">Standard</p>
                                  <p className="text-white">
                                    {formatCurrency(pkg.rates.standard, pkg.currency)}/hr
                                  </p>
                                </div>
                                {pkg.rates.afterHours && (
                                  <div className="bg-gray-700 p-3 rounded-lg">
                                    <p className="text-sm text-gray-400">After Hours</p>
                                    <p className="text-white">
                                      {formatCurrency(pkg.rates.afterHours, pkg.currency)}/hr
                                    </p>
                                  </div>
                                )}
                                {pkg.rates.weekend && (
                                  <div className="bg-gray-700 p-3 rounded-lg">
                                    <p className="text-sm text-gray-400">Weekend</p>
                                    <p className="text-white">
                                      {formatCurrency(pkg.rates.weekend, pkg.currency)}/hr
                                    </p>
                                  </div>
                                )}
                                {pkg.rates.callOut && (
                                  <div className="bg-gray-700 p-3 rounded-lg">
                                    <p className="text-sm text-gray-400">Call Out</p>
                                    <p className="text-white">
                                      {formatCurrency(pkg.rates.callOut, pkg.currency)}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}