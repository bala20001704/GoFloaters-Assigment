import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "react-router-dom";

interface StockFilterProps {
  stockFilter: string;
}

const stockOptions = [
  { value: "all", label: "All" },
  { value: "in", label: "In Stock" },
  { value: "low", label: "Low Stock" },
  { value: "out", label: "Out of Stock" },
];

export default function StockFilter({ stockFilter }: StockFilterProps) {
  const [searchParam, setSearchParam] = useSearchParams();
  return (
    <div className="flex flex-col gap-3 border rounded-lg shadow-lg p-3">
      <h3 className="font-medium text-gray-700 text-center">Stock Status</h3>

      {stockOptions.map((option, idx) => {
        const isSelected = option.value === stockFilter;

        return (
          <>
            <RadioGroup key={idx}>
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  value={option.value}
                  id="r1"
                  checked={isSelected}
                  onClick={() => {
                    searchParam.set("stock", option.value);
                    setSearchParam(searchParam);
                  }}
                />
                <Label htmlFor="r1">{option.label}</Label>
              </div>
            </RadioGroup>
          </>
        );
      })}
    </div>
  );
}
