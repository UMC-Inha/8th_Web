import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpComments } from "../apis/lp";
import LpCommentSkeleton from "../components/LpComment/LpCommentSkeleton";

export const LpCommentsPage: React.FC<{ lpId: number }> = ({ lpId }) => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", lpId, order],
      queryFn: ({ pageParam = 0 }) =>
        getLpComments(lpId, pageParam, 10, order),
      getNextPageParam: (lastPage) =>
        lastPage.hasNext ? lastPage.nextCursor : undefined,
      initialPageParam: 0,
      enabled: !!lpId
    });

  const comments = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <div className="border-t pt-10">
      
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">댓글</h2>
        <div className="space-x-2">
          <button
            onClick={() => setOrder("desc")}
            className={`px-3 py-1 border rounded ${
              order === "desc"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setOrder("asc")}
            className={`px-3 py-1 border rounded ${
              order === "asc"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            오래된순
          </button>
        </div>
      </div>
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, idx) => (
            <LpCommentSkeleton key={idx} />
          ))}
        </div>
      ) : isError ? (
        <p>댓글을 불러오는 중 오류가 발생했습니다.</p>
      ) : comments.length > 0 ? (
        <>
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="p-4 border rounded">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    {c.author.avatar ? (
                      <img
                        src={c.author.avatar}
                        alt={c.author.name}
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                      />
                    ) : (
                      <button className="w-8 h-8 text-gray-400 mr-2" />
                    )}
                    <span className="text-sm font-medium">{c.author.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(c.createdAt).toLocaleString("ko-KR")}
                  </span>
                </div>
                <p>{c.content}</p>
              </li>
            ))}
          </ul>
          {hasNextPage && (
            <div className="flex flex-col items-center mt-4 space-y-2">
              {isFetchingNextPage ? (
                Array.from({ length: 10 }).map((_, idx) => (
                  <LpCommentSkeleton key={`loading-${idx}`} />
                ))
              ) : (
                <button
                  onClick={() => fetchNextPage()}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  더 보기
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        <p>등록된 댓글이 없습니다.</p>
      )}
    </div>
  );
};

export default LpCommentsPage;
