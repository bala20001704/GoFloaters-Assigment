import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartItems, updateCartQuantity } from "./api";
import type { Cart, CartProduct, updateProductQuantity, UserCartsResponse } from "./types";

type CartMutationContext = {
  previousCart?: UserCartsResponse;
};

export const usegetCart = (userId?: number) => {
  const { data: cartData, isLoading } = useQuery<UserCartsResponse, Error>({
    queryKey: ["cart", userId],
    queryFn: ({ queryKey }) => getCartItems(queryKey[1] as number),
    enabled: !!userId,
  });

  return {
    cartData,
    isLoading,
  };
};

const calculateTotal = (product: CartProduct, quantity: number) => {
  const total = product.price * quantity;
  const discountedTotal = (total * product.discountPercentage) / 100;

  return {
    ...product,
    quantity,
    total,
    discountedTotal: Math.round(total - discountedTotal),
  };
};

const calculateCartTotals = (products: CartProduct[]) => {
  return products.reduce(
    (acc, p) => {
      acc.total += p.total;
      acc.discountedTotal += p.discountedTotal;
      acc.totalQuantity += p.quantity;
      return acc;
    },
    { total: 0, discountedTotal: 0, totalQuantity: 0 }
  );
};

export const updateQunatity = (userId: number) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation<Cart, Error, updateProductQuantity, CartMutationContext>({
    mutationFn: updateCartQuantity,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["cart", userId],
      });

      const previousCart = queryClient.getQueryData<UserCartsResponse>(["cart", userId]);

      queryClient.setQueryData<UserCartsResponse>(["cart", userId], (old) => {
        if (!old) return old;

        return {
          ...old,
          carts: old.carts.map((cart) => {
            const updatedProducts = cart.products.map((p) =>
              variables.products[0].id === p.id ? calculateTotal(p, variables.products[0].quantity) : p
            );

            const cartTotals = calculateCartTotals(updatedProducts);

            return {
              ...cart,
              products: updatedProducts,
              ...cartTotals,
            };
          }),
        };
      });

      return { previousCart };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart", userId], context.previousCart);
      }
    },

    // onSettled: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["cart", userId],
    //   });
    // },
  });

  return {
    mutate,
    isPending,
  };
};
