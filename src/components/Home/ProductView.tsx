import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "./api";
import { useMemo, useState } from "react";

const ProductView = () => {
  const { id } = useParams();

  const { data: product, isLoading } = useQuery({
    queryKey: ["productView", id],
    queryFn: ({ queryKey }) => getProductById(queryKey[1]!),
    enabled: !!id,
  });

  const [selectedImage, setSelectedImage] = useState("");
  const [sort, setSort] = useState<"recent" | "high" | "low">("recent");

  const sortedReviews = useMemo(() => {
    if (!product) return [];
    if (sort === "recent") {
      return [...product.reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    if (sort === "high") {
      return [...product.reviews].sort((a, b) => b.rating - a.rating);
    }
    return [...product.reviews].sort((a, b) => a.rating - b.rating);
  }, [sort, product]);

  if (isLoading) return <p className="p-10">Loading...</p>;
  if (!product) return <p>No Product Found</p>;

  const images = product.images?.length ? product.images : [product.thumbnail];
  const activeImage = selectedImage || images[0];

  const totalReviews = product.reviews.length;
  const avgRating = (product.reviews.reduce((a, b) => a + b.rating, 0) / totalReviews).toFixed(1);

  const ratingBreakdown = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: product.reviews.filter((r) => r.rating === star).length,
  }));

  const renderStars = (rating: number) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);
    return (
      <span className="text-yellow-400">
        {"★".repeat(full)}
        {half && "☆"}
        {"☆".repeat(empty)}
      </span>
    );
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <img src={activeImage} className="w-full h-80 object-cover rounded-lg border" />

        <div className="flex gap-3 mt-4">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 object-cover rounded border cursor-pointer ${
                activeImage === img ? "ring-2 ring-blue-500" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-500">{product.brand}</p>
        <p className="text-sm bg-gray-200 w-fit px-3 py-1 rounded">{product.category}</p>

        <p className="mt-2 text-gray-700">{product.description}</p>

        <div className="mt-3">
          <span className="text-3xl font-semibold">
            ₹{(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)}
          </span>

          <p className="text-gray-500 text-sm">
            <s>₹{product.price}</s> <span className="text-red-500">({product.discountPercentage}% OFF)</span>
          </p>
        </div>

        <div className="flex items-center gap-2 mt-2">
          {renderStars(product.rating)}
          <span className="text-gray-600">{product.rating.toFixed(1)} / 5</span>
        </div>
      </div>

      <div className="col-span-full mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        <div className="bg-gray-100 p-4 rounded-lg mb-8">
          <p className="text-xl font-bold">⭐ {avgRating} / 5</p>
          <p className="text-gray-600">{totalReviews} total reviews</p>

          <div className="mt-4 space-y-2">
            {ratingBreakdown.map((r) => (
              <div key={r.star} className="flex items-center gap-3">
                <span className="w-10">{r.star} ★</span>
                <div className="flex-1 bg-gray-300 h-2 rounded">
                  <div
                    className="bg-yellow-400 h-2 rounded"
                    style={{
                      width: totalReviews ? `${(r.count / totalReviews) * 100}%` : "0%",
                    }}
                  ></div>
                </div>
                <span>{r.count}</span>
              </div>
            ))}
          </div>
        </div>

        <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="border px-3 py-2 rounded mb-5">
          <option value="recent">Most Recent</option>
          <option value="high">Highest Rated</option>
          <option value="low">Lowest Rated</option>
        </select>

        <div className="space-y-5">
          {sortedReviews.map((rev, i) => (
            <div key={i} className="border p-4 rounded-lg shadow-sm">
              <div className="flex justify-between">
                <h3 className="font-semibold">{rev.reviewerName}</h3>
                {renderStars(rev.rating)}
              </div>

              <p className="text-sm text-gray-500">{rev.reviewerEmail}</p>
              <p className="mt-3">{rev.comment}</p>
              <p className="text-xs text-gray-400 mt-2">{new Date(rev.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
