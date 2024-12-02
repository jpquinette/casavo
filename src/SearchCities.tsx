import { useState } from 'react';

const cities = [
  "New York", "Paris", "Tokyo", "Sydney"
];

const SearchCities = () => {
  const [searchCity, setSearchCity] = useState('');

  return (
    <div>
      <input
        type="text"
        placeholder="Your city ..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)} 
        list="city-suggestions" 
      />
      <datalist id="city-suggestions">
        {cities
          .filter(city => city.toLowerCase().includes(searchCity.toLowerCase())) 
          .map((city, index) => (
            <option key={index} value={city} />
          ))}
      </datalist>
    </div>
  );
};

export default SearchCities;
