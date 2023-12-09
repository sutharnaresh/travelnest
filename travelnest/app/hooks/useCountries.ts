import countries from 'world-countries';

// Formatting country data to include specific properties
const formattedCountries = countries.map((country) => ({
  value: country.cca2,       // Country code (e.g., 'US')
  label: country.name.common, // Common name of the country
  flag: country.flag,         // URL of the country's flag
  latlng: country.latlng,     // Latitude and longitude of the country
  region: country.region,     // Region of the world where the country is located
}));

// Custom hook for working with formatted country data
const useCountries = () => {
  // Function to get all formatted countries
  const getAll = () => formattedCountries;

  // Function to get a specific country by its value (country code)
  const getByVal = (value: string) => {
    return formattedCountries.find((item) => item.value === value);
  }

  // Exposing functions for external use
  return {
    getAll,
    getByVal,
  }
};

export default useCountries;
