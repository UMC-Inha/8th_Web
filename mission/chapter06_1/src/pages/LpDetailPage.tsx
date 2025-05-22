import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteLike, getLpDetail, postLike } from '../apis/lp';
import { Lp } from '../types/lp';
import { Heart, Pencil, Trash } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LpComment from '../components/LpCard/LpComment';
import LpCardSkeletonList from '../components/LpCard/LpCardSkeletonList';
import { axiosInstance } from '../apis/axios';
import { getMyInfo } from '../apis/auth';
import usePostLike from '../hooks/mutations/usePostLike';
import useDeleteLike from '../hooks/mutations/useDeleteLike';

const LpDetailPage = () => {
    const { LPid } = useParams<{ LPid: string }>();
    const { name, accessToken } = useAuth();
    const [lpDetails, setLpDetails] = useState<Lp | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [comments, setComments] = useState<any[]>([]);
    const [me, setMe] = useState<any>(null);
    const navigate = useNavigate();

    const { mutate: likeMutate } = usePostLike();
    const { mutate: dislikeMutate } = useDeleteLike();

    useEffect(() => {
        const fetchLpDetail = async () => {
            if (!LPid) return;
            try {
                const response = await getLpDetail(Number(LPid));
                const { data: commentsData } = await axiosInstance.get(`/v1/lps/${LPid}/comments`);
                setLpDetails(response);
                setComments(commentsData.data || []);
                setIsError(false);
            } catch (error) {
                console.error('LP 상세 조회 실패:', error);
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchLpDetail();
    }, [LPid]);

    useEffect(() => {
        const fetchMyInfo = async () => {
            try {
                const res = await getMyInfo(accessToken);
                setMe(res.data);
            } catch (err) {
                console.error("내 정보 불러오기 실패:", err);
            }
        };

        if (accessToken) fetchMyInfo();
    }, [accessToken]);

    const handleLikeLp = () => {
        if (!LPid) return;
        likeMutate({ lpId: Number(LPid) });

        if (isLiked) {
            deleteLike({ lpId : Number(LPid)});
        }
        
        else {
            postLike({ lpId : Number(LPid)}); 
        }
    };

    const handleDislikeLp = () => {
        if (!LPid) return;
        
        dislikeMutate({ lpId: Number(LPid) });
    };

    const handleBackClick = () => {
        navigate('/lp');
    };

    const isLiked = lpDetails?.likes?.some((like) => like.userId === me?.id);

    if (isLoading) return <p className="text-white text-center mt-10">Loading !!!</p>;
    if (isError) return <div className="text-white text-center mt-20">Error !!!</div>;

    return (
        <>
            <div className="min-h-screen bg-black text-white flex flex-col items-center py-10 px-4">
                <div className="w-full max-w-2xl bg-[#1e1e1e] rounded-xl p-6 relative">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-green-300" />
                            <span className="text-sm">{name || '알 수 없음'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-400">
                            <Pencil size={16} className="cursor-pointer hover:text-white" />
                            <Trash size={16} className="cursor-pointer hover:text-white" />
                        </div>
                    </div>

                    <h1 className="text-xl text-white font-semibold mb-6">{lpDetails?.title}</h1>

                    <div className="w-full flex justify-center mb-6">
                        <div className="relative w-72 h-72 text-white rounded-full overflow-hidden shadow-lg">
                            <img
                                src={lpDetails?.thumbnail}
                                alt={lpDetails?.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2" />
                        </div>
                    </div>

                    <p className="text-sm text-gray-300 mb-6 text-center">{lpDetails?.content}</p>

                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {lpDetails?.tags.map((tag) => (
                            <span key={tag.id} className="bg-gray-700 text-xs px-3 py-1 rounded-full">
                                #{tag.name}
                            </span>
                        ))}
                    </div>

                    <button
                        onClick={isLiked ? handleDislikeLp : handleLikeLp}
                        className="flex justify-center items-center text-pink-500 text-lg"
                    >
                        <Heart color={isLiked ? "red" : "black"} fill={isLiked ? "red" : "transparent"} />
                        <span className="ml-1 text-white text-sm">{lpDetails?.likes?.length ?? 0}</span>
                    </button>
                </div>

                {name && <div className="mt-4 text-sm text-gray-400">{name}님 반갑습니다</div>}

                <button
                    onClick={handleBackClick}
                    className="mt-6 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                    돌아가기
                </button>

                {isLoading && <LpCardSkeletonList count={5} />}
                {!isLoading && <LpComment data={comments} />}
            </div>
        </>
    );
};

export default LpDetailPage;

