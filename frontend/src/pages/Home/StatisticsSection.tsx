import React from 'react';
import { ShieldCheck, Image, Video, Users } from 'lucide-react';

const stats = [
  {
    icon: <ShieldCheck size={24} className="text-primary-600" />,
    value: '99.7%',
    label: 'Detection Accuracy',
    description: 'Industry-leading precision'
  },
  {
    icon: <Image size={24} className="text-primary-600" />,
    value: '2.5M+',
    label: 'Images Analyzed',
    description: 'And counting'
  },
  {
    icon: <Video size={24} className="text-primary-600" />,
    value: '500K+',
    label: 'Videos Processed',
    description: 'Across various formats'
  },
  {
    icon: <Users size={24} className="text-primary-600" />,
    value: '50K+',
    label: 'Active Users',
    description: 'Trust our platform'
  }
];

const StatisticsSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-800">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our deepfake detection platform leverages cutting-edge AI to provide industry-leading accuracy and performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="card hover:shadow-md transition-shadow duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 rounded-full bg-primary-100">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-center text-primary-800 mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-medium text-center text-gray-800 mb-1">
                {stat.label}
              </p>
              <p className="text-sm text-center text-gray-500">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;