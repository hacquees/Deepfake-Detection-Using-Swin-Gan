import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Mail, AlertCircle } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaMicrosoft } from "react-icons/fa";
import { useAuth } from '../context/AuthContext';
import Logo from '../components/common/Logo';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { signup, loginWithGoogle, loginWithMicrosoft } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate('/detect');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

      <div className="absolute top-6 left-6 flex items-center space-x-2">
      <Link to="/" className="flex items-center space-x-2">
          <Logo size={32} color="#1a1a2e" />
          <span className="text-xl font-semibold text-primary-800">DeepGuard</span>
        </Link>
      </div>

      <div className="card max-w-md w-full space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-primary-800 text-center">Sign Up</h2>
          <p className="mt-2 text-center text-gray-600">Create a new account to get started.</p>
        </div>
        {error && (
          <div className="p-4 bg-error-100 text-error-900 rounded-lg flex items-center">
            <AlertCircle size={20} className="mr-2" />
            <p>{error}</p>
          </div>
        )}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-500" />
              </div>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={18} className="text-gray-500" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                placeholder="Create a password"
                required
              />
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-primary w-full">
              Sign Up
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-600 hover:text-primary-800">
              Log in
            </Link>
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        <div className="space-y-4">
          <button
            onClick={loginWithGoogle}
            className="btn btn-outline w-full flex items-center justify-center"
          >
            <FcGoogle size={18} className="mr-2" />
            Continue with Google
          </button>
          <button
            onClick={loginWithMicrosoft}
            className="btn btn-outline w-full flex items-center justify-center"
          >
            <FaMicrosoft size={18} className="mr-2" />
            Continue with Microsoft
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;