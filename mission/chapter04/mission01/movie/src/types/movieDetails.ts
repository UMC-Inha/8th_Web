export interface MovieDetail {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    runtime: number;
    tagline: string;
    genres: { id: number; name: string }[];
  }
  
  export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }
    