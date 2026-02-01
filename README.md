# Weather App

A modern weather application built with React, Tailwind CSS, and OpenWeatherMap API.

## Features

- 🌍 **Geolocation Detection** - Automatically detects your location for weather data
- 🌡️ **Real-time Weather** - Current weather conditions with detailed information
- 📅 **7-Day Forecast** - Extended weather forecast with temperature trends
- 📈 **Temperature Trends** - Visual chart showing temperature changes over the week
- ⏰ **Hourly Forecast** - 24-hour forecast with precipitation probability
- 🌙 **Dark Mode** - Automatic theme switching based on time of day or manual toggle
- ⭐ **Favorite Locations** - Save and quickly access your favorite locations
- 🔍 **City Search** - Search for any city worldwide
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- OpenWeatherMap API key (free)

### Installation

1. Clone or download this repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Get your free API key from [OpenWeatherMap](https://openweathermap.org/api):
   - Sign up for a free account
   - Navigate to "API Keys" in your account
   - Copy your API key

4. Configure the API key:
   - Open `src/config/api.js`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key:
   ```javascript
   export const API_KEY = 'your_actual_api_key';
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
weather-app/
├── public/
│   └── weather-icon.svg
├── src/
│   ├── components/
│   │   ├── CurrentWeather.jsx    # Main weather display
│   │   ├── ErrorMessage.jsx      # Error handling UI
│   │   ├── FavoritesList.jsx     # Saved locations list
│   │   ├── Forecast.jsx          # 7-day forecast
│   │   ├── Header.jsx            # App header with controls
│   │   ├── HourlyForecast.jsx    # Hourly weather display
│   │   ├── LoadingSpinner.jsx    # Loading state
│   │   ├── SearchBar.jsx         # City search
│   │   ├── Settings.jsx          # Theme and units settings
│   │   ├── TemperatureTrend.jsx  # Temperature chart
│   │   └── WeatherIcon.jsx       # Weather condition icons
│   ├── config/
│   │   └── api.js                # API configuration
│   ├── hooks/
│   │   ├── useFavorites.js       # Favorites management
│   │   ├── useTheme.js           # Theme management
│   │   └── useWeather.js         # Weather data fetching
│   ├── services/
│   │   └── weatherService.js     # API calls
│   ├── utils/
│   │   ├── helpers.js            # Utility functions
│   │   └── storage.js            # Local storage utilities
│   ├── App.jsx                   # Main app component
│   ├── index.css                 # Global styles
│   └── main.jsx                  # App entry point
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Usage

### Getting Weather for Your Location
Click the location icon (📍) in the header to get weather for your current location. You'll need to allow location access in your browser.

### Searching for a City
Use the search bar to find any city. Type at least 2 characters to see suggestions.

### Saving Favorites
Click the heart icon (♡) on the current weather card to save a location to your favorites. Access saved locations from the sidebar on mobile or the right panel on desktop.

### Changing Units
Toggle between Celsius (°C) and Fahrenheit (°F) in the Settings section.

### Theme Options
- **Light**: Bright theme for daytime use
- **Dark**: Dark theme for night viewing
- **Auto**: Automatically switches based on system preference and time of day

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **OpenWeatherMap API** - Weather data provider

## API Endpoints Used

- `/weather` - Current weather data
- `/forecast` - 5-day forecast (3-hour intervals)
- `/geo/1.0/direct` - City search (geocoding)
- `/geo/1.0/reverse` - Reverse geocoding

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons by [Lucide](https://lucide.dev/)
