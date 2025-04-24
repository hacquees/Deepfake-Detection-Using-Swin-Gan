import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Logo from '../common/Logo';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { status, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Change header background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Detect Now', path: '/detect' },
    { name: 'How It Works', path: '/#how-it-works' },
    { name: 'About', path: '/#about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Logo size={32} color={isScrolled ? '#1a1a2e' : '#ffffff'} />
            <span className={`text-xl font-semibold ${isScrolled ? 'text-primary-800' : 'text-white'}`}>
              DeepGuard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors duration-300 font-medium ${
                  isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-gray-200'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Auth Buttons / User Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'authenticated' ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center space-x-2 py-2 px-3 rounded-lg transition-colors ${
                    isScrolled
                      ? 'hover:bg-gray-100 text-gray-800'
                      : 'hover:bg-white/10 text-white'
                  }`}
                >
                  <img
                    src={user?.avatarUrl || 'https://via.placeholder.com/32'}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>{user?.name}</span>
                  <ChevronDown size={16} />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-white rounded-lg shadow-xl">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/dashboard/settings"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`font-medium transition-colors ${
                    isScrolled ? 'text-gray-700 hover:text-primary-600' : 'text-white hover:text-gray-200'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`btn ${
                    isScrolled ? 'btn-primary' : 'bg-white text-primary-800 hover:bg-gray-100'
                  }`}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />
            ) : (
              <Menu size={24} className={isScrolled ? 'text-gray-800' : 'text-white'} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-xl">
            <nav className="flex flex-col space-y-3 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-gray-800 hover:text-primary-600 py-2"
                >
                  {link.name}
                </Link>
              ))}
              {status === 'authenticated' ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-gray-800 hover:text-primary-600 py-2"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="text-left text-gray-800 hover:text-primary-600 py-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-gray-800 hover:text-primary-600 py-2"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn btn-primary w-full mt-2"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;