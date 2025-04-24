import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import UploadSection from './UploadSection';
import ResultsSection from './ResultsSection';
import { DetectionResult } from '../../types';

const Detection: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File | null, isWebcam: boolean = false) => {
    try {
      setError(null);
      setIsProcessing(true);
      setResult(null);
      
      // Simulate API processing time
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Mock result - in a real app, this would come from the backend
      const mockResult: DetectionResult = {
        id: Math.random().toString(36).substring(2, 11),
        timestamp: new Date().toISOString(),
        filename: file ? file.name : 'webcam-capture.jpg',
        fileType: file?.type.includes('video') ? 'video' : 'image',
        fileUrl: file ? URL.createObjectURL(file) : 'https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg',
        confidence: Math.random() > 0.3 ? 0.94 : 0.02,
        isDeepfake: Math.random() > 0.3,
        regions: Math.random() > 0.3 ? [
          {
            x: 120,
            y: 80,
            width: 200,
            height: 200,
            confidence: 0.97
          }
        ] : undefined
      };
      
      setResult(mockResult);
    } catch (err) {
      setError('An error occurred during detection. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <section className="py-10 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary-800">
                Deepfake Detection Tool
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Upload an image or video, or use your webcam to detect potential deepfakes with our advanced AI technology.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              {!result ? (
                <UploadSection 
                  onUpload={handleUpload} 
                  isProcessing={isProcessing}
                  error={error}
                />
              ) : (
                <ResultsSection 
                  result={result} 
                  onReset={() => {
                    setResult(null);
                    setError(null);
                  }}
                />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Detection;