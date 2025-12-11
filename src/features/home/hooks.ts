import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getProducts, getProductsCategory, getProductsBySearch } from "./api";
import type { ProductsResponse } from "./types";

const limits = 30;

export const useFetchProduct = (searchQuery: string, category: string) => {
  return useInfiniteQuery<
    ProductsResponse,
    Error,
    InfiniteData<ProductsResponse>,
    ["products", string, string],
    number
  >({
    queryKey: ["products", searchQuery, category],
    queryFn: ({ pageParam = 0 }) => {
      if (searchQuery) {
        return getProductsBySearch(searchQuery, pageParam);
      }

      if (category) {
        return getProductsCategory(category, pageParam);
      }
      return getProducts(pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, totalPages) => {
      if (lastPage.products.length < limits) {
        return undefined;
      }
      return totalPages.length * 30;
    },
  });
};
