import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpById } from "../apis/lp";
import { Lp } from "../types/lp";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../enums/common";
import { useInfiniteComments } from "../hooks/queries/useGetInfiniteComments";
import LpCommentSkeletonList from "../components/LpCard/LpCommentSkeletonList";
import LpComments from "../components/LpCard/LpComment";

const LpDetailPage = () => {
  const { id } = useParams();
  const lpId = Number(id);


  const {
    data: lp,
    isLoading: isLpLoading,
    isError,
  } = useQuery<Lp>({
    queryKey: ["lp", id],
    queryFn: () => getLpById(id as string),
    enabled: !!id,
  });


  const {
    data: commentPages,
    isLoading: isCommentLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteComments(lpId, PAGINATION_ORDER.asc);

  const { ref, inView } = useInView();

  if (inView && hasNextPage && !isFetchingNextPage) {
    fetchNextPage();
  }


  const commentList =
    commentPages?.pages.map((page) => page.data.data).flat() ?? [];

  const shouldShowCommentSkeleton =
    (!commentPages && isCommentLoading) || commentList.length === 0;

  if (isLpLoading) return <div className="p-6">LP 로딩 중...</div>;
  if (isError || !lp)
    return <div className="p-6">LP 정보를 불러오는 데 실패했습니다.</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />

      <h1 className="text-3xl font-bold mb-2">{lp.title}</h1>
      <p className="text-gray-600 text-sm mb-1">
        작성일: {new Date(lp.createdAt).toLocaleString()}
      </p>
      <p className="text-gray-600 text-sm mb-4">
        수정일: {new Date(lp.updatedAt).toLocaleString()}
      </p>

      <p className="text-gray-800 mb-6 whitespace-pre-wrap">{lp.content}</p>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1">태그</h2>
        <div className="flex flex-wrap gap-2">
          {lp.tags.length > 0 ? (
            lp.tags.map((tag) => (
              <span
                key={tag.id}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
              >
                #{tag.name}
              </span>
            ))
          ) : (
            <span className="text-gray-400">태그 없음</span>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">좋아요 수: {lp.likes.length}</h2>
      </div>

    
      <div className="mt-10">
        {shouldShowCommentSkeleton ? (
          <LpCommentSkeletonList count={5} />
        ) : (
          <LpComments
            data={commentList}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            refObserver={ref}
          />
        )}
      </div>
    </div>
  );
};

export default LpDetailPage;
