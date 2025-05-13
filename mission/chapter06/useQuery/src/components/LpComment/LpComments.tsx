import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FaUser } from "react-icons/fa";
import { useGetInfiniteLpComments } from "../../hooks/queries/useGetInfiniteLpComments";
import LpCommentSkeleton from "./LpCommentSkeleton";

interface LpCommentsProps {
  lpId: number;
  limit?: number;
}

const LpComments = ({ lpId, limit }: LpCommentsProps) => {
  const [order, setOrder] = useState<"desc" | "asc">("desc");

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteLpComments(lpId, limit, order);

  // 화면 하단 탐지용
  const { ref, inView } = useInView({ threshold: 0 });

  // inView 감지되면 다음 페이지 자동 로드
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const comments = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <div className="border-t pt-6">
      {/* 정렬 버튼 */}
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

      {/* 초기 로딩 스켈레톤 */}
      {isLoading ? (
        <div className="space-y-4">
          {Array.from({ length: limit }).map((_, idx) => (
            <LpCommentSkeleton key={idx} />
          ))}
        </div>
      ) : isError ? (
        <p>댓글을 불러오는 중 오류가 발생했습니다.</p>
      ) : comments.length > 0 ? (
        <>
          {/* 댓글 리스트 */}
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
                      <FaUser className="w-8 h-8 text-gray-400 mr-2" />
                    )}
                    <span className="text-sm font-medium">
                      {c.author.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(c.createdAt).toLocaleString("ko-KR")}
                  </span>
                </div>
                <p>{c.content}</p>
              </li>
            ))}
          </ul>

          {/* 무한 스크롤 센티널 */}
          <div ref={ref} className="h-2"></div>

          {/* 추가 로딩 스켈레톤 */}
          {isFetchingNextPage && (
            <div className="space-y-4 mt-4">
              {Array.from({ length: limit }).map((_, idx) => (
                <LpCommentSkeleton key={`loading-${idx}`} />
              ))}
            </div>
          )}
        </>
      ) : (
        <p>등록된 댓글이 없습니다.</p>
      )}
    </div>
  );
};

export default LpComments;