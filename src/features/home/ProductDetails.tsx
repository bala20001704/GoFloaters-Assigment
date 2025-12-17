import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/features/home/api";

import { useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/ui/spinner";

const sortDropDownItem: { label: string; value: "most" | "high" | "low" }[] = [
  { label: "Most Recent", value: "most" },
  { label: "Low Review", value: "low" },
  { label: "High Review", value: "high" },
];

const renderStars = (rating: number) => {
  const full = Math.floor(rating);
  const empty = 5 - full;
  return (
    <span className="text-yellow-400">
      {"★".repeat(full)}
      {"☆".repeat(empty)}
    </span>
  );
};

const ProductView = () => {
  const { id } = useParams();
  const [sort, setSort] = useState<"most" | "high" | "low">("most");
  const { data: product } = useQuery({
    queryKey: ["productView", id],
    queryFn: ({ queryKey }) => getProductById(queryKey[1]!),
    enabled: !!id,
  });
  const producImage = product?.images[0];

  const sortedReviews = useMemo(() => {
    if (!product) return [];
    if (sort === "most") {
      return [...product.reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    if (sort === "high") {
      return [...product.reviews].sort((a, b) => b.rating - a.rating);
    }
    return [...product.reviews].sort((a, b) => a.rating - b.rating);
  }, [sort, product]);

  if (!product) {
    return <Spinner />;
  }

  const handleSort = (value: "most" | "high" | "low") => {
    setSort(value);
  };

  return (
    <div className="max-h-full overflow-auto">
      <section className="max-w-5xl mx-auto mt-10 flex gap-5 border border-gray-500 rounded-md shadow-2xl">
        <div className="w-1/2 flex gap-5">
          <img src={producImage} className="w-3/4 h-auto" />
          <div className="">
            <img
              src={product.thumbnail}
              alt=""
              className="w-20 h-auto border border-blue-800 rounded-md mt-10 hover:cursor-pointer"
            />
          </div>
        </div>
        <div className="w-1/2 flex items-center justify-center">
          <div>
            <p className="font-medium text-3xl text-gray-800 m-5">Product Detail</p>
            <div className="shadow-2xl m-5 p-2">
              <p className="font-normal text-4xl mt-4">{product.title}</p>
              <p className="mt-2 font-bold text-gray-900  ">{product.brand}</p>
              <p className="mt-2 font-medium text-gray-900">category - {product.category}</p>
              <p className="mt-2 font-medium text-gray-900">{product.description}</p>
              <p className="mt-5 font-medium text-gray-900">{product.shippingInformation}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-10">
        <div>
          <p className="font-medium text-3xl text-gray-900">Product Description</p>
          <p className="font-medium mt-2 text-xl">Price ₹{product.price}</p>
          <p className="font-medium text-xl">
            Discounted Price ₹{product.price - product.price * (product.discountPercentage / 100)}
          </p>
          <p className="font-medium text-xl">
            Rating {product.rating.toFixed(1)}/5
            {renderStars(product.rating)}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto mt-10">
        <p className="font-medium text-3xl text-gray-900 mb-5">Review Section</p>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="p-2 bg-blue-500 rounded-md px-10 border text-white font-medium">Sort</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {sortDropDownItem.map((sortItem) => (
              <DropdownMenuItem onClick={() => handleSort(sortItem.value)}>{sortItem.label}</DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex flex-col gap-5 mt-5">
          {sortedReviews.map((review, idx) => {
            return (
              <div key={idx} className="p-5 border rounded">
                <p className="font-medium text-sm">{review.reviewerName}</p>
                <p className="text-sm mt-1">{review.reviewerEmail}</p>
                <p className="text-sm mt-1">{review.comment}</p>
                <p className="text-sm mt-1">{new Date(review.date).toLocaleDateString()}</p>
                <p>
                  {product.rating} {renderStars(product.rating)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section></section>
    </div>
  );
};

export default ProductView;
