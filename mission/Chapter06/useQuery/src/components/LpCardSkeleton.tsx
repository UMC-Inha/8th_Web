import Skeleton from "react-loading-skeleton";

export const LpCardSkeleton = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow bg-white">
      <Skeleton height={192} />
      <div className="p-4">
        <Skeleton height={20} width={`80%`} />
        <Skeleton height={16} width={`60%`} />
      </div>
    </div>
  );
};
