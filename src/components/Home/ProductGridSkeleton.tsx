import { Skeleton } from "@/components/ui/skeleton";

export const ProductSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4 p-5">
      {[...Array(8)].map((_, idx) => (
        <div key={idx} className="w-full flex flex-col gap-0 border border-gray-300 rounded-sm h-[350px]">
          <Skeleton className="h-40 w-full rounded-t-xl" />
          <div className="p-3 flex flex-col gap-2">
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-1/2 rounded" />
            <Skeleton className="h-6 w-full rounded mt-2" />
            <Skeleton className="h-6 w-full rounded mt-2" />
            <Skeleton className="h-6 w-full rounded mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
};
