import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { useAnalysis } from '../context/AnalysisContext';
import apiService from '../services/api';

function Analyze() {
  const [file, setFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();
  
  const { setLoading, setAnalysisError, setUploadedFile, setAnalysis } = useAnalysis();

  const validateFile = (file) => {
    // Check file type
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      throw new Error('Please upload a CSV file');
    }

    // Check file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      throw new Error('File size must be less than 2MB');
    }

    return true;
  };

  const handleFileUpload = async (uploadedFile) => {
    try {
      // Validate file
      validateFile(uploadedFile);
      
      setFile(uploadedFile);
      setLoading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Upload and analyze file
      const result = await apiService.uploadAndAnalyze(uploadedFile);
      
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Store results in context
      setAnalysis(result);
      setUploadedFile(uploadedFile);

      // Navigate to results after a short delay
      setTimeout(() => {
        navigate('/results');
      }, 500);

    } catch (error) {
      setAnalysisError(apiService.handleError(error));
      setFile(null);
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileUpload(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInput = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileUpload(selectedFile);
    }
  };

  return (
    <div className="min-h-screen bg-[#181624] text-white flex flex-col items-center justify-center px-4">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#181624] via-[#12121f] to-[#0e0e1a]"></div>
      
      {/* Floating orbs for visual appeal */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#4922E5]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#4922E5]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Upload Your <span className="text-[#4922E5]">Feedback Data</span>
          </h1>
          <p className="text-xl text-gray-300">
            Start your analysis by uploading a CSV file containing customer feedback
          </p>
        </div>

        {/* File Upload Area */}
        <div 
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            isDragOver 
              ? 'border-[#4922E5] bg-[#4922E5]/10 shadow-[0_0_30px_rgba(73,34,229,0.3)]' 
              : 'border-gray-600 hover:border-[#4922E5]/50 hover:bg-[#4922E5]/5'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {/* Upload Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-[#4922E5] rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-[#4922E5]/25 transition-all duration-300 hover:scale-110">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
          </div>

          {/* Upload Title */}
          <h2 className="text-2xl font-bold mb-4">
            Upload Your CSV File
          </h2>

          {/* Instructions */}
          <p className="text-gray-300 mb-8 max-w-md mx-auto leading-relaxed">
            Drop your feedback CSV file here or browse to select it. We support files with customer feedback, reviews, and survey responses.
          </p>

          {/* Browse Button */}
          <div className="mb-6">
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button 
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                disabled={file !== null}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Browse Files
              </Button>
            </label>
            <input
              id="file-upload"
              type="file"
              accept=".csv"
              onChange={handleFileInput}
              className="hidden"
              disabled={file !== null}
            />
          </div>

          {/* Supported Format */}
          <p className="text-sm text-gray-400">
            Supported format: CSV files up to 2MB
          </p>
        </div>

        {/* Processing State */}
        {file && (
          <div className="mt-8 text-center">
            <div className="inline-flex flex-col items-center gap-4 bg-[#4922E5]/10 border border-[#4922E5]/20 rounded-2xl px-8 py-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-[#4922E5] rounded-full animate-pulse"></div>
                <span className="text-[#4922E5] font-medium">Processing your file...</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full max-w-xs bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-[#4922E5] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-gray-400">
                {uploadProgress < 50 ? 'Uploading file...' : 
                 uploadProgress < 90 ? 'Analyzing feedback...' : 
                 'Preparing results...'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Analyze;
  