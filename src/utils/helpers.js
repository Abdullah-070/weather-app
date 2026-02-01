// Helper utility functions

// Format temperature with unit
export const formatTemp = (temp, units = 'metric') => {
  const rounded = Math.round(temp);
  return units === 'metric' ? `${rounded}°C` : `${rounded}°F`;
};

// Format wind speed with unit
export const formatWindSpeed = (speed, units = 'metric') => {
  return units === 'metric' ? `${speed} m/s` : `${speed} mph`;
};

// Format date
export const formatDate = (timestamp, options = {}) => {
  const date = new Date(timestamp * 1000);
  const defaultOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
};

// Format time
export const formatTime = (timestamp, options = {}) => {
  const date = new Date(timestamp * 1000);
  const defaultOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  return date.toLocaleTimeString('en-US', { ...defaultOptions, ...options });
};

// Get day name from timestamp
export const getDayName = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

// Get short day name from timestamp
export const getShortDayName = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

// Check if it's currently day or night based on sunrise/sunset
export const isDayTime = (current, sunrise, sunset) => {
  return current >= sunrise && current < sunset;
};

// Get UV index description
export const getUVDescription = (uvi) => {
  if (uvi <= 2) return { level: 'Low', color: 'text-green-400' };
  if (uvi <= 5) return { level: 'Moderate', color: 'text-yellow-400' };
  if (uvi <= 7) return { level: 'High', color: 'text-orange-400' };
  if (uvi <= 10) return { level: 'Very High', color: 'text-red-400' };
  return { level: 'Extreme', color: 'text-purple-400' };
};

// Get air quality description
export const getAQIDescription = (aqi) => {
  const descriptions = {
    1: { level: 'Good', color: 'text-green-400' },
    2: { level: 'Fair', color: 'text-yellow-400' },
    3: { level: 'Moderate', color: 'text-orange-400' },
    4: { level: 'Poor', color: 'text-red-400' },
    5: { level: 'Very Poor', color: 'text-purple-400' },
  };
  return descriptions[aqi] || descriptions[1];
};

// Convert meters to kilometers or miles
export const formatVisibility = (meters, units = 'metric') => {
  if (units === 'metric') {
    return `${(meters / 1000).toFixed(1)} km`;
  }
  return `${(meters / 1609.34).toFixed(1)} mi`;
};

// Get wind direction from degrees
export const getWindDirection = (deg) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
};

// Group forecast data by day
export const groupForecastByDay = (forecastList) => {
  const grouped = {};
  
  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString('en-US');
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(item);
  });
  
  return Object.entries(grouped).map(([date, items]) => {
    const temps = items.map((i) => i.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);
    
    // Get the most common weather condition
    const conditions = items.map((i) => i.weather[0]);
    const mainCondition = conditions[Math.floor(conditions.length / 2)];
    
    return {
      date: items[0].dt,
      minTemp,
      maxTemp,
      weather: mainCondition,
      hourly: items,
    };
  });
};

// Debounce function for search
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
