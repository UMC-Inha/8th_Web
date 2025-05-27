import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import useGetInfiniteLpList from '../hooks/queries/useGetInfiniteLpList';
import { PAGINATION_ORDER } from '../enums/common';
import LpCardSkeletonList from '../components/LpCard/LpCardSkeletonList';
import LpCreateModal from '../components/LpCreateModal';
import useThrottle from '../hooks/useThrottle';

const LpPage = () => {
    const [order, setOrder] = useState<'recent' | 'oldest'>('recent');
    const [searchInput, setSearchInput] = useState(''); 
    const [searchTerm, setSearchTerm] = useState('');   

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const navigate = useNavigate();
    const { ref, inView } = useInView();
    const throttledInView = useThrottle(inView, 3000); 

    const {
        data,
        isFetching,
        fetchNextPage,
        hasNextPage,
        isPending,
        isError
    } = useGetInfiniteLpList(
        5,
        searchTerm,
        order === 'recent' ? PAGINATION_ORDER.asc : PAGINATION_ORDER.desc
    );

    useEffect(() => {
        if (throttledInView && hasNextPage && !isFetching) {
            console.log('throttled fetchNextPage triggered');
            fetchNextPage();
        }
    }, [throttledInView, hasNextPage, isFetching]);

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

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setSearchTerm(searchInput.trim());
        }
    };

    const lpList = data?.pages?.flatMap((page) => page.data?.data) || [];

    return (
        <div className="flex flex-col min-h-screen bg-white items-center text-black">
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

                <button
                    onClick={openModal}
                    className="bg-gray-500 rounded-sm px-4 py-2 text-white text-l font-bold items-center shadow-lg hover:bg-black"
                >
                    +
                </button>
            </div>

            {/* 🔍 검색창 */}
            <div className="w-1/2 mt-6">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown} // ✅ Enter 키 이벤트
                    placeholder="LP 제목으로 검색 후 Enter"
                    className="w-full p-3 rounded bg-gray-100 text-black border border-gray-400"
                />
            </div>

            {/* 📝 LP 목록 */}
            {isPending || isFetching ? (
                <LpCardSkeletonList count={300} />
            ) : isError ? (
                <div className="mt-20 text-center">
                    조회된 LP가 없습니다.
                    <p>{"문제가 발생했습니다. 다시 시도해주세요."}</p>
                </div>
            ) : (
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
                                    {new Date(lp.createdAt).toLocaleDateString()} · 좋아요 {lp.likes.length || []}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

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
            {isModalOpen && (<LpCreateModal onClose={closeModal} />)}
        </div>
    );
};

export default LpPage;
