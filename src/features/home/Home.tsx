import { useState, useMemo, useEffect, useRef } from "react";
import { useFetchProduct } from "./hooks";
import ProductCard from "./ProductCard";
import FiltersSidebar from "./FiltersSidebar";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const querySearch = searchParam.get("search") || "";
  const queryCategory = searchParam.get("category") || "";
  const queryStock = searchParam.get("stock") || "all";
  const querysortBy = searchParam.get("sortby") || "price-asc";
  const queryRatings = searchParam.get("ratings") || "";

  const initialRatings = queryRatings ? queryRatings.split(",").map((n) => Number(n)) : [];

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchProduct(querySearch, queryCategory);

  const ref = useRef<HTMLDivElement | null>(null);

  const [search, setSearch] = useState(querySearch);
  const [selectedRatings, setSelectedRatings] = useState<number[]>(initialRatings);
  const [stockFilter, setStockFilter] = useState<string>(queryStock);
  const [sortBy, setSortBy] = useState<string>(querysortBy);
  const [category, setCategory] = useState(queryCategory);

  const allProducts = data?.pages.flatMap((p) => p.products) || [];

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

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      console.log("sort", sortBy);
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  }, [filtered, sortBy]);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, fetchNextPage]);

  useEffect(() => {
    const params = new URLSearchParams(searchParam);

    if (selectedRatings.length > 0) {
      params.set("ratings", selectedRatings.join(","));
    } else {
      params.delete("ratings");
    }

    setSearchParam(params);
  }, [selectedRatings]);

  return (
    <div className="w-full min-h-screen flex gap-6 p-4">
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

      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        <div ref={ref} className="col-span-full h-10" />
        {isFetchingNextPage ? "Loding....." : null}
      </div>
    </div>
  );
};

export default Home;
