export const ProductGridSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-5 w-full">
      {[...Array(8)].map((_, idx) => (
        <div key={idx} className="w-full h-64 bg-gray-200 animate-pulse rounded-xl flex flex-col">
          <div className="h-40 w-full bg-gray-300 rounded-t-xl"></div>
          <div className="p-3 flex flex-col gap-2">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
            <div className="h-6 bg-gray-300 rounded mt-2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
