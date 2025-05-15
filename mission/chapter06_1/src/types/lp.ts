import { CursorBasedResponse } from "./common";

export type Tag = {
    id : number;
    name : string;
}

export type Likes = {
    id : number;
    userId : number;
    lpId : number;
}

export type Lp = {
    id : number;
    title : string;
    content : string;
    thumbnail : string;
    published : boolean;
    authorId : number;
    createdAt : Date;
    updatedAt : Date;
    tags : Tag[];
    llikes : Likes[];
}

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type LpDetail = {
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    published: boolean;
}
