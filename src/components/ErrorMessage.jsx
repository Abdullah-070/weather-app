import React from 'react';
import { AlertCircle, RefreshCw, MapPin } from 'lucide-react';

const ErrorMessage = ({ message, onRetry, onUseLocation }) => {
  return (
    <div className="weather-card animate-fade-in text-center py-8">
      <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-white mb-2">Oops!</h3>
      <p className="text-white/70 mb-6">{message}</p>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-primary flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </button>
        )}
        {onUseLocation && (
          <button
            onClick={onUseLocation}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            Use My Location
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
