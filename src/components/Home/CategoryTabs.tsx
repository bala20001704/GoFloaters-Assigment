import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/services/api/axios";
import { useSearchParams } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const getCategoriesList = async (): Promise<string[]> => {
  const res = await axiosInstance.get("/products/category-list");
  return res.data;
};

export function CategoryTabs() {
  const [searchParam, setSearchParam] = useSearchParams();

  const category = searchParam.get("category") || "";

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesList,
  });

  const handleCategory = (category: string) => {
    const params = new URLSearchParams(searchParam);
    params.set("category", category);
    params.delete("search");
    setSearchParam(params);
  };

  if (isLoading) return <div className="p-3 text-gray-500">Loading categories...</div>;

  return (
    <div className="flex items-center justify-center my-5">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="p-2 bg-blue-500 rounded-md px-10 border text-white font-medium">
            {category ? category : "Category"}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {categories.map((category) => {
            return <DropdownMenuItem onClick={() => handleCategory(category)}>{category}</DropdownMenuItem>;
          })}
          <DropdownMenuItem
            onClick={() => {
              searchParam.delete("category");
              setSearchParam(searchParam);
            }}
          >
            reset
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
