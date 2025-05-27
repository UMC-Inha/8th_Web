export type Author = {
    id: number;
    name: string;
    email: string | null;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
};

export type Comment = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: Author;
};

export type CommentListDataResponse = {
    data: Comment[];
    nextCursor: number | null;
    hasNext: boolean;
};

export type CommentListResponse = {
    status: boolean;
    statusCode: number;
    message: string;
    data: CommentListDataResponse;
};
