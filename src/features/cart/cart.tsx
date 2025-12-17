import { useAuthUser } from "../auth/hooks";
import { updateQunatity, usegetCart } from "./hooks";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { authUser } = useAuthUser();

  const userId = authUser?.id;

  const { cartData, isLoading } = usegetCart(userId);

  if (!userId) {
    return <div>Please login to view your cart.</div>;
  }

  const { mutate } = updateQunatity(userId);

  const cartProductData = cartData?.carts[0]?.products || [];

  const handleclick = (productId: number, quantity: number) => {
    if (quantity < 1) return;
    if (!userId) return;
    if (!cartData?.carts[0].id) return;

    mutate({
      cartId: cartData.carts[0].id,
      merge: true,
      products: [{ id: productId, quantity: quantity }],
    });
  };

  return (
    <div className="max-h-full overflow-auto">
      <div className="flex flex-col gap-5 mx-auto max-w-5xl my-20">
        {cartProductData.map((data) => (
          <div className="border flex">
            <div className="">
              <img src={data.thumbnail} alt="" width={190} height={190} className="object-contain h-fit" />
            </div>
            <div className="p-3 border-l">
              <p className="font-bold text-gray-900 text-center mt-1">{data.title}</p>

              <div className="flex gap-2 mt-5 mx-auto items-center">
                <Button
                  className="bg-blue-500 text-white hover:bg-blue-900 hover:text-white"
                  onClick={() => handleclick(data.id, data.quantity + 1)}
                >
                  +
                </Button>
                <p className="font-medium text-sm text-gray-700">Quantity {data.quantity}</p>
                <Button
                  className="bg-orange-900 text-white hover:bg-orange-950 hover:text-white"
                  onClick={() => handleclick(data.id, data.quantity - 1)}
                >
                  -
                </Button>
              </div>
            </div>

            <div className="border-l p-4">
              <p className="font-bold text-sm">Price ₹{data.price}</p>
              <p className="font-medium">quantity {data.quantity}</p>
              <p className="font-medium">sub total: {data.total.toFixed(2)}</p>
              <p className="font-bold text-sm">discount {data.discountPercentage} % OFF</p>
              <p className="font-bold text-sm">discount {data.discountedTotal}</p>
            </div>
          </div>
        ))}
        {!isLoading && (
          <div className="flex flex-row gap-10 font-semibold">
            <p>Grand totol {cartData?.carts[0].total}</p>
            <p>Grand discountTotal {cartData?.carts[0].discountedTotal}</p>
            <p>Grand total Quantity {cartData?.carts[0].totalQuantity}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
