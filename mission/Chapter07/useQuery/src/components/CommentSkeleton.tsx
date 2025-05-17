import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const CommentSkeleton = () => (
  <div className="p-3 rounded bg-white shadow animate-pulse">
    <Skeleton width={`80%`} height={16} />
    <Skeleton width={`40%`} height={12} className="mt-2" />
  </div>
);
