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
      <h1>City Search</h1>
      <SearchCities onCitySelect={handleCitySelect} /> {/* Pass the handleCitySelect function as a prop */}
      {selectedCityId && <p>Selected City ID: {selectedCityId}</p>} {/* Display the selected city ID */}
    </div>
  );
};

export default App;
