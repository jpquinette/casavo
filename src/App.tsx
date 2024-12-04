import React, { useState } from 'react';
import SearchCities from './SearchCities';

const App = () => {
  const [selectedCityId, setSelectedCityId] = useState(null); // State to store the selected city ID

  const handleCitySelect = (cityId) => {
    setSelectedCityId(cityId); // Store the selected city ID in the parent state
    console.log('City ID received on PARENT:', cityId); // Log the city ID in the parent
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

      {/* Display selected city ID */}
      <div className="uuid">
        {selectedCityId && <p>Selected City ID: {selectedCityId}</p>} {/* Display the selected city ID */}
      </div>

      <h1>City Search</h1>
      <SearchCities onCitySelect={handleCitySelect} /> {/* Pass the handleCitySelect function as a prop */}
    </div>
  );
};

export default App;
