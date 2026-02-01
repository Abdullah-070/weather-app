// Favorite locations storage utilities

const FAVORITES_KEY = 'weather_favorites';

// Get all favorites from localStorage
export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

// Add a location to favorites
export const addFavorite = (location) => {
  try {
    const favorites = getFavorites();
    // Check if already exists
    const exists = favorites.some(
      (fav) => fav.lat === location.lat && fav.lon === location.lon
    );
    if (exists) return favorites;

    const newFavorites = [...favorites, { ...location, id: Date.now() }];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return newFavorites;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return getFavorites();
  }
};

// Remove a location from favorites
export const removeFavorite = (id) => {
  try {
    const favorites = getFavorites();
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    return newFavorites;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return getFavorites();
  }
};

// Check if a location is in favorites
export const isFavorite = (lat, lon) => {
  const favorites = getFavorites();
  return favorites.some(
    (fav) => Math.abs(fav.lat - lat) < 0.01 && Math.abs(fav.lon - lon) < 0.01
  );
};

// Theme storage utilities
const THEME_KEY = 'weather_theme';

export const getTheme = () => {
  try {
    return localStorage.getItem(THEME_KEY) || 'auto';
  } catch (error) {
    return 'auto';
  }
};

export const setTheme = (theme) => {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error setting theme:', error);
  }
};

// Units storage
const UNITS_KEY = 'weather_units';

export const getUnits = () => {
  try {
    return localStorage.getItem(UNITS_KEY) || 'metric';
  } catch (error) {
    return 'metric';
  }
};

export const setUnits = (units) => {
  try {
    localStorage.setItem(UNITS_KEY, units);
  } catch (error) {
    console.error('Error setting units:', error);
  }
};
