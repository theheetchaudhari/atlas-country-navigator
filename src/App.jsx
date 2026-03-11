import { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';
import DraggableCard from './components/DraggableCard';
import { fetchCountries } from './services/api';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerInstance = useRef(null);

  useEffect(() => {
    const getCountries = async () => {
      const data = await fetchCountries();
      setCountries(data);
    };
    getCountries();
  }, []);

  useEffect(() => {
    if (!mapInstance.current && mapRef.current) {
      mapInstance.current = L.map(mapRef.current).setView([20, 0], 2);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap"
      }).addTo(mapInstance.current);
    }
  }, []);

  // Update Map when a country is selected
  useEffect(() => {
    if (selectedCountry && selectedCountry.latlng && mapInstance.current) {
      const latlng = selectedCountry.latlng;
      mapInstance.current.setView(latlng, 5);

      if (markerInstance.current) {
        mapInstance.current.removeLayer(markerInstance.current);
      }

      markerInstance.current = L.marker(latlng).addTo(mapInstance.current);
    }
  }, [selectedCountry]);

  // Handle click: set country and scroll to top
  const handleCardClick = (country) => {
    setSelectedCountry(country);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Header />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Map Container allows absolute positioning for the popup */}
      <div className="map-container">
        <div id="map" ref={mapRef}></div>

        {/* Render the movable card conditionally */}
        {selectedCountry && (
          <DraggableCard
            country={selectedCountry}
            onClose={() => setSelectedCountry(null)}
          />
        )}
      </div>

      <CountryList countries={filteredCountries} onCardClick={handleCardClick} />
    </div>
  );
}