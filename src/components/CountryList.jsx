import CountryCard from './CountryCard';

export default function CountryList({ countries, onCardClick }) {
  return (
    <div id="countriesContainer" className="grid">
      {countries.map((country, index) => (
        <CountryCard 
          key={country.name.common + index} 
          country={country} 
          onCardClick={onCardClick} 
        />
      ))}
    </div>
  );
}