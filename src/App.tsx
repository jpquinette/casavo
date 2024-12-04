import SearchCities from "./SearchCities";

const App = () => {
  const handleCitySelect = (uuid) => {
    console.log('Selected City UUID:', uuid);
    // Add further logic with the UUID
  };

  return (
    <div>
      <h1>City Search</h1>
      <SearchCities onCitySelect={handleCitySelect} />
    </div>
  );
};

export default App;
