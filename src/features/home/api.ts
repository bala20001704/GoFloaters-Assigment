import axiosInstance from "@/services/api/axios";
import type { CartPayload, ProductsResponse } from "./types";
import type { Product } from "./types";
import type { Cart } from "../cart/types";

const LIMIT = 30;

export const getProducts = async (pageParam: number): Promise<ProductsResponse> => {
  const skip = pageParam;
  const res = await axiosInstance.get(`/products?limit=${LIMIT}&skip=${skip}`);
  return res.data;
};

export const getProductsBySearch = async (query: string, pageParam: number): Promise<ProductsResponse> => {
  const skip = pageParam;
  const res = await axiosInstance.get(`/products/search?q=${query}&limit=${LIMIT}&skip=${skip}`);

  return res.data;
};

export const getProductsCategory = async (query: string, pageParam: number): Promise<ProductsResponse> => {
  const skip = pageParam;
  const category = query.toLowerCase();
  const res = await axiosInstance.get(
    `https://dummyjson.com/products/category/${category}?limit=${LIMIT}&skip=${skip}`
  );

  return res.data;
};

export const getCategoriesList = async (): Promise<string[]> => {
  const res = await axiosInstance.get("/products/category-list");
  return res.data;
};

export const getProductById = async (productId: string): Promise<Product> => {
  const res = await axiosInstance.get(`/products/${productId}`);
  return res.data;
};

export const addCartItem = async (payload: CartPayload): Promise<Cart> => {
  const response = await axiosInstance.post("https://dummyjson.com/carts/add", payload);
  console.log(response.data);
  return response.data;
};
