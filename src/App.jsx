import { useState } from "react";
import SearchCities from "./SearchCities";

const App = () => {
  const [selectedCity, setSelectedCity] = useState(null);

  return (
    <div>
      <div className="City Searcher-logo">
        <img
          alt="City Searcher logo"
          loading="lazy"
          width="160"
      
          decoding="async"
          style={{ color: "transparent" }}
          src="https://www.svgrepo.com/show/106636/city.svg"
        />
      </div>

      <div className="uuid">
        {selectedCity ? (
          <p>
            Selected City: <b>{selectedCity}</b>
          </p>
        ) : (
          <p>No city selected.</p>
        )}
      </div>

      <h4>City Search</h4>
      <SearchCities onCitySelect={setSelectedCity} />
    </div>
  );
};

export default App;
