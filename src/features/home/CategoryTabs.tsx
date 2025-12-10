import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { useSearchParams } from "react-router-dom";

export const getCategoriesList = async (): Promise<string[]> => {
  const res = await axiosInstance.get("/products/category-list");
  return res.data;
};

interface CategoryTabsProps {
  selected: string;
  onChange: (category: string) => void;
}

export function CategoryTabs({ selected, onChange }: CategoryTabsProps) {
  const [searchParm, setSearchParam] = useSearchParams();

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesList,
  });

  if (isLoading) return <div className="p-3 text-gray-500">Loading categories...</div>;

  return (
    <div className="flex flex-col gap-3">
      <p className="font-medium text-gray-700">Categories</p>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            onChange(cat);
            searchParm.set("category", cat);
            setSearchParam(searchParm);
          }}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition
            ${selected === cat ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
          `}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
