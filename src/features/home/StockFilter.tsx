import { useSearchParams } from "react-router-dom";

interface StockFilterProps {
  stockFilter: string;
  onChange: (value: string) => void;
}

const stockOptions = [
  { value: "all", label: "All" },
  { value: "in", label: "In Stock" },
  { value: "low", label: "Low Stock" },
  { value: "out", label: "Out of Stock" },
];

export default function StockFilter({ stockFilter, onChange }: StockFilterProps) {
  const [searchParam, setSearchParam] = useSearchParams();
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-gray-700">Stock Status</h3>

      {stockOptions.map((option) => {
        const isSelected = option.value === stockFilter;

        return (
          <label
            key={option.value}
            className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded ${
              isSelected ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <input
              type="radio"
              name="stock"
              checked={isSelected}
              onChange={() => {
                onChange(option.value);
                searchParam.set("stock", option.value);
                setSearchParam(searchParam);
              }}
              className="hidden"
            />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}
