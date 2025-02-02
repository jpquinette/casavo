import React, { useState } from 'react';
import SearchCities from './SearchCities'; // Assurez-vous que ce composant existe et fonctionne correctement

const App = () => {
  const [selectedCityId, setSelectedCityId] = useState(null); // State pour stocker l'ID de la ville sélectionnée
  const [selectedCityName, setSelectedCityName] = useState(''); // State pour stocker le nom de la ville sélectionnée

  const handleCitySelect = (cityId, cityName) => {
    setSelectedCityId(cityId); // Stocke l'ID de la ville dans le state parent
    setSelectedCityName(cityName); // Stocke le nom de la ville dans le state parent
    console.log('City ID received on PARENT:', cityId); // Affiche l'ID de la ville dans le parent
    console.log('City Name received on PARENT:', cityName); // Affiche le nom de la ville dans le parent
  };

  return (
    <div>
      {/* Logo Casavo */}
      <div className="casavo-logo">
        <img
          alt="Casavo logo"
          loading="lazy"
          width="160"
          height="32"
          decoding="async"
          data-nimg="1"
          style={{ color: 'transparent' }}
          srcSet="https://casavo-wine.imgix.net/images/logo/main.webp?auto=format,compress 1x, https://casavo-wine.imgix.net/images/logo/main.webp?auto=format,compress 2x"
          src="https://casavo-wine.imgix.net/images/logo/main.webp?auto=format,compress"
          data-cmp-ab="2"
          data-cmp-info="10"
        />
      </div>

      {/* Afficher l'ID et le nom de la ville sélectionnée */}
      <div className="uuid">
        {selectedCityId ? (
          <p>
            Selected City <b>{selectedCityName}</b> UUID: {selectedCityId} <br />
          </p>
        ) : (
          <p>No city selected.</p> // Message alternatif si aucune ville n'est sélectionnée
        )}
      </div>

      <h4>City Search</h4>
      {/* Passer la fonction handleCitySelect en tant que prop au composant SearchCities */}
      <SearchCities onCitySelect={handleCitySelect} />
    </div>
  );
};

export default App;
