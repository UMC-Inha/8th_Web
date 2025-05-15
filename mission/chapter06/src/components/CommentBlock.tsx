import { useState } from "react";
import useEditComment from "../hooks/useEditComment";
import useDeleteComment from "../hooks/useDeleteComment";
import "./CommentBlock.css";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    avatar: string | null;
  };
}

const CommentBlock = ({
  comment,
  lpId,
  currentUserId,
}: {
  comment: Comment;
  lpId: string;
  currentUserId: number;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [menuOpen, setMenuOpen] = useState(false);

  const { mutate: editComment } = useEditComment(lpId);
  const { mutate: deleteComment } = useDeleteComment(lpId);

  const isMine = currentUserId === comment.author.id;

  console.log("내 ID:", currentUserId);
  console.log("댓글 작성자 ID:", comment.author.id);

  const handleSave = () => {
    if (!editedContent.trim()) return;
    editComment(
      { commentId: comment.id, content: editedContent },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteComment(comment.id);
    }
  };

  return (
    <li className="comment-item">
      {comment.author.avatar ? (
        <img
          src={comment.author.avatar}
          alt="avatar"
          className="comment-avatar"
        />
      ) : (
        <div className="comment-avatar fallback" />
      )}

      <div className="comment-body">
        <div className="comment-header">
          <span className="comment-name">{comment.author.name}</span>
          {isMine && (
            <div className="comment-menu">
              <button
                className="comment-menu-button"
                onClick={() => setMenuOpen((prev) => !prev)}
              >
                &#8942;
              </button>
              {menuOpen && (
                <div className="comment-menu-options">
                  <button onClick={() => setIsEditing(true)}>수정</button>
                  <button onClick={handleDelete}>삭제</button>
                </div>
              )}
            </div>
          )}
        </div>

        {isEditing ? (
          <div className="comment-edit">
            <input
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <button onClick={handleSave}>저장</button>
            <button onClick={() => setIsEditing(false)}>취소</button>
          </div>
        ) : (
          <div className="comment-content">{comment.content}</div>
        )}
      </div>
    </li>
  );
};

export default CommentBlock;
