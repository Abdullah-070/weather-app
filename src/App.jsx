import React, { useState, useCallback } from 'react';
import { X } from 'lucide-react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import Forecast from './components/Forecast';
import TemperatureTrend from './components/TemperatureTrend';
import FavoritesList from './components/FavoritesList';
import Settings from './components/Settings';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { useWeather } from './hooks/useWeather';
import { useTheme } from './hooks/useTheme';
import { useFavorites } from './hooks/useFavorites';
import { WEATHER_BACKGROUNDS } from './config/api';

function App() {
  const {
    currentWeather,
    forecast,
    location,
    loading,
    error,
    units,
    setUnits,
    searchCity,
    selectCity,
    getWeatherForCurrentLocation,
    refresh,
  } = useWeather();

  const { theme, isDark, setTheme, toggleTheme } = useTheme();
  const { favorites, toggleFavorite, removeFavorite, isFavorite } = useFavorites();

  const [showSidebar, setShowSidebar] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Get background gradient based on weather condition and theme
  const getBackgroundClass = useCallback(() => {
    if (!currentWeather) {
      return isDark
        ? WEATHER_BACKGROUNDS.default.night
        : WEATHER_BACKGROUNDS.default.day;
    }

    const condition = currentWeather.weather[0].main;
    const backgrounds = WEATHER_BACKGROUNDS[condition] || WEATHER_BACKGROUNDS.default;
    
    // Use theme setting to determine day/night background
    // If theme is 'auto', use actual sunrise/sunset times
    if (theme === 'auto') {
      const now = currentWeather.dt;
      const sunrise = currentWeather.sys.sunrise;
      const sunset = currentWeather.sys.sunset;
      const isDay = now >= sunrise && now < sunset;
      return isDay ? backgrounds.day : backgrounds.night;
    }
    
    // Otherwise use the theme toggle setting
    return isDark ? backgrounds.night : backgrounds.day;
  }, [currentWeather, isDark, theme]);

  // Handle favorite toggle
  const handleToggleFavorite = useCallback(() => {
    if (location) {
      toggleFavorite({
        name: location.name,
        country: location.country,
        lat: location.lat,
        lon: location.lon,
      });
    }
  }, [location, toggleFavorite]);

  // Check if current location is a favorite
  const isCurrentFavorite = location ? isFavorite(location.lat, location.lon) : false;

  // Handle selecting a favorite location
  const handleSelectFavorite = useCallback(
    (favorite) => {
      selectCity(favorite);
      setShowSidebar(false);
    },
    [selectCity]
  );

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${getBackgroundClass()} transition-colors duration-500`}
    >
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        {/* Header */}
        <Header
          isDark={isDark}
          toggleTheme={toggleTheme}
          onMenuClick={() => setShowSidebar(true)}
          onLocationClick={getWeatherForCurrentLocation}
          onRefresh={refresh}
          onSettingsClick={() => setShowSettings(!showSettings)}
          isRefreshing={loading}
        />

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <SearchBar onSearch={searchCity} onSelectCity={selectCity} />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Current Weather & Hourly */}
          <div className="lg:col-span-2 space-y-6">
            {loading && !currentWeather ? (
              <LoadingSpinner />
            ) : error ? (
              <ErrorMessage
                message={error}
                onRetry={refresh}
                onUseLocation={getWeatherForCurrentLocation}
              />
            ) : (
              <>
                <CurrentWeather
                  weather={currentWeather}
                  units={units}
                  isFavorite={isCurrentFavorite}
                  onToggleFavorite={handleToggleFavorite}
                />
                <HourlyForecast forecast={forecast} units={units} />
                <TemperatureTrend forecast={forecast} units={units} />
              </>
            )}
          </div>

          {/* Right Column - Forecast & Favorites */}
          <div className="space-y-6">
            {!loading && !error && (
              <>
                <Forecast forecast={forecast} units={units} />
                <div className="hidden lg:block">
                  <FavoritesList
                    favorites={favorites}
                    onSelect={handleSelectFavorite}
                    onRemove={removeFavorite}
                  />
                </div>
                {showSettings && (
                  <Settings
                    theme={theme}
                    setTheme={setTheme}
                    units={units}
                    setUnits={setUnits}
                    isDark={isDark}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSidebar(false)}
          />

          {/* Sidebar Panel */}
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85%] bg-gradient-to-br from-slate-800 to-slate-900 shadow-xl overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Menu</h2>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </button>
              </div>

              <div className="space-y-6">
                <FavoritesList
                  favorites={favorites}
                  onSelect={handleSelectFavorite}
                  onRemove={removeFavorite}
                />
                <Settings
                  theme={theme}
                  setTheme={setTheme}
                  units={units}
                  setUnits={setUnits}
                  isDark={isDark}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
