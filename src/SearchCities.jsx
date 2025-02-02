import { useState, useEffect } from "react";

// Hook personnalisé pour le debounce
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const SearchCities = ({ onCitySelect }) => {
  const [searchCity, setSearchCity] = useState("");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);
  const debouncedSearch = useDebounce(searchCity, 300);

  const API_KEY = import.meta.env.VITE_NINJA_API_KEY;
  const MIN_SEARCH_LENGTH = 2;

  useEffect(() => {
    if (debouncedSearch.length < MIN_SEARCH_LENGTH) {
      setCities([]);
      return;
    }

    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/city?name=${debouncedSearch}`,
          { headers: { "X-Api-Key": API_KEY } }
        );

        if (!response.ok) throw new Error(`Erreur API: ${response.status}`);

        const data = await response.json();
        setCities(
          data.filter((city) =>
            city.name.toLowerCase().startsWith(debouncedSearch.toLowerCase())
          )
        );
        setError(null);
      } catch (error) {
        console.error("Erreur de récupération des villes:", error);
        setError("Impossible de charger les villes.");
      }
    };

    fetchCities();
  }, [debouncedSearch]);

  return (
    <div className="search-cities">
      <input
        type="text"
        placeholder="Your city ..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />
      {error && <p className="error">{error}</p>}
      {cities.length > 0 && (
        <div className="suggestions">
          {cities.map((city, index) => (
            <div
              key={index} // L'API ne fournit pas d'ID, on utilise l'index ici
              className="suggestion-item"
              onClick={() => {
                onCitySelect(city.name);
                setSearchCity(city.name);
              }}
            >
              {city.name}, {city.country}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchCities;
