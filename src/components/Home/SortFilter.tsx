import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSearchParams } from "react-router-dom";

const sortFilter = [
  { value: "price-asc", label: "Low to High" },
  { value: "price-desc", label: "High to Low" },
  { value: "rating", label: "Rating" },
  { value: "title", label: "Title (A-Z)" },
];

const SortFilter: React.FC = () => {
  const [searchParam, setSearchParam] = useSearchParams();
  const sortby = searchParam.get("sortby");

  return (
    <div className="flex items-center justify-center my-5">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="p-2 bg-blue-500 rounded-md px-10 border text-white font-medium">
            {sortby ? sortby : "Sort By"}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {sortFilter.map((sort) => {
            return (
              <DropdownMenuItem
                onClick={() => {
                  searchParam.set("sortby", sort.value);
                  setSearchParam(searchParam);
                }}
              >
                {sort.label}
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuItem
            onClick={() => {
              searchParam.delete("sortby");
              setSearchParam(searchParam);
            }}
          >
            reset
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SortFilter;
