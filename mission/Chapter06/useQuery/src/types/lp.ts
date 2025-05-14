import { CursorBasedResponse } from "./common";

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;  
  updatedAt: Date;  
  tags: Tag[];
  likes: Like[];
};

export type ResponseLpListDto = CursorBasedResponse<{
  data: Lp[];
}>;

export type Tag = {
  id: number;
  name: string;
};

export type Like = {
  id: number;
  userId: number;
  lpId: number;
};
