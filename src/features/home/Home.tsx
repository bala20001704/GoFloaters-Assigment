import { useState, useMemo } from "react";
import { useFetchProduct } from "./hooks";
import ProductCard from "./ProductCard";
import FiltersSidebar from "./FiltersSidebar";

const Home = () => {
  const { data } = useFetchProduct("", "");

  const [search, setSearch] = useState("");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [stockFilter, setStockFilter] = useState<"all" | "in" | "low" | "out">("all");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "rating" | "title">("price-asc");
  const [category, setCategory] = useState("");

  const allProducts = data?.pages.flatMap((p) => p.products) || [];

  /** FILTER PRODUCTS */
  const filtered = useMemo(() => {
    return allProducts
      .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
      .filter((p) => (category ? p.category === category : true))
      .filter((p) => (selectedRatings.length === 0 ? true : selectedRatings.some((r) => p.rating >= r)))
      .filter((p) => {
        if (stockFilter === "all") return true;
        if (stockFilter === "in") return p.stock > 10;
        if (stockFilter === "low") return p.stock > 0 && p.stock <= 10;
        if (stockFilter === "out") return p.stock === 0;
      });
  }, [allProducts, search, selectedRatings, stockFilter, category]);

  /** SORT PRODUCTS */
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  }, [filtered, sortBy]);

  return (
    <div className="flex gap-6 p-4">
      {/* LEFT FILTER SIDEBAR */}
      <FiltersSidebar
        search={search}
        setSearch={setSearch}
        selectedRatings={selectedRatings}
        setSelectedRatings={setSelectedRatings}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        category={category}
        setCategory={setCategory}
      />

      {/* RIGHT PRODUCTS GRID */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Home;
