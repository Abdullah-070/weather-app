import React from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, Moon, CloudLightning, CloudFog, Wind } from 'lucide-react';

const iconMap = {
  '01d': Sun,
  '01n': Moon,
  '02d': Cloud,
  '02n': Cloud,
  '03d': Cloud,
  '03n': Cloud,
  '04d': Cloud,
  '04n': Cloud,
  '09d': CloudRain,
  '09n': CloudRain,
  '10d': CloudRain,
  '10n': CloudRain,
  '11d': CloudLightning,
  '11n': CloudLightning,
  '13d': CloudSnow,
  '13n': CloudSnow,
  '50d': CloudFog,
  '50n': CloudFog,
};

const colorMap = {
  '01d': 'text-yellow-400',
  '01n': 'text-blue-200',
  '02d': 'text-gray-300',
  '02n': 'text-gray-400',
  '03d': 'text-gray-400',
  '03n': 'text-gray-500',
  '04d': 'text-gray-500',
  '04n': 'text-gray-600',
  '09d': 'text-blue-400',
  '09n': 'text-blue-500',
  '10d': 'text-blue-400',
  '10n': 'text-blue-500',
  '11d': 'text-purple-400',
  '11n': 'text-purple-500',
  '13d': 'text-white',
  '13n': 'text-blue-100',
  '50d': 'text-gray-300',
  '50n': 'text-gray-400',
};

const WeatherIcon = ({ code, size = 48, className = '' }) => {
  const IconComponent = iconMap[code] || Cloud;
  const colorClass = colorMap[code] || 'text-white';

  return (
    <IconComponent
      size={size}
      className={`${colorClass} ${className}`}
      strokeWidth={1.5}
    />
  );
};

export default WeatherIcon;
