import { Search } from "lucide-react";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="search-bar">
      <Search size={19} />

      <input
        type="text"
        placeholder="Search watches..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;