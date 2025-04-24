import React, { useState } from 'react';
import { User, Bell, Lock, Shield, Mail, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [formState, setFormState] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      email: true,
      browser: true,
      detectionCompleted: true,
      deepfakeDetected: true,
      weeklyReport: false,
      news: true
    }
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormState(prev => ({
        ...prev,
        notifications: {
          ...prev.notifications,
          [name]: checked
        }
      }));
    } else {
      setFormState(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the updated data to the backend
    alert('Settings updated successfully!');
  };
  
  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
    { id: 'security', label: 'Security', icon: <Lock size={20} /> },
    { id: 'advanced', label: 'Advanced', icon: <Shield size={20} /> }
  ];

  return (
    <div className="card">
      <h1 className="text-2xl font-bold text-primary-800 mb-6">Account Settings</h1>
      
      {/* Tabs */}
      <div className="flex overflow-x-auto mb-6 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-3 border-b-2 font-medium transition-colors ${
              activeTab === tab.id 
                ? 'border-primary-600 text-primary-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      
      {/* Tab Content */}
      <div className="py-4">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="relative">
                  <img
                    src={user?.avatarUrl || 'https://via.placeholder.com/128'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover"
                  />
                  <div className="absolute -bottom-2 -right-2">
                    <button
                      type="button"
                      className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    Profile Picture
                  </h3>
                  <p className="text-gray-500 mb-4">
                    JPG or PNG. Max size 1MB. Square ratio recommended.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      className="btn btn-outline py-2"
                    >
                      Upload New
                    </button>
                    <button
                      type="button"
                      className="btn py-2 border border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Tell us a bit about yourself..."
                ></textarea>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Save size={18} className="mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        )}
        
        {/* Notifications Tab */}
        {activeTab === 'notifications' && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Notification Preferences
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="email-notifications"
                        name="email"
                        type="checkbox"
                        checked={formState.notifications.email}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="email-notifications" className="font-medium text-gray-700">
                        Email Notifications
                      </label>
                      <p className="text-gray-500 text-sm">
                        Receive notifications via email
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="browser-notifications"
                        name="browser"
                        type="checkbox"
                        checked={formState.notifications.browser}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="browser-notifications" className="font-medium text-gray-700">
                        Browser Notifications
                      </label>
                      <p className="text-gray-500 text-sm">
                        Receive push notifications in your browser
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Notification Events
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="detection-completed"
                        name="detectionCompleted"
                        type="checkbox"
                        checked={formState.notifications.detectionCompleted}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="detection-completed" className="font-medium text-gray-700">
                        Detection Completed
                      </label>
                      <p className="text-gray-500 text-sm">
                        When a media analysis is completed
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="deepfake-detected"
                        name="deepfakeDetected"
                        type="checkbox"
                        checked={formState.notifications.deepfakeDetected}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="deepfake-detected" className="font-medium text-gray-700">
                        Deepfake Detected
                      </label>
                      <p className="text-gray-500 text-sm">
                        When a deepfake is detected with high confidence
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="weekly-report"
                        name="weeklyReport"
                        type="checkbox"
                        checked={formState.notifications.weeklyReport}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="weekly-report" className="font-medium text-gray-700">
                        Weekly Report
                      </label>
                      <p className="text-gray-500 text-sm">
                        Receive a weekly summary of your detection activity
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="news"
                        name="news"
                        type="checkbox"
                        checked={formState.notifications.news}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 rounded"
                      />
                    </div>
                    <div className="ml-3">
                      <label htmlFor="news" className="font-medium text-gray-700">
                        News & Updates
                      </label>
                      <p className="text-gray-500 text-sm">
                        Receive updates about new features and improvements
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Save size={18} className="mr-2" />
                  Save Preferences
                </button>
              </div>
            </div>
          </form>
        )}
        
        {/* Security Tab */}
        {activeTab === 'security' && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Change Password
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="currentPassword"
                      name="currentPassword"
                      value={formState.currentPassword}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="newPassword"
                      name="newPassword"
                      value={formState.newPassword}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formState.confirmPassword}
                      onChange={handleInputChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Two-Factor Authentication
                </h3>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-start">
                    <Shield size={24} className="text-primary-600 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-800">Enhance Your Account Security</h4>
                      <p className="text-gray-600 mt-1">
                        Add an extra layer of security by enabling two-factor authentication. 
                        Once enabled, you'll need to enter a code from your authenticator app 
                        when logging in.
                      </p>
                      <button
                        type="button"
                        className="mt-3 btn border border-primary-600 text-primary-600 bg-white hover:bg-primary-50 py-2"
                      >
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  <Save size={18} className="mr-2" />
                  Save Security Settings
                </button>
              </div>
            </div>
          </form>
        )}
        
        {/* Advanced Tab */}
        {activeTab === 'advanced' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                API Access
              </h3>
              
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                <p className="text-gray-600 mb-4">
                  Generate an API key to integrate DeepGuard's deepfake detection capabilities into your own applications.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    value="••••••••••••••••••••••••••••••"
                    readOnly
                    className="block w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-gray-500"
                  />
                  <button
                    type="button"
                    className="btn border border-primary-600 text-primary-600 bg-white hover:bg-primary-50 whitespace-nowrap"
                  >
                    Generate New Key
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Data Management
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Download Your Data</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Download a copy of all your detection history and account data
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn border border-gray-300 text-gray-700 hover:bg-gray-100"
                  >
                    <Download size={18} className="mr-2" />
                    Download
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Delete Detection History</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Clear all your detection history permanently
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn border border-error-500 text-error-500 hover:bg-error-50"
                  >
                    Delete History
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">Delete Account</h4>
                    <p className="text-gray-600 text-sm mt-1">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn bg-error-500 text-white hover:bg-error-600"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;