import { useState, useMemo, useEffect, useRef } from "react";
import { useFetchProduct } from "./hooks";
import { useSearchParams } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { CategoryTabs } from "../../components/Home/CategoryTabs";
import RatingFilter from "../../components/Home/RatingFilter";
import StockFilter from "../../components/Home/StockFilter";
import { ProductSkeleton } from "../../components/Home/ProductGridSkeleton";
import SortFilter from "../../components/Home/SortFilter";
import { X as Close } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import ProductCard from "@/components/Home/ProductCard";

const Home = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const querySearch = searchParam.get("search") || "";
  const queryCategory = searchParam.get("category") || "";
  const queryStock = searchParam.get("stock") || "all";
  const querySortBy = searchParam.get("sortby") || "price-asc";
  const queryRatings = searchParam.get("ratings") || "";
  const initialRatings = queryRatings ? queryRatings.split(",").map(Number) : [];

  const [selectedRatings, setSelectedRatings] = useState<number[]>(initialRatings);

  const debouncedSearch = useDebounce(querySearch, 500);

  const { data, hasNextPage, fetchNextPage, isLoading } = useFetchProduct(debouncedSearch, queryCategory);

  const allProducts = useMemo(() => {
    return data?.pages.flatMap((p) => p.products) || [];
  }, [data]);

  const filtered = useMemo(() => {
    return allProducts
      .filter((p) => p.title.toLowerCase().includes(debouncedSearch.toLowerCase()))
      .filter((p) => (queryCategory ? p.category === queryCategory : true))
      .filter((p) => (selectedRatings.length === 0 ? true : selectedRatings.includes(Math.floor(p.rating))))
      .filter((p) => {
        if (queryStock === "all") return true;
        if (queryStock === "in") return p.stock > 10;
        if (queryStock === "low") return p.stock > 0 && p.stock <= 10;
        if (queryStock === "out") return p.stock === 0;
      });
  }, [allProducts, debouncedSearch, queryCategory, selectedRatings, queryStock]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (querySortBy === "price-asc") return a.price - b.price;
      if (querySortBy === "price-desc") return b.price - a.price;
      if (querySortBy === "rating") return b.rating - a.rating;
      if (querySortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });
  }, [filtered, querySortBy]);

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

  const handleInput = (newValue: string) => {
    const params = new URLSearchParams(searchParam);

    if (newValue) {
      params.set("search", newValue);
    } else {
      params.delete("search");
    }

    params.delete("category");

    setSearchParam(params);
  };

  return (
    <div className="w-full h-full pl-5">
      <div className="flex h-full">
        <div className="min-w-60 max-w-60 sticky pr-5">
          <div className="h-full">
            <div className="top-20 relative rounded-md border">
              <p className="text-center font-medium pb-3 border-b">Filters</p>

              <div>
                <CategoryTabs />
              </div>

              <div className="p-4">
                <RatingFilter selectedRatings={selectedRatings} onChange={setSelectedRatings} />
              </div>

              <div className="p-5">
                <StockFilter stockFilter={queryStock} />
              </div>

              <div>
                <SortFilter />
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-amber-50 h-full overflow-auto">
          <div className="p-5 bg-green-200 sticky top-0 z-10 rounded">
            <div className="flex items-center justify-between">
              <p className="font-bold text-3xl">PRODUCTS</p>
              <div>
                <span className="font-medium text-sm">Search</span>{" "}
                <div className="flex items-center relative">
                  <input
                    type="text"
                    className="border p-2 border-gray-900 rounded-2xl w-96"
                    placeholder="Search your products....."
                    onChange={(e) => handleInput(e.target.value)}
                  />
                  <Close className="absolute right-0" />
                </div>
              </div>
            </div>
          </div>
          {isLoading ? <ProductSkeleton /> : null}
          <div className="grid grid-cols-4 gap-4 p-5">
            {sorted.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div ref={ref} className="h-10 flex items-center justify-center">
            <Spinner className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
