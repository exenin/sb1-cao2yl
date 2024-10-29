import React, { useState } from 'react';
import { Play, Pause, RefreshCw, Shield } from 'lucide-react';
import { useSecurity } from '../../contexts/SecurityContext';

export default function SecurityScanner() {
  const { assets, updateAsset } = useSecurity();
  const [scanning, setScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);

  const handleStartScan = async () => {
    if (selectedAssets.length === 0) return;
    
    setScanning(true);
    setProgress(0);

    // Simulate scanning process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          return 100;
        }
        return prev + 1;
      });
    }, 100);

    // Update asset status
    for (const assetId of selectedAssets) {
      await updateAsset(assetId, {
        status: 'maintenance',
        lastAssessment: new Date().toISOString()
      });
    }
  };

  const handleStopScan = () => {
    setScanning(false);
    setProgress(0);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium text-white">Security Scanner</h3>
          <p className="text-gray-400">Scan assets for vulnerabilities</p>
        </div>
        <div className="flex items-center space-x-4">
          {scanning ? (
            <button
              onClick={handleStopScan}
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <Pause className="h-4 w-4 mr-2" />
              Stop Scan
            </button>
          ) : (
            <button
              onClick={handleStartScan}
              disabled={selectedAssets.length === 0}
              className="flex items-center px-4 py-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Play className="h-4 w-4 mr-2" />
              Start Scan
            </button>
          )}
        </div>
      </div>

      {scanning && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Scanning in progress...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-cyan-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedAssets.includes(asset.id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedAssets(prev => [...prev, asset.id]);
                  } else {
                    setSelectedAssets(prev => prev.filter(id => id !== asset.id));
                  }
                }}
                disabled={scanning}
                className="rounded border-gray-600 text-cyan-500 focus:ring-cyan-500 bg-gray-700"
              />
              <div>
                <h4 className="font-medium text-white">{asset.name}</h4>
                <p className="text-sm text-gray-400">{asset.type}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div>
                <p className="text-sm text-gray-400">Last Scan</p>
                <p className="text-white">
                  {asset.lastAssessment 
                    ? new Date(asset.lastAssessment).toLocaleDateString()
                    : 'Never'}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">Vulnerabilities</p>
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">{asset.vulnerabilities.high}</span>
                  <span className="text-yellow-500">{asset.vulnerabilities.medium}</span>
                  <span className="text-green-500">{asset.vulnerabilities.low}</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-400">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  asset.status === 'active' ? 'bg-green-500/10 text-green-500' :
                  asset.status === 'maintenance' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-red-500/10 text-red-500'
                }`}>
                  {asset.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}