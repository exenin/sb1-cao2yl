import React, { useState } from 'react';
import { Download, Filter, Search, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  description: string;
  client: {
    name: string;
    email: string;
  };
}

const mockInvoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    number: 'INV-2024-001',
    date: '2024-03-15',
    amount: 25000.00,
    status: 'paid',
    description: 'Monthly Security Services - March 2024',
    client: {
      name: 'Tech Corp',
      email: 'billing@techcorp.com'
    }
  },
  {
    id: 'INV-2024-002',
    number: 'INV-2024-002',
    date: '2024-03-01',
    amount: 18000.00,
    status: 'pending',
    description: 'Cloud Infrastructure Management',
    client: {
      name: 'Digital Solutions Ltd',
      email: 'accounts@digitalsolutions.com'
    }
  },
  {
    id: 'INV-2024-003',
    number: 'INV-2024-003',
    date: '2024-02-15',
    amount: 32000.00,
    status: 'overdue',
    description: 'Security Assessment and Consulting',
    client: {
      name: 'Innovate Inc',
      email: 'finance@innovate.com'
    }
  }
];

export default function Invoices() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredInvoices = mockInvoices.filter(invoice => {
    const matchesSearch = 
      invoice.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.client.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-500 bg-green-500/10';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'overdue':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Invoices</h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            className="pl-10 pr-4 py-2 w-full bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            className="pl-10 pr-4 py-2 bg-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="py-3 px-4 text-gray-400 font-medium">Invoice</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Client</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Amount</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Date</th>
                <th className="py-3 px-4 text-gray-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-700 hover:bg-gray-700/50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white">{invoice.number}</p>
                      <p className="text-sm text-gray-400">{invoice.description}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-white">{invoice.client.name}</p>
                      <p className="text-sm text-gray-400">{invoice.client.email}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-white">
                    R{invoice.amount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {new Date(invoice.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/dashboard/invoices/${invoice.id}`)}
                        className="p-2 hover:bg-gray-600 rounded-lg"
                        title="View Details"
                      >
                        <Eye className="h-4 w-4 text-cyan-500" />
                      </button>
                      <button
                        className="p-2 hover:bg-gray-600 rounded-lg"
                        title="Download Invoice"
                      >
                        <Download className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}