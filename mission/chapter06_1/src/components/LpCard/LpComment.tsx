import { Comment } from '../../types/comment';

interface CommentProps {
    data: Comment[];
}

const LpComment = ({ data }: CommentProps) => {
    return (
        <section className="mt-10">
            <h2 className="text-xl font-semibold mb-4">댓글</h2>

            {Array.isArray(data) && data.length > 0 ? (
                <div className="divide-y">
                    {data.map((comment) => (
                        <article key={comment.id} className="px-2 py-3 border-b">
                            <header className="text-sm font-bold">{comment.author.name}</header>
                            <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                            <time className="block mt-1 text-xs text-gray-400">
                                {new Date(comment.createdAt).toLocaleString()}
                            </time>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="px-2 text-sm text-gray-400">댓글이 없습니다.</div>
            )}
        </section>
    );
};

export default LpComment;
