import { useState } from "react";
import cities from "./cities"; // Importation de la liste statique des villes

const SearchCities = ({ onCitySelect }) => {
  // 🔹 État pour stocker la valeur entrée dans la barre de recherche
  const [searchCity, setSearchCity] = useState("");

  // 🔹 Filtrer les villes en fonction de la saisie de l'utilisateur
  const filteredCities =
    searchCity.length > 0
      ? cities.filter((city) =>
          city.name.toLowerCase().startsWith(searchCity.toLowerCase()) // Vérifie si la ville commence par la saisie
        )
      : [];

  // 🔹 Fonction pour récupérer les villes depuis l'API (désactivée pour le moment)
  /*
  const fetchCities = async (query) => {
    if (!query) return;

    try {
      const url = `https://api.api-ninjas.com/v1/city?name=${query}`;
      console.log("Fetching from:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": import.meta.env.VITE_NINJA_API_KEY, // Clé API stockée dans .env
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur API: ${response.status}`);
      }

      const data = await response.json();
      console.log("Données reçues:", data);
    } catch (error) {
      console.error("Erreur de récupération des villes:", error);
    }
  };
  */

  return (
    <div className="search-cities">
      {/* 🔹 Champ de saisie pour entrer une ville */}
      <input
        type="text"
        placeholder="Votre ville..."
        value={searchCity}
        onChange={(e) => setSearchCity(e.target.value)}
      />

      {/* 🔹 Affichage des suggestions si des résultats existent */}
      {filteredCities.length > 0 && (
        <div className="suggestions">
          {filteredCities.map((city, index) => (
            <div
              key={index} // Utilisation de l'index comme clé (id unique préférable si dispo)
              className="suggestion-item"
              onClick={() => {
                onCitySelect(city.name); // Retourne le nom de la ville sélectionnée
                setSearchCity(city.name); // Remplit le champ avec la sélection
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
