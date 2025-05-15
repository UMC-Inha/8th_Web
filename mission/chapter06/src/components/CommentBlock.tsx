import "./CommentBlock.css";

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar: string;
  };
}

const CommentBlock = ({ comment }: { comment: Comment }) => {
  return (
    <li className="comment-item">
      <img src={comment.user.avatar} alt="avatar" className="comment-avatar" />
      <div className="comment-body">
        <div className="comment-name">{comment.user.name}</div>
        <div className="comment-content">{comment.content}</div>
      </div>
    </li>
  );
};

export default CommentBlock;
