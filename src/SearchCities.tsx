import { useState, useEffect, useRef } from 'react';

const SearchCities = ({ onCitySelect }) => {
  const [searchCity, setSearchCity] = useState('');
  const [cities, setCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState(null); // State variable to store the selected city's ID
  const containerRef = useRef(null); // Reference to the component container

  useEffect(() => {
    const fetchCities = async (query) => {
      try {
        const url = query
          ? `https://etherqmshqkpehcowxqh.supabase.co/functions/v1/cities?search=${query}`
          : `https://etherqmshqkpehcowxqh.supabase.co/functions/v1/cities`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Fetching Error');
        }

        const data = await response.json();
        setCities(data); // Store the complete city objects
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (searchCity) {
      fetchCities(searchCity);
    } else {
      fetchCities();
    }
  }, [searchCity]);

  useEffect(() => {
    // Close the dropdown when clicking outside of the component
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  const handleCitySelect = (city) => {
    console.log('Selected City ID:', city.id); // Log the selected city ID
    setSearchCity(city.name); // Fill the input with the city name
    setShowSuggestions(false); // Close the dropdown
    setSelectedCityId(city.id); // Store the selected city ID in state
    onCitySelect(city.id); // Pass the ID to the parent component
  };

  // Log the selected city ID after it is set
  useEffect(() => {
    if (selectedCityId) {
      console.log('Finally, CITY SELECTED:', selectedCityId); // Log the final selected city ID
    }
  }, [selectedCityId]); // Run this effect when the selectedCityId changes

  return (
    <div className="search-cities" ref={containerRef}>
      <input
        type="text"
        placeholder="Your city ..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
      />
      {showSuggestions && filteredCities.length > 0 && (
        <div className="suggestions">
          {filteredCities.map((city, index) => (
            <div
              key={city.id || index} // Use city.id or index if city.id is missing
              className="suggestion-item"
              onClick={() => handleCitySelect(city)}
            >
              {city.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCities;
