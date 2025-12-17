export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedTotal: number;
  thumbnail: string;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface UserCartsResponse {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}

export interface updateProductQuantity {
  cartId: number;
  merge: boolean;
  products: {
    id: number;
    quantity: number;
  }[];
}
