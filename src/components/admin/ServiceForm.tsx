import React, { useState } from 'react';
import { X } from 'lucide-react';
import { ServicePackage, PricingModel } from '../../types/pricing';

interface ServiceFormProps {
  initialData?: ServicePackage;
  onSubmit: (data: Omit<ServicePackage, 'id'>) => void;
  onCancel: () => void;
}

export default function ServiceForm({ initialData, onSubmit, onCancel }: ServiceFormProps) {
  const [formData, setFormData] = useState<Omit<ServicePackage, 'id'>>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    category: initialData?.category || '',
    pricingModel: initialData?.pricingModel || 'monthly',
    price: initialData?.price || 0,
    currency: initialData?.currency || 'ZAR',
    features: initialData?.features || [''],
    sop: initialData?.sop || [''],
    valueAdd: initialData?.valueAdd || [''],
    rates: initialData?.rates || {
      standard: 0,
      afterHours: 0,
      weekend: 0,
      callOut: 0
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addListItem = (field: 'features' | 'sop' | 'valueAdd') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeListItem = (field: 'features' | 'sop' | 'valueAdd', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const updateListItem = (field: 'features' | 'sop' | 'valueAdd', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === index ? value : item))
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-400">Package Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-400">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-400">Pricing Model</label>
          <select
            value={formData.pricingModel}
            onChange={(e) => setFormData({ ...formData, pricingModel: e.target.value as PricingModel })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
          >
            <option value="monthly">Monthly</option>
            <option value="hourly">Hourly</option>
            <option value="project">Project-based</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Price</label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-400">Currency</label>
          <input
            type="text"
            value={formData.currency}
            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white"
            required
          />
        </div>
      </div>

      {/* Features */}
      <div>
        <label className="block text-sm font-medium text-gray-400 mb-2">Features</label>
        {formData.features.map((feature, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => updateListItem('features', index, e.target.value)}
              className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white"
              required
            />
            <button
              type="button"
              onClick={() => removeListItem('features', index)}
              className="p-2 text-gray-400 hover:text-red-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem('features')}
          className="text-sm text-cyan-500 hover:text-cyan-400"
        >
          + Add Feature
        </button>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-400 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
        >
          Save Package
        </button>
      </div>
    </form>
  );
}