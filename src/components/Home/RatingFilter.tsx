import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface RatingFilterProps {
  selectedRatings: number[];
  onChange: (ratings: number[]) => void;
}

export default function RatingFilter({ selectedRatings, onChange }: RatingFilterProps) {
  console.log("redniid", selectedRatings);
  const handleToggle = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      onChange(selectedRatings.filter((r) => r !== rating));
    } else {
      onChange([...selectedRatings, rating]);
    }
  };

  return (
    <div className="flex flex-col gap-2 border p-4 rounded-md shadow-lg">
      <h3 className="font-medium text-center">Rating</h3>
      <div className="mx-auto grid grid-cols-2 gap-3">
        {[1, 2, 3, 4, 5].map((rating) => {
          return (
            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                checked={selectedRatings.includes(rating)}
                onClick={() => handleToggle(rating)}
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
