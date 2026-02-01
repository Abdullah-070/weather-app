import React from 'react';
import WeatherIcon from './WeatherIcon';
import { formatTemp, groupForecastByDay, getShortDayName } from '../utils/helpers';

const Forecast = ({ forecast, units }) => {
  if (!forecast || !forecast.list) return null;

  const dailyForecast = groupForecastByDay(forecast.list).slice(0, 7);

  return (
    <div className="weather-card animate-fade-in">
      <h3 className="text-xl font-semibold text-white mb-4">7-Day Forecast</h3>
      
      <div className="space-y-3">
        {dailyForecast.map((day, index) => {
          const isToday = index === 0;
          
          return (
            <div
              key={day.date}
              className={`flex items-center justify-between p-3 rounded-xl ${
                isToday ? 'bg-white/20' : 'bg-white/10 hover:bg-white/15'
              } transition-colors`}
            >
              <div className="w-20">
                <p className="text-white font-medium">
                  {isToday ? 'Today' : getShortDayName(day.date)}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <WeatherIcon code={day.weather.icon} size={32} />
                <p className="text-white/70 text-sm w-24 hidden sm:block capitalize">
                  {day.weather.description}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-white font-medium w-14 text-right">
                  {formatTemp(day.maxTemp, units)}
                </span>
                <span className="text-white/60 w-14 text-right">
                  {formatTemp(day.minTemp, units)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Forecast;
