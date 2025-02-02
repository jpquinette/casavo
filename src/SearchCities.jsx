import { useState, useEffect } from 'react';

const SearchCities = ({ onCitySelect }) => {
  const [searchCity, setSearchCity] = useState('');
  const [cities, setCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchCities = async (query) => {
    if (!query) return;

    try {
      const url = `https://api.api-ninjas.com/v1/city?name=${query}`;
      console.log("Fetching from:", url); // Debug: voir l'URL

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Api-Key': import.meta.env.VITE_NINJA_API_KEY, // Utilise la clé API depuis .env
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      console.log("Données reçues:", data); // Debug: voir la réponse

      setCities(data || []);
    } catch (error) {
      console.error("Erreur de récupération des villes:", error);
    }
  };

  // Déclenche la recherche lorsqu'on tape dans le champ
  useEffect(() => {
    if (searchCity.length > 0) {
      fetchCities(searchCity);
    } else {
      setCities([]); // Vide la liste si le champ est vide
    }
  }, [searchCity]);

  return (
    <div className="search-cities">
      <input
        type="text"
        placeholder="Your city ..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Ferme après un délai court
      />
      {showSuggestions && cities.length > 0 && (
        <div className="suggestions">
          {cities.map((city, index) => (
            <div
              key={index} // Utilisation de l'index ici, mais une ID unique serait préférable
              className="suggestion-item"
              onClick={() => {
                onCitySelect(city.name); // Retourne le nom de la ville
                setSearchCity(city.name); // Remplit le champ avec la sélection
                setShowSuggestions(false);
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
