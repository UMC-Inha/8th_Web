export type Movie = {
    adult : boolean;
    backdrop_path : string;
    genre_ids : number[];
    id : number;
    original_language : string
    original_title : string;
    overview : string;
    popularity : number;
    poster_path : string;
    release_date : string;
    title : string;
    video : boolean;
    vote_average : number;
    vote_count : number;
}

export type MovieResponse = {
    page : number;
    totalPage : number;
    total_results : number;
    results : Movie[];
}

type Genre={
    id:number;
    name:string;
}

type productionCompany={
    id:number;
    logo_path: string;
    name:string;
    origin_country:string;
}
type productionCountries={
    iso_3166_1:string;
    name:string;
}

type spokenLanguages={
    
    english_name: string;
    iso_639_1: string;
    name: string;      
}
export type MovieDetailResponse={
"adult": boolean,
"backdrop_path": string,
"belongs_to_collection": {
  "id": number
  "name": string
  "poster_path": string
  "backdrop_path": string
},
"budget": number,
"genres": Genre[],
"homepage":string,
"id": number,
"imdb_id": string,
"origin_country": string[],
"original_language": string,
"original_title": string,
"overview":  string,
"popularity": number,
"poster_path": string,
"production_companies": productionCompany[],
"production_countries": productionCountries[],
"release_date": string,
"revenue": number,
"runtime": number,
"spoken_languages": spokenLanguages[],
"status": string,
"tagline": string,
"title": string,
"video": boolean,
"vote_average": number,
"vote_count": number
}