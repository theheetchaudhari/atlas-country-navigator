export default function CountryCard({ country, onCardClick }) {
  const handleCardClick = () => {
    if (country.latlng && country.latlng.length === 2) {
      // Pass the entire country object up to App.jsx
      onCardClick(country);
    }
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
      <h3>{country.name.common}</h3>
      <p><strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
    </div>
  );
}