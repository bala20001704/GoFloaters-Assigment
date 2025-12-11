import { useState, useMemo, useEffect, useRef } from "react";
import { useFetchProduct } from "./hooks";
import ProductCard from "./ProductCard";
import FiltersSidebar from "./FiltersSidebar";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { ProductGridSkeleton } from "./ProductGridSkeleton";

const Home = () => {
  const [searchParam, setSearchParam] = useSearchParams();

  const querySearch = searchParam.get("search") || "";
  const queryCategory = searchParam.get("category") || "";
  const queryStock = searchParam.get("stock") || "all";
  const querySortBy = searchParam.get("sortby") || "price-asc";
  const queryRatings = searchParam.get("ratings") || "";
  const initialRatings = queryRatings ? queryRatings.split(",").map(Number) : [];

  const [selectedRatings, setSelectedRatings] = useState<number[]>(initialRatings);
  const [stockFilter, setStockFilter] = useState<string>(queryStock);
  const [sortBy, setSortBy] = useState<string>(querySortBy);
  const [category] = useState(queryCategory);

  const debouncedSearch = useDebounce(querySearch, 500);

  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useFetchProduct(debouncedSearch, queryCategory);

  const allProducts = useMemo(() => {
    return data?.pages.flatMap((p) => p.products) || [];
  }, [data]);

  console.log("debounce value is here::", debouncedSearch);

  const filtered = useMemo(() => {
    return allProducts
      .filter((p) => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .filter((p) => (category ? p.category === category : true))
      .filter((p) => (selectedRatings.length === 0 ? true : selectedRatings.includes(Math.floor(p.rating))))
      .filter((p) => {
        if (stockFilter === "all") return true;
        if (stockFilter === "in") return p.stock > 10;
        if (stockFilter === "low") return p.stock > 0 && p.stock <= 10;
        if (stockFilter === "out") return p.stock === 0;
      });
  }, [allProducts, debouncedSearch, category, selectedRatings, stockFilter]);

  console.log("data after filtered:::", filtered);
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  }, [filtered, sortBy]);

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
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
    <div className="w-full min-h-screen flex gap-20 p-4">
      <FiltersSidebar
        search={querySearch}
        selectedRatings={selectedRatings}
        setSelectedRatings={setSelectedRatings}
        stockFilter={stockFilter}
        setStockFilter={setStockFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        category={category}
      />
      {sorted.length <= 0 ? <ProductGridSkeleton /> : ""}
      <div className="grid grid-cols-4 auto-rows-max gap-5">
        {sorted.slice(1, 4).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}

        <div ref={ref} className="col-span-full h-10" />
        {isFetchingNextPage ? "Loading..." : null}
      </div>
    </div>
  );
};

export default Home;
