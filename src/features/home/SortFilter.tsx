import { useSearchParams } from "react-router-dom";

interface SortFilterProps {
  sortBy: string;
  onChange: (value: string) => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ sortBy, onChange }) => {
  const [searchParam, setSearchParam] = useSearchParams();
  return (
    <div>
      <h3>Sort By</h3>
      <select
        value={sortBy}
        onChange={(e) => {
          onChange(e.target.value);
          searchParam.set("sortby", e.target.value);
          setSearchParam(searchParam);
        }}
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Rating</option>
        <option value="title">Title (A-Z)</option>
      </select>
    </div>
  );
};

export default SortFilter;
