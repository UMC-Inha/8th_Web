import Skeleton from "react-loading-skeleton";

type Props = {
  initial?: boolean;
};

export const LpCardSkeleton = ({ initial = false }: Props) => {
  return (
    <div
      className={`rounded-lg overflow-hidden shadow ${
        initial ? "bg-white" : "bg-gray-100"
      }`}
    >
      <Skeleton height={192} />
      <div className="p-4">
        <Skeleton height={20} width="80%" />
        <Skeleton height={16} width="60%" />
      </div>
    </div>
  );
};
