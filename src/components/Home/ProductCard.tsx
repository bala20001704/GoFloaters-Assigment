import type { Product } from "./types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const getStockStatus = () => {
    if (product.stock === 0) return { label: "Out of Stock", color: "#dc2626" };
    if (product.stock <= 10) return { label: "Low Stock", color: "#f59e0b" };
    return { label: "In Stock", color: "#16a34a" };
  };

  const stock = getStockStatus();

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <div style={{ color: "#facc15", fontSize: "18px" }}>
        {"★".repeat(full)}
        {half && "☆"}
        {"☆".repeat(empty)}
      </div>
    );
  };

  return (
    <div className="border border-gray-300 rounded-sm overflow-hidden">
      <div className="w-full bg-gray-100 max-h-48 min-h-48 flex items-center justify-center">
        <img src={product.thumbnail} alt="" width={190} height={190} className="object-contain h-fit" />
      </div>
      <div className="p-3">
        <p className="font-bold text-gray-900 text-center mt-1">{product.title}</p>
        <p>{product.brand}</p>
        <div className="flex gap-4 mt-2">
          <p className="font-bold text-sm">Price ₹{product.price}</p>
          <p className="font-bold text-sm">discount {product.discountPercentage} % OFF</p>
        </div>
        <p className="flex gap-1 mt-3">Rating {renderStars(product.rating)}</p>
        <div className="flex items-center justify-between">
          <Badge className="text-orange-900 mt-2" variant="secondary">
            {product.stock} - stocks available
          </Badge>
          <Badge className="bg-green-800 text-white mt-2" variant="secondary">
            {stock.label}
          </Badge>
        </div>
        <div className="flex gap-2 mt-5 mx-auto">
          <Button className="bg-blue-500 text-white hover:bg-blue-900 hover:text-white">View Button</Button>
          <Button className="bg-orange-900 text-white hover:bg-orange-950 hover:text-white">Add Button</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
