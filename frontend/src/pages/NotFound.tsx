import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-md">
        <AlertCircle size={64} className="mx-auto text-primary-600 mb-6" />
        <h1 className="text-4xl font-bold text-primary-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn btn-primary">
            <Home size={18} className="mr-2" />
            Back to Home
          </Link>
          <Link to="/detect" className="btn btn-outline">
            Try Detection Tool
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;