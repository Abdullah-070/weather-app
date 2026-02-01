import { useState, useEffect, useCallback } from 'react';
import {
  fetchCurrentWeather,
  fetchForecast,
  getCurrentLocation,
  searchCities,
} from '../services/weatherService';
import { getUnits, setUnits as saveUnits, getFavorites } from '../utils/storage';

// Default fallback location (London) when geolocation fails
const DEFAULT_LOCATION = { lat: 51.5074, lon: -0.1278 };

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [units, setUnitsState] = useState(getUnits());

  // Set units and save to storage
  const setUnits = useCallback((newUnits) => {
    setUnitsState(newUnits);
    saveUnits(newUnits);
  }, []);

  // Fetch weather data for a location
  const fetchWeatherData = useCallback(
    async (lat, lon) => {
      setLoading(true);
      setError(null);

      try {
        const [weather, forecastData] = await Promise.all([
          fetchCurrentWeather(lat, lon, units),
          fetchForecast(lat, lon, units),
        ]);

        setCurrentWeather(weather);
        setForecast(forecastData);
        setLocation({ lat, lon, name: weather.name, country: weather.sys.country });
      } catch (err) {
        setError(err.message || 'Failed to fetch weather data');
        console.error('Error fetching weather data:', err);
      } finally {
        setLoading(false);
      }
    },
    [units]
  );

  // Get weather for current location
  const getWeatherForCurrentLocation = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const coords = await getCurrentLocation();
      await fetchWeatherData(coords.lat, coords.lon);
    } catch (err) {
      console.error('Geolocation error:', err.message);
      // Try to use first favorite as fallback, otherwise use default location
      const favorites = getFavorites();
      if (favorites.length > 0) {
        await fetchWeatherData(favorites[0].lat, favorites[0].lon);
      } else {
        // Load default location but show a message
        setError('Location access denied. Showing default location. Use search to find your city.');
        await fetchWeatherData(DEFAULT_LOCATION.lat, DEFAULT_LOCATION.lon);
      }
    }
  }, [fetchWeatherData]);

  // Search for a city
  const searchCity = useCallback(async (query) => {
    if (!query || query.length < 2) return [];

    try {
      const results = await searchCities(query);
      return results.map((city) => ({
        name: city.name,
        country: city.country,
        state: city.state,
        lat: city.lat,
        lon: city.lon,
      }));
    } catch (err) {
      console.error('Error searching cities:', err);
      return [];
    }
  }, []);

  // Select a city from search results
  const selectCity = useCallback(
    async (city) => {
      await fetchWeatherData(city.lat, city.lon);
    },
    [fetchWeatherData]
  );

  // Refresh weather data
  const refresh = useCallback(() => {
    if (location) {
      fetchWeatherData(location.lat, location.lon);
    }
  }, [location, fetchWeatherData]);

  // Initial load - get weather for current location
  useEffect(() => {
    getWeatherForCurrentLocation();
  }, []);

  // Refetch when units change
  useEffect(() => {
    if (location) {
      fetchWeatherData(location.lat, location.lon);
    }
  }, [units]);

  return {
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
  };
};
