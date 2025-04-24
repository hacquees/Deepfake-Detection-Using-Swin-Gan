import React from 'react';
import { Upload, BarChart2, FileCheck } from 'lucide-react';

const steps = [
  {
    icon: <Upload size={32} className="text-white" />,
    title: 'Upload Media',
    description: 'Upload an image or video, or use your webcam to analyze content for deepfake detection.',
    color: 'bg-primary-600'
  },
  {
    icon: <BarChart2 size={32} className="text-white" />,
    title: 'AI Analysis',
    description: 'Our model, trained on millions of samples, identifies manipulation patterns using advanced deep learning techniques.',
    color: 'bg-secondary-600'
  },
  {
    icon: <FileCheck size={32} className="text-white" />,
    title: 'Get Results',
    description: 'Receive a detailed report with confidence scores and extracted frames highlighting manipulated areas.',
    color: 'bg-accent-600'
  }
];

const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-primary-100 text-primary-800 font-medium text-sm mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary-800">
            How DeepGuard Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            DeepGuard leverages a hybrid AI architecture developed by NIET students to detect deepfakes with exceptional precision.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-20 h-20 ${step.color} rounded-full flex items-center justify-center mb-6`}>
                {step.icon}
              </div>
              <div className="relative mb-8 h-0.5 w-full max-w-[100px] bg-gray-200">
                <div className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs font-bold text-gray-600">{index + 1}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-primary-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <a 
            href="#" 
            className="text-primary-600 hover:text-primary-800 font-medium flex items-center justify-center transition-colors"
          >
            <span>Learn more about our technology</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;