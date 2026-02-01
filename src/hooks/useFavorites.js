import { useState, useEffect, useCallback } from 'react';
import {
  getFavorites,
  addFavorite as addToStorage,
  removeFavorite as removeFromStorage,
  isFavorite as checkFavorite,
} from '../utils/storage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites on mount
  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  // Add a location to favorites
  const addFavorite = useCallback((location) => {
    const newFavorites = addToStorage(location);
    setFavorites(newFavorites);
    return newFavorites;
  }, []);

  // Remove a location from favorites
  const removeFavorite = useCallback((id) => {
    const newFavorites = removeFromStorage(id);
    setFavorites(newFavorites);
    return newFavorites;
  }, []);

  // Check if a location is in favorites
  const isFavorite = useCallback((lat, lon) => {
    return checkFavorite(lat, lon);
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback(
    (location) => {
      const existingFavorite = favorites.find(
        (fav) =>
          Math.abs(fav.lat - location.lat) < 0.01 &&
          Math.abs(fav.lon - location.lon) < 0.01
      );

      if (existingFavorite) {
        return removeFavorite(existingFavorite.id);
      } else {
        return addFavorite(location);
      }
    },
    [favorites, addFavorite, removeFavorite]
  );

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
};
