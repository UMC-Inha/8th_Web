import LpCommentSkeleton from "./LpCommentSkeleton";

interface LpCommentSkeletonListProps {
    count : number;
}

const LpCardSkeletonList = ({count} : LpCommentSkeletonListProps) => {
    return (
        <>
            {new Array(count).fill(0).map((_, idx : number) => (
                <LpCommentSkeleton key = {idx}/>
            ))}
        </>
    )
}

export default LpCardSkeletonList;