import { useState, useEffect, FormEvent } from "react";
import { useInView } from "react-intersection-observer";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useGetInfiniteLpComments } from "../../hooks/queries/useGetInfiniteComments";
import { usePostLpComment } from "../../hooks/mutations/usePostLpComment";
import { useEditLpComment } from "../../hooks/mutations/useEditLpComment";
import { useDeleteLpComment } from "../../hooks/mutations/useDeleteLpComment";
import LpCommentSkeleton from "./LpCommentSkeleton";

interface LpCommentsProps {
  lpId: number;
  limit?: number;
}

export default function LpComments({ lpId, limit = 5 }: LpCommentsProps) {
  const { user } = useAuth();
  const [order, setOrder] = useState<"desc" | "asc">("desc");
  const [newComment, setNewComment] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState("");

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteLpComments(lpId, limit, order);

  const { mutate: postComment, isPending: isPosting } = usePostLpComment(lpId);
  const { mutate: editComment, isLoading: isEditing } = useEditLpComment(lpId);
  const { mutate: deleteComment, isLoading: isDeleting } = useDeleteLpComment(lpId);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const comments = data?.pages.flatMap((p) => p.data) ?? [];

  // 새 댓글 작성
  const handleNewSubmit = (e: FormEvent) => {
    e.preventDefault();
    const content = newComment.trim();
    if (!content) return;
    postComment(
      { content },
      { onSuccess: () => setNewComment("") }
    );
  };

  // 수정 로직
  const startEdit = (id: number, content: string) => {
    setEditingId(id);
    setEditingContent(content);
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditingContent("");
  };
  const handleEditSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!editingContent.trim() || editingId === null) return;
    editComment(
      { commentId: editingId, content: editingContent.trim() },
      { onSuccess: cancelEdit }
    );
  };

  // 삭제 로직
  const handleDelete = (id: number) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteComment(id);
    }
  };

  return (
    <div className="border-t pt-6 space-y-6">
      {/* 댓글 작성 */}
      <form onSubmit={handleNewSubmit} className="space-y-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={2}
          placeholder="댓글을 입력하세요..."
          className="w-full border rounded px-3 py-2 resize-none"
        />
        <button
          type="submit"
          disabled={isPosting}
          className={`px-4 py-2 rounded text-white ${isPosting ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isPosting ? "등록 중..." : "댓글 작성"}
        </button>
      </form>

      {/* 정렬 */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">댓글 ({comments.length})</h2>
        <div className="space-x-2">
          <button
            onClick={() => setOrder("desc")}
            className={`px-3 py-1 border rounded ${
              order === "desc" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            최신순
          </button>
          <button
            onClick={() => setOrder("asc")}
            className={`px-3 py-1 border rounded ${
              order === "asc" ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
          >
            오래된순
          </button>
        </div>
      </div>

      {/* 댓글 목록 */}
      {isPending ? (
        <div className="space-y-4">
          {Array.from({ length: limit }).map((_, idx) => (
            <LpCommentSkeleton key={idx} />
          ))}
        </div>
      ) : isError ? (
        <p>댓글을 불러오는 중 오류가 발생했습니다.</p>
      ) : comments.length === 0 ? (
        <p>등록된 댓글이 없습니다.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="p-4 border rounded">
                <div className="flex justify-between items-start mb-2">
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
                    <span className="text-sm font-medium">{c.author.name}</span>
                  </div>

                  {/* 본인 댓글일 때만 수정/삭제 */}
                  {user?.id === c.authorId && editingId !== c.id && (
                    <div className="space-x-2">
                      <button
                        onClick={() => startEdit(c.id, c.content)}
                        className="text-sm text-blue-500 hover:underline"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(c.id)}
                        disabled={isDeleting}
                        className="text-sm text-red-500 hover:underline"
                      >
                        {isDeleting ? "삭제 중..." : "삭제"}
                      </button>
                    </div>
                  )}
                </div>

                {/* 수정 모드 or 일반 모드 */}
                {editingId === c.id ? (
                  <form onSubmit={handleEditSubmit} className="space-y-2">
                    <textarea
                      value={editingContent}
                      onChange={(e) => setEditingContent(e.target.value)}
                      rows={2}
                      className="w-full border rounded px-3 py-2 resize-none"
                    />
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-3 py-1 border rounded text-gray-700"
                      >
                        취소
                      </button>
                      <button
                        type="submit"
                        disabled={isEditing}
                        className={`px-3 py-1 rounded text-white ${
                          isEditing ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
                        }`}
                      >
                        {isEditing ? "저장 중..." : "저장"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <p>{c.content}</p>
                )}
              </li>
            ))}
          </ul>

          {/* 무한스크롤 트리거 + 로딩 */}
          <div ref={ref} className="h-2" />
          {isFetchingNextPage && (
            <div className="space-y-4 mt-4">
              {Array.from({ length: limit }).map((_, idx) => (
                <LpCommentSkeleton key={`loading-${idx}`} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
