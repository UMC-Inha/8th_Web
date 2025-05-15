import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

const Comment = ({ lpId }: { lpId: number }) => {
    const [order, setOrder] = useState<'asc' | 'desc'>('desc');
    const { ref, inView } = useInView();

    const fetchComments = async ({ pageParam = 0 }) => {
        const res = await axios.get(`/api/lp/${lpId}/comments`, {
            params: { page: pageParam, size: 5, order },
        });
        return res.data;
    };

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery({
        queryKey: ['comments', lpId, order],
        queryFn: fetchComments,
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    });

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage]);

    const comments = data?.pages.flatMap((page) => page.comments) || [];

    return (
        <div className="text-white">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">댓글</h2>
                <div className="space-x-2">
                    <button
                        onClick={() => setOrder('desc')}
                        className={`px-3 py-1 rounded ${order === 'desc' ? 'bg-pink-600' : 'bg-gray-700'}`}
                    >
                        최신순
                    </button>
                    <button
                        onClick={() => setOrder('asc')}
                        className={`px-3 py-1 rounded ${order === 'asc' ? 'bg-pink-600' : 'bg-gray-700'}`}
                    >
                        오래된순
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {isLoading
                    ? Array.from({ length: 5 }).map((_, i) => (
                          <div key={i} className="bg-gray-800 p-4 rounded animate-pulse">
                              <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
                              <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                          </div>
                      ))
                    : comments.map((comment) => (
                          <div key={comment.id} className="bg-gray-800 p-4 rounded">
                              <div className="text-sm font-semibold text-pink-400">
                                  {comment.author.nickname}
                              </div>
                              <div className="text-sm text-gray-300 mt-1">{comment.content}</div>
                          </div>
                      ))}

                {isFetchingNextPage &&
                    Array.from({ length: 2 }).map((_, i) => (
                        <div key={i} className="bg-gray-800 p-4 rounded animate-pulse">
                            <div className="h-4 bg-gray-700 rounded w-1/3 mb-2"></div>
                            <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                        </div>
                    ))}
            </div>

            <div ref={ref} className="h-10" />

            <div className="mt-8">
                <textarea
                    placeholder="댓글을 입력하세요..."
                    className="w-full h-24 p-3 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none resize-none"
                    disabled
                />
                <button className="mt-2 px-4 py-2 bg-pink-600 rounded text-white hover:bg-pink-500" disabled>
                    댓글 작성 (준비 중)
                </button>
            </div>
        </div>
    );
};

export default Comment;
