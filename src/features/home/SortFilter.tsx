interface SortFilterProps {
  sortBy: "price-asc" | "price-desc" | "rating" | "title";
  onChange: (value: "price-asc" | "price-desc" | "rating" | "title") => void;
}

const SortFilter: React.FC<SortFilterProps> = ({ sortBy, onChange }) => {
  return (
    <div>
      <h3>Sort By</h3>
      <select value={sortBy} onChange={(e) => onChange(e.target.value as any)}>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Rating</option>
        <option value="title">Title (A-Z)</option>
      </select>
    </div>
  );
};

export default SortFilter;
