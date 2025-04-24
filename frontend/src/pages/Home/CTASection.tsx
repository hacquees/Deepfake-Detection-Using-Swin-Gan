import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary-800 to-secondary-800 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl text-gray-100 md:text-4xl font-bold mb-6">
            Ready to Detect Deepfakes with Confidence?
          </h2>
          <p className="text-xl text-gray-100 mb-10 max-w-2xl mx-auto">
            Start using our advanced AI-powered deepfake detection platform today and stay protected in the era of synthetic media.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/detect"
              className="btn bg-white text-primary-800 hover:bg-gray-100 shadow-lg"
            >
              <span>Try It Now</span>
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link
              to="/signup"
              className="btn border-2 border-white/80 text-white hover:bg-white/10"
            >
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;