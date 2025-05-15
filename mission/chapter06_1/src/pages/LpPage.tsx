import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Lp } from '../types/lp';
import useGetInfiniteLpList from '../hooks/queries/useGetInfiniteLpList';
import { PAGINATION_ORDER } from '../enums/common';
import LpCardSkeletonList from '../components/LpCard/LpCardSkeletonList';

const LpPage = () => {
    const [order, setOrder] = useState<'recent' | 'oldest'>('recent');
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const navigate = useNavigate();

    const { ref, inView } = useInView();
    const { data, isFetching, fetchNextPage, hasNextPage, isPending, isError } =
        useGetInfiniteLpList(5, '', order === 'recent' ? PAGINATION_ORDER.asc : PAGINATION_ORDER.desc);

    useEffect(() => {
        if (inView && hasNextPage && !isFetching) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetching]);

    const handleLpClick = (lpId: number) => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            setIsModalOpen(true); 
        } else {
            navigate(`/lp/${lpId}`);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/login');
        setIsModalOpen(false); 
    };

    if (isPending) return <LpCardSkeletonList count={300} />;
    if (isError) return <div className="mt-20 text-center">조회된 LP가 없습니다.</div>;

    const lpList = data?.pages.flatMap((page) => page.data.data) || [];

    return (
        <div className="flex flex-col h-dvh bg-white items-center text-black">
            <div className="space-x-8 mt-5">
                <button className="text-2xl font-bold">MY LP LIST</button>

                <button
                    onClick={() => setOrder('recent')}
                    className={`px-4 py-2 rounded-sm ${order === 'recent' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
                >
                    최신순
                </button>

                <button
                    onClick={() => setOrder('oldest')}
                    className={`px-4 py-2 rounded-sm ${order === 'oldest' ? 'bg-gray-500 text-white' : 'bg-gray-200'}`}
                >
                    오래된순
                </button>
            </div>

            <ul className="grid grid-cols-5 gap-4 mt-6 px-4">
                {lpList.map((lp) => (
                    <li
                        key={lp.id}
                        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg"
                        onClick={() => handleLpClick(lp.id)} 
                    >
                        <img
                            src={lp.thumbnail} 
                            alt={lp.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-100"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <h3 className="text-white text-lg font-semibold">{lp.title}</h3>
                            <p className="text-gray-300 text-sm">
                                {new Date(lp.createdAt).toLocaleDateString()} · 좋아요 {lp.likes.length}
                            </p>
                        </div>
                    </li>
                ))}
            </ul>

            {isFetching && <LpCardSkeletonList count={300} />}

            <div ref={ref} className="h-4" />

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg text-center">
                        <h2 className="text-lg font-semibold mb-4">로그인이 필요한 서비스입니다!</h2>
                        <p>LP를 보려면 로그인해주세요.</p>
                        <button 
                            onClick={handleLoginRedirect}
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            로그인 화면으로 이동
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LpPage;
