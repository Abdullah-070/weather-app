import React from 'react';
import { Cloud, RefreshCw } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative">
        <Cloud className="w-16 h-16 text-white/30 animate-pulse-slow" />
        <RefreshCw className="w-8 h-8 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
      </div>
      <p className="text-white/60 mt-4">Loading weather data...</p>
    </div>
  );
};

export default LoadingSpinner;
