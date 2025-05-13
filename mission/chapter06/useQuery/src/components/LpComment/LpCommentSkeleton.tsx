const LpCommentSkeleton = () => {
    return (
        <div className="p-4 border rounded animate-pulse space-y-2">
            <div className="flex justify-between items-center mb-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
            </div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
    );
};

export default LpCommentSkeleton;