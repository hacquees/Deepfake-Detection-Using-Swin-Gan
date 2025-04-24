import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Github as GitHub } from 'lucide-react';
import Logo from '../common/Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary-800 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Logo size={32} color="#ffffff" />
              <span className="text-xl font-semibold">DeepGuard</span>
            </div>
            <p className="text-gray-300 mb-4">
              Advanced AI-powered deepfake detection platform. A research project by NIET students.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors" aria-label="GitHub">
                <GitHub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/detect" className="text-gray-300 hover:text-white transition-colors">Detection Tool</Link>
              </li>
              <li>
                <Link to="/#about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</Link>
              </li>
              <li>
                <Link to="/research" className="text-gray-300 hover:text-white transition-colors">Research Paper</Link>
              </li>
            </ul>
          </div>

          {/* Institution */}
          <div>
            <h3 className="text-lg text-white font-semibold mb-4">Institution</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">
                Noida Institute of Engineering and Technology
              </li>
              <li className="text-gray-300">
                Department of Computer Science & Engineering
              </li>
              <li className="text-gray-300">
                Greater Noida, Uttar Pradesh
              </li>
              <li>
                <a href="https://www.niet.co.in" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                  www.niet.co.in
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg  text-white font-semibold mb-4">Contact</h3>
            <p className="text-gray-300 mb-2">Research Team</p>
            <p className="text-gray-300 mb-2">NIET Campus</p>
            <p className="text-gray-300 mb-2">Greater Noida, UP 201306</p>
            <p className="text-gray-300 mb-2">deepguard.research@niet.co.in</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-700 text-gray-400 text-sm">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} DeepGuard - NIET Major Project. All rights reserved.</p>
            <p className="mt-4 md:mt-0">
              Developed by Ankit, Priya, Anmol & Prakhar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;