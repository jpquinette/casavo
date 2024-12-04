import { useState, useEffect } from 'react';

const SearchCities = () => {
  const [searchCity, setSearchCity] = useState('');
  const [cities, setCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('https://etherqmshqkpehcowxqh.supabase.co/functions/v1/cities');
        if (!response.ok) {
          throw new Error('Fetching Error');
        }
        const data = await response.json();
        setCities(data.map(city => city.name));
      } catch (error) {
        console.error('Error :', error);
      }
    };

    fetchCities();
  }, []);

  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="search-cities">
      <input
        type="text"
        placeholder="Your city ..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)} 
      />
      {showSuggestions && filteredCities.length > 0 && (
        <div className="suggestions">
          {filteredCities.map((city, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => {
                setSearchCity(city);
                setShowSuggestions(false);
              }}
            >
              {city}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCities;
