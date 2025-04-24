import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Sidebar from './Sidebar';
import Overview from './Overview';
import History from './History';
import Settings from './Settings';
import NotFound from '../NotFound';

const Dashboard: React.FC = () => {
  const { status } = useAuth();
  
  // Show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }
  
  // Redirect if not authenticated
  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-20 bg-gray-50">
        <div className="container-custom py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <Sidebar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;