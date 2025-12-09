import SearchInput from "./SearchInput";
import RatingFilter from "./RatingFilter";
import StockFilter from "./StockFilter";
import SortFilter from "./SortFilter";
import { CategoryTabs } from "./CategoryTabs";

interface FiltersSidebarProps {
  search: string;
  setSearch: (value: string) => void;

  selectedRatings: number[];
  setSelectedRatings: (value: number[]) => void;

  stockFilter: "all" | "in" | "low" | "out";
  setStockFilter: (value: "all" | "in" | "low" | "out") => void;

  sortBy: "price-asc" | "price-desc" | "rating" | "title";
  setSortBy: (value: "price-asc" | "price-desc" | "rating" | "title") => void;

  category: string;
  setCategory: (value: string) => void;
}

export default function FiltersSidebar({
  search,
  setSearch,
  selectedRatings,
  setSelectedRatings,
  stockFilter,
  setStockFilter,
  sortBy,
  setSortBy,
  category,
  setCategory,
}: FiltersSidebarProps) {
  console.log("stock", stockFilter);
  return (
    <div className="w-60 flex flex-col gap-6 sticky top-4 h-fit border-r pr-4">
      <SearchInput value={search} onChange={setSearch} />
      <RatingFilter selectedRatings={selectedRatings} onChange={setSelectedRatings} />
      <StockFilter stockFilter={stockFilter} onChange={setStockFilter} />
      <SortFilter sortBy={sortBy} onChange={setSortBy} />
      <CategoryTabs selected={category} onChange={setCategory} />
    </div>
  );
}
