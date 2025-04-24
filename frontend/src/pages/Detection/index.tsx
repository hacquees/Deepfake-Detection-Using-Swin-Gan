import React, { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import UploadSection from './UploadSection';
import ResultsSection from './ResultsSection';
import { DetectionResult } from '../../types';
import axios from 'axios';

const Detection: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File | null, isWebcam: boolean = false) => {
    try {
      setError(null);
      setIsProcessing(true);
      setResult(null);

      const formData = new FormData();
      if (file) formData.append('file', file);
      formData.append('isWebcam', isWebcam.toString());

      const response = await axios.post('http://localhost:5000/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { prediction, confidence, frames } = response.data;
      setResult({
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        filename: file ? file.name : 'webcam-capture.jpg',
        fileType: file?.type.includes('video') ? 'video' : 'image',
        fileUrl: file ? URL.createObjectURL(file) : 'https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg',
        confidence: confidence / 100,
        isDeepfake: prediction === 'FAKE',
        regions: confidence > 0.7 ? [{ x: 120, y: 80, width: 200, height: 200, confidence: 0.97 }] : undefined,
        framePaths: frames,
      });
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
                <UploadSection onUpload={handleUpload} isProcessing={isProcessing} error={error} />
              ) : (
                <ResultsSection result={result} onReset={() => { setResult(null); setError(null); }} />
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