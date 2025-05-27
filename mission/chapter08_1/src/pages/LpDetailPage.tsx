import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    getLpComments,
    postLpComment,
    getLpDetail,
    deleteLp,
    likeLp,
    updateLp,
} from '../apis/lp';
import { Lp } from '../types/lp';
import { Pencil, Trash } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LpCardSkeletonList from '../components/LpCard/LpCardSkeletonList';
import LpCommentItem from '../components/LpCard/LpCommentItem';
import { Comment as LpCommentType } from '../types/comment';

const LpDetailPage = () => {
    const { LPid } = useParams<{ LPid: string }>();
    const { name } = useAuth();
    const navigate = useNavigate();

    const [lpDetails, setLpDetails] = useState<Lp | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [comments, setComments] = useState<LpCommentType[]>([]);
    const [isCommentLoading, setIsCommentLoading] = useState(true);
    const [isCommentError, setIsCommentError] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');
    const [newComment, setNewComment] = useState('');
    const [submittedComment, setSubmittedComment] = useState('');

    useEffect(() => {
        if (!LPid) return;

        const fetchDetail = async () => {
            try {
                const detail = await getLpDetail(Number(LPid));
                setLpDetails(detail);
                setLikeCount(detail.likes || 0);
                setIsError(false);
            } catch {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };

        const fetchComments = async () => {
            try {
                const commentData = await getLpComments(Number(LPid));
                setComments(commentData.data.data);
                setIsCommentError(false);
            } catch {
                setIsCommentError(true);
            } finally {
                setIsCommentLoading(false);
            }
        };

        fetchDetail();
        fetchComments();
    }, [LPid]);

    const handleBackClick = () => navigate('/lp');

    const handleCommentSubmit = async () => {
        if (!newComment.trim() || !LPid) return;
        try {
            await postLpComment(Number(LPid), newComment);
            const updated = await getLpComments(Number(LPid));
            setComments(updated.data.data);
            setNewComment('');
        } catch {}
    };

    const handleUpdateComment = (updated: LpCommentType) => {
        setComments((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    };

    const handleDeleteComment = (id: number) => {
        setComments((prev) => prev.filter((c) => c.id !== id));
    };

    const handleDeleteLp = async () => {
        if (!LPid) return;
        const confirmed = window.confirm('정말 삭제하시겠습니까?');
        if (!confirmed) return;
        try {
            await deleteLp(Number(LPid));
            navigate('/lp');
        } catch {}
    };

    const handleEditLp = async () => {
        if (!LPid) return;
        try {
            await updateLp(Number(LPid), { title: editTitle, content: editContent });
            const updatedDetail = await getLpDetail(Number(LPid));
            setLpDetails(updatedDetail);
            setIsEditing(false);
            alert('수정되었습니다!');
        } catch {
            alert('수정 실패');
        }
    };

    const handleLike = async () => {
        if (!LPid) return;
        try {
            await likeLp(Number(LPid));
            setLikeCount((prev) => prev + 1);
        } catch {}
    };

    if (isLoading) return <p className="text-white text-center mt-10">Loading !!!</p>;
    if (isError) return <div className="text-white text-center mt-20">Error !!!</div>;

    return (
        <div className="overflow-visible min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">

            <div className="w-full max-w-2xl bg-[#1e1e1e] rounded-xl p-6 relative">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-300" />
                        <span className="text-sm">{name || '알 수 없음'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-400">
                        <Pencil
                            size={16}
                            className="cursor-pointer hover:text-white"
                            onClick={() => {
                                setEditTitle(lpDetails?.title || '');
                                setEditContent(lpDetails?.content || '');
                                setIsEditing(true);
                            }}
                        />
                        <Trash size={16} className="cursor-pointer hover:text-white" onClick={handleDeleteLp} />
                    </div>
                </div>

                
                {isEditing ? (
                        <>
                            <h1>{lpDetails?.title}</h1>

                            <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full mb-4 p-2 rounded bg-black text-white border border-gray-600"
                                placeholder="제목 수정"
                            />
                            <textarea
                                value={editContent}
                                onChange={(e) => setEditContent(e.target.value)}
                                className="w-full mb-4 p-2 rounded bg-black text-white border border-gray-600"
                                placeholder="내용 수정"
                                rows={4}
                            />
                            <div className="flex gap-2">
                                <button onClick={handleEditLp} className="px-4 py-2 bg-green-600 text-white rounded">
                                    저장
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 bg-gray-600 text-white rounded"
                                >
                                    취소
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-xl text-white font-semibold mb-6">{lpDetails?.title}</h1>
                            <div className="w-full flex justify-center mb-6">
                                <div className="relative w-72 h-72 text-white rounded-full overflow-hidden shadow-lg">
                                    <img
                                        src={lpDetails?.thumbnail}
                                        alt={lpDetails?.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                            <p className="text-sm text-gray-300 mb-6 text-center">{lpDetails?.content}</p>
                        </>
                    )
                    } 

                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {lpDetails?.tags.map((tag) => (
                        <span key={tag.id} className="bg-gray-700 text-xs px-3 py-1 rounded-full">
                            #{tag.name}
                        </span>
                    ))}
                </div>

                <div className="flex justify-center items-center text-pink-500 text-lg cursor-pointer" onClick={handleLike}>
                    ❤️ <span className="ml-1 text-white text-sm">{likeCount}</span>
                </div>
            </div>

            {name && <div className="mt-4 text-sm text-gray-400">{name}님, 반갑습니다.</div>}

            <button
                onClick={handleBackClick}
                className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
                목록으로 돌아가기
            </button>

            <div className="w-full max-w-2xl mt-10">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="댓글을 입력하세요..."
                    className="w-full p-2 rounded bg-[#1e1e1e] text-white border border-gray-600"
                    rows={3}
                />
                <button
                    onClick={handleCommentSubmit}
                    className="mt-2 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-500"
                >
                    댓글 작성
                </button>
            </div>

            <div className="w-full max-w-2xl mt-8 space-y-4">
                {isCommentLoading ? (
                    <LpCardSkeletonList count={3} />
                ) : isCommentError ? (
                    <div className="text-gray-400 text-sm">댓글 불러오기 실패</div>
                ) : Array.isArray(comments) ? (
                    comments.map((comment) => (
                        <LpCommentItem
                            key={comment.id}
                            comment={comment}
                            onUpdate={handleUpdateComment}
                            onDelete={handleDeleteComment}
                            lpId={Number(LPid)}
                        />
                    ))
                ) : (
                    <div className="text-gray-400 text-sm">댓글 형식이 잘못되었습니다.</div>
                )}
            </div>
        </div>
    );
};

export default LpDetailPage;
