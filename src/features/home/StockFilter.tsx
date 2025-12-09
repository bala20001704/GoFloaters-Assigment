interface StockFilterProps {
  stockFilter: "all" | "in" | "low" | "out";
  onChange: (value: "all" | "in" | "low" | "out") => void;
}

export default function StockFilter({ stockFilter, onChange }: StockFilterProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-gray-700">Stock Status</h3>

      {["all", "in", "low", "out"].map((status) => {
        const label =
          status === "all" ? "All" : status === "in" ? "In Stock" : status === "low" ? "Low Stock" : "Out of Stock";

        const isSelected = stockFilter === status;

        console.log("stockfilter", stockFilter);

        return (
          <label
            key={status}
            className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded ${
              isSelected ? "bg-black text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <input
              type="radio"
              name="stock"
              checked={isSelected}
              onChange={() => onChange(status as "all" | "in" | "low" | "out")}
              className="hidden"
            />
            <span>{label}</span>
          </label>
        );
      })}
    </div>
  );
}
