import React from 'react';
import { Download, RefreshCw, Info, Check, AlertTriangle } from 'lucide-react';
import { DetectionResult } from '../../types';

interface ResultsSectionProps {
  result: DetectionResult;
  onReset: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ result, onReset }) => {
  const { isDeepfake, confidence, fileUrl, fileType, filename } = result;
  
  const confidencePercentage = (confidence * 100).toFixed(1);
  
  const downloadReport = () => {
    // In a real app, this would generate a PDF or JSON report
    const reportData = {
      ...result,
      analyzedAt: new Date().toISOString(),
      reportId: Math.random().toString(36).substring(2, 11)
    };
    
    // Create a blob and download it
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `deepfake-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="card fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Analysis Results</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={downloadReport}
            className="btn btn-outline py-2 px-4"
          >
            <Download size={18} className="mr-2" />
            Download Report
          </button>
          <button
            onClick={onReset}
            className="btn btn-outline py-2 px-4"
          >
            <RefreshCw size={18} className="mr-2" />
            New Analysis
          </button>
        </div>
      </div>
      
      {/* Result Summary */}
      <div className={`p-4 rounded-lg mb-6 flex items-center ${
        isDeepfake 
          ? 'bg-error-100 text-error-900' 
          : 'bg-success-100 text-success-900'
      }`}>
        {isDeepfake ? (
          <AlertTriangle size={24} className="mr-3 flex-shrink-0" />
        ) : (
          <Check size={24} className="mr-3 flex-shrink-0" />
        )}
        <div>
          <p className="font-semibold">
            {isDeepfake 
              ? 'Potential deepfake detected' 
              : 'No manipulation detected'
            }
          </p>
          <p className="text-sm">
            {isDeepfake
              ? `Our analysis indicates this media has been manipulated with ${confidencePercentage}% confidence.`
              : `Our analysis indicates this is likely authentic media with ${confidencePercentage}% confidence.`
            }
          </p>
        </div>
      </div>
      
      {/* Media Preview */}
      <div className="mb-6">
        <div className="relative">
          {fileType === 'image' ? (
            <img
              src={fileUrl}
              alt="Analyzed media"
              className="w-full rounded-lg"
            />
          ) : (
            <video
              src={fileUrl}
              controls
              className="w-full rounded-lg"
            />
          )}
          
          {/* Heatmap overlay for manipulated regions */}
          {isDeepfake && result.regions && result.regions.length > 0 && (
            <div className="absolute inset-0 pointer-events-none">
              {result.regions.map((region, index) => (
                <div
                  key={index}
                  className="absolute border-2 border-red-500 bg-red-500 bg-opacity-20"
                  style={{
                    left: `${region.x}px`,
                    top: `${region.y}px`,
                    width: `${region.width}px`,
                    height: `${region.height}px`
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {filename}
        </p>
      </div>
      
      {/* Confidence Score */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="font-medium text-gray-700">Confidence Score</span>
          <span className={`font-semibold ${
            isDeepfake ? 'text-error-500' : 'text-success-500'
          }`}>
            {confidencePercentage}%
          </span>
        </div>
        <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${
              isDeepfake ? 'bg-error-500' : 'bg-success-500'
            }`}
            style={{ width: `${confidencePercentage}%` }}
          />
        </div>
      </div>
      
      {/* Analysis Details */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <Info size={18} className="mr-2 text-primary-600" />
          <h4 className="font-medium text-gray-800">Analysis Details</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Analysis Date</p>
            <p className="font-medium text-gray-800">
              {new Date(result.timestamp).toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Media Type</p>
            <p className="font-medium text-gray-800">
              {fileType.charAt(0).toUpperCase() + fileType.slice(1)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">File Size</p>
            <p className="font-medium text-gray-800">
              {/* This would come from the backend in a real app */}
              {Math.floor(Math.random() * 10) + 1} MB
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Analysis ID</p>
            <p className="font-medium text-gray-800">
              {result.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsSection;