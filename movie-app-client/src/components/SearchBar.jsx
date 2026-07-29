import { FaSearch } from "react-icons/fa";

function SearchBar({ query, setQuery }) {
  return (
    <div className="relative max-w-3xl">
      <FaSearch
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700 rounded-2xl py-4 pl-14 pr-6 text-lg outline-none focus:border-blue-500 transition"
      />
    </div>
  );
}

export default SearchBar;