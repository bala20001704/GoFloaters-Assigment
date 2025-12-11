import SearchInput from "./SearchInput";
import RatingFilter from "./RatingFilter";
import StockFilter from "./StockFilter";
import SortFilter from "./SortFilter";
import { CategoryTabs } from "./CategoryTabs";

interface FiltersSidebarProps {
  search: string;

  selectedRatings: number[];
  setSelectedRatings: (value: number[]) => void;

  stockFilter: string;
  setStockFilter: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  category: string;
}

export default function FiltersSidebar({
  search,
  selectedRatings,
  setSelectedRatings,
  stockFilter,
  setStockFilter,
  sortBy,
  setSortBy,
  category,
}: FiltersSidebarProps) {
  return (
    <div className="w-60 flex flex-col gap-6 top-4 h-fit pr-4">
      <SearchInput value={search} />
      <RatingFilter selectedRatings={selectedRatings} onChange={setSelectedRatings} />
      <StockFilter stockFilter={stockFilter} onChange={setStockFilter} />
      <SortFilter sortBy={sortBy} onChange={setSortBy} />
      <CategoryTabs selected={category} />
    </div>
  );
}
