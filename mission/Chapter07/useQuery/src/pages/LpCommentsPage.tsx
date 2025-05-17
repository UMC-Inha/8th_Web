import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useInfiniteQuery } from "@tanstack/react-query";
import { CommentSkeleton } from "../components/CommentSkeleton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getComment as getCommentApi,
  postComment as postCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../apis/comment";
import { useMe } from "../hooks/useMe";

export const LpCommentsPage = () => {
  const { lpId } = useParams();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const { ref, inView } = useInView();
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { user: me } = useMe();
  const currentUserId = me?.id;

  const { mutate: postComment, isPending: isPosting } = useMutation({
    mutationFn: postCommentApi,
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries({ queryKey: ["lp-comments", lpId] });
    },
  });
  const { mutate: updateComment } = useMutation({
    mutationFn: updateCommentApi,
    onSuccess: () => {
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["lp-comments", lpId] });
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: () => {
      setOpenMenuId(null);
      queryClient.invalidateQueries({ queryKey: ["lp-comments", lpId] });
    },
  });

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["lp-comments", lpId, order],
      queryFn: ({ pageParam = 0 }) =>
        getCommentApi({ lpId: Number(lpId), cursor: pageParam, order }),
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
          Me
        </div>
        <div className="flex-1">
          <input
            type="text"
            placeholder="댓글을 입력해주세요"
            className="w-full text-sm bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-white placeholder-zinc-400"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isPosting}
          />
        </div>
        <button
          onClick={() => {
            if (!content.trim()) return;
            postComment({ lpId: Number(lpId), content });
          }}
          className="text-sm bg-zinc-600 text-white px-3 py-1 rounded hover:bg-zinc-500"
          disabled={!content.trim() || isPosting}
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
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-white">
                      {comment.author.name}
                    </div>
                    {comment.author.id === currentUserId && (
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenMenuId(
                              openMenuId === comment.id ? null : comment.id
                            )
                          }
                          className="text-white px-2"
                        >
                          ⋯
                        </button>
                        {openMenuId === comment.id && (
                          <div className="absolute right-0 mt-1 bg-zinc-800 text-sm rounded shadow-md z-20 flex gap-1 px-2 py-1">
                            <button
                              onClick={() => {
                                setEditingId(comment.id);
                                setEditContent(comment.content);
                                setOpenMenuId(null);
                              }}
                              className="block px-4 py-2 hover:bg-zinc-700 whitespace-nowrap"
                            >
                              수정
                            </button>
                            <button
                              onClick={() =>
                                deleteComment({
                                  lpId: Number(lpId),
                                  commentId: comment.id,
                                })
                              }
                              className="block px-4 py-2 hover:bg-zinc-700 text-red-400 whitespace-nowrap"
                            >
                              삭제
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {editingId === comment.id ? (
                    <div className="mt-2">
                      <input
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full bg-zinc-700 text-white px-3 py-1 rounded"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateComment({
                              lpId: Number(lpId),
                              commentId: comment.id,
                              content: editContent,
                            })
                          }
                          className="bg-blue-600 px-3 py-1 text-white rounded"
                        >
                          저장
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="text-sm text-zinc-300"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-300 mt-1">
                      {comment.content}
                    </p>
                  )}

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
