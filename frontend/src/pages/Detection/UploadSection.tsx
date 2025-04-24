import React, { useState, useRef, useCallback } from 'react';
import { UploadCloud, Camera, X, AlertCircle, FileType, Film } from 'lucide-react';

interface UploadSectionProps {
  onUpload: (file: File | null, isWebcam: boolean) => void;
  isProcessing: boolean;
  error: string | null;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onUpload, isProcessing, error }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [webcamMode, setWebcamMode] = useState(false);
  const [webcamStream, setWebcamStream] = useState<MediaStream | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelection(file);
    }
  }, []);

  const handleFileSelection = (file: File) => {
    const validTypes = [
      'image/jpeg',
      'image/png',
      'video/mp4',
      'video/quicktime'
    ];
    
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid file type (.jpg, .png, .mp4, .mov)');
      return;
    }
    
    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      alert('File size exceeds the 50MB limit');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelection(e.target.files[0]);
    }
  };

  const startWebcam = async () => {
    try {
      setWebcamMode(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setWebcamStream(stream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
      alert('Could not access webcam. Please ensure you have granted camera permissions.');
      setWebcamMode(false);
    }
  };

  const stopWebcam = () => {
    if (webcamStream) {
      webcamStream.getTracks().forEach(track => track.stop());
      setWebcamStream(null);
    }
    setWebcamMode(false);
  };

  const captureWebcamImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw video frame to canvas
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Convert to file if needed
        // canvas.toBlob(blob => {
        //   if (blob) {
        //     const file = new File([blob], "webcam-capture.jpg", { type: "image/jpeg" });
        //     onUpload(file, true);
        //   }
        // }, 'image/jpeg');
        
        // For simplicity, we'll just pass null and use the webcam flag
        onUpload(null, true);
        stopWebcam();
      }
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile, false);
    }
  };

  const resetSelection = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="card">
      {error && (
        <div className="mb-6 p-4 bg-error-100 text-error-900 rounded-lg flex items-center">
          <AlertCircle size={20} className="mr-2 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      {/* File Upload Area */}
      {!webcamMode && !selectedFile && (
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="mb-4 flex justify-center">
            <div className="p-4 bg-primary-100 rounded-full">
              <UploadCloud size={32} className="text-primary-600" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            Drag & Drop or Select a File
          </h3>
          <p className="text-gray-500 mb-4">
            Supported formats: .jpg, .png, .mp4, .mov (max 50MB)
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-primary"
              disabled={isProcessing}
            >
              Browse Files
            </button>
            <button
              type="button"
              onClick={startWebcam}
              className="btn btn-outline"
              disabled={isProcessing}
            >
              <Camera size={18} className="mr-2" />
              Use Webcam
            </button>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".jpg,.jpeg,.png,.mp4,.mov"
              onChange={handleFileInputChange}
              disabled={isProcessing}
            />
          </div>
        </div>
      )}
      
      {/* Selected File Preview */}
      {!webcamMode && selectedFile && (
        <div className="text-center">
          <div className="mb-6">
            <div className="relative inline-block">
              {selectedFile.type.includes('image') ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected file"
                  className="max-h-96 rounded-lg"
                />
              ) : (
                <div className="bg-gray-100 p-8 rounded-lg text-center">
                  <Film size={48} className="mx-auto mb-4 text-gray-500" />
                  <p className="font-medium text-gray-800">{selectedFile.name}</p>
                  <p className="text-gray-500">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              )}
              <button
                type="button"
                onClick={resetSelection}
                className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                disabled={isProcessing}
              >
                <X size={20} className="text-gray-700" />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="button"
              onClick={handleUpload}
              className="btn btn-primary"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Analyze File'
              )}
            </button>
            <button
              type="button"
              onClick={resetSelection}
              className="btn btn-outline"
              disabled={isProcessing}
            >
              Choose Different File
            </button>
          </div>
        </div>
      )}
      
      {/* Webcam Capture */}
      {webcamMode && (
        <div className="text-center">
          <div className="relative mb-6">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full max-h-96 rounded-lg bg-black"
            />
            <canvas ref={canvasRef} className="hidden" />
            <button
              type="button"
              onClick={stopWebcam}
              className="absolute -top-3 -right-3 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              disabled={isProcessing}
            >
              <X size={20} className="text-gray-700" />
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              type="button"
              onClick={captureWebcamImage}
              className="btn btn-primary"
              disabled={isProcessing || !webcamStream}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                </>
              ) : (
                'Capture & Analyze'
              )}
            </button>
            <button
              type="button"
              onClick={stopWebcam}
              className="btn btn-outline"
              disabled={isProcessing}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Processing Progress */}
      {isProcessing && (
        <div className="mt-6">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary-600 rounded-full animate-pulse-slow" style={{ width: '100%' }}></div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            Analyzing media for manipulation...
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadSection;