import React from 'react';
import { MapPin, X, Cloud } from 'lucide-react';

const FavoritesList = ({ favorites, onSelect, onRemove }) => {
  if (favorites.length === 0) {
    return (
      <div className="weather-card animate-fade-in">
        <h3 className="text-xl font-semibold text-white mb-4">Favorite Locations</h3>
        <div className="text-center py-8">
          <Cloud className="w-12 h-12 text-white/30 mx-auto mb-3" />
          <p className="text-white/60">No favorite locations yet</p>
          <p className="text-white/40 text-sm mt-1">
            Click the heart icon to save locations
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-card animate-fade-in">
      <h3 className="text-xl font-semibold text-white mb-4">Favorite Locations</h3>
      
      <div className="space-y-2">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="flex items-center justify-between bg-white/10 rounded-xl p-3 hover:bg-white/15 transition-colors group"
          >
            <button
              onClick={() => onSelect(favorite)}
              className="flex items-center gap-3 flex-1 text-left"
            >
              <MapPin className="w-5 h-5 text-white/60" />
              <div>
                <p className="text-white font-medium">{favorite.name}</p>
                <p className="text-white/60 text-sm">{favorite.country}</p>
              </div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(favorite.id);
              }}
              className="p-2 opacity-0 group-hover:opacity-100 hover:bg-white/10 rounded-full transition-all"
              aria-label="Remove from favorites"
            >
              <X className="w-4 h-4 text-white/60" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
