// Client/src/context/AnalysisContext.jsx
import { createContext, useContext, useState } from 'react';

const AnalysisContext = createContext();

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (!context) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return context;
};

export const AnalysisProvider = ({ children }) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const setAnalysis = (data) => {
    setAnalysisData(data);
    setError(null);
  };

  const setLoading = (loading) => {
    setIsLoading(loading);
    if (loading) {
      setError(null);
    }
  };

  const setAnalysisError = (errorMessage) => {
    setError(errorMessage);
    setIsLoading(false);
  };

  const clearAnalysis = () => {
    setAnalysisData(null);
    setError(null);
    setUploadedFile(null);
    setIsLoading(false);
  };

  const value = {
    analysisData,
    isLoading,
    error,
    uploadedFile,
    setAnalysis,
    setLoading,
    setAnalysisError,
    setUploadedFile,
    clearAnalysis,
  };

  return (
    <AnalysisContext.Provider value={value}>
      {children}
    </AnalysisContext.Provider>
  );
};
