export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  adult: boolean;
  backdrop_path: string;
  popularity: number;
  video: boolean;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type MovieDetail = {
  id: number;
  title: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  tagline: string;
  overview: string;
};

export type CreditResponse = {
  cast: { id: number; name: string; character: string; profile_path: string }[];
  crew: { id: number; name: string; job: string; profile_path: string }[];
};
