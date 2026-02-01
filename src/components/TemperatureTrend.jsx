import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { groupForecastByDay, formatTemp } from '../utils/helpers';

const TemperatureTrend = ({ forecast, units }) => {
  if (!forecast || !forecast.list) return null;

  const dailyData = groupForecastByDay(forecast.list).slice(0, 7);
  
  // Calculate temperature range for scaling
  const allTemps = dailyData.flatMap(d => [d.minTemp, d.maxTemp]);
  const minTemp = Math.min(...allTemps);
  const maxTemp = Math.max(...allTemps);
  const tempRange = maxTemp - minTemp || 1;

  // Calculate trend
  const firstDayAvg = (dailyData[0].minTemp + dailyData[0].maxTemp) / 2;
  const lastDayAvg = (dailyData[dailyData.length - 1].minTemp + dailyData[dailyData.length - 1].maxTemp) / 2;
  const isWarming = lastDayAvg > firstDayAvg;

  return (
    <div className="weather-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white">Temperature Trend</h3>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
          isWarming ? 'bg-orange-500/20 text-orange-300' : 'bg-blue-500/20 text-blue-300'
        }`}>
          {isWarming ? (
            <>
              <TrendingUp className="w-4 h-4" />
              <span>Warming</span>
            </>
          ) : (
            <>
              <TrendingDown className="w-4 h-4" />
              <span>Cooling</span>
            </>
          )}
        </div>
      </div>

      {/* Temperature Chart */}
      <div className="relative h-48 mt-6">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-white/50 text-xs">
          <span>{formatTemp(maxTemp, units)}</span>
          <span>{formatTemp((maxTemp + minTemp) / 2, units)}</span>
          <span>{formatTemp(minTemp, units)}</span>
        </div>

        {/* Chart area */}
        <div className="ml-12 h-full flex items-end justify-between gap-2">
          {dailyData.map((day, index) => {
            const maxHeight = ((day.maxTemp - minTemp) / tempRange) * 100;
            const minHeight = ((day.minTemp - minTemp) / tempRange) * 100;
            const barHeight = maxHeight - minHeight;
            
            return (
              <div key={day.date} className="flex-1 flex flex-col items-center">
                <div className="relative w-full h-36 flex items-end justify-center">
                  <div
                    className="w-4 bg-gradient-to-t from-blue-400 to-orange-400 rounded-full relative"
                    style={{
                      height: `${Math.max(barHeight, 10)}%`,
                      marginBottom: `${minHeight}%`,
                    }}
                  >
                    {/* Max temp tooltip */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-white/80 whitespace-nowrap">
                      {Math.round(day.maxTemp)}°
                    </div>
                    {/* Min temp tooltip */}
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/60 whitespace-nowrap">
                      {Math.round(day.minTemp)}°
                    </div>
                  </div>
                </div>
                <p className="text-white/70 text-xs mt-8">
                  {index === 0 ? 'Today' : new Date(day.date * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TemperatureTrend;
