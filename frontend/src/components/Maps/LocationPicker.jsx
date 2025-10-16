import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const LocationPicker = ({ 
  onLocationSelect, 
  initialLocation = null,
  placeholder = "Search for a location...",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchTimeoutRef = useRef(null);

  // Mock geocoding service (replace with actual Google Maps Geocoding API)
  const geocodeAddress = async (address) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock results - replace with actual Google Maps API call
    return [
      {
        id: '1',
        formatted_address: `${address}, Hyderabad, Telangana, India`,
        geometry: {
          location: {
            lat: 17.3850 + (Math.random() - 0.5) * 0.1,
            lng: 78.4867 + (Math.random() - 0.5) * 0.1
          }
        },
        place_id: 'mock_place_id_1'
      },
      {
        id: '2',
        formatted_address: `${address} Street, Secunderabad, Telangana, India`,
        geometry: {
          location: {
            lat: 17.4399 + (Math.random() - 0.5) * 0.1,
            lng: 78.4983 + (Math.random() - 0.5) * 0.1
          }
        },
        place_id: 'mock_place_id_2'
      }
    ];
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by this browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        // Reverse geocode to get address
        try {
          const address = `Current Location (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`;
          const location = {
            id: 'current',
            formatted_address: address,
            geometry: {
              location: {
                lat: latitude,
                lng: longitude
              }
            },
            place_id: 'current_location'
          };
          
          setSelectedLocation(location);
          onLocationSelect(location);
          toast.success('Current location detected!');
        } catch (error) {
          toast.error('Failed to get current location');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        toast.error('Failed to get current location');
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const handleSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    try {
      const results = await geocodeAddress(searchQuery);
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (error) {
      toast.error('Failed to search locations');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set new timeout for search
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch(value);
    }, 300);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedLocation(suggestion);
    setQuery(suggestion.formatted_address);
    setShowSuggestions(false);
    onLocationSelect(suggestion);
  };

  const clearLocation = () => {
    setSelectedLocation(null);
    setQuery('');
    onLocationSelect(null);
  };

  useEffect(() => {
    if (initialLocation) {
      setQuery(initialLocation.formatted_address);
      setSelectedLocation(initialLocation);
    }
  }, [initialLocation]);

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="w-full px-4 py-3 pl-12 pr-20 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-gray-400">
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" fill="none" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>

          {/* Action Buttons */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {selectedLocation && (
              <button
                onClick={clearLocation}
                className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
                title="Clear location"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </button>
            )}
            
            <button
              onClick={getCurrentLocation}
              disabled={loading}
              className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors disabled:opacity-50"
              title="Use current location"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <svg viewBox="0 0 24 24" className="w-4 h-4">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Suggestions Dropdown */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 text-blue-600">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {suggestion.formatted_address}
                      </p>
                      <p className="text-xs text-gray-500">
                        {suggestion.geometry.location.lat.toFixed(4)}, {suggestion.geometry.location.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Location Display */}
      <AnimatePresence>
        {selectedLocation && (
          <motion.div
            className="p-4 bg-green-50 border border-green-200 rounded-xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-green-600">
                  <path d="M9 12l2 2 4-4" fill="none" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium text-green-900 text-sm">
                  Selected Location
                </p>
                <p className="text-xs text-green-700 mt-1">
                  {selectedLocation.formatted_address}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Coordinates: {selectedLocation.geometry.location.lat.toFixed(6)}, {selectedLocation.geometry.location.lng.toFixed(6)}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationPicker;
