import { useState, useEffect, useRef } from 'react';

const SearchCities = ({ onCitySelect }) => {
  const [searchCity, setSearchCity] = useState('');
  const [cities, setCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState(null); // Store the selected city's ID
  const containerRef = useRef(null);

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
        setCities(data); // Store the city objects
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

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  const handleCitySelect = (city) => {
    // Create a constant for the city name
    const selectedCityName = city.name;

    console.log('Selected City ID:', city.id); // Log the ID
    console.log('Selected City Name:', selectedCityName); // Log the name

    setSearchCity(selectedCityName); // Fill the input with the city name
    setShowSuggestions(false); // Close the dropdown
    setSelectedCityId(city.id); // Store the selected city ID in state
    
    // Pass both the ID and name to the parent component (callback)
    onCitySelect(city.id, selectedCityName); 
  };

  // Log the selected city ID after it is set
  useEffect(() => {
    if (selectedCityId) {
      console.log('CITY SELECTED on CHILD:', selectedCityId); // Log the final selected city ID
    }
  }, [selectedCityId]);

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
          {filteredCities.map((city) => (
            <div
              key={city.id} // Use city.id as the unique key
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
