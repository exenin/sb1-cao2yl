import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, Trash2, Building,
  Users, Shield, X, Check 
} from 'lucide-react';
import { mockCompanies } from '../../data/mockData';

interface CompanyFormData {
  name: string;
  registrationNumber: string;
  vatNumber: string;
  address: string;
  industry: string;
  size: string;
  website: string;
}

export default function CompanyManagement() {
  const [companies, setCompanies] = useState(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<typeof mockCompanies[0] | null>(null);
  const [formData, setFormData] = useState<CompanyFormData>({
    name: '',
    registrationNumber: '',
    vatNumber: '',
    address: '',
    industry: '',
    size: '',
    website: ''
  });

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.registrationNumber.includes(searchTerm) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedCompany) {
        setCompanies(prev => prev.map(company => 
          company.id === selectedCompany.id 
            ? { ...company, ...formData }
            : company
        ));
      } else {
        const newCompany = {
          id: `comp_${Date.now()}`,
          ...formData
        };
        setCompanies(prev => [...prev, newCompany]);
      }
      setShowAddModal(false);
      setSelectedCompany(null);
      setFormData({
        name: '',
        registrationNumber: '',
        vatNumber: '',
        address: '',
        industry: '',
        size: '',
        website: ''
      });
    } catch (error) {
      console.error('Failed to save company:', error);
    }
  };

  const handleDeleteCompany = (companyId: string) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      setCompanies(prev => prev.filter(company => company.id !== companyId));
    }
  };

  const handleEditCompany = (company: typeof mockCompanies[0]) => {
    setSelectedCompany(company);
    setFormData({
      name: company.name,
      registrationNumber: company.registrationNumber,
      vatNumber: company.vatNumber,
      address: company.address,
      industry: company.industry,
      size: company.size,
      website: company.website
    });
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Company Management</h2>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Company
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search companies..."
            className="pl-10 pr-4 py-2 w-full bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <div key={company.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">{company.name}</h3>
                <p className="text-sm text-gray-400">{company.industry}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditCompany(company)}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <Edit2 className="h-4 w-4 text-gray-400" />
                </button>
                <button
                  onClick={() => handleDeleteCompany(company.id)}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <Trash2 className="h-4 w-4 text-red-400" />
                </button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center text-gray-400">
                <Building className="h-4 w-4 mr-2" />
                {company.registrationNumber}
              </div>
              <div className="flex items-center text-gray-400">
                <Shield className="h-4 w-4 mr-2" />
                VAT: {company.vatNumber}
              </div>
              <div className="text-gray-400">
                {company.address}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Company Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-white">
                {selectedCompany ? 'Edit Company' : 'Add New Company'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setSelectedCompany(null);
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNumber}
                    onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    VAT Number
                  </label>
                  <input
                    type="text"
                    value={formData.vatNumber}
                    onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Company Size
                  </label>
                  <select
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    required
                  >
                    <option value="">Select Size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501+">501+ employees</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  placeholder="https://"
                />
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setSelectedCompany(null);
                  }}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400"
                >
                  {selectedCompany ? 'Update Company' : 'Add Company'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}