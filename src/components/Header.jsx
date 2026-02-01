import React from 'react';
import { Sun, Moon, Menu, MapPin, RefreshCw } from 'lucide-react';

const Header = ({
  isDark,
  toggleTheme,
  onMenuClick,
  onLocationClick,
  onRefresh,
  isRefreshing,
}) => {
  return (
    <header className="flex items-center justify-between py-4 px-2">
      <div className="flex items-center gap-2">
        <button
          onClick={onMenuClick}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
          aria-label="Menu"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Sun className="w-8 h-8 text-yellow-400" />
          <span className="hidden sm:inline">Weather App</span>
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onLocationClick}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Get current location"
          title="Use my location"
        >
          <MapPin className="w-5 h-5 text-white" />
        </button>

        <button
          onClick={onRefresh}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Refresh weather"
          title="Refresh"
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`w-5 h-5 text-white ${isRefreshing ? 'animate-spin' : ''}`}
          />
        </button>

        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle theme"
          title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-white" />
          ) : (
            <Moon className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
