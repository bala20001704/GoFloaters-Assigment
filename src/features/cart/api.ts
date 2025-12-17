import axiosInstance from "@/services/api/axios";
import type { Cart, updateProductQuantity, UserCartsResponse } from "./types";

export const getCartItems = async (userId: number): Promise<UserCartsResponse> => {
  const response = await axiosInstance.get(`/carts/user/${userId}`);
  return response.data;
};

export const updateCartQuantity = async (payload: updateProductQuantity): Promise<Cart> => {
  const { cartId, ...rest } = payload;

  const response = await axiosInstance.put(`https://dummyjson.com/carts/${cartId}`, rest);
  return response.data;
};
