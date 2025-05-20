import { CursorBasedResponse } from "./common";
export type Tags = {
    id: number;
    name: string;
};
export type Likes = {
    id: number;
    userId: number;
    lpId: number;
};
export type Lp = {
    "id": number,
    "title": string,
    "content": string,
    "thumbnail": string,
    "published": boolean,
    "authorId": number,
    "createdAt": Date,
    "updatedAt": Date,
    tags: Tags[],
    likes: Likes[],
};
export type ResponseLpListDto = CursorBasedResponse<Lp[]>;
export type LpDetailDto = Lp & {
    author: {
        id: number;
        name: string;
        email: string;
        bio: string | null;
        avatar: string | null;
        createdAt: string;
        updatedAt: string;
    };
};
export type LpCommentDto = {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: {
      id: number;
      name: string;
      email: string;
      bio: string | null;
      avatar: string | null;
      createdAt: string;
      updatedAt: string;
  };
};

export interface CommentsCursorResponse {
  data: LpCommentDto[];
  nextCursor: number;
  hasNext: boolean;
}

export interface RequestCreateLpDto {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
}

export interface ResponseCreateLpWrapper {
  status: boolean;
  message: string;
  statusCode: number;
  data: {
      id: number;
      title: string;
      content: string;
      thumbnail: string;
      published: boolean;
      authorId: number;
      createdAt: string;
      updatedAt: string;
  };
}

export interface ResponseEditCommentWrapper {
  status: boolean;
  message: string;
  statusCode: number;
  data: LpCommentDto;
}