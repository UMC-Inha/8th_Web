import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../apis/getComments";
import { CommentSkeleton } from "../components/CommentSkeleton";
export const LpCommentsSection = () => {
  const { lpId } = useParams();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const { ref, inView } = useInView();

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["lp-comments", lpId, order],
      queryFn: ({ pageParam = 0 }) =>
        getComments({ lpId: Number(lpId), cursor: pageParam, order }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allComments = data?.pages.flatMap((page) => page.data.data) ?? [];

  return (
    <div className="mt-6 border-t pt-4">
      <div className="flex justify-end gap-2 mb-4">
        <button
          className={`px-3 py-1 rounded border ${
            order === "desc" ? "border-blue-500" : "border-gray-300"
          }`}
          onClick={() => setOrder("desc")}
        >
          최신순
        </button>
        <button
          className={`px-3 py-1 rounded border ${
            order === "asc" ? "border-blue-500" : "border-gray-300"
          }`}
          onClick={() => setOrder("asc")}
        >
          오래된순
        </button>
      </div>

      <div className="space-y-4">
        {isPending
          ? Array.from({ length: 5 }).map((_, i) => <CommentSkeleton key={i} />)
          : allComments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-3 rounded">
                <p className="text-sm text-gray-800">{comment.content}</p>
                <div className="text-xs text-gray-500 mt-1">
                  {comment.author.name} ·{" "}
                  {new Date(comment.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}

        {isFetchingNextPage &&
          Array.from({ length: 3 }).map((_, i) => (
            <CommentSkeleton key={`loading-${i}`} />
          ))}
      </div>

      <div ref={ref} className="h-10" />

      <div className="mt-6 border-t pt-4">
        <textarea
          placeholder="댓글 입력 창이 될 친구"
          className="w-full border rounded p-2 text-sm text-gray-500 bg-gray-100"
          disabled
        />
      </div>
    </div>
  );
};
