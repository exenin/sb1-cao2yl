import React from 'react';
import { Shield, AlertTriangle, Check } from 'lucide-react';
import { useSecurity } from '../../contexts/SecurityContext';

export default function ComplianceStatus() {
  const { compliance, assessCompliance } = useSecurity();

  const handleUpdateStatus = async (id: string, status: 'compliant' | 'non_compliant' | 'partially_compliant') => {
    try {
      await assessCompliance(id, status);
    } catch (error) {
      console.error('Failed to update compliance status:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-6">Compliance Status</h3>

      <div className="space-y-4">
        {compliance.map((requirement) => (
          <div
            key={requirement.id}
            className="p-4 bg-gray-700 rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-white">{requirement.control}</h4>
                <p className="text-sm text-gray-400">{requirement.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Framework: {requirement.framework}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleUpdateStatus(requirement.id, 'compliant')}
                  className={`p-2 rounded ${
                    requirement.status === 'compliant'
                      ? 'bg-green-500/10 text-green-500'
                      : 'text-gray-400 hover:text-green-500'
                  }`}
                >
                  <Check className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleUpdateStatus(requirement.id, 'partially_compliant')}
                  className={`p-2 rounded ${
                    requirement.status === 'partially_compliant'
                      ? 'bg-yellow-500/10 text-yellow-500'
                      : 'text-gray-400 hover:text-yellow-500'
                  }`}
                >
                  <Shield className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleUpdateStatus(requirement.id, 'non_compliant')}
                  className={`p-2 rounded ${
                    requirement.status === 'non_compliant'
                      ? 'bg-red-500/10 text-red-500'
                      : 'text-gray-400 hover:text-red-500'
                  }`}
                >
                  <AlertTriangle className="h-4 w-4" />
                </button>
              </div>
            </div>

            {requirement.evidence && requirement.evidence.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-gray-400">Evidence:</p>
                <ul className="mt-1 space-y-1">
                  {requirement.evidence.map((item, index) => (
                    <li key={index} className="text-sm text-white">{item}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Last assessed: {new Date(requirement.lastAssessed).toLocaleDateString()}</span>
              <span>Next assessment: {new Date(requirement.nextAssessment).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}