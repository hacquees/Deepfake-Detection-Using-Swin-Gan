import React from 'react';
import { 
  BarChart, 
  Calendar, 
  FileCheck, 
  AlertTriangle,
  Upload,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Overview: React.FC = () => {
  const { user } = useAuth();
  
  // Mock data for stats and recent detections
  const stats = [
    {
      label: 'Total Detections',
      value: user?.detectionCount || 0,
      icon: <FileCheck size={20} className="text-primary-600" />,
      change: '+12% from last month'
    },
    {
      label: 'Deepfakes Detected',
      value: Math.floor((user?.detectionCount || 0) * 0.3),
      icon: <AlertTriangle size={20} className="text-error-500" />,
      change: '+8% from last month'
    },
    {
      label: 'Available Credits',
      value: '48',
      icon: <Upload size={20} className="text-accent-600" />,
      change: '40 used this month'
    },
    {
      label: 'Accuracy Score',
      value: '98.2%',
      icon: <TrendingUp size={20} className="text-success-500" />,
      change: '+0.5% from last month'
    }
  ];
  
  const recentDetections = [
    {
      id: 'det_123456',
      filename: 'profile_image.jpg',
      timestamp: '2 hours ago',
      isDeepfake: false,
      confidence: 96.4
    },
    {
      id: 'det_123457',
      filename: 'interview_clip.mp4',
      timestamp: '5 hours ago',
      isDeepfake: true,
      confidence: 92.7
    },
    {
      id: 'det_123458',
      filename: 'group_photo.jpg',
      timestamp: '1 day ago',
      isDeepfake: false,
      confidence: 99.1
    },
    {
      id: 'det_123459',
      filename: 'news_clip.mp4',
      timestamp: '3 days ago',
      isDeepfake: true,
      confidence: 88.3
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-primary-800">
              Welcome back, {user?.name || 'User'}!
            </h1>
            <p className="text-gray-600">
              Here's a summary of your deepfake detection activity
            </p>
          </div>
          <Link to="/detect" className="btn btn-primary hidden sm:inline-flex">
            New Detection
          </Link>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-500 text-sm">{stat.label}</span>
                <div className="p-2 rounded-full bg-gray-100">
                  {stat.icon}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500">
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-800">
            Recent Detections
          </h2>
          <Link 
            to="/dashboard/history" 
            className="text-primary-600 hover:text-primary-800 font-medium text-sm flex items-center"
          >
            View All
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  File
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {recentDetections.map((detection, index) => (
                <tr 
                  key={detection.id} 
                  className={index !== recentDetections.length - 1 ? 'border-b border-gray-200' : ''}
                >
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="p-2 mr-3 rounded-lg bg-gray-100">
                        {detection.filename.endsWith('.mp4') ? (
                          <Film size={16} className="text-gray-600" />
                        ) : (
                          <Image size={16} className="text-gray-600" />
                        )}
                      </div>
                      <span className="font-medium text-gray-800">{detection.filename}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center text-gray-600">
                      <Clock size={14} className="mr-1" />
                      <span>{detection.timestamp}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center ${
                      detection.isDeepfake 
                        ? 'bg-error-100 text-error-900' 
                        : 'bg-success-100 text-success-900'
                    }`}>
                      {detection.isDeepfake ? (
                        <>
                          <AlertTriangle size={12} className="mr-1" />
                          Deepfake
                        </>
                      ) : (
                        <>
                          <Check size={12} className="mr-1" />
                          Authentic
                        </>
                      )}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-16 h-1.5 bg-gray-200 rounded-full mr-2">
                        <div 
                          className={`h-full rounded-full ${
                            detection.isDeepfake ? 'bg-error-500' : 'bg-success-500'
                          }`}
                          style={{ width: `${detection.confidence}%` }}
                        />
                      </div>
                      <span 
                        className={detection.isDeepfake ? 'text-error-500' : 'text-success-500'}
                      >
                        {detection.confidence}%
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-right">
                    <a 
                      href="#" 
                      className="text-primary-600 hover:text-primary-800 font-medium text-sm"
                    >
                      View Details
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Usage Graph */}
      <div className="card">
        <h2 className="text-xl font-semibold text-primary-800 mb-6">
          Monthly Usage
        </h2>
        
        <div className="h-64 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <BarChart size={48} className="mx-auto text-gray-400 mb-4" />
            <p>Usage statistics visualization would appear here.</p>
            <p className="text-sm">This would track your detection volume over time.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;