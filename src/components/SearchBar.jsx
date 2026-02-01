import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, X, MapPin, Loader } from 'lucide-react';
import { debounce } from '../utils/helpers';

const SearchBar = ({ onSearch, onSelectCity }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchQuery) => {
      if (searchQuery.length < 2) {
        setResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const searchResults = await onSearch(searchQuery);
        setResults(searchResults);
      } catch (error) {
        console.error('Search error:', error);
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    [onSearch]
  );

  // Handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowResults(true);
    debouncedSearch(value);
  };

  // Handle city selection
  const handleSelect = (city) => {
    onSelectCity(city);
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  // Clear search
  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setShowResults(true)}
          placeholder="Search for a city..."
          className="input-field pl-12 pr-10"
        />
        {query && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            {isSearching ? (
              <Loader className="w-5 h-5 text-white/60 animate-spin" />
            ) : (
              <X className="w-5 h-5 text-white/60" />
            )}
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl z-50">
          {results.map((city, index) => (
            <button
              key={`${city.lat}-${city.lon}-${index}`}
              onClick={() => handleSelect(city)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left"
            >
              <MapPin className="w-5 h-5 text-white/60 flex-shrink-0" />
              <div>
                <p className="text-white font-medium">{city.name}</p>
                <p className="text-white/60 text-sm">
                  {city.state && `${city.state}, `}
                  {city.country}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results message */}
      {showResults && query.length >= 2 && !isSearching && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/20 backdrop-blur-lg rounded-xl p-4 text-center z-50">
          <p className="text-white/70">No cities found</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
