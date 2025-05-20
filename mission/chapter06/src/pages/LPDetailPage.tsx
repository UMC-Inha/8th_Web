import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useRef, useState } from "react";
import CommentBlock from "../components/CommentBlock";
import useAddComment from "../hooks/useAddComment";
import LPDetailEditor from "../components/LPDetailEditor";
import useLPDetail from "../hooks/useLPDetail";
import useLPComments from "../hooks/useLPComments";
import useLikeLP from "../hooks/useLikeLP";
import "./LPDetailPage.css";

const LPDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const currentUserId = Number(localStorage.getItem("userId"));

  const { data: lpData, isLoading, error } = useLPDetail(lpId!, currentUserId);

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isLoading: loadingComments,
  } = useLPComments(lpId!);

  const { likeToggle } = useLikeLP(lpId!);

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

  const handleAddComment = () => {
    if (!commentInput.trim()) return;
    addComment.mutate(commentInput, {
      onSuccess: () => setCommentInput(""),
    });
  };

  const updateLPMutation = useMutation(
    (formData: any) => axiosInstance.patch(`/v1/lps/${lpId}`, formData),
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

  if (isLoading) return <div>Loading...</div>;
  if (error || !lpData) return <div>불러오기 실패</div>;

  return (
    <div className="lp-detail-wrapper">
      <div className="lp-detail-container">
        {isEditing ? (
          <LPDetailEditor
            lp={lpData}
            onCancel={() => setIsEditing(false)}
            onSave={(formData) => updateLPMutation.mutate(formData)}
          />
        ) : (
          <>
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
              <h2 className="lp-title">{lpData.title}</h2>
              {lpData.author.id === currentUserId && (
                <div className="lp-actions">
                  <span
                    className="lp-action"
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️
                  </span>
                  <span
                    className="lp-action"
                    onClick={() => {
                      if (window.confirm("정말 삭제하시겠습니까?"))
                        deleteLPMutation.mutate();
                    }}
                  >
                    🗑️
                  </span>
                </div>
              )}
            </div>

            <div className="lp-cd-wrapper">
              <img
                src={lpData.thumbnail}
                alt="cd"
                className="lp-cd-image spinning"
              />
            </div>

            <div className="lp-description">{lpData.content}</div>

            <div className="lp-tags">
              {lpData.tags.map((tag) => (
                <span key={tag.id} className="lp-tag">
                  #{tag.name}
                </span>
              ))}
            </div>

            <div className="lp-likes" onClick={() => likeToggle.mutate()}>
              {lpData.hasLiked ? "💔" : "❤️"} {lpData.likeCount}
            </div>
          </>
        )}

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
