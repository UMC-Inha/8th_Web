export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
};

export type MovieResponse = {
  results: Movie[];
};

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  profile_path: string | null;

};

export type CreditsResponse = {
  cast: CastMember[];
  crew: CrewMember[];
};

export type BackdropImage = {
  file_path: string;
  width: number;
  height: number;
};

export type ImageResponse = {
  backdrops: BackdropImage[];
};