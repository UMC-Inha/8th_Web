import { useParams } from "react-router-dom";
import { useQuery, useInfiniteQuery } from "react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./LPDetailPage.css";

interface LP {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  tags: { id: number; name: string }[];
  likes: { id: number }[];
}

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

interface CommentPage {
  data: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}

const fetchLPDetail = async (id: string): Promise<LP> => {
  const res = await axios.get(`http://localhost:8000/v1/lps/${id}`);
  return res.data.data;
};

const fetchComments = async ({
  pageParam = 0,
  queryKey,
}: any): Promise<CommentPage> => {
  const [, lpId, order] = queryKey;
  const res = await axios.get(`http://localhost:8000/v1/lps/${lpId}/comments`, {
    params: { cursor: pageParam, limit: 10, order },
  });
  return res.data.data;
};

const LPDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const [commentOrder, setCommentOrder] = useState<"asc" | "desc">("desc");

  const {
    data: lpData,
    isLoading,
    error,
  } = useQuery(["lp", lpId], () => fetchLPDetail(lpId!), { enabled: !!lpId });

  const {
    data: commentData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: loadingComments,
  } = useInfiniteQuery(["comments", lpId, commentOrder], fetchComments, {
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    enabled: !!lpId,
  });

  const allComments = commentData?.pages.flatMap((page) => page.data) ?? [];
  const commentObserverRef = useRef<HTMLDivElement | null>(null);
  //다음 댓글 불러오는 용도로 사용

  useEffect(() => {
    if (!commentObserverRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
      },
      { threshold: 1 }
    );
    observer.observe(commentObserverRef.current);
    return () => {
      if (commentObserverRef.current)
        observer.unobserve(commentObserverRef.current);
    };
  }, [fetchNextPage, hasNextPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error || !lpData) return <div>불러오기 실패</div>;

  const createdAt = new Date(lpData.createdAt);
  const daysAgo = Math.floor(
    (Date.now() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );
  const displayDate = daysAgo > 0 ? `${daysAgo}일 전` : "오늘";

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
          <span className="lp-date">{displayDate}</span>
        </div>

        <div className="lp-detail-topbar">
          <h2 className="lp-title">{lpData.title}</h2>
          <div className="lp-actions">
            <span className="lp-action">✏️</span>
            <span className="lp-action">🗑️</span>
          </div>
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

        <div className="lp-likes">❤️ {lpData.likes.length}</div>

        <div className="lp-comments-container">
          <div className="lp-comments-header">
            <h3>댓글</h3>
            <div className="lp-sort-buttons">
              <button
                className={commentOrder === "asc" ? "active" : ""}
                onClick={() => setCommentOrder("asc")}
              >
                오래된순
              </button>
              <button
                className={commentOrder === "desc" ? "active" : ""}
                onClick={() => setCommentOrder("desc")}
              >
                최신순
              </button>
            </div>
          </div>

          <div className="lp-comment-input">
            <input type="text" placeholder="댓글을 입력해주세요" disabled />
            <button disabled>작성</button>
          </div>

          <ul className="lp-comment-list">
            {loadingComments ? (
              <li>로딩 중</li>
            ) : (
              allComments.map((comment) => (
                <li key={comment.id} className="lp-comment-item">
                  <img
                    src={comment.user.avatar}
                    alt="avatar"
                    className="lp-comment-avatar"
                  />
                  <div>
                    <div className="lp-comment-user">{comment.user.name}</div>
                    <div className="lp-comment-content">{comment.content}</div>
                  </div>
                </li>
              ))
            )}
            <div ref={commentObserverRef} style={{ height: "1px" }} />
            {/* 이거 감지해서 다음 댓글 불러오도록  */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LPDetailPage;
