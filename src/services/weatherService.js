import { API_KEY, BASE_URL, GEO_URL } from '../config/api';

// Fetch current weather by coordinates
export const fetchCurrentWeather = async (lat, lon, units = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch weather data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Fetch 7-day forecast by coordinates
export const fetchForecast = async (lat, lon, units = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to fetch forecast data');
    return await response.json();
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

// Fetch weather by city name
export const fetchWeatherByCity = async (city, units = 'metric') => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('City not found');
    return await response.json();
  } catch (error) {
    console.error('Error fetching weather by city:', error);
    throw error;
  }
};

// Search cities by name (Geocoding API)
export const searchCities = async (query, limit = 5) => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${query}&limit=${limit}&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to search cities');
    return await response.json();
  } catch (error) {
    console.error('Error searching cities:', error);
    throw error;
  }
};

// Reverse geocoding - get city name from coordinates
export const reverseGeocode = async (lat, lon) => {
  try {
    const response = await fetch(
      `${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`
    );
    if (!response.ok) throw new Error('Failed to reverse geocode');
    return await response.json();
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    throw error;
  }
};

// Get user's current location
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error('Location permission denied'));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error('Location information unavailable'));
            break;
          case error.TIMEOUT:
            reject(new Error('Location request timed out'));
            break;
          default:
            reject(new Error('An unknown error occurred'));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
};
