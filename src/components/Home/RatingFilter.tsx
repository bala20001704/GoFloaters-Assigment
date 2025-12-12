import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSearchParams } from "react-router-dom";

interface RatingFilterProps {
  selectedRatings: number[];
}

export default function RatingFilter({ selectedRatings }: RatingFilterProps) {
  const [searchParam, setSearchParam] = useSearchParams();

  const handleRating = (rating: number) => {
    const params = new URLSearchParams(searchParam);
    const existingRatings = searchParam.get("ratings");

    if (!existingRatings) {
      params.set("ratings", String(rating));
      setSearchParam(params);
      return;
    }

    let list = existingRatings.split(",").map(Number);

    if (list.includes(rating)) {
      list = list.filter((r) => r !== rating);
      if (list.length === 0) {
        params.delete("ratings");
      } else {
        params.set("ratings", list.join(","));
      }
    } else {
      params.set("ratings", String(rating) + "," + list.join(","));
    }

    setSearchParam(params);
    return;
  };

  return (
    <div className="flex flex-col gap-2 border p-4 rounded-md shadow-lg">
      <h3 className="font-medium text-center">Rating</h3>
      <div className="mx-auto grid grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5].map((rating) => {
          return (
            <div className="flex items-center gap-3" key={rating}>
              <Checkbox
                id="terms"
                checked={selectedRatings.includes(rating)}
                onClick={() => handleRating(rating)}
                className="border-gray-900"
              />
              <Label htmlFor="terms">{rating}★ </Label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
