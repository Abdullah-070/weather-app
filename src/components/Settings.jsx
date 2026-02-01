import React from 'react';
import { Sun, Moon, Monitor, Thermometer } from 'lucide-react';

const Settings = ({ theme, setTheme, units, setUnits, isDark }) => {
  return (
    <div className="weather-card animate-fade-in">
      <h3 className="text-xl font-semibold text-white mb-4">Settings</h3>

      {/* Theme Selection */}
      <div className="mb-6">
        <p className="text-white/70 text-sm mb-3">Theme</p>
        <div className="flex gap-2">
          <button
            onClick={() => setTheme('light')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              theme === 'light'
                ? 'bg-white/30 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Light</span>
          </button>
          <button
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-white/30 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>Dark</span>
          </button>
          <button
            onClick={() => setTheme('auto')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              theme === 'auto'
                ? 'bg-white/30 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span>Auto</span>
          </button>
        </div>
      </div>

      {/* Units Selection */}
      <div>
        <p className="text-white/70 text-sm mb-3">Temperature Units</p>
        <div className="flex gap-2">
          <button
            onClick={() => setUnits('metric')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              units === 'metric'
                ? 'bg-white/30 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Thermometer className="w-4 h-4" />
            <span>°C (Metric)</span>
          </button>
          <button
            onClick={() => setUnits('imperial')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              units === 'imperial'
                ? 'bg-white/30 text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <Thermometer className="w-4 h-4" />
            <span>°F (Imperial)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
