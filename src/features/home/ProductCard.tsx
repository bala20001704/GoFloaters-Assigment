import { useState } from "react";
import type { Product } from "./types";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imgError, setImgError] = useState(false);

  const discountedPrice = (product.price - (product.price * product.discountPercentage) / 100).toFixed(2);

  const navigate = useNavigate();

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
    <div className="border rounded-xl p-3 flex flex-col gap-3 w-full max-h-96">
      <div className="w-full h-40 rounded-lg overflow-hidden">
        <img
          src={imgError ? "/fallback.jpg" : product.thumbnail}
          alt={product.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 style={{ fontSize: "16px", fontWeight: "bold" }}>{product.title}</h3>

      <p style={{ color: "#555", fontSize: "14px" }}>{product.brand}</p>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <span style={{ fontSize: "18px", fontWeight: "bold" }}>₹{discountedPrice}</span>

        <span style={{ fontSize: "14px", color: "#6b7280" }}>
          <s>₹{product.price}</s> <span style={{ color: "#dc2626" }}>({product.discountPercentage}% OFF)</span>
        </span>
      </div>

      {renderStars(product.rating)}

      <span
        style={{
          alignSelf: "flex-start",
          background: stock.color,
          color: "white",
          padding: "4px 8px",
          borderRadius: "5px",
          fontSize: "12px",
        }}
      >
        {stock.label}
      </span>
      <button className="bg-green-200 text-black rounded p-1">Add to cart</button>
      <button
        className="bg-blue-600 text-black rounded p-1"
        onClick={() => {
          navigate(`/product/${product.id}`);
        }}
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
