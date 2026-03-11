// Grab the URL from the .env file
const API_URL = import.meta.env.VITE_COUNTRY_API_URL;

export const fetchCountries = async () => {
  try {
    // Use the variable here instead of the raw string
    const response = await fetch(`${API_URL}?fields=name,capital,population,region,flags,latlng`);
    
    if (!response.ok) throw new Error("Network response was not ok");
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
};