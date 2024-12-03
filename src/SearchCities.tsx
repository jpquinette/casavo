import { useState, useEffect } from 'react';

//local test
// const cities = [
//   "New York", "Paris", "Tokyo", "Sydney"
// ];

const SearchCities = () => {
  const [searchCity, setSearchCity] = useState('');
  const [cities, setCities] = useState([]);

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
        console.error('Erreur :', error);
      }
    };

    fetchCities();
  }, []);

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
