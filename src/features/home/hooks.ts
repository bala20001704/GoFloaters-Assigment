import { useInfiniteQuery, useMutation, type InfiniteData } from "@tanstack/react-query";
import { getProducts, getProductsCategory, getProductsBySearch, addCartItem } from "./api";
import type { CartPayload, ProductsResponse } from "./types";
import type { Cart } from "../cart/types";

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

export const useAddCartItem = () => {
  const { mutate: addToCart, isPending } = useMutation<Cart, Error, CartPayload>({ mutationFn: addCartItem });
  return {
    addToCart,
    isPending,
  };
};
