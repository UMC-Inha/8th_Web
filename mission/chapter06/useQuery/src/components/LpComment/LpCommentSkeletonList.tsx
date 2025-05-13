import LpCommentSkeleton from "./LpCommentSkeleton";

interface LpCommentSkeletonListProps {
    count: number;
}

const LpCommentSkeletonList = ({ count }: LpCommentSkeletonListProps) => (
    <>
        {Array.from({ length: count }).map((_, idx) => (
            <LpCommentSkeleton key={idx} />
        ))}
    </>
);

export default LpCommentSkeletonList;