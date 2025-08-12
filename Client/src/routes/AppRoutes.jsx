import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Analyze from '../pages/Analyze';
import Results from '../pages/Results';
import NotFound from '../pages/NotFound';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analyze" element={<Analyze />} />
      <Route path="/results" element={<Results />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
