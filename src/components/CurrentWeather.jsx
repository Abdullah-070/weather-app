import React from 'react';
import { MapPin, Heart, Droplets, Wind, Eye, Gauge } from 'lucide-react';
import WeatherIcon from './WeatherIcon';
import { formatTemp, formatWindSpeed, formatVisibility, getWindDirection, formatTime, isDayTime } from '../utils/helpers';

const CurrentWeather = ({ weather, units, isFavorite, onToggleFavorite }) => {
  if (!weather) return null;

  const {
    name,
    sys: { country, sunrise, sunset },
    main: { temp, feels_like, humidity, pressure },
    weather: [condition],
    wind: { speed, deg },
    visibility,
    dt,
  } = weather;

  const isDay = isDayTime(dt, sunrise, sunset);

  return (
    <div className="weather-card animate-fade-in">
      {/* Location Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-white/80" />
          <h2 className="text-xl font-semibold text-white">
            {name}, {country}
          </h2>
        </div>
        <button
          onClick={onToggleFavorite}
          className="p-2 rounded-full hover:bg-white/10 transition-colors"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={`w-6 h-6 transition-colors ${
              isFavorite ? 'fill-red-500 text-red-500' : 'text-white/80'
            }`}
          />
        </button>
      </div>

      {/* Main Temperature Display */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-7xl font-light text-white mb-2">
            {formatTemp(temp, units)}
          </div>
          <p className="text-white/70 text-lg">
            Feels like {formatTemp(feels_like, units)}
          </p>
        </div>
        <div className="text-center">
          <WeatherIcon code={condition.icon} size={80} />
          <p className="text-white text-lg mt-2 capitalize">
            {condition.description}
          </p>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 text-white/70 mb-1">
            <Droplets className="w-4 h-4" />
            <span className="text-sm">Humidity</span>
          </div>
          <p className="text-white text-xl font-medium">{humidity}%</p>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 text-white/70 mb-1">
            <Wind className="w-4 h-4" />
            <span className="text-sm">Wind</span>
          </div>
          <p className="text-white text-xl font-medium">
            {formatWindSpeed(speed, units)} {getWindDirection(deg)}
          </p>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 text-white/70 mb-1">
            <Eye className="w-4 h-4" />
            <span className="text-sm">Visibility</span>
          </div>
          <p className="text-white text-xl font-medium">
            {formatVisibility(visibility, units)}
          </p>
        </div>

        <div className="bg-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 text-white/70 mb-1">
            <Gauge className="w-4 h-4" />
            <span className="text-sm">Pressure</span>
          </div>
          <p className="text-white text-xl font-medium">{pressure} hPa</p>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="flex justify-center gap-8 mt-6 pt-6 border-t border-white/10">
        <div className="text-center">
          <p className="text-white/70 text-sm mb-1">Sunrise</p>
          <p className="text-white font-medium">{formatTime(sunrise)}</p>
        </div>
        <div className="text-center">
          <p className="text-white/70 text-sm mb-1">Sunset</p>
          <p className="text-white font-medium">{formatTime(sunset)}</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
