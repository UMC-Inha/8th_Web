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

const CommentBlock = ({ comment }: { comment: Comment }) => {
  const hasAvatar = !!comment.author.avatar;

  return (
    <li className="comment-item">
      {hasAvatar ? (
        <img
          src={comment.author.avatar!}
          alt="avatar"
          className="comment-avatar"
        />
      ) : (
        <div className="comment-avatar fallback" />
      )}
      <div className="comment-body">
        <div className="comment-name">{comment.author.name}</div>
        <div className="comment-content">{comment.content}</div>
      </div>
    </li>
  );
};

export default CommentBlock;
