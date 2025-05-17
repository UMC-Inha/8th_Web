import { useParams, useNavigate } from "react-router-dom";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "react-query";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useRef, useState } from "react";
import CommentBlock from "../components/CommentBlock";
import useAddComment from "../hooks/useAddComment";
import "./LPDetailPage.css";

const fetchLPDetail = async (id: string) => {
  const res = await axiosInstance.get(`/v1/lps/${id}`);
  return res.data.data;
};

const fetchComments = async ({ pageParam = 0, queryKey }: any) => {
  const [, lpId, order] = queryKey;
  const res = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: { cursor: pageParam, limit: 10, order },
  });
  return res.data.data;
};

const LPDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTags, setEditTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [editThumbnail, setEditThumbnail] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentUserId = Number(localStorage.getItem("userId"));

  const {
    data: lpData,
    isLoading,
    error,
  } = useQuery(["lp", lpId], () => fetchLPDetail(lpId!), {
    enabled: !!lpId,
    onSuccess: (data) => {
      setLikeCount(data.likes.length);
      setHasLiked(data.likes.some((like: any) => like.id === currentUserId));
      setEditTitle(data.title);
      setEditContent(data.content);
      setEditTags(data.tags.map((tag: any) => tag.name));
      setEditThumbnail(data.thumbnail);
    },
  });

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isLoading: loadingComments,
  } = useInfiniteQuery(["comments", lpId, "desc"], fetchComments, {
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!lpId,
  });

  const allComments = commentData?.pages.flatMap((page) => page.data) ?? [];
  const commentObserverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!commentObserverRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );
    observer.observe(commentObserverRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const addComment = useAddComment(lpId!);
  const [commentInput, setCommentInput] = useState("");

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    addComment.mutate(commentInput, {
      onSuccess: () => setCommentInput(""),
    });
  };

  const updateLPMutation = useMutation(
    () =>
      axiosInstance.patch(`/v1/lps/${lpId}`, {
        title: editTitle,
        content: editContent,
        tags: editTags,
        thumbnail: editThumbnail,
        published: true,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["lp", lpId]);
        setIsEditing(false);
      },
    }
  );

  const deleteLPMutation = useMutation(
    () => axiosInstance.delete(`/v1/lps/${lpId}`),
    {
      onSuccess: () => navigate("/"),
    }
  );

  const likeMutation = useMutation(
    () => axiosInstance.post(`/v1/lps/${lpId}/likes`),
    {
      onSuccess: () => {
        setHasLiked(true);
        setLikeCount((prev) => prev + 1);
      },
    }
  );

  const unlikeMutation = useMutation(
    () => axiosInstance.delete(`/v1/lps/${lpId}/likes`),
    {
      onSuccess: () => {
        setHasLiked(false);
        setLikeCount((prev) => prev - 1);
      },
    }
  );

  const handleThumbnailChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    const res = await axiosInstance.post("/v1/uploads", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setEditThumbnail(res.data.data.imageUrl);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error || !lpData) return <div>불러오기 실패</div>;

  return (
    <div className="lp-detail-wrapper">
      <div className="lp-detail-container">
        <div className="lp-detail-header">
          <div className="lp-author-block">
            <img
              src={lpData.author.avatar}
              alt="avatar"
              className="lp-author-avatar"
            />
            <span className="lp-author-name">{lpData.author.name}</span>
          </div>
          <span className="lp-date">
            {new Date(lpData.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="lp-detail-topbar">
          <h2 className="lp-title">
            {isEditing ? (
              <input
                className="lp-edit-input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
            ) : (
              lpData.title
            )}
          </h2>
          {lpData.author.id === currentUserId && (
            <div className="lp-actions">
              {isEditing ? (
                <>
                  <button onClick={() => updateLPMutation.mutate()}>
                    저장
                  </button>
                  <button onClick={() => setIsEditing(false)}>취소</button>
                </>
              ) : (
                <>
                  <span
                    className="lp-action"
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️
                  </span>
                  <span
                    className="lp-action"
                    onClick={() =>
                      window.confirm("정말 삭제하시겠습니까?") &&
                      deleteLPMutation.mutate()
                    }
                  >
                    🗑️
                  </span>
                </>
              )}
            </div>
          )}
        </div>

        <div className="lp-cd-wrapper">
          <img
            src={editThumbnail}
            alt="cd"
            className="lp-cd-image spinning"
            onClick={() => isEditing && fileInputRef.current?.click()}
            style={{ cursor: isEditing ? "pointer" : "default" }}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleThumbnailChange}
          />
        </div>

        <div className="lp-description">
          {isEditing ? (
            <textarea
              className="lp-edit-textarea"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
          ) : (
            lpData.content
          )}
        </div>

        <div className="lp-tags">
          {isEditing ? (
            <>
              <div className="lp-edit-tag">
                {editTags.map((tag) => (
                  <span key={tag}>
                    #{tag}
                    <span
                      className="lp-edit-tag-remove"
                      onClick={() =>
                        setEditTags(editTags.filter((t) => t !== tag))
                      }
                    >
                      ×
                    </span>
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <input
                  className="lp-edit-input"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="태그 추가"
                />
                <button
                  onClick={() => {
                    if (tagInput && !editTags.includes(tagInput)) {
                      setEditTags([...editTags, tagInput]);
                      setTagInput("");
                    }
                  }}
                >
                  추가
                </button>
              </div>
            </>
          ) : (
            lpData.tags.map((tag) => (
              <span key={tag.id} className="lp-tag">
                #{tag.name}
              </span>
            ))
          )}
        </div>

        <div
          className="lp-likes"
          onClick={() =>
            hasLiked ? unlikeMutation.mutate() : likeMutation.mutate()
          }
        >
          {hasLiked ? "💔" : "❤️"} {likeCount}
        </div>

        <div className="lp-comments-container">
          <div className="lp-comments-header">
            <h3>댓글</h3>
          </div>
          <div className="lp-comment-input">
            <input
              type="text"
              placeholder="댓글을 입력해주세요"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              disabled={addComment.isLoading}
            />
            <button
              onClick={handleAddComment}
              disabled={addComment.isLoading || !commentInput.trim()}
            >
              작성
            </button>
          </div>
          <ul className="lp-comment-list">
            {loadingComments ? (
              <li>로딩 중...</li>
            ) : (
              allComments.map((comment) => (
                <CommentBlock
                  key={comment.id}
                  comment={comment}
                  lpId={lpId!}
                  currentUserId={currentUserId}
                />
              ))
            )}
            <div ref={commentObserverRef} style={{ height: "1px" }} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LPDetailPage;
