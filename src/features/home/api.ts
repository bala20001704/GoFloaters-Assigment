import axiosInstance from "@/services/api/axios";
import type { ProductsResponse } from "./types";

export const getProducts = async (pageParam: number): Promise<ProductsResponse> => {
  const limit = 30;
  const skip = pageParam;
  const res = await axiosInstance.get(`/products?limit=${limit}&skip=${skip}`);

  console.log(res);
  return res.data;
};

export const getProductsSearch = async (query: string, pageParam: number): Promise<ProductsResponse> => {
  const limit = 30;
  const skip = pageParam;
  const res = await axiosInstance.get(`/products/search?q=${query}&limit=${limit}&skip=${skip}`);

  console.log(res);
  return res.data;
};

export const getProductsCategory = async (query: string, pageParam: number): Promise<ProductsResponse> => {
  const limit = 30;
  const skip = pageParam;
  const category = query.toLowerCase();

  const res = await axiosInstance.get(
    `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`
  );

  return res.data;
};

export const getCategoriesList = async (): Promise<string[]> => {
  const res = await axiosInstance.get("/products/category-list");
  return res.data;
};
