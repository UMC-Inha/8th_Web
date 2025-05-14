import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getComments } from "../apis/Comments";
import { CommentSkeleton } from "../components/CommentSkeleton";
export const LpCommentsPage = () => {
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
    if (inView && hasNextPage && !isFetchingNextPage && !isPending) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage, isPending]);

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
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-full bg-pink-500 text-xs flex items-center justify-center font-semibold">
          김
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="댓글을 입력해주세요"
            className="w-full text-sm bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-400"
            disabled
          />
        </div>
        <button
          className="text-sm bg-zinc-600 text-white px-3 py-1 rounded hover:bg-zinc-500"
          disabled
        >
          작성
        </button>
      </div>
      <div className="space-y-5">
        {isPending
          ? Array.from({ length: 5 }).map((_, i) => <CommentSkeleton key={i} />)
          : allComments.map((comment) => (
              <div key={comment.id} className="flex gap-2 items-start">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs">
                  {comment.author.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">
                    {comment.author.name}
                  </div>
                  <p className="text-sm text-zinc-300">{comment.content}</p>
                  <div className="text-xs text-zinc-500 mt-1">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}

        {isFetchingNextPage &&
          Array.from({ length: 3 }).map((_, i) => (
            <CommentSkeleton key={`loading-${i}`} />
          ))}
      </div>

      <div ref={ref} style={{ height: "1px" }} />
    </div>
  );
};
