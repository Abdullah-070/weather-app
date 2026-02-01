import React from 'react';
import WeatherIcon from './WeatherIcon';
import { formatTemp, formatTime } from '../utils/helpers';

const HourlyForecast = ({ forecast, units }) => {
  if (!forecast || !forecast.list) return null;

  // Get next 24 hours (8 x 3-hour intervals)
  const hourlyData = forecast.list.slice(0, 8);

  return (
    <div className="weather-card animate-fade-in">
      <h3 className="text-xl font-semibold text-white mb-4">Hourly Forecast</h3>
      
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {hourlyData.map((hour, index) => (
          <div
            key={hour.dt}
            className={`flex flex-col items-center min-w-[80px] p-3 rounded-xl ${
              index === 0 ? 'bg-white/20' : 'bg-white/10'
            }`}
          >
            <p className="text-white/70 text-sm mb-2">
              {index === 0 ? 'Now' : formatTime(hour.dt, { hour: 'numeric' })}
            </p>
            <WeatherIcon code={hour.weather[0].icon} size={32} />
            <p className="text-white font-medium mt-2">
              {formatTemp(hour.main.temp, units)}
            </p>
            <p className="text-white/60 text-xs mt-1">
              {hour.pop > 0 ? `${Math.round(hour.pop * 100)}%` : ''}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
