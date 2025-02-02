import { useState, useEffect } from "react";

const SearchCities = ({ onCitySelect }) => {
  const [searchCity, setSearchCity] = useState("");
  const [cities, setCities] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Gère le délai de la recherche

  const MIN_SEARCH_LENGTH = 2; // Longueur minimale avant recherche
  const API_KEY = import.meta.env.VITE_NINJA_API_KEY; // Récupération de la clé API depuis .env

  // Fonction pour récupérer les villes
  const fetchCities = async (query) => {
    if (!query || query.length < MIN_SEARCH_LENGTH) return;

    try {
      const url = `https://api.api-ninjas.com/v1/city?name=${query}`;
      console.log("Fetching from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      console.log("Données reçues:", data);

      // Vérifier que les villes commencent bien par la recherche
      const filteredCities = data.filter((city) =>
        city.name.toLowerCase().startsWith(query.toLowerCase())
      );

      setCities(filteredCities || []);
    } catch (error) {
      console.error("Erreur de récupération des villes:", error);
      setCities([]); // En cas d'erreur, vider la liste
    }
  };

  // Utilisation du debounce pour éviter les requêtes excessives
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchCity);
    }, 300); // Délai de 300ms avant d'envoyer la requête

    return () => clearTimeout(timer); // Nettoyage du timeout
  }, [searchCity]);

  // Déclenche la recherche uniquement après debounce
  useEffect(() => {
    if (debouncedSearch.length >= MIN_SEARCH_LENGTH) {
      fetchCities(debouncedSearch);
    } else {
      setCities([]);
    }
  }, [debouncedSearch]);

  return (
    <div className="search-cities">
      <input
        type="text"
        placeholder="Your city ..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
      />
      {showSuggestions && cities.length > 0 && (
        <div className="suggestions">
          {cities.map((city, index) => (
            <div
              key={index} // L'ID serait préférable
              className="suggestion-item"
              onClick={() => {
                onCitySelect(city.name);
                setSearchCity(city.name);
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
