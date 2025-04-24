import React from 'react';
import { 
  Zap, 
  Shield, 
  FileText, 
  Eye, 
  Lock, 
  BarChart 
} from 'lucide-react';

const features = [
  {
    icon: <Zap size={24} className="text-primary-600" />,
    title: 'Immediate Detection',
    description: 'Get instant results with our high-performance detection algorithms.'
  },
  {
    icon: <Shield size={24} className="text-primary-600" />,
    title: 'Advanced AI Model',
    description: 'Our proprietary deepfake detection model trained on millions of images and videos.'
  },
  {
    icon: <FileText size={24} className="text-primary-600" />,
    title: 'Detailed Reports',
    description: 'Download comprehensive analysis reports for your records.'
  },
  {
    icon: <Eye size={24} className="text-primary-600" />,
    title: 'Visual Heatmaps',
    description: 'See exactly which parts of the media have been manipulated with visual overlays.'
  },
  {
    icon: <Lock size={24} className="text-primary-600" />,
    title: 'Privacy-Focused',
    description: 'Your uploads are processed securely and deleted after analysis.'
  },
  {
    icon: <BarChart size={24} className="text-primary-600" />,
    title: 'Confidence Scoring',
    description: 'Get detailed confidence scores to understand detection certainty.'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-800 font-medium text-sm mb-4">
            Key Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-800">
            Powerful Detection Tools
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            DeepGuard provides comprehensive deepfake detection capabilities with industry-leading accuracy and ease of use.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="card hover:shadow-md transition-shadow duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4">
                <div className="p-3 rounded-full bg-primary-100 inline-flex">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;