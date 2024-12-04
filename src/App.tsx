import React, { useState } from 'react';
import SearchCities from './SearchCities';

const App = () => {
  const [selectedCityId, setSelectedCityId] = useState(null); // State to store the selected city ID
  const [selectedCityName, setSelectedCityName] = useState(''); // State to store the selected city name

  const handleCitySelect = (cityId, cityName) => {
    setSelectedCityId(cityId); // Store the selected city ID in the parent state
    setSelectedCityName(cityName); // Store the selected city name in the parent state
    console.log('City ID received on PARENT:', cityId); // Log the city ID in the parent
    console.log('City Name received on PARENT:', cityName); // Log the city name in the parent
  };

  return (
    <div>
      {/* Casavo logo */}
      <div className="casavo-logo">
        <img
          alt="Casavo logo"
          loading="lazy"
          width="160"
          height="32"
          decoding="async"
          data-nimg="1"
          style={{ color: 'transparent' }}
          srcset="https://casavo-wine.imgix.net/images/logo/main.webp?auto=format,compress 1x, https://casavo-wine.imgix.net/images/logo/main.webp?auto=format,compress 2x"
          src="https://casavo-wine.imgix.net/images/logo/main.webp?auto=format,compress"
          data-cmp-ab="2"
          data-cmp-info="10"
        />
      </div>

      {/* Display selected city ID and Name */}
      <div className="uuid">
        {selectedCityId && (
          <p>
            Selected City <b>{selectedCityName}</b> UUID: {selectedCityId} <br />
          </p>
        )}
      </div>

      <h4>City Search</h4>
      <SearchCities onCitySelect={handleCitySelect} /> {/* Pass the handleCitySelect function as a prop */}
    </div>
  );
};

export default App;
