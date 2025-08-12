import './index.css'
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import { AnalysisProvider } from './context/AnalysisContext';
import ErrorDisplay from './components/ErrorDisplay';

function App() {
  return (
    <AnalysisProvider>
      <ErrorDisplay />
      {/* <Navbar /> */}
      <AppRoutes />
    </AnalysisProvider>
  )
}

export default App
