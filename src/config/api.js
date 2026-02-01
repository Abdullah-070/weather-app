// OpenWeatherMap API configuration
// Get your free API key at: https://openweathermap.org/api

// API key is loaded from environment variable for security
export const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';

export const BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Weather icon mapping
export const WEATHER_ICONS = {
  '01d': '☀️',
  '01n': '🌙',
  '02d': '⛅',
  '02n': '☁️',
  '03d': '☁️',
  '03n': '☁️',
  '04d': '☁️',
  '04n': '☁️',
  '09d': '🌧️',
  '09n': '🌧️',
  '10d': '🌦️',
  '10n': '🌧️',
  '11d': '⛈️',
  '11n': '⛈️',
  '13d': '❄️',
  '13n': '❄️',
  '50d': '🌫️',
  '50n': '🌫️',
};

// Weather backgrounds based on condition
export const WEATHER_BACKGROUNDS = {
  Clear: {
    day: 'from-blue-400 via-blue-500 to-blue-600',
    night: 'from-indigo-900 via-purple-900 to-slate-900',
  },
  Clouds: {
    day: 'from-gray-400 via-gray-500 to-gray-600',
    night: 'from-gray-800 via-gray-900 to-slate-900',
  },
  Rain: {
    day: 'from-slate-500 via-slate-600 to-slate-700',
    night: 'from-slate-800 via-slate-900 to-gray-900',
  },
  Drizzle: {
    day: 'from-slate-400 via-slate-500 to-slate-600',
    night: 'from-slate-700 via-slate-800 to-gray-900',
  },
  Thunderstorm: {
    day: 'from-purple-600 via-purple-700 to-purple-800',
    night: 'from-purple-900 via-indigo-900 to-slate-900',
  },
  Snow: {
    day: 'from-slate-200 via-slate-300 to-slate-400',
    night: 'from-slate-600 via-slate-700 to-slate-800',
  },
  Mist: {
    day: 'from-gray-300 via-gray-400 to-gray-500',
    night: 'from-gray-700 via-gray-800 to-gray-900',
  },
  Fog: {
    day: 'from-gray-300 via-gray-400 to-gray-500',
    night: 'from-gray-700 via-gray-800 to-gray-900',
  },
  Haze: {
    day: 'from-amber-200 via-amber-300 to-amber-400',
    night: 'from-amber-800 via-amber-900 to-slate-900',
  },
  default: {
    day: 'from-blue-400 via-blue-500 to-blue-600',
    night: 'from-indigo-900 via-purple-900 to-slate-900',
  },
};
