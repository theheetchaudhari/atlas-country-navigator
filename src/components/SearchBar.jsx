export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <input
      type="text"
      id="searchInput"
      placeholder="Search country..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
  );
}