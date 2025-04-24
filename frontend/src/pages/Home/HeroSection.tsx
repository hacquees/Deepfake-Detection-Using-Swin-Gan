import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, CheckCircle } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative pt-20 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 animated-gradient"></div>
      
      {/* Content */}
      <div className="relative container-custom pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <Shield size={16} className="mr-2 text-accent-400" />
              <span className="text-sm font-medium">AI-Powered Detection</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
              Detect Deepfakes with Unmatched Accuracy
            </h1>
            
            <p className="text-xl mb-8 text-gray-100 max-w-xl">
              Our advanced AI algorithms detect manipulated media with 99.7% accuracy, keeping you protected in the era of synthetic media.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link to="/detect" className="btn bg-white text-primary-800 hover:bg-gray-100">
                <span>Try Now</span>
                <ArrowRight size={18} className="ml-2" />
              </Link>
              <Link to="/#how-it-works" className="btn border-2 border-white/60 text-white hover:bg-white/10">
                Learn How It Works
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                'Industry-leading accuracy',
                'Advanced Deepfake detection',
                'Secure & private analysis'
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle size={20} className="mr-2 text-accent-400" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative z-10 bg-white rounded-xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <img 
                src="https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg?auto=compress&cs=tinysrgb&w=1200" 
                alt="Deepfake Detection" 
                className="w-full h-auto max-h-[80%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 to-transparent flex items-end p-6">
                <div className="card w-full bg-white/90 backdrop-blur-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-primary-800">Analysis Result</span>
                    <span className="px-3 py-1 rounded-full bg-error-500 text-white text-xs font-medium">Deepfake Detected</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-2 bg-error-500 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <div className="mt-2 text-right text-sm text-gray-700">94% confidence</div>
                </div>
              </div>
            </div>

                      
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent-500 rounded-full opacity-20 animate-pulse-slow"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary-600 rounded-full opacity-20 animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
      
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" fill="#f9fafb">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;