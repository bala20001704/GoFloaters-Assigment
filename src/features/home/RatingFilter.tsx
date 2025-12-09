interface RatingFilterProps {
  selectedRatings: number[];
  onChange: (ratings: number[]) => void;
}

export default function RatingFilter({ selectedRatings, onChange }: RatingFilterProps) {
  const handleToggle = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      onChange(selectedRatings.filter((r) => r !== rating));
    } else {
      onChange([...selectedRatings, rating]);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="font-medium text-gray-700">Rating</h3>

      {[5, 4, 3, 2, 1].map((rating) => (
        <label key={rating} className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={selectedRatings.includes(rating)} onChange={() => handleToggle(rating)} />
          <span>{rating} ★ & up</span>
        </label>
      ))}
    </div>
  );
}
